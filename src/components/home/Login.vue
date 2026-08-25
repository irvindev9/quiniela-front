<template>
  <div class="login-form">
    <div class="form-title">¡Bienvenido!</div>
    <div class="form-subtitle">Ingresa tu número y contraseña para continuar</div>

    <div class="field">
      <label>Número de WhatsApp</label>
      <input
        type="tel"
        placeholder="Ej. 6641234567"
        v-model="whatsNumber"
        :class="{ error: errors.whatsNumber }"
        @blur="v$.whatsNumber.$touch()"
      />
      <span v-if="errors.whatsNumber" class="field-error">{{ errors.whatsNumber }}</span>
    </div>

    <div class="field">
      <label>Contraseña</label>
      <div class="input-wrap">
        <input
          :type="showPassword ? 'text' : 'password'"
          placeholder="Tu contraseña"
          v-model="password"
          :class="{ error: errors.password }"
          @blur="v$.password.$touch()"
        />
        <button class="toggle-pw" type="button" @click="showPassword = !showPassword">
          {{ showPassword ? '🙈' : '👁️' }}
        </button>
      </div>
      <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
    </div>

    <div class="form-actions">
      <button class="btn-secondary" @click="$emit('changeBetweenPages')">Registrarse</button>
      <button class="btn-primary" @click="login" :disabled="isLoading">
        <div v-if="isLoading" class="spinner-sm"></div>
        {{ isLoading ? 'Ingresando...' : 'Ingresar' }}
      </button>
    </div>

    <div class="switch-text">
      ¿No tienes cuenta?
      <button @click="$emit('changeBetweenPages')">Regístrate aquí</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { loginUser } from '../../api/sessionRequests'
import useVuelidate from '@vuelidate/core'
import { required, numeric, minLength } from '@vuelidate/validators'

defineEmits(['changeBetweenPages'])

const whatsNumber = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

const rules = {
  whatsNumber: { required, numeric, minLengthValue: minLength(10) },
  password: { required, minLengthValue: minLength(6) }
}

const v$ = useVuelidate(rules, { whatsNumber, password })

const errors = computed(() => ({
  whatsNumber: v$.value.whatsNumber.$error ? 'Ingresa un número válido (mín. 10 dígitos)' : null,
  password: v$.value.password.$error ? 'La contraseña debe tener al menos 6 caracteres' : null
}))

async function login() {
  v$.value.$touch()
  if (v$.value.$invalid) return

  isLoading.value = true
  await loginUser(whatsNumber.value, password.value)
  isLoading.value = false
}
</script>

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-title {
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--text-dark);
  margin-bottom: 4px;

  @media (max-width: 768px) { color: white; }
}

.form-subtitle {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 28px;

  @media (max-width: 768px) { color: oklch(60% 0.07 145); }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;

  label {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--text-mid);

    @media (max-width: 768px) { color: oklch(70% 0.06 145); }
  }

  input,
  select {
    padding: 11px 14px;
    border-radius: 10px;
    border: 1.5px solid oklch(88% 0.02 145);
    font-family: 'Nunito', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-dark);
    background: white;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    width: 100%;

    &:focus {
      border-color: var(--green-accent);
      box-shadow: 0 0 0 3px oklch(52% 0.2 145 / 0.12);
    }

    &.error {
      border-color: var(--danger);

      &:focus { box-shadow: 0 0 0 3px oklch(62% 0.22 25 / 0.12); }
    }

    @media (max-width: 768px) {
      background: oklch(22% 0.07 145);
      border-color: oklch(32% 0.08 145);
      color: white;

      &::placeholder { color: oklch(50% 0.05 145); }
      &:focus { border-color: var(--green-accent); background: oklch(24% 0.08 145); }
    }
  }
}

.field-error {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--danger);
}

.input-wrap {
  position: relative;

  input { padding-right: 42px; }
}

.toggle-pw {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-light);
  font-size: 1rem;
  padding: 0;
  line-height: 1;

  &:hover { color: var(--green-accent); }
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}

.btn-secondary {
  padding: 10px 18px;
  border-radius: 10px;
  border: 1.5px solid oklch(88% 0.02 145);
  background: transparent;
  color: var(--text-mid);
  font-family: 'Nunito', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;

  &:hover { border-color: var(--green-accent); color: var(--green-accent); }

  @media (max-width: 768px) {
    color: oklch(70% 0.06 145);
    border-color: oklch(35% 0.08 145);

    &:hover { color: var(--green-light); border-color: var(--green-light); background: transparent; }
  }
}

.btn-primary {
  padding: 10px 28px;
  border-radius: 10px;
  border: none;
  background: var(--green-accent);
  color: white;
  font-family: 'Nunito', sans-serif;
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 12px oklch(52% 0.2 145 / 0.35);

  &:hover { background: var(--green-light); transform: translateY(-1px); box-shadow: 0 4px 16px oklch(52% 0.2 145 / 0.45); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
}

.spinner-sm {
  width: 16px;
  height: 16px;
  border: 2.5px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.switch-text {
  text-align: center;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-light);
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid oklch(93% 0.01 145);

  button {
    background: none;
    border: none;
    color: var(--green-accent);
    font-weight: 800;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    font-size: 0.82rem;

    &:hover { text-decoration: underline; }
  }

  @media (max-width: 768px) {
    color: oklch(60% 0.07 145);
    border-top-color: oklch(28% 0.07 145);
  }
}
</style>
