import { defineStore } from "pinia";

const currentYear = new Date().getFullYear();

export const useAdminStore = defineStore('admin', {
  state: () =>  {
    return {
      currentSeason: `Temporada ${currentYear} - ${currentYear + 1}`,
    }
  }, 
  actions: {
    updateSeason(season: any){
      this.currentSeason = season;
    }
  }
})