<template>
  <div class="page">
    <div class="left-panel">
      <div class="left-overlay"></div>
      <div class="left-brand">
        <img :src="logo" alt="logo" />
        <span class="left-brand-text">Quiniela <span>NFL</span></span>
      </div>
      <img class="player-img" :src="player" alt="NFL Player" />
      <div class="left-tagline">
        <h1>Tu quiniela,<br /><span>tus reglas.</span></h1>
        <p>Compite con tus amigos semana a semana 🏈</p>
      </div>
    </div>

    <div class="right-panel">
      <div class="panel-header">
        <div class="mobile-brand">
          <img :src="logo" alt="logo" />
          <span class="mobile-brand-text">Quiniela <span>NFL</span></span>
        </div>
        <button class="guest-btn" @click="router.push('marcador')">
          Entrar como invitado <span>→</span>
        </button>
      </div>

      <div class="form-area">
        <Profile v-if="page === 'profile'" @changeBetweenPages="changeBetweenPages" />
        <Register v-else-if="page === 'register'" @changeBetweenPages="changeBetweenPages" />
        <Login v-else @changeBetweenPages="changeBetweenPages" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Register from '../components/home/Register.vue'
import Login from '../components/home/Login.vue'
import Profile from '../components/home/Profile.vue'
import { useUserStore } from '../stores/UserStore'

const router = useRouter()
const userStore = useUserStore()

const page = ref(userStore.name ? 'profile' : 'login')

const player = new URL(
  `../assets/home_players/player_${Math.floor(Math.random() * 5)}.png`,
  import.meta.url
).href

const logo = new URL('../assets/logo.png', import.meta.url).href

function changeBetweenPages() {
  page.value = page.value === 'register' ? 'login' : 'register'
}
</script>

<style lang="scss">
.page {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* ── LEFT PANEL ── */
.left-panel {
  flex: 1;
  position: relative;
  background-color: var(--green-dark);
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 79px, oklch(22% 0.07 145) 79px, oklch(22% 0.07 145) 80px),
    repeating-linear-gradient(90deg, transparent, transparent 79px, oklch(22% 0.07 145) 79px, oklch(22% 0.07 145) 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
}

.left-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    oklch(18% 0.06 145 / 0.2) 0%,
    oklch(18% 0.06 145 / 0) 40%,
    oklch(18% 0.06 145 / 0.6) 100%
  );
  z-index: 1;
}

.left-brand {
  position: absolute;
  top: 32px;
  left: 32px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
}

.left-brand-text {
  font-size: 1.4rem;
  font-weight: 900;
  color: white;
  letter-spacing: -0.5px;

  span { color: var(--gold); }
}

.left-tagline {
  position: absolute;
  bottom: 40px;
  left: 32px;
  right: 32px;
  z-index: 3;
  color: white;

  h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    line-height: 1;
    letter-spacing: 1px;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
    color: white;

    span { color: var(--gold); }
  }

  p {
    margin-top: 8px;
    font-size: 1rem;
    font-weight: 600;
    color: oklch(85% 0.06 145);
  }
}

.player-img {
  position: relative;
  z-index: 2;
  width: 85%;
  max-width: 420px;
  object-fit: contain;
  object-position: bottom;
  filter: drop-shadow(0 8px 32px rgba(0, 0, 0, 0.5));
}

/* ── RIGHT PANEL ── */
.right-panel {
  width: 420px;
  flex-shrink: 0;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 40px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 10;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    background-color: var(--green-dark);
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 79px, oklch(22% 0.07 145) 79px, oklch(22% 0.07 145) 80px),
      repeating-linear-gradient(90deg, transparent, transparent 79px, oklch(22% 0.07 145) 79px, oklch(22% 0.07 145) 80px);
  }
}

.panel-header {
  padding: 20px 24px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1.5px solid oklch(93% 0.01 145);
  flex-shrink: 0;

  @media (max-width: 768px) {
    border-bottom-color: oklch(28% 0.07 145);
    padding: 24px 24px 16px;
    justify-content: space-between;

    .mobile-brand { display: flex !important; }
  }
}

.mobile-brand {
  display: none;
  align-items: center;
  gap: 10px;

  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
}

.mobile-brand-text {
  font-size: 1.1rem;
  font-weight: 800;
  color: white;

  span { color: var(--gold); }
}

.guest-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 20px;
  border: 1.5px solid oklch(88% 0.02 145);
  background: transparent;
  color: var(--text-mid);
  font-family: 'Nunito', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;

  &:hover {
    border-color: var(--green-accent);
    color: var(--green-accent);
    background: oklch(96% 0.03 145);
  }

  @media (max-width: 768px) {
    border-color: oklch(35% 0.08 145);
    color: oklch(70% 0.06 145);

    &:hover {
      border-color: var(--green-accent);
      color: var(--green-accent);
      background: oklch(24% 0.07 145);
    }
  }
}

.form-area {
  flex: 1;
  padding: 32px 32px 24px;
  display: flex;
  flex-direction: column;
}
</style>
