<template>
  <div class="leaderboard-list">
    <div
      v-for="player in players"
      :key="player.user_id"
      class="lb-row"
      :class="{ me: isMe(player.name) }"
    >
      <div class="lb-rank">{{ player.position.toString().padStart(2, '0') }}</div>
      <div class="lb-player">
        <div class="lb-avatar">
          <img :src="avatarSrc(player)" :alt="player.name" />
        </div>
        <div class="lb-name">{{ player.name }}{{ isMe(player.name) ? ' (tú)' : '' }}</div>
      </div>
      <div class="lb-pts">{{ player.points }} pts</div>
      <div
        class="lb-diff"
        :class="{ up: player.diff_from_last_week > 0, down: player.diff_from_last_week < 0 }"
      >
        {{ player.diff_from_last_week > 0 ? '▲' : player.diff_from_last_week < 0 ? '▼' : '–' }}
        {{ Math.abs(player.diff_from_last_week ?? 0) || '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores/UserStore'
import type { Player } from '../../models/Quinielas'

const props = defineProps<{ players: Player[] }>()
const userStore = useUserStore()

function isMe(name: string) {
  return !!userStore.name && name === userStore.name
}

function avatarSrc(player: Player) {
  if (player.img) return player.img
  const padded = player.team_id.toString().padStart(2, '0')
  return new URL(`../../assets/teams/team_${padded}.png`, import.meta.url).href
}
</script>

<style lang="scss">
.leaderboard-list {
  padding: 8px 16px 16px;
}

.lb-row {
  display: grid;
  grid-template-columns: 36px 1fr auto auto;
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 12px;
  transition: background 0.12s;

  &:hover { background: oklch(94% 0.01 145); }
  & + & { border-top: 1px solid oklch(93% 0.01 145); }

  &.me {
    background: oklch(95% 0.04 145);

    .lb-name { color: var(--green-accent); }
  }
}

.lb-rank {
  font-size: 0.82rem;
  font-weight: 900;
  color: var(--text-light);
  text-align: center;
}

.lb-player {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lb-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid oklch(88% 0.02 145);
  flex-shrink: 0;

  img { width: 100%; height: 100%; object-fit: cover; }
}

.lb-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-dark);
}

.lb-pts {
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--green-accent);
  white-space: nowrap;
}

.lb-diff {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-light);
  display: flex;
  align-items: center;
  gap: 2px;

  &.up   { color: var(--green-accent); }
  &.down { color: var(--danger); }
}
</style>
