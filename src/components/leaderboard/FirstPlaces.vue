<template>
  <div class="first-places row mx-0">
    <div class="col second-place" v-if="props.players[1]">
      <div class="circle shadow-sm">
        <img :src="props.players[1].img" alt="img" v-if="props.players[1].img">
        <img :src="get_img(props.players[1].team_id)" alt="img" v-else>
        <div class="place-holder">
          <span>{{props.players[1].position}}</span>
        </div>
      </div>
      <p>
        <small>{{props.players[1].name}}</small>
        <br>
        <span class="badge rounded-pill bg-light text-dark">{{props.players[1].points}} pts</span>
        <br>
        <span class="badge rounded border shadow-sm text-dark" v-if="props.players[1].diff_from_last_week && props.players[1].diff_from_last_week !== 0">
          {{props.players[1].diff_from_last_week ? props.players[1].diff_from_last_week : 0}}
          <i class="bi bi-caret-up-fill" :class="{'text-success': (props.players[1].diff_from_last_week && props.players[1].diff_from_last_week > 0)}" v-if="props.players[1].diff_from_last_week && props.players[1].diff_from_last_week > 0"></i>
          <i class="bi bi-caret-down-fill" :class="{'text-danger': (props.players[1].diff_from_last_week && props.players[1].diff_from_last_week < 0)}" v-if="props.players[1].diff_from_last_week && props.players[1].diff_from_last_week < 0"></i>
        </span>
      </p>
    </div>
    <div class="col" v-if="props.players[0]">
      <div class="circle shadow-sm">
        <img :src="props.players[0].img" alt="img" v-if="props.players[0].img">
        <img :src="get_img(props.players[0].team_id)" alt="img" v-else>
        <div class="place-holder">
          <span>{{props.players[0].position}}</span>
        </div>
      </div>
      <p>
        <small>{{props.players[0].name}}</small>
        <br>
        <span class="badge rounded-pill bg-light text-dark">{{props.players[0].points}} pts</span>
        <br>
        <span class="badge rounded border shadow-sm text-dark" v-if="props.players[0].diff_from_last_week && props.players[0].diff_from_last_week !== 0">
          {{props.players[0].diff_from_last_week ? props.players[0].diff_from_last_week : 0}}
          <i class="bi bi-caret-up-fill" :class="{'text-success': (props.players[0].diff_from_last_week && props.players[0].diff_from_last_week > 0)}" v-if="props.players[0].diff_from_last_week && props.players[0].diff_from_last_week > 0"></i>
          <i class="bi bi-caret-down-fill" :class="{'text-danger': (props.players[0].diff_from_last_week && props.players[0].diff_from_last_week < 0)}" v-if="props.players[0].diff_from_last_week && props.players[0].diff_from_last_week < 0"></i>
        </span>
      </p>
    </div>
    <div class="col second-place" v-if="props.players[2]">
      <div class="circle shadow-sm">
        <img :src="props.players[2].img" alt="img" v-if="props.players[2].img">
        <img :src="get_img(props.players[2].team_id)" alt="img" v-else>
        <div class="place-holder">
          <span>{{props.players[2].position}}</span>
        </div>
      </div>
      <p>
        <small>{{props.players[2].name}}</small>
        <br>
        <span class="badge rounded-pill bg-light text-dark">{{props.players[2].points}} pts</span>
        <br>
        <span class="badge rounded border shadow-sm text-dark" v-if="props.players[2].diff_from_last_week && props.players[2].diff_from_last_week !== 0">
          {{props.players[2].diff_from_last_week ? props.players[2].diff_from_last_week : 0}}
          <i class="bi bi-caret-up-fill" :class="{'text-success': (props.players[2].diff_from_last_week && props.players[2].diff_from_last_week > 0)}" v-if="props.players[2].diff_from_last_week && props.players[2].diff_from_last_week > 0"></i>
          <i class="bi bi-caret-down-fill" :class="{'text-danger': (props.players[2].diff_from_last_week && props.players[2].diff_from_last_week < 0)}" v-if="props.players[2].diff_from_last_week && props.players[2].diff_from_last_week < 0"></i>
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Players } from '../../models/Quinielas';

const props = defineProps<{
  players: Players[];
}>();

function get_img(logo: string) {
  const logo_padded = logo.toString().padStart(2, "0");
  return new URL(`../../assets/teams/team_${logo_padded}.png`, import.meta.url).href;
}
</script>

<style lang="scss">
$sm: 576px;
$md: 768px;

.first-places {
  display: flex;
  justify-content: space-between;
  align-items: end;

  .circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    margin: auto;
    border: 3px solid rgba(180, 180, 180, 0.5);
    cursor: default !important;
    
    

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .place-holder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 1.5rem;
      font-weight: 500;
    }

    .place-holder:hover {
      display: none;
    }

    .place-holder span:hover {
      display: none;
    }
  }

  .second-place {
    .circle {
      width: 80px;
      height: 80px;
    }
  }

  .col {
    p {
      font-size: smaller;

      @media (min-width: $md) {
        font-size: medium;
      }
    }
  }
}
</style>