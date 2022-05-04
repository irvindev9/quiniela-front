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
        <select class="form-control" id="team" v-model="favorite_team">
            <option v-for="team in team_options" :key="team.id" :value="team.id">{{team.name}}</option>
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
import { ref } from 'vue';
import { registerUser } from '../../api/sessionRequests';
import { teams } from '../../utils/teams';

const whatsNumber = ref('');
const password = ref('');
const password_confirm = ref('');
const name = ref('');
const isLoading = ref(false);
const team_options = ref(teams());
const favorite_team = ref(1);

async function register() {
  isLoading.value = true;

  await registerUser({
    email: whatsNumber.value,
    password: password.value,
    password_confirmation: password_confirm.value,
    name: name.value, 
    favorite_team: favorite_team.value
  });

  isLoading.value = false;
}

</script>

<style lang="scss">
.register-form {
  .form-group {
    margin-top: 10px;
  }
}
</style>