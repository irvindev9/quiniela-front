<template>
  <header class="guest-arrow text-end p-3">
    <button class="btn btn-outline-secondary btn-sm" @click="redirect('marcador')">
        Entrar como invitado
        <i class="bi bi-arrow-right-circle mt-2"></i>
    </button>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function redirect(to: string) {
  router.push(to)
}
</script>
