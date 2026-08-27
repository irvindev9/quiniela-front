<template>
  <nav class="app-nav">
    <a class="nav-brand" href="#" @click.prevent="router.push('/')">
      <img :src="logo" alt="logo" />
      <span class="nav-brand-text">Quiniela <span>NFL</span></span>
    </a>

    <ul class="app-nav-links">
      <li v-if="userStore.isAuthenticated && userStore.role_id == 1">
        <a href="#" :class="{ active: route.name === 'Admin' }" @click.prevent="router.push('/admin')">Panel Admin</a>
      </li>
      <li>
        <a href="#" :class="{ active: route.name === 'Marcador' }" @click.prevent="router.push('/marcador')">Marcador</a>
      </li>
      <li>
        <a href="#" :class="{ active: route.name === 'Quinielas' }" @click.prevent="router.push('/quinielas')">Todas las quinielas</a>
      </li>
      <li v-if="userStore.isAuthenticated">
        <a href="#" :class="{ active: route.name === 'MiQuiniela' }" @click.prevent="router.push('/mi-quiniela')">Mi quiniela</a>
      </li>
    </ul>

    <div v-if="userStore.isAuthenticated" class="nav-user-wrap" v-click-outside="() => showDropdown = false">
      <div class="nav-user" @click="showDropdown = !showDropdown">
        <div class="nav-avatar">{{ userInitial }}</div>
        <span class="nav-user-name">{{ userStore.name }}</span>
      </div>
      <div v-if="showDropdown" class="nav-dropdown">
        <a
          v-if="userStore.isAuthenticated && userStore.role_id == 1"
          href="#"
          class="mobile-only-link"
          :class="{ active: route.name === 'Admin' }"
          @click.prevent="router.push('/admin'); showDropdown = false"
        >
          Panel Admin
        </a>
        <a
          href="#"
          class="mobile-only-link"
          :class="{ active: route.name === 'Marcador' }"
          @click.prevent="router.push('/marcador'); showDropdown = false"
        >
          Marcador
        </a>
        <a
          href="#"
          class="mobile-only-link"
          :class="{ active: route.name === 'Quinielas' }"
          @click.prevent="router.push('/quinielas'); showDropdown = false"
        >
          Todas las quinielas
        </a>
        <a
          v-if="userStore.isAuthenticated"
          href="#"
          class="mobile-only-link"
          :class="{ active: route.name === 'MiQuiniela' }"
          @click.prevent="router.push('/mi-quiniela'); showDropdown = false"
        >
          Mi quiniela
        </a>
        <div class="dropdown-divider mobile-only-link"></div>
        <a href="#" :class="{ active: route.name === 'Home' }" @click.prevent="router.push('/'); showDropdown = false">Perfil</a>
        <a href="#" @click.prevent="doLogout">Cerrar sesión</a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/UserStore'
import { logout as logoutCookies } from '../api/sessionRequests'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const showDropdown = ref(false)
const logo = new URL('../assets/logo.png', import.meta.url).href
const userInitial = computed(() => {
  const name = userStore.name as unknown as string
  return name?.charAt(0)?.toUpperCase() ?? ''
})

const clickOutsideHandlers = new WeakMap<HTMLElement, (e: MouseEvent) => void>()

const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    const handler = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) binding.value()
    }
    clickOutsideHandlers.set(el, handler)
    document.addEventListener('click', handler)
  },
  unmounted(el: HTMLElement) {
    const handler = clickOutsideHandlers.get(el)
    if (handler) document.removeEventListener('click', handler)
  }
}

function doLogout() {
  showDropdown.value = false
  userStore.logout()
  logoutCookies()
  router.push('/')
}
</script>

<style lang="scss">
.app-nav {
  background: oklch(14% 0.05 145);
  border-bottom: 2px solid oklch(24% 0.08 145);
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--white);
  flex-shrink: 0;

  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
}

.nav-brand-text {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--white);
  letter-spacing: -0.3px;

  span { color: var(--gold); }
}

.app-nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;

  a {
    color: oklch(75% 0.04 145);
    text-decoration: none;
    font-size: 0.88rem;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 8px;
    transition: all 0.15s;
    display: block;

    &:hover { color: var(--white); background: oklch(22% 0.07 145); }
    &.active { color: var(--gold); }
  }

  @media (max-width: 768px) { display: none; }
}

.nav-user-wrap {
  position: relative;
  flex-shrink: 0;
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--white);
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  background: oklch(22% 0.07 145);
  transition: background 0.15s;

  &:hover { background: oklch(26% 0.08 145); }
}

.nav-user-name {
  @media (max-width: 768px) { display: none; }
}

.nav-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--green-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 900;
  color: white;
  flex-shrink: 0;
}

.nav-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background: oklch(14% 0.05 145);
  border: 1px solid oklch(24% 0.08 145);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  min-width: 170px;

  a {
    display: block;
    padding: 10px 16px;
    font-size: 0.85rem;
    font-weight: 600;
    color: oklch(75% 0.04 145);
    text-decoration: none;
    transition: all 0.12s;
    white-space: nowrap;

    &:hover { background: oklch(22% 0.07 145); color: var(--white); }
    &.active { color: var(--gold); }
  }

  .dropdown-divider {
    height: 1px;
    background: oklch(24% 0.08 145);
    margin: 4px 0;
  }
}

.mobile-only-link {
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
}
</style>
