<template>
  <div class="leaderboard-page">
    <div class="lb-page-inner">
      <div v-if="isLoading" class="spinner-wrap">
        <div class="lb-spinner"></div>
      </div>
      <template v-else>
        <div class="podium-section">
          <div class="section-header">
            <span class="section-title">🏆 Tabla General</span>
            <span class="section-badge">Temporada {{ currentSeasonText }}</span>
          </div>
          <FirstPlaces :players="first_places" />
          <SecondPlaces :players="second_places" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import FirstPlaces from '../components/leaderboard/FirstPlaces.vue'
import SecondPlaces from '../components/leaderboard/SecondPlaces.vue'
import { getLeaderboard } from '../api/resultsRequests'
import { useLeaderBoardStore } from '../stores/LeaderBoardStore'
import type { Player } from '../models/Quinielas'

const currentYear = new Date().getFullYear()
const currentSeasonText = computed(() => `${currentYear} - ${currentYear + 1}`)

const leaderBoardStore = useLeaderBoardStore()
const isLoading = ref(true)
const first_places = ref<Player[]>([])
const second_places = ref<Player[]>([])

onMounted(async () => {
  let players: Player[]

  if (checkForUpdate()) {
    players = await getLeaderboard()
    leaderBoardStore.setLeaderBoard(players)
  } else {
    players = leaderBoardStore.leaderBoard
  }

  isLoading.value = false

  if (players.length >= 3) {
    first_places.value = players.slice(0, 3)
    second_places.value = players.slice(3)
  } else {
    first_places.value = players
    second_places.value = []
  }
})

function checkForUpdate() {
  const tenMinutesAgo = 10 * 60 * 1000
  const timeToUpdate = leaderBoardStore.lastTimeUpdated ?? 0
  return timeToUpdate < new Date().getTime() - tenMinutesAgo
}
</script>

<style lang="scss">
.leaderboard-page {
  min-height: calc(100vh - 60px);
  color: var(--text-dark);
}

.lb-page-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 28px 16px 80px;
}

.podium-section {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
}

.section-header {
  padding: 16px 22px;
  background: white;
  border-bottom: 1.5px solid oklch(92% 0.01 145);
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-dark);
}

.section-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  background: var(--green-accent);
  color: white;
  margin-left: auto;
}

.spinner-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px;
}

.lb-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid oklch(28% 0.07 145);
  border-top-color: var(--green-accent);
  border-radius: 50%;
  animation: lb-spin 0.7s linear infinite;
}

@keyframes lb-spin {
  to { transform: rotate(360deg); }
}
</style>
