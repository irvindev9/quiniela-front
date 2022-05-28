import { defineStore } from "pinia";

export const useAdminStore = defineStore('admin', {
  state: () =>  {
    return {
      currentSeason: "Temporada 2022",
    }
  }, 
  actions: {
    updateSeason(season: any){
      this.currentSeason = season;
    }
  }
})