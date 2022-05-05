<template>
  <div class="second-places row mx-0 px-2">
    <div class="col-12 rounded border player py-2 my-1 shadow-sm" v-for="player in players" :key="player.user_id">
      <div class="place-holder">
        <span class="place">{{ (player.position).toString().padStart(2, '0') }}.</span>
      </div>
      <div class="player-img">
        <img :src="player.img" alt="img" v-if="player.img">
        <img src="../../assets/default_user.png" alt="img" v-else>
      </div>
      <div class="player-info px-3">
        <p class="mb-0">
          <small>{{player.name}}</small>
        </p>
      </div>
      <div class="pts-holder">
        <span class="badge rounded-pill bg-light text-dark">{{ player.points }} pts</span>
      </div> &nbsp;
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  players: {
    type: Array,
    required: true,
    default: () => [],
  },
});
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
}
</style>