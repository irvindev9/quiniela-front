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
      <button class="btn btn-primary btn-block" @click="login">Ingresar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const whatsNumber = ref('');
const password = ref('');

async function login() {
  await axios.post('/login', {
    whatsNumber: whatsNumber.value,
    password: password.value
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  });
}
</script>


<style lang="scss">
.login-form {
  .form-group {
    margin-top: 10px;
  }
}
</style>