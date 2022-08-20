<template>
  <div class="matches">
    <div class="row mt-3">
      <div class="col-12 col-md-5 col-lg-4">
        <select v-model="team_id" class="form-control form-control-sm">
            <option v-for="team in teams_options" :key="team.id" :value="team.id">{{team.name}}</option>
        </select>
      </div>
      <div class="col-12 col-md-2 col-lg-1 text-center">
          VS
      </div>
      <div class="col-12 col-md-5 col-lg-4">
        <select v-model="team_id_2" class="form-control form-control-sm">
            <option v-for="team in teams_options" :key="team.id" :value="team.id">{{team.name}}</option>
        </select>
      </div>
      <div class="col-12 col-md-2 col-lg-2">
          <button class="btn btn-outline-primary btn-sm" @click="add">
              <i class="bi bi-save"></i> 
              Agregar
          </button>
      </div>
  </div>
  <div class="row mt-3">
      <table class="table table-hover">
          <tr>
              <th class="text-start">Visita</th>
              <th class="text-start">Local</th>
              <th>Acciones</th>
          </tr>
          <tbody>
              <tr v-for="match in matches" :key="match.id">
                  <td class="text-start">
                      <img width="35" height="35" :src="get_img(match.team_1?.logo)" alt="team-visita" v-if="match.team_1?.logo"> <span>{{match.team_1?.name}}</span>
                      <p class="text-start">
                          <span class="badge rounded-pill bg-light" :class="{'bg-warning': (match.winner_id === match.team_id)}" @click="update(match.id, match.team_id)">
                              <i class="bi bi-trophy"></i> 
                              Ganador
                          </span>
                      </p>
                  </td>
                  <td class="text-start">
                      <img width="35" height="35" :src="get_img(match.team_2?.logo)" alt="team-local" v-if="match.team_2?.logo"> <span>{{match.team_2?.name}}</span>
                      <p class="text-start">
                          <span class="badge rounded-pill bg-light" :class="{'bg-warning': (match.winner_id === match.team_id_2)}" @click="update(match.id, match.team_id_2)">
                              <i class="bi bi-trophy"></i> 
                              Ganador
                          </span>
                      </p>
                  </td>
                  <td>
                      <span class="badge rounded-pill bg-danger" @click="deleteM(match.id)">
                          <i class="bi bi-trash"></i> 
                          Eliminar
                      </span>
                      <br>
                      <span class="badge rounded-pill bg-light" :class="{'bg-warning': (match.winner_id === null)}" @click="update(match.id, null)">
                          <i class="bi bi-chevron-bar-contract"></i>
                          Empate
                      </span>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { addMatch, updateMatch, deleteMatch } from '../../../api/adminRequests';
import { teams } from '../../../utils/teams';
import { toast } from '../../../utils/toast';
import { Matches } from '../../../models/Quinielas';

const props = defineProps<
  {
    id: Number, 
    matches: Matches | undefined,
  }
>();

const emit = defineEmits(['refresh']);

const team_id = ref(1);
const team_id_2 = ref(1);
const teams_options = ref(teams());

async function add(){
    if (team_id.value == team_id_2.value) {
				toast('No puedes agregar una partida entre el mismo equipo', {type: 'warning'});
        return;
    }

    const res = await addMatch(props.id, team_id.value, team_id_2.value);

    team_id.value = 1;
    team_id_2.value = 1;

    await get();
}

async function get(){
    await emit('refresh', true);
}

async function deleteM(id: Number){
    const res = await deleteMatch(id);

    await get();
}

async function update(id_match: Number, winner_id: Number | null){
    await updateMatch(id_match, {
        winner_id: winner_id
    });

    await get();
}

function get_img(logo: string) {
    return new URL(`../../../assets/teams/${logo}`, import.meta.url).href;
}

</script>

<style lang="scss">
.matches {
  span.badge {
    cursor: pointer;
  }

	.badge.bg-light {
		color: grey;
	}
  
	.bg-warning {
		color: black !important;
		background-color: #ffc107 !important;
	}
}
</style>