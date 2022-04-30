<template>
  <div class="container results-container">
    <div class="row bg-white rounded my-2">
      <div class="col-12 col-md-6 col-lg-10">
        <h5 class="py-2">Resultados</h5>
      </div>
      <div class="col-12 col-md-6 col-lg-2 py-2">
        <select class="form-select form-select-sm" v-model="orderBy">
          <option value="1">Ordenar por</option>
          <option value="2">Nombre</option>
          <option value="3">Puntuación</option>
        </select>
      </div>
    </div>
    <div class="row table-responsive bg-white rounded shadow-sm">
      <table class="col-12 table table-borderless mb-0">
        <thead>
          <tr>
            <th></th>
            <th class="vs-teams" v-for="match in matches" :key="match.id" nowrap>
              <img :src="get_img(match.team_1.logo)" alt="team">
              <span>vs</span>
              <img :src="get_img(match.team_2.logo)" alt="team">
            </th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in displayResults" :key="user.id">
            <td nowrap class="d-flex player">
              <div class="player-img">
                <img src="https://picsum.photos/200" alt="img">
              </div>
              <small>
                {{user.name}}
              </small>
            </td>
            <td class="user-results" v-for="match in matches" :key="match.id">
              <span class="badge" :class="{'bg-success' : (match.winner_id == get_results_of_match(user.results, match.id))}">
                <img :src="get_img_of_winner(user.results, match.id)" alt="team" v-if="get_img_of_winner(user.results, match.id) !== ''">
                <i class="bi bi-question text-dark" v-else></i>
              </span>
            </td>
            <td class="text-center">
              <span class="badge bg-light text-dark">
                {{user.points}}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row bg-white rounded my-2 footer">
      <div class="col-12 col-md-6 col-lg-10 py-2">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-start my-0">
            <li class="page-item disabled">
              <a class="page-link">Semana</a>
            </li>
            <li v-for="li in weeks" :key="li.id" class="page-item">
              <a class="page-link" href="#" @click="changeWeek(li.id)">
                {{ li.name.replace('Semana ', '') }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { getWeeks } from '../api/quinielaRequests';
import { getResults, getMatchs } from '../api/resultsRequests';

const isLoading = ref(false)
const weeks = ref([])
const current_week = ref(0)
const orderBy = ref(1)
const results = ref([])
const matches = ref([])

const displayResults = computed(() => {
  if(results.value.length > 0) {
    return results.value.sort((a, b) => {
      if(orderBy.value == 1) {
        // order by id
        return a.id - b.id;
      }else if(orderBy.value == 2) {
        // order by name
        return a.name.localeCompare(b.name);
      }else if(orderBy.value == 3) {
        // order by points
        return b.points - a.points;
      }
    })
  }else{
    return []
  }
})

async function getW(){
  isLoading.value = true
  weeks.value = await getWeeks();
  weeks.value = weeks.value.sort((a, b) => (a.name > b.name) ? 1 : -1);
  isLoading.value = false
}

async function getM(){
  isLoading.value = true
  matches.value = await getMatchs(current_week.value);
  isLoading.value = false
}

function result_of_match(match_id: number){
  let result = matches.value.find((match: any) => match.id == match_id)?.winner_id

  return result;
}

async function changeWeek(id: number) {
  current_week.value = id;
  await getM();
  results.value = await getResults(current_week.value);
}

function get_img(logo: string) {
    return new URL(`../assets/teams/${logo}`, import.meta.url).href;
}

function get_img_of_winner(player_results:any, match_id: number) {
  const match = matches.value.find((match: any) => match.id == match_id);
  const player_team_id = player_results.find((player: any) => player.match_id == match_id)?.team_id;

  const winner = (match.winner_id == match.team_1.id) ? match.team_1.logo : match.team_2.logo;

  return player_team_id ? new URL(`../assets/teams/${winner}`, import.meta.url).href : '';
}

function get_results_of_match(results_of_player: any, match_id: number) {
  let result = results_of_player.find((result: any) => result.match_id == match_id)

  return result ? result.team_id : 0;
}

onMounted(async () => {
    await getW();
    
    current_week.value = weeks.value[weeks.value.length - 1].id;

    await getM();

    results.value = await getResults(current_week.value);

    result_of_match(30);
});
</script>

<style lang="scss">
.results-container {
  .table-responsive {
    max-height: 395px;
    overflow: auto;
    
    thead tr th {
      position: sticky;
      top: 0;
      background-color: #F3F3F3;
      z-index: 1;
    }

    table {
      border-collapse: collapse;
    }
  }

  .table {
    .vs-teams {
      img {
        width: 20px;
        height: 20px;
      }
      span {
        margin-left: 2px;
        margin-right: 2px;
      }
    }
    .user-results {
      margin: auto;
      text-align: center;
      .badge {
        margin: auto;
        border-radius: 50px;
        border-width: 0;

        img {
          width: 15px;
          height: 15px;
        }
      }

      .badge.bg-success {
        background-color: #f8ff00 !important;
      }
    }

    .player {
      display: flex;
      align-items: center;

      .player-img {
        text-align: start;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        border: 1px solid rgba(180, 180, 180, 0.5);

        img {
          width: 25px;
          height: 25px;
          object-fit: cover;

        }
      }

      small {
        margin-left: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 80px;
        font-size: 12px;
      }
    }

    thead {
      tr {
        th {
          padding: 0.2rem 0.5rem;
          border-bottom: 2px solid #F3F3F3;
          text-align: center;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 0.2rem 0.5rem;
          border-bottom: 1px solid #F3F3F3;
          text-align: center;
        }
      }
    }

    tbody {
      tr:hover {
        td {
          background: #F8F9FA;
        }
      }
    }
  }

  .row.footer {
    overflow: auto;
  }
}
</style>