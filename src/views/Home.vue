<template>
    <div class="home-login-register">
        <div class="smoke-screen"></div>
        <div class="login-register-container shadow">
            <HeaderRegister />
            <div class="login-register-content">
                <Register v-if="page == 'register'" @changeBetweenPages="changeBetweenPages" />
                <Login v-if="page == 'login'" @changeBetweenPages="changeBetweenPages" />
            </div>  
            <div class="profile-content">
                <Profile v-if="page == 'profile'" @changeBetweenPages="changeBetweenPages" />
            </div>
        </div>
        <div class="title-container d-flex align-items-center justify-content-center">
            <div class="circle-container">
                <img :src="player" alt="img">
                <h1>Quiniela Luis López</h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Register from '../components/home/Register.vue';
import Login from '../components/home/Login.vue';
import Profile from '../components/home/Profile.vue';
import HeaderRegister from '../components/home/HeaderRegister.vue';
import { useUserStore } from '../stores/UserStore';

const player = ref('');
const page = ref('login');
const userStore = useUserStore();

if(userStore.name) {
    page.value = 'profile';
}

player.value = new URL(`../assets/home_players/player_${Math.floor(Math.random() * (5 - 0))}.png`, import.meta.url).href;

function changeBetweenPages() {
    page.value = (page.value === 'register') ? 'login' : 'register';
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');

$sm: 576px;
$md: 768px;
$lg: 992px;
$xl: 1200px;

.home-login-register {
    position: relative;
    .smoke-screen {
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .login-register-container {
        position: absolute;
        top: 5%;
        right: 5%;
        height: 100vh;
        background: white;
        width: 90%;
        
        @media (min-width: $md) {
            top: 0;
            right: 0;
            width: 60%;
        }

        @media (min-width: $lg) {
            width: 35%;
        }

        @media (min-width: $xl) {
            width: 25%;
        }

        .guest-arrow {
            a {
                color: #000;
                text-decoration: none; 
                margin-right: 3px;
                cursor: pointer;
            }

            i {
                cursor: pointer;
            }
        }
    }

    .title-container {
        font-family: 'Shadows Into Light', sans-serif;
        text-shadow: 1px 1px 2px black;
        font-size: 55px;
        font-weight: bold;
        color: white;
        position: absolute;
        align-items: center;
        display: flex;
        left: 0;
        width: 0%;
        height: 100vh;
        text-align: center;

        img {
            width: 200px;
        }

        h1 {
            margin-top: -65px;
        }

        img, h1 {
            display: none; 
        }

        i {
            font-size: 50px;
            color: #FFF;
        }
        
        @media (min-width: $md) {
            width: 40%;

            img {
                display: inline;
            }

            h1 {
                display: block;
            }
        }

        @media (min-width: $lg) {
            width: 65%;
        }

        @media (min-width: $xl) {
            width: 75%;
        }
    }
}
</style>