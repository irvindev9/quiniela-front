<template>
  <div class="second-places row mx-0 px-2">
    <div class="col-12 rounded border player py-2 my-1 shadow-sm" v-for="player in players" :key="player.user_id">
      <div class="place-holder">
        <span class="place">{{ (player.position).toString().padStart(2, '0') }}.</span>
      </div>
      <div class="player-img">
        <img :src="player.img" alt="img" v-if="player.img">
        <img :src="get_img(player.team_id)" alt="img" v-else>
      </div>
      <div class="player-info px-3">
        <p class="mb-0">
          <small>{{player.name}}</small>
        </p>
      </div>
      <div class="pts-holder">
        <span class="badge rounded-pill bg-light text-dark">{{ player.points }} pts</span>
      </div> &nbsp;
      <div class="old-place rounded border shadow-sm">
        <i class="bi bi-caret-up-fill" :class="{'text-success': (player.diff_from_last_week && player.diff_from_last_week > 0)}"></i>
        <span class="place">{{ player.diff_from_last_week ? player.diff_from_last_week : 0 }}</span>
        <i class="bi bi-caret-down-fill" :class="{'text-danger': (player.diff_from_last_week && player.diff_from_last_week < 0)}"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Players } from '../../models/Quinielas';

const props = defineProps<{
  players: Players,
}>();

function get_img(logo: string) {
  const logo_padded = logo.toString().padStart(2, "0");
  return new URL(`../../assets/teams/team_${logo_padded}.png`, import.meta.url).href;
}
</script>

<style lang="scss">
.second-places {
  display: flex;
  .player {
    display: flex;
    align-items: center;
    .place-holder {
      text-align: initial;
      span.place {
        font-size: 1rem;
        font-weight: bold;
        color: rgba(180, 180, 180, 0.5);
        padding-right: 10px;
      }
    }
    .player-img {
      text-align: start;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      border: 1px solid rgba(180, 180, 180, 0.5);

      img {
        width: 35px;
        height: 35px;
        object-fit: cover;

      }
    }
    .pts-holder {
      flex-grow: 1;
      text-align: right;
    }
  }
  .player:hover {
    background: rgba(180, 180, 180, 0.1);
  }

  .old-place {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
    min-width: 25px;
    padding: 0 2px;
    height: 100%;
  }

  .old-place i {
    font-size: 10px;
    color: rgba(180, 180, 180, 0.5);
  }

  .old-place span.place {
    font-size: 10px;
    font-weight: bold;
  }
}
</style>