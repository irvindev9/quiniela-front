import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
  // state
  state: () => {
    return {
      token: null,
      isAuthenticated: false,
      email: null,
      id: null,
      name: null,
      role_id: null,
    }
  },
  // actions
  actions: {
    updateUserInfo(userInfo: any, token: any) {
      this.token = token;
      this.isAuthenticated = true;
      this.email = userInfo.email;
      this.id = userInfo.id;
      this.name = userInfo.name;
      this.role_id = userInfo.role_id;
    }, 
    logout() {
      this.token = null;
      this.isAuthenticated = false;
      this.email = null;
      this.id = null;
      this.name = null;
      this.role_id = null;
    }, 
    test() {
      console.log("test");
    }
  }

  // getters

})