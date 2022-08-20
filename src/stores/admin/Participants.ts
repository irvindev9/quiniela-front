import { defineStore } from "pinia";

export const useParticipantStore = defineStore("participant", {
  state: () => {
    return {
      participants: [],
      lastTimeUpdated: null as any,
    }
  },
  actions: {
    setParticipants(participants: any) {
      this.participants = participants;
      this.lastTimeUpdated = new Date().getTime();
    },
    clear() {
      this.participants = [];
      this.lastTimeUpdated = null;
    }
  }
});