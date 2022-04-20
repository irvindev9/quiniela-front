<template>
  <div class="login-form p-5">
    <div class="form-group title">
      <h3 class="text-center">Inicio de sesión</h3>
    </div>
    <div class="form-group">
        <label for="whats">Número de WhatsApp</label>
        <input v-model="whatsNumber" class="form-control" id="whats" placeholder="Número de WhatsApp"/>
    </div>
    <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" v-model="password" class="form-control" id="password" placeholder="Contraseña" />
    </div>
    <div class="form-group mt-3 text-end">
      <button class="btn btn-outline-primary btn-block border-light mx-1" @click="$emit('changeBetweenPages')">Registrarse</button>
      <button class="btn btn-primary btn-block" @click="login">
        <div v-if="!isLoading">
          Ingresar
        </div>
        <div v-else>
          <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { getUserInfo } from '../../utils/session';
import iziToast from 'izitoast';


axios.defaults.withCredentials = true;

const whatsNumber = ref('');
const password = ref('');
const isLoading = ref(false);

const router = useRouter();

async function login() {
  isLoading.value = true;
  await axios.post(import.meta.env.VITE_BASE_URL + 'login', {
      email: whatsNumber.value,
      password: password.value
    }).then((response: any) => {
    console.log(response);

    Cookies.set('sanctum-session', response.data.token, { expires: 7 });
    
    Cookies.set('user-info', getUserInfo(response.data.token), { expires: 7 });

    router.push('/marcador');

  }).catch(error => {
    iziToast.error({
      title: 'Error',
      message: error.response.data.message,
    });
  }).finally(() => {
    isLoading.value = false;
  });
}

function redirect(to: string) {
  router.push(to);
}
</script>


<style lang="scss">
.login-form {
  .form-group {
    margin-top: 10px;
  }
}
</style>