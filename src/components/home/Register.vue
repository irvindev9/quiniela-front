<template>
  <div class="register-form">
    <div class="form-title">Crear cuenta</div>
    <div class="form-subtitle">Únete a la quiniela con tus amigos</div>

    <div class="field">
      <label>Número de WhatsApp</label>
      <input
        type="tel"
        placeholder="Ej. 6641234567"
        v-model="whatsNumber"
        :class="{ error: errors.whatsNumber }"
      />
      <span v-if="errors.whatsNumber" class="field-error">{{ errors.whatsNumber }}</span>
    </div>

    <div class="field">
      <label>Nombre</label>
      <input
        type="text"
        placeholder="¿Cómo te llamas?"
        v-model="name"
        :class="{ error: errors.name }"
      />
      <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
    </div>

    <div class="field-row">
      <div class="field">
        <label>Contraseña</label>
        <div class="input-wrap">
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="Contraseña"
            v-model="password"
            :class="{ error: errors.password }"
          />
          <button class="toggle-pw" type="button" @click="showPassword = !showPassword">
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
        </div>
        <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
      </div>
      <div class="field">
        <label>Confirmar contraseña</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          placeholder="Repite"
          v-model="passwordConfirm"
          :class="{ error: errors.passwordConfirm }"
        />
        <span v-if="errors.passwordConfirm" class="field-error">{{ errors.passwordConfirm }}</span>
      </div>
    </div>

    <div class="field">
      <label>Equipo favorito</label>
      <div class="team-grid">
        <div
          v-for="team in teamOptions"
          :key="team.id"
          class="team-opt"
          :class="{ selected: favoriteTeam === team.id }"
          @click="favoriteTeam = team.id"
        >
          <img :src="teamLogo(team.id)" :alt="team.name" />
          <span>{{ shortName(team.name) }}</span>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn-secondary" @click="$emit('changeBetweenPages')">Ya tengo cuenta</button>
      <button class="btn-primary" @click="register" :disabled="isLoading">
        <div v-if="isLoading" class="spinner-sm"></div>
        {{ isLoading ? 'Registrando...' : 'Registrarse' }}
      </button>
    </div>

    <div class="switch-text">
      ¿Ya tienes cuenta?
      <button @click="$emit('changeBetweenPages')">Inicia sesión</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { registerUser } from '../../api/sessionRequests'
import { teams } from '../../utils/teams'

defineEmits(['changeBetweenPages'])

const whatsNumber = ref('')
const password = ref('')
const passwordConfirm = ref('')
const name = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const favoriteTeam = ref(1)
const teamOptions = ref(teams())

const errors = reactive({
  whatsNumber: '' as string,
  name: '' as string,
  password: '' as string,
  passwordConfirm: '' as string
})

function teamLogo(id: number): string {
  return new URL(`../../assets/teams/team_${String(id).padStart(2, '0')}.png`, import.meta.url).href
}

function shortName(fullName: string): string {
  return fullName.split(' ').pop() || fullName
}

function validate(): boolean {
  errors.whatsNumber = /^\d{10,}$/.test(whatsNumber.value) ? '' : 'Ingresa un número válido (mín. 10 dígitos)'
  errors.name = name.value.trim().length >= 2 ? '' : 'Ingresa tu nombre'
  errors.password = password.value.length >= 6 ? '' : 'Mínimo 6 caracteres'
  errors.passwordConfirm = password.value === passwordConfirm.value ? '' : 'Las contraseñas no coinciden'

  return !errors.whatsNumber && !errors.name && !errors.password && !errors.passwordConfirm
}

async function register() {
  if (!validate()) return

  isLoading.value = true
  await registerUser({
    email: whatsNumber.value,
    password: password.value,
    password_confirmation: passwordConfirm.value,
    name: name.value,
    favorite_team: favoriteTeam.value
  })
  isLoading.value = false
}
</script>

<style lang="scss">
.register-form {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

/* ── TEAM GRID ── */
.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-top: 4px;
  max-height: 260px;
  overflow-y: auto;
  padding-right: 4px;
}

.team-opt {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 6px 2px;
  border-radius: 8px;
  border: 2px solid oklch(90% 0.01 145);
  cursor: pointer;
  transition: all 0.13s;
  background: white;

  &:hover {
    border-color: var(--green-accent);
    background: oklch(96% 0.03 145);
  }

  &.selected {
    border-color: var(--green-accent);
    background: oklch(95% 0.05 145);

    span { color: var(--green-accent); }
  }

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  span {
    font-size: 0.55rem;
    font-weight: 700;
    color: var(--text-mid);
    text-align: center;
    line-height: 1.1;
  }

  @media (max-width: 768px) {
    background: oklch(22% 0.07 145);
    border-color: oklch(32% 0.08 145);

    &:hover { background: oklch(26% 0.08 145); }
    &.selected { background: oklch(26% 0.09 145); }

    span { color: oklch(65% 0.06 145); }
  }
}
</style>
