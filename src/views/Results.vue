<template>
  <div class="container results-container">
    <div class="row table-responsive bg-white rounded">
      <table class="col-12 table table-striped table-bordered table-hover mb-0">
        <thead>
          <tr>
            <th></th>
            <th class="vs-teams" v-for="index in 13" :key="index" nowrap>
              <img src="../assets/teams/team_05.png" alt="team">
              <span>vs</span>
              <img src="../assets/teams/team_06.png" alt="team">
            </th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in 10" :key="index">
            <td nowrap>
              <small>Juan Lopez</small>
            </td>
            <td class="user-results" v-for="index in 13" :key="index">
              <span class="badge" :class="{'bg-success' : (index%2 == 0), 'bg-light' : (index%2 == 1)}">
                <img src="../assets/teams/team_06.png" alt="team">
              </span>
            </td>
            <td class="text-center">
              <span class="badge bg-light text-dark">
                6
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
.results-container {
  .table {
    .vs-teams {
      img {
        width: 20px;
        height: 20px;
      }
      span {
        margin-left: 5px;
        margin-right: 5px;
      }
    }
    .user-results {
      margin: auto;
      text-align: center;
      .badge {
        margin: auto;

        img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
}
</style>