<template>
    <div>
        <div class="match match-1">
            <div class="match-team border shadow-sm" :class="{'border-primary bg-light': selected1}" @click="selectTeam(1)">
                <img width="25" height="25" :src="logo1" alt="team1"> 
                {{match.team1.name}}
            </div>
            <div class="vs-title d-flex align-items-center">VS</div>
            <div class="match-team border shadow-sm" :class="{'border-primary bg-light': selected2}" @click="selectTeam(2)">
                <img width="25" height="25" :src="logo2" alt="team2"> 
                {{match.team2.name}}
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
        default: () => ({
            team1: {
                name: 'Miami Dolphins',
                logo: '02',
                selected: false,
            },
            team2: {
                name: 'Buffalo Bills',
                logo: '01',
                selected: true,
            },
        }),
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
    console.log(`Selected team ${team}`)
    props.match.team1.selected = team === 1
    selected1.value = team === 1
    props.match.team2.selected = team === 2
    selected2.value = team === 2
    console.log(props.match)
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