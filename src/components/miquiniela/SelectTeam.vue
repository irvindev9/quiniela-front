<template>
  <div class="match-row">
    <button
      class="team-btn"
      :class="{ selected: match.team_1.id === match.result_by_user?.team_id, error: validate }"
      @click="selectTeam(match.team_id)"
    >
      <div class="team-check">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3,8 6.5,12 13,4" />
        </svg>
      </div>
      <img class="team-logo" :src="get_img(match.team_1.logo)" :alt="match.team_1.name" />
      <div class="team-info">
        <span class="team-city">{{ teamCity(match.team_1.name) }}</span>
        <span class="team-name">{{ teamNickname(match.team_1.name) }}</span>
      </div>
    </button>

    <div class="vs-badge">VS</div>

    <button
      class="team-btn right"
      :class="{ selected: match.team_2.id === match.result_by_user?.team_id, error: validate }"
      @click="selectTeam(match.team_id_2)"
    >
      <div class="team-check">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3,8 6.5,12 13,4" />
        </svg>
      </div>
      <img class="team-logo" :src="get_img(match.team_2.logo)" :alt="match.team_2.name" />
      <div class="team-info">
        <span class="team-city">{{ teamCity(match.team_2.name) }}</span>
        <span class="team-name">{{ teamNickname(match.team_2.name) }}</span>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onUpdated } from '@vue/runtime-core'

const props = defineProps({
  match: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      team_1: { id: 0, name: '', logo: null },
      team_2: { id: 0, name: '', logo: null },
      result_by_user: null,
      winner_id: 0
    })
  },
  isValidated: {
    type: Boolean,
    required: true,
    default: false
  }
})

function selectTeam(team: Number) {
  if (props.match.result_by_user?.team_id != null) {
    props.match.result_by_user.team_id = team
  } else {
    props.match.result_by_user = { team_id: team }
  }
}

function get_img(logo: string) {
  return new URL(`../../assets/teams/${logo}`, import.meta.url).href
}

function teamCity(name: string) {
  const parts = name.split(' ')
  return parts.length > 1 ? parts.slice(0, -1).join(' ') : ''
}

function teamNickname(name: string) {
  const parts = name.split(' ')
  return parts[parts.length - 1]
}

const validate = ref(props.match.result_by_user == null && props.isValidated)

onUpdated(() => {
  validate.value = props.match.result_by_user == null && props.isValidated
})
</script>

<style lang="scss">
.match-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 10px;
  align-items: center;
}

.team-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: 2px solid oklch(90% 0.01 145);
  border-radius: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'Nunito', sans-serif;
  text-align: left;

  &:hover {
    border-color: oklch(70% 0.1 145);
    background: oklch(97% 0.02 145);
  }

  &.selected {
    border-color: var(--green-accent);
    background: oklch(95% 0.05 145);

    .team-check { opacity: 1; color: var(--green-accent); }
  }

  &.error {
    border-color: var(--danger);
    animation: st-shake 0.35s ease;
  }

  &.right {
    flex-direction: row-reverse;
    text-align: right;

    .team-info { text-align: right; }
  }
}

.team-check {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  opacity: 0;
  transition: opacity 0.15s;
  color: var(--green-accent);

  svg { width: 100%; height: 100%; }
}

.team-logo {
  width: 36px;
  height: 36px;
  object-fit: contain;
  flex-shrink: 0;
}

.team-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.team-city {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.team-name {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--text-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vs-badge {
  flex-shrink: 0;
  padding: 6px 10px;
  border-radius: 8px;
  background: oklch(94% 0.01 145);
  font-size: 0.7rem;
  font-weight: 900;
  color: var(--text-light);
  letter-spacing: 0.5px;
}

@keyframes st-shake {
  0%, 100% { transform: translateX(0); }
  25%       { transform: translateX(-4px); }
  75%       { transform: translateX(4px); }
}

@media (max-width: 480px) {
  .team-btn { padding: 8px 10px; gap: 8px; }
  .team-logo { width: 28px; height: 28px; }
  .team-city { display: none; }
}
</style>
