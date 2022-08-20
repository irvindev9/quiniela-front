import { defineStore } from "pinia";

export const useResultStore = defineStore("result", {
  state: () => {
    return {
      results: [] as any,
      lastTimeUpdated: [] as any,
    }
  },
  actions: {
    setResults(results: any, index: number) {
      this.results[index] = results;
      this.lastTimeUpdated[index] = new Date().getTime();
    },
    clear(index: number) {
      this.results[index] = [];
      this.lastTimeUpdated[index] = null;
    }
  }
});
