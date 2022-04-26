<template>
    <div>
        <div class="match match-1">
            <div class="match-team border shadow-sm" :class="{'border-primary bg-light': (match.team_1.id == match.result_by_user)}" @click="selectTeam(match.team_1.id)">
                <img width="25" height="25" :src="get_img(match.team_1.logo)" alt="team1"> 
                {{match.team_1.name}}
            </div>
            <div class="vs-title d-flex align-items-center">VS</div>
            <div class="match-team border shadow-sm" :class="{'border-primary bg-light': (match.team_2.id == match.result_by_user)}" @click="selectTeam(match.team_2.id )">
                <img width="25" height="25" :src="get_img(match.team_2.logo)" alt="team2"> 
                {{match.team_2.name}}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps({
    match: {
        type: Object,
        required: true,
    },
});


const logo1 = ref()
const logo2 = ref()
const selected1 = ref()
const selected2 = ref()
watchEffect(async () => {
    logo1.value = new URL(`../../assets/teams/team_${props.match.team1.logo}.png`, import.meta.url).href;
    logo2.value = new URL(`../../assets/teams/team_${props.match.team2.logo}.png`, import.meta.url).href;
    selected1.value = props.match.team1.selected
    selected2.value = props.match.team2.selected
})

function selectTeam(team: Number){
    props.match.result_by_user = team
}

function get_img(logo: string) {
    return new URL(`../../assets/teams/${logo}`, import.meta.url).href;
}
</script>

<style lang="scss">
.match {
    display: flex;
    justify-content: space-between;
    // border: 1px solid #eaeaea;
    // border-radius: 5px;
    margin-bottom: 10px;

    .match-team {
        display: flex;
        align-items: center;
        padding: 5px;
        font-size: .8rem;
        font-weight: bold;
        color: #2c3e50;
        width: 45%;
        border-radius: 5px;
        cursor: pointer;
    }

    .match-team.active {
        background: #6c757d;
        color: white;
    }
}
</style>