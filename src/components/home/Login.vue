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
import { ref } from 'vue';
import { loginUser } from '../../api/sessionRequests';

const whatsNumber = ref('6565340038');
const password = ref('abc123');
const isLoading = ref(false);


async function login() {
  isLoading.value = true;

  await loginUser(whatsNumber.value, password.value);

  isLoading.value = false;
}

</script>


<style lang="scss">
.login-form {
  .form-group {
    margin-top: 10px;
  }
}
</style>