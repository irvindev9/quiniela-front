<template>
  <div class="matches">
    <div class="row mt-3">
      <div class="col-12 col-md-5 col-lg-4">
          <input type="text" class="form-control form-control-sm" placeholder="Visita">
      </div>
      <div class="col-12 col-md-2 col-lg-1 text-center">
          VS
      </div>
      <div class="col-12 col-md-5 col-lg-4">
          <input type="text" class="form-control form-control-sm" placeholder="Local">
      </div>
      <div class="col-12 col-md-2 col-lg-2">
          <button class="btn btn-outline-primary btn-sm">
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
              <tr v-for="index in 10" :key="index">
                  <td class="text-start">
                      <img width="35" height="35" src="../../../assets/teams/team_08.png" alt="team-visita"> <span>Miami Dolphins</span>
                      <p class="text-start">
                          <span class="badge rounded-pill bg-warning">
                              <i class="bi bi-trophy"></i> 
                              Ganador
                          </span>
                      </p>
                  </td>
                  <td class="text-start">
                      <img width="35" height="35" src="../../../assets/teams/team_02.png" alt="team-local"> <span>New England Patriots</span>
                      <p class="text-start">
                          <span class="badge rounded-pill bg-warning">
                              <i class="bi bi-trophy"></i> 
                              Ganador
                          </span>
                      </p>
                  </td>
                  <td>
                      <span class="badge rounded-pill bg-danger">
                          <i class="bi bi-trash"></i> 
                          Eliminar
                      </span>
                      <br>
                      <span class="badge rounded-pill bg-secondary">
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
const props = defineProps<
  {
    id: Number
  }
>();



</script>

<style lang="scss">
.matches {
  span.badge {
    cursor: pointer;
  }
}
</style>