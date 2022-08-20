import { defineStore } from "pinia";

export const useLeaderBoardStore = defineStore("leaderBoard", {
  state: () => {
    return {
      leaderBoard: [],
      lastTimeUpdated: null as any,
    }
  },
  actions: {
    setLeaderBoard(leaderBoard: any) {
      this.leaderBoard = leaderBoard;
      this.lastTimeUpdated = new Date().getTime();
    }
  }
});