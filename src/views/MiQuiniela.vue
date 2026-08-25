<template>
  <div class="mq-page">
    <div class="mq-page-inner">

      <div class="week-selector-wrap">
        <div class="week-label">Selecciona la semana</div>
        <div class="week-pills" ref="pillsEl">
          <button
            v-for="wk in weeks"
            :key="wk.id"
            class="week-pill"
            :class="{ active: wk.id === current_week }"
            @click="changeWeek(wk.id)"
          >
            {{ wk.name }}
          </button>
        </div>
      </div>

      <div class="quiniela-card" v-if="!isLoading || week[0]?.matches?.length">
        <div class="quiniela-card-header">
          <div class="card-header-left">
            <span class="card-header-label">Tu quiniela</span>
            <span class="card-header-name">{{ userStore.name }}</span>
            <span class="card-header-hint">Selecciona al ganador de cada partido</span>
          </div>
          <div class="progress-badge">
            <span class="progress-text">{{ selectedCount }} / {{ totalCount }} picks</span>
            <div class="progress-bar-wrap">
              <div class="progress-bar-fill" :style="{ width: `${totalCount ? selectedCount / totalCount * 100 : 0}%` }"></div>
            </div>
          </div>
        </div>

        <div class="matches-list" v-if="!isLoading">
          <template v-for="(match, i) in week[0]?.matches" :key="match.id">
            <SelectTeam :match="match" :isValidated="isValidated" />
            <div v-if="i < week[0].matches.length - 1" class="match-divider"></div>
          </template>
        </div>
        <div v-else class="mq-spinner-wrap">
          <div class="mq-spinner"></div>
        </div>

        <div class="locked-overlay" v-if="isLocked && !isLoading">
          <div class="locked-banner">
            <span class="lock-icon">🔒</span>
            <div>
              <div style="font-weight: 800">Quiniela bloqueada</div>
              <div style="font-size: 0.78rem; font-weight: 600; opacity: 0.7">El tiempo para editar ha expirado</div>
            </div>
          </div>
        </div>

        <div class="quiniela-card-footer" v-if="!isLocked && !isLoading">
          <span class="footer-hint" :class="{ warn: isValidated && selectedCount < totalCount }">
            <template v-if="isValidated && selectedCount < totalCount">
              ⚠️ Selecciona {{ totalCount - selectedCount }} más
            </template>
            <template v-else-if="selectedCount === totalCount && totalCount > 0">
              ✔ Todos los partidos seleccionados
            </template>
            <template v-else>
              {{ totalCount - selectedCount }} partidos sin seleccionar
            </template>
          </span>
          <button class="save-btn" @click="saveData" :disabled="isLoading">
            <div v-if="isLoading" class="mq-btn-spinner"></div>
            {{ isLoading ? 'Guardando...' : 'Guardar quiniela' }}
          </button>
        </div>
      </div>

      <div v-else class="mq-spinner-wrap-full">
        <div class="mq-spinner"></div>
      </div>

    </div>

    <div class="mq-toast" :class="[toast.type, { show: toast.visible }]">
      <span>{{ toast.icon }}</span>
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, nextTick } from 'vue'
import SelectTeam from '../components/miquiniela/SelectTeam.vue'
import { getQuiniela, saveQuiniela, getWeeks } from '../api/quinielaRequests'
import { useUserStore } from '../stores/UserStore'

const userStore = useUserStore()
const isLoading = ref(false)
const isLocked = ref(false)
const isValidated = ref(false)
const current_week = ref(0)
const weeks = ref<any[]>([])
const week = ref<any>([{ matches: [] }])
const pillsEl = ref<HTMLElement>()
const toast = ref({ visible: false, type: 'success', message: '', icon: '' })

const selectedCount = computed(() =>
  week.value[0]?.matches?.filter((m: any) => m.result_by_user !== null).length ?? 0
)
const totalCount = computed(() => week.value[0]?.matches?.length ?? 0)

function showToast(type: string, icon: string, message: string) {
  toast.value = { visible: true, type, icon, message }
  setTimeout(() => { toast.value.visible = false }, 2800)
}

async function saveData() {
  isLoading.value = true
  if (current_week.value > 0) {
    const total = week.value[0].matches.length
    const selected = week.value[0].matches.filter((m: any) => m.result_by_user !== null).length

    if (total === selected) {
      await saveQuiniela(current_week.value, week.value[0].matches)
      isValidated.value = false
      showToast('success', '✅', '¡Quiniela guardada!')
    } else {
      isValidated.value = true
      const missing = total - selected
      showToast('warn', '⚠️', `Faltan ${missing} ${missing === 1 ? 'partido' : 'partidos'} por seleccionar`)
    }
  }
  isLoading.value = false
}

async function changeWeek(id: number) {
  current_week.value = id
  isValidated.value = false
  isLoading.value = true
  week.value = await getQuiniela(current_week.value)
  checkIfIsLocked()
  isLoading.value = false
}

function checkIfIsLocked() {
  const force_open = week.value[0].is_forced_open_quiniela
  if (force_open) {
    isLocked.value = false
  } else {
    const dateTime_to_close = new Date(week.value[0].end_date)
    isLocked.value = new Date() >= dateTime_to_close
  }
}

onMounted(async () => {
  isLoading.value = true
  weeks.value = await getWeeks()
  if (weeks.value.length) {
    weeks.value.sort((a, b) => Number(a.name.split(' ')[1]) - Number(b.name.split(' ')[1]))
    current_week.value = weeks.value[weeks.value.length - 1]?.id
    week.value = await getQuiniela(current_week.value)
    checkIfIsLocked()
    await nextTick()
    if (pillsEl.value) pillsEl.value.scrollLeft = pillsEl.value.scrollWidth
  }
  isLoading.value = false
})
</script>

<style lang="scss">
.mq-page {
  background-color: var(--green-dark);
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 79px, oklch(22% 0.07 145) 79px, oklch(22% 0.07 145) 80px),
    repeating-linear-gradient(90deg, transparent, transparent 79px, oklch(22% 0.07 145) 79px, oklch(22% 0.07 145) 80px);
  min-height: calc(100vh - 60px);
}

.mq-page-inner {
  max-width: 680px;
  margin: 0 auto;
  padding: 32px 16px 80px;
}

/* ── QUINIELA CARD ── */
.quiniela-card {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.35);
}

.quiniela-card-header {
  padding: 18px 24px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background: white;
  border-bottom: 1.5px solid oklch(92% 0.01 145);
}

.card-header-left {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.card-header-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-light);
}

.card-header-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-dark);
}

.card-header-hint {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-light);
  margin-top: 8px;
}

.progress-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.progress-text {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-mid);
}

.progress-bar-wrap {
  width: 80px;
  height: 6px;
  background: oklch(92% 0.01 145);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--green-accent);
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* ── MATCHES ── */
.matches-list {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.match-divider {
  height: 1px;
  background: oklch(93% 0.01 145);
}

/* ── LOCKED ── */
.locked-overlay {
  margin: 0 20px 20px;
}

.locked-banner {
  background: oklch(96% 0.02 25);
  border: 1.5px solid oklch(88% 0.06 25);
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: oklch(40% 0.12 25);
  font-weight: 700;
  font-size: 0.88rem;
}

.lock-icon { font-size: 1.4rem; }

/* ── FOOTER ── */
.quiniela-card-footer {
  padding: 16px 20px;
  background: white;
  border-top: 1.5px solid oklch(92% 0.01 145);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.footer-hint {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-light);

  &.warn { color: var(--danger); }
}

.save-btn {
  padding: 10px 28px;
  border-radius: 12px;
  border: none;
  background: var(--green-accent);
  color: white;
  font-family: 'Nunito', sans-serif;
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 12px oklch(52% 0.2 145 / 0.35);
  flex-shrink: 0;

  &:hover { background: var(--green-light); transform: translateY(-1px); box-shadow: 0 4px 16px oklch(52% 0.2 145 / 0.45); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
}

/* ── SPINNERS ── */
.mq-spinner-wrap {
  display: flex;
  justify-content: center;
  padding: 40px;
}

.mq-spinner-wrap-full {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px;
}

.mq-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid oklch(28% 0.07 145);
  border-top-color: var(--green-accent);
  border-radius: 50%;
  animation: mq-spin 0.7s linear infinite;
}

.mq-btn-spinner {
  width: 16px;
  height: 16px;
  border: 2.5px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: mq-spin 0.6s linear infinite;
}

@keyframes mq-spin {
  to { transform: rotate(360deg); }
}

/* ── TOAST ── */
.mq-toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: white;
  border-radius: 14px;
  padding: 14px 22px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  font-size: 0.9rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transition: all 0.25s ease;
  z-index: 999;
  white-space: nowrap;
  pointer-events: none;

  &.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  &.success { border-left: 4px solid var(--green-accent); }
  &.error   { border-left: 4px solid var(--danger); }
  &.warn    { border-left: 4px solid var(--gold); }
}

@media (max-width: 480px) {
  .matches-list { padding: 14px; gap: 10px; }
}
</style>
