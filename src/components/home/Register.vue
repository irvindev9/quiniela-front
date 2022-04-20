<template>
  <div class="register-form p-5">
    <div class="form-group title">
      <h3 class="text-center">Registro</h3>
    </div>
    <div class="form-group">
        <label for="whats">Número de WhatsApp</label>
        <input type="text" class="form-control" id="whats" placeholder="Número de WhatsApp" v-model="whatsNumber"/>
    </div>
    <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" class="form-control" id="password" placeholder="Contraseña" v-model="password"/>
    </div>
    <div class="form-group">
        <label for="password_confirm">Confirmar contraseña</label>
        <input type="password" class="form-control" id="password_confirm" placeholder="Contraseña" v-model="password_confirm"/>
    </div>
    <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" class="form-control" id="name" placeholder="Nombre" v-model="name"/>
    </div>
    <div class="form-group">
        <label for="team">Equipo</label>
        <select class="form-control" id="team">
            <option value="0">Selecciona una opción</option>
            <option>Miami Dolphins</option>
            <option>Buffalo Bills</option>
        </select>
    </div>
    <div class="form-group mt-3 text-end">
      <button class="btn btn-outline-primary btn-block border-light mx-1" @click="$emit('changeBetweenPages')">Ya tengo cuenta</button>
      <button class="btn btn-primary btn-block" @click="register">
        <div v-if="!isLoading">
          Registrarse
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
import Cookies from 'js-cookie';
import { getUserInfo } from '../../utils/session';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/UserStore';

const userStore = useUserStore();

axios.defaults.withCredentials = true;

const whatsNumber = ref('');
const password = ref('');
const password_confirm = ref('');
const name = ref('');
const isLoading = ref(false);

const router = useRouter();

async function register() {
  isLoading.value = true;
  await axios.post(import.meta.env.VITE_API_URL + 'register', {
      email: whatsNumber.value,
      password: password.value,
      password_confirmation: password_confirm.value,
      name: name.value
    }).then(async (response) => {
    const { data } = await getUserInfo(response.data.token);

    userStore.updateUserInfo(data, response.data.token);

    Cookies.set('sanctum-session', response.data.token, { expires: 7 , path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });
    
    Cookies.set('user-info', JSON.stringify(data), { expires: 7 , path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });

    router.push('/marcador');
  }).catch(error => {
    console.log(error);
  }).finally(() => {
    isLoading.value = false;
  });
}

function redirect(to: string) {
  router.push(to);
}

</script>

<style lang="scss">
.register-form {
  .form-group {
    margin-top: 10px;
  }
}
</style>