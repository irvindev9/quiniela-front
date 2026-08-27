<template>
  <div class="results-page">
    <div class="results-page-inner">

      <div class="week-selector-wrap">
        <div class="week-label">Selecciona la semana</div>
        <div class="week-pills" ref="pillsEl">
          <button
            v-for="week in weeks"
            :key="week.id"
            class="week-pill"
            :class="{ active: week.id === current_week }"
            @click="changeWeek(week.id)"
          >
            {{ week.name }}
          </button>
        </div>
      </div>

      <div class="results-card">
        <div class="results-controls">
          <span class="results-title">Quinielas — {{ get_name_current_week() }}</span>
          <span class="sort-label">Ordenar por</span>
          <select class="sort-select" v-model="orderBy" @change="saveSettings">
            <option value="1">Registro</option>
            <option value="2">Nombre</option>
            <option value="3">Puntuación</option>
          </select>
        </div>

        <div v-if="isLoading" class="spinner-wrap">
          <div class="results-spinner"></div>
        </div>
        <template v-else>
          <div class="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Jugador</th>
                  <th v-for="match in matches" :key="match.id" class="match-col">
                    <div class="vs-pair">
                      <img v-if="match.team_1?.logo" :src="get_img(match.team_1.logo)" />
                      <span class="vs-text">vs</span>
                      <img v-if="match.team_2?.logo" :src="get_img(match.team_2.logo)" />
                    </div>
                  </th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="user in displayResults"
                  :key="user.id"
                  :class="{ 'me-row': isMe(user.name) }"
                >
                  <td>
                    <div class="player-cell">
                      <div class="player-avatar">
                        <img :src="user.img || get_img_avatar(user.team_id)" :alt="user.name" />
                      </div>
                      <span class="player-name">{{ user.name }}{{ isMe(user.name) ? ' ★' : '' }}</span>
                    </div>
                  </td>
                  <td v-for="match in matches" :key="match.id">
                    <template v-if="isActive">
                      <div
                        v-if="get_img_of_selection(user.results, match.id)"
                        class="pick-chip"
                        :class="pickClass(user.results, match)"
                      >
                        <img :src="get_img_of_selection(user.results, match.id)" />
                      </div>
                      <div v-else class="pick-chip pending">
                        <span class="pick-unknown">?</span>
                      </div>
                    </template>
                    <div v-else class="pick-chip pending">
                      <span class="pick-unknown">?</span>
                    </div>
                  </td>
                  <td>
                    <span class="pts-chip">{{ isActive ? user.points : '–' }}</span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td :colspan="matches.length + 2">
                    {{ isActive
                      ? `✔ ${get_name_current_week()} — resultados disponibles`
                      : `🔒 ${get_name_current_week()} — resultados aún no disponibles` }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </template>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, ref, computed, nextTick } from 'vue'
import { getWeeks } from '../api/quinielaRequests'
import { getResults, getMatchs } from '../api/resultsRequests'
import { useUserStore } from '../stores/UserStore'
import Cookies from 'js-cookie'

const userStore = useUserStore()
const isLoading = ref(false)
const pillsEl = ref<HTMLElement>()
const weeks = ref<any[]>([])
const current_week = ref(0)
const orderBy = ref(1)
const results = ref<any[]>([])
const matches = ref<any[]>([])

const isActive = computed(() => {
  if (!weeks.value.length) return false
  const week = weeks.value.find((w: any) => w.id === current_week.value)
  if (!week) return false
  if (week.is_forced_open == 1) return true
  return new Date() > new Date(week.end_date)
})

const displayResults = computed(() => {
  if (!results.value.length) return []
  return [...results.value].sort((a, b) => {
    if (orderBy.value == 2) return a.name.localeCompare(b.name)
    if (orderBy.value == 3) return b.points - a.points
    return a.id - b.id
  })
})

function isMe(name: string) {
  return !!userStore.name && name === (userStore.name as unknown as string)
}

function pickClass(userResults: any, match: any) {
  if (!match.winner_id) return ''
  const picked = get_results_of_match(userResults, match.id)
  if (!picked) return ''
  return picked == match.winner_id ? 'correct' : 'wrong'
}

async function changeWeek(id: number) {
  current_week.value = id
  isLoading.value = true
  matches.value = await getMatchs(current_week.value)
  results.value = await getResults(current_week.value)
  isLoading.value = false
}

function get_img(logo: string) {
  return new URL(`../assets/teams/${logo}`, import.meta.url).href
}

function get_img_avatar(logo: string) {
  const padded = logo.toString().padStart(2, '0')
  return new URL(`../assets/teams/team_${padded}.png`, import.meta.url).href
}

function get_img_of_selection(player_results: any, match_id: number): string {
  const match = matches.value.find((m: any) => m.id == match_id)
  if (!match) return ''
  const picked_team_id = player_results.find((r: any) => r.match_id == match_id)?.team_id
  if (!picked_team_id) return ''
  const logo = picked_team_id == match.team_1.id ? match.team_1.logo : match.team_2.logo
  return new URL(`../assets/teams/${logo}`, import.meta.url).href
}

function get_results_of_match(results_of_player: any, match_id: number) {
  return results_of_player.find((r: any) => r.match_id == match_id)?.team_id ?? 0
}

function get_name_current_week() {
  return weeks.value.find((w: any) => w.id == current_week.value)?.name ?? ''
}

function saveSettings() {
  Cookies.set('orderBy', orderBy.value.toString(), {
    expires: 30,
    path: '',
    domain: import.meta.env.VITE_COOKIE_DOMAIN
  })
}

onBeforeMount(() => {
  if (Cookies.get('orderBy')) orderBy.value = Number(Cookies.get('orderBy'))
})

onMounted(async () => {
  isLoading.value = true
  weeks.value = await getWeeks()
  if (weeks.value.length) {
    weeks.value = weeks.value.sort(
      (a, b) => Number(a.name.split(' ')[1]) - Number(b.name.split(' ')[1])
    )
    current_week.value = weeks.value[weeks.value.length - 1]?.id
    matches.value = await getMatchs(current_week.value)
    results.value = await getResults(current_week.value)
    await nextTick()
    if (pillsEl.value) pillsEl.value.scrollLeft = pillsEl.value.scrollWidth
  }
  isLoading.value = false
})
</script>

<style lang="scss">
.results-page {
  min-height: calc(100vh - 60px);
  color: var(--text-dark);
}

.results-page-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 16px 80px;
}

/* ── WEEK PILLS ── */
.week-selector-wrap {
  margin-bottom: 20px;
}

.week-label {
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.week-pills {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }
}

.week-pill {
  flex-shrink: 0;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.15s;
  background: oklch(24% 0.07 145);
  color: oklch(70% 0.06 145);
  font-family: 'Nunito', sans-serif;

  &:hover { background: oklch(30% 0.09 145); color: white; }
  &.active {
    background: var(--green-accent);
    color: white;
    border-color: var(--green-light);
    box-shadow: 0 2px 12px oklch(52% 0.2 145 / 0.4);
  }
}

/* ── CARD ── */
.results-card {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
}

.results-controls {
  padding: 14px 20px;
  background: white;
  border-bottom: 1.5px solid oklch(92% 0.01 145);
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.results-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-dark);
  flex: 1;
}

.sort-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-light);
}

.sort-select {
  padding: 5px 10px;
  border-radius: 8px;
  border: 1.5px solid oklch(88% 0.02 145);
  font-family: 'Nunito', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-dark);
  background: white;
  cursor: pointer;
  outline: none;

  &:focus { border-color: var(--green-accent); }
}

/* ── TABLE ── */
.table-scroll {
  overflow-x: auto;
}

.results-card table {
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;

  thead th {
    background: oklch(95% 0.01 145);
    padding: 8px 10px;
    font-size: 0.72rem;
    font-weight: 800;
    color: var(--text-mid);
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 2;
    white-space: nowrap;

    &:first-child { text-align: left; padding-left: 16px; min-width: 140px; }
    &.match-col { min-width: 54px; }
  }

  tbody {
    tr {
      transition: background 0.1s;

      &:hover td { background: oklch(96% 0.02 145); }
      &.me-row td { background: oklch(95% 0.04 145); }
    }

    td {
      padding: 8px 10px;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-dark);
      text-align: center;
      border-bottom: 1px solid oklch(93% 0.01 145);

      &:first-child { text-align: left; padding-left: 16px; }
    }
  }

  tfoot td {
    padding: 12px 16px;
    background: white;
    border-top: 1.5px solid oklch(92% 0.01 145);
    font-size: 0.75rem;
    color: var(--text-light);
    font-weight: 600;
  }
}

.vs-pair {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;

  img { width: 18px; height: 18px; object-fit: contain; }
}

.vs-text {
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--text-light);
}

.player-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.player-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  border: 1.5px solid oklch(88% 0.02 145);
  flex-shrink: 0;

  img { width: 100%; height: 100%; object-fit: cover; }
}

.player-name {
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;

  .me-row & { color: var(--green-accent); font-weight: 800; }
}

.pick-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: oklch(94% 0.01 145);

  img { width: 20px; height: 20px; object-fit: contain; }

  &.correct { background: oklch(92% 0.08 145); box-shadow: 0 0 0 2px var(--green-accent); }
  &.wrong   { background: oklch(96% 0.03 25);  box-shadow: 0 0 0 2px var(--danger); }
  &.pending { opacity: 0.45; }
}

.pick-unknown {
  font-size: 0.9rem;
  color: var(--text-light);
}

.pts-chip {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  background: oklch(94% 0.03 85);
  color: oklch(50% 0.15 85);
  font-size: 0.8rem;
  font-weight: 800;
}

.results-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid oklch(88% 0.02 145);
  border-top-color: var(--green-accent);
  border-radius: 50%;
  animation: results-spin 0.7s linear infinite;
}

@keyframes results-spin {
  to { transform: rotate(360deg); }
}
</style>
