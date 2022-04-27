<template>
    <div>
        <div class="match match-1" v-if="match.id !== 0">
            <div class="match-team border shadow-sm" :class="{'border-primary bg-light': (match.team_1.id == match.result_by_user?.team_id)}" @click="selectTeam(match.team_id)">
                <img width="25" height="25" :src="get_img(match.team_1.logo)" alt="team1"> 
                {{match.team_1.name}}
            </div>
            <div class="vs-title d-flex align-items-center">VS</div>
            <div class="match-team border shadow-sm" :class="{'border-primary bg-light': (match.team_2.id == match.result_by_user?.team_id)}" @click="selectTeam(match.team_id_2)">
                <img width="25" height="25" :src="get_img(match.team_2.logo)" alt="team2"> 
                {{match.team_2.name}}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    match: {
        type: Object,
        required: true,
        default: () => ({
            id: 0,
            team_1: {
                id: 0,
                name: '',
                logo: null
            },
            team_2: {
                id: 0,
                name: '',
                logo: null
            },
            result_by_user: null,
            winner_id: 0
        })
    },
});

function selectTeam(team: Number){
    if(props.match.result_by_user?.team_id != null){
        props.match.result_by_user.team_id = team;
    }else{
        props.match.result_by_user = {
            team_id: team
        }
    }
}

function get_img(logo: string) {
    return new URL(`../../assets/teams/${logo}`, import.meta.url).href;
}
</script>

<style lang="scss">
.match {
    display: flex;
    justify-content: space-between;
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