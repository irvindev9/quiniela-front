<template>
  <div class="second-places row mx-0 px-2">
    <div class="col-12 rounded border player py-2 my-1 shadow-sm" v-for="index in 10" :key="index">
      <div class="place-holder">
        <span class="place">{{ (3 + index).toString().padStart(2, '0') }}.</span>
      </div>
      <div class="player-img">
        <img src="https://picsum.photos/200" alt="img">
      </div>
      <div class="player-info px-3">
        <p class="mb-0">
          <small>Jose Lopez</small>
        </p>
      </div>
      <div class="pts-holder">
        <span class="badge rounded-pill bg-light text-dark">{{ 96 - index }} pts</span>
      </div> &nbsp;
    </div>
  </div>
</template>

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