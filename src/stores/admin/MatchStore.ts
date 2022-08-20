import { defineStore } from "pinia";

export const useMatchStore = defineStore("match", {
  state: () => {
    return {
      weeks: [],
      lastTimeUpdated: null as any,
    }
  },
  actions: {
    setWeeks(weeks: any) {
      this.weeks = weeks;
      this.lastTimeUpdated = new Date().getTime();
    },
    clear() {
      this.weeks = [];
      this.lastTimeUpdated = null;
    }
  }
});
