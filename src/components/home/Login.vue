<template>
  <div class="login-form p-5">
    <div class="form-group title">
      <h3 class="text-center">Inicio de sesión</h3>
    </div>
    <div class="form-group">
        <label for="whats">Número de WhatsApp</label>
        <input v-model="whatsNumber" :class="{'is-invalid': (v$.whatsNumber.$invalid && whatsNumber.length > 0 && v$.whatsNumber.$error)}" class="form-control" id="whats" placeholder="Número de WhatsApp" @blur="v$.whatsNumber.$touch"/>
        <small class="invalid-feedback">Ingresa un valor valido</small>
    </div>
    <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" v-model="password" :class="{'is-invalid': (v$.password.$invalid && password.length > 0 && v$.password.$error)}" class="form-control" id="password" placeholder="Contraseña"  @blur="v$.password.$touch"/>
        <small class="invalid-feedback">Ingresa un valor valido</small>
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
import useVuelidate from '@vuelidate/core'
import { required, numeric, minLength } from '@vuelidate/validators'

const whatsNumber = ref('');
const password = ref('');
const isLoading = ref(false);

const rules = {
  whatsNumber: {
    required,
    numeric,
    minLengthValue: minLength(10)
    
  },
  password: {
    required,
    minLengthValue: minLength(6)
  }
}

const v$ = useVuelidate(rules, {
  whatsNumber,
  password
})


async function login() {
  isLoading.value = true;

  console.log(v$.value.$touch());

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