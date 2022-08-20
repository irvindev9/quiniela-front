import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", {
  state: () => {
    return {
      seasons: [],
      seasonLastTimeUpdated: null as any,
      notifications: [],
      notificationLastTimeUpdated: null as any,
    }
  },
  actions: {
    setSeasons(seasons: any) {
      this.seasons = seasons;
      this.seasonLastTimeUpdated = new Date().getTime();
    },
    setNotifications(notifications: any) {
      this.notifications = notifications;
      this.notificationLastTimeUpdated = new Date().getTime();
    },
    clearSeason() {
      this.seasons = [];
      this.seasonLastTimeUpdated = null;
    },
    clearNotification() {
      this.notifications = [];
      this.notificationLastTimeUpdated = null;
    }
  }
});