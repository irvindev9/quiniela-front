<template>
  <header class="guest-arrow text-end p-3">
    <button class="btn btn-outline-secondary btn-sm" @click="redirect('marcador')">
        <span v-if="!userStore.isAuthenticated">Entrar como invitado</span>
        <span v-else>Entrar</span>
        &nbsp;
        <i class="bi bi-arrow-right-circle mt-2"></i>
    </button>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/UserStore';

const router = useRouter()
const userStore = useUserStore()

function redirect(to: string) {
  router.push(to)
}
</script>
