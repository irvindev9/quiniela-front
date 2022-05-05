<template>
  <div class="app px-0 mx-0" :style="{'background-image': `url('` + background + `')`}">
    <Header v-if="route.name !== 'Home'" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Cookies from 'js-cookie';
import iziToast from "izitoast";
import { useRoute } from 'vue-router'
import { useUserStore } from './stores/UserStore'
import { ref, onBeforeMount } from 'vue';
import { getBackgroundsImages } from './api/quinielaRequests';
import { checkNotifications } from './utils/notifications';

const route = useRoute()
const background = ref(Cookies.get('background'))

if (!Cookies.get('cookies-advice')){
  iziToast.info({
      title: 'Aviso!',
      message: 'Esta web utiliza cookies para mejorar la experiencia de usuario',
      timeout: false,
      buttons: [
        ['<button>Ok</button>', function (instance, toast) {
            Cookies.set('cookies-advice', 'true', { expires: 365 });
             instance.hide({
                transitionOut: 'fadeOutUp',
            }, toast);
        }, true]
      ]
  })
}

onBeforeMount(async () => {
  if (Cookies.get('user-info') && Cookies.get('sanctum-session')) {
    const userStore = useUserStore()
    const data = JSON.parse(Cookies.get('user-info')!)
    userStore.updateUserInfo(data, Cookies.get('sanctum-session'))
  }

  if(Cookies.get('background')) {
    background.value = Cookies.get('background')
  }else{
    background.value = new URL("./assets/background.jpg", import.meta.url).href;
    await getBackgroundsImages()
  }

  await checkNotifications();
})
</script>

<style>
.app_background {
  background-image: url("./assets/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  overflow-y: auto;
}
.app {
  /* background-image: url("./assets/background.jpg"); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  overflow-y: auto;
}
</style>
