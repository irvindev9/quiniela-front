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
        <label for="password">Confirmar contraseña</label>
        <input type="password" class="form-control" id="password" placeholder="Contraseña" v-model="password_confirm"/>
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
      <button class="btn btn-primary btn-block" @click="register">Registrarse</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

axios.defaults.withCredentials = true;

const whatsNumber = ref('');
const password = ref('');
const password_confirm = ref('');
const name = ref('');

async function register() {
  await axios.post(process.env.URL + 'register', {
      email: whatsNumber.value,
      password: password.value,
      password_confirmation: password_confirm.value,
      name: name.value
    }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  });
}
</script>

<style lang="scss">
.register-form {
  .form-group {
    margin-top: 10px;
  }
}
</style>