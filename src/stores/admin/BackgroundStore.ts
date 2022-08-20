import { defineStore } from "pinia";

export const useBackgroundStore = defineStore("background", {
  state: () => {
    return {
      backgrounds: [],
      lastTimeUpdated: null as any,
    }
  },
  actions: {
    setBackgrounds(backgrounds: any) {
      this.backgrounds = backgrounds;
      this.lastTimeUpdated = new Date().getTime();
    },
    clear() {
      this.backgrounds = [];
      this.lastTimeUpdated = null;
    }
  }
});