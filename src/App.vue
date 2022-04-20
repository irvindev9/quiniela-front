<template>
  <div>
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

const route = useRoute()

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

if (Cookies.get('user-info') && Cookies.get('sanctum-session')) {
  const userStore = useUserStore()
  const data = JSON.parse(Cookies.get('user-info')!)
  userStore.updateUserInfo(data, Cookies.get('sanctum-session'))
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url("./assets/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  overflow-y: scroll;
}
</style>
