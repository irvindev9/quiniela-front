<template>
  <div class="profile-container">
    <div class="container shadow-sm">
      <img class="profile-img" :src="userStore.img" alt="userPhoto" v-if="userStore.img">
      <img class="profile-img" src="../../assets/default_user.png" alt="userPhoto" v-else>
      <div class="row">
        <div class="col-12 text-center">
          <h4>{{userStore.name}}</h4>
          <small class="text-muted">
            <i class="bi bi-phone"></i> {{userStore.email}}
          </small>
        </div>
      </div>
      <div class="row">
         <div class="col text-center">
          <span class="badge rounded-pill bg-primary">
            Equipo favorito
          </span>
          <br>
          <img class="team-img" :src="get_img_of_team(userStore.team_img)" alt="">
        </div>
        <div class="col text-center">
          <span class="badge rounded-pill bg-primary">
            Temporada
          </span>
          <br>
          <span class="badge rounded-pill bg-light text-dark">
            {{score}} pts
          </span>
        </div>
        <div class="col text-center">
          <span class="badge rounded-pill bg-primary">
            Estado Quiniela
          </span>
          <br>
          <span class="badge rounded-pill bg-light text-dark">
            {{is_paid ? 'Pagado' : 'No pagado'}}
          </span>
        </div>
      </div>
    </div>
    <button class="btn btn-outline-secondary btn-sm shadow-sm mt-2" @click="redirect('marcador')">
        Ingresar
        <i class="bi bi-arrow-right-circle mt-2"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores/UserStore';
import { useRouter } from 'vue-router'
import { getScore } from '../../api/quinielaRequests';
import { onMounted, ref } from '@vue/runtime-core';

const userStore = useUserStore();
const router = useRouter();
const score = ref(0);
const is_paid = ref(0);

function redirect(to: string) {
  router.push(to)
}

function get_img_of_team(team_img: string) {
  return new URL(`../../assets/teams/${team_img}`, import.meta.url).href;
}

onMounted(async() => {
  const response = await getScore();
  score.value = response.score;
  is_paid.value = response.is_paid;
});

</script>

<style lang="scss">
.profile-container {
  position: relative;
  padding: 0 10%;
  margin-top: 100px;
  .container {
    border: 1px solid #E5E5E5;
    border-radius: 10px;
    // min-height: 400px;
    padding-top: 50px;
    .profile-img {
      background: white;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);

      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid #ccc;
    }

    .team-img {
      width: 30px;
      height: auto;
    }

    .row {
      margin-top: 15px;
      margin-bottom: 15px;
    }
  }

  .btn {
    width: 100%;
    border: 1px solid #E5E5E5;
    border-radius: 10px;
  }
  
}
</style>