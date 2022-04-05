<template>
    <div class="container bg-white rounded">
        <div class="row">
            <div class="col-12 px-0 mt-1">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link" @click="redirectTo('add-match')" href="#" :class="{active: route === 'add-match'}">Agregar partidos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="redirectTo('participants')" href="#" :class="{active: route === 'participants'}">Participantes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="redirectTo('backgrounds')" href="#" :class="{active: route === 'backgrounds'}">Fondos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="redirectTo('settings')" href="#" :class="{active: route === 'settings'}">Configuración</a>
                    </li>
                </ul>
            </div>
            <div class="col-12 card-header">
                <h5 class="mt-3">Panel de administración</h5>
            </div>
            <div class="col-12 card-body">
                <component :is="section" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddMatch from "../components/admin/AddMatch.vue";
import Participants from "../components/admin/Participants.vue";
import Backgrounds from "../components/admin/Backgrounds.vue";
import Settings from "../components/admin/Settings.vue";

const active: string = 'active bg-light border border-light';

export default defineComponent({
    name: "Admin",
    components: {
        AddMatch, Participants, Backgrounds, Settings
    },
    computed: {
        section(){
            switch(this.$route.query.section){
                case "add-match":
                    return AddMatch;

                case "participants":
                    return Participants;

                case "backgrounds":
                    return Backgrounds;
                
                case "settings":
                    return Settings;

                default:
                    return AddMatch;
            }
        },
        route(){
            return this.$route.query.section || 'add-match';
        }
    },
    methods: {
        redirectTo(to: string){
            this.$router.push({
                query: {
                    section: to
                }
            });
        }
    }
})
</script>