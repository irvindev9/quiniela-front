<template>
  <div class="podium-wrap">
    <div
      v-for="player in players"
      :key="player.user_id"
      class="podium-player"
      :class="posClass(player.position)"
    >
      <div class="podium-avatar-wrap">
        <div class="podium-avatar">
          <img :src="avatarSrc(player)" :alt="player.name" />
        </div>
        <div class="podium-rank">{{ player.position }}</div>
      </div>
      <div class="podium-name">{{ firstName(player.name) }}</div>
      <div class="podium-pts" :class="{ gold: player.position === 1 }">{{ player.points }} pts</div>
      <div
        v-if="player.diff_from_last_week"
        class="podium-diff"
        :class="{ up: player.diff_from_last_week > 0, down: player.diff_from_last_week < 0 }"
      >
        {{ player.diff_from_last_week > 0 ? '▲' : '▼' }} {{ Math.abs(player.diff_from_last_week) }}
      </div>
      <div class="podium-bar-wrap"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Player } from '../../models/Quinielas'

const props = defineProps<{ players: Player[] }>()

function posClass(position: number) {
  return position === 1 ? 'first' : position === 2 ? 'second' : 'third'
}

function firstName(name: string) {
  return name.split(' ')[0]
}

function avatarSrc(player: Player) {
  if (player.img) return player.img
  const padded = player.team_id.toString().padStart(2, '0')
  return new URL(`../../assets/teams/team_${padded}.png`, import.meta.url).href
}
</script>

<style lang="scss">
.podium-wrap {
  padding: 28px 20px 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 12px;
}

.podium-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  max-width: 160px;

  &.first  { order: 2; }
  &.second { order: 1; }
  &.third  { order: 3; }
}

.podium-avatar-wrap {
  position: relative;
  display: inline-block;
}

.podium-avatar {
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid oklch(85% 0.02 145);

  img { width: 100%; height: 100%; object-fit: cover; }

  .podium-player.first  & { width: 88px; height: 88px; border-color: var(--gold); border-width: 3px; box-shadow: 0 0 0 4px oklch(90% 0.12 85 / 0.4); }
  .podium-player.second & { width: 70px; height: 70px; border-color: var(--silver); }
  .podium-player.third  & { width: 70px; height: 70px; border-color: var(--bronze); }
}

.podium-rank {
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 900;
  color: white;
  border: 2px solid white;
  z-index: 2;

  .podium-player.first  & { background: var(--gold);   width: 30px; height: 30px; font-size: 0.85rem; }
  .podium-player.second & { background: var(--silver); color: var(--text-dark); }
  .podium-player.third  & { background: var(--bronze); }
}

.podium-name {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--text-dark);
  text-align: center;
}

.podium-pts {
  font-size: 0.78rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  background: oklch(94% 0.03 85);
  color: oklch(50% 0.15 85);

  &.gold { background: var(--gold); color: white; }
}

.podium-diff {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-light);

  &.up   { color: var(--green-accent); }
  &.down { color: var(--danger); }
}

.podium-bar-wrap {
  width: 100%;
  border-radius: 12px 12px 0 0;
  padding-top: 10px;

  .podium-player.first  & { background: oklch(94% 0.06 85);  min-height: 72px; }
  .podium-player.second & { background: oklch(94% 0.01 250); min-height: 48px; }
  .podium-player.third  & { background: oklch(93% 0.04 55);  min-height: 32px; }
}
</style>
