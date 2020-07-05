import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { CometChat } from "@cometchat-pro/chat";

Vue.config.productionTip = false;

const { VUE_APP_COMMETCHAT_APP_ID, VUE_APP_COMMETCHAT_REGION } = process.env;

let cometChatAppSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(VUE_APP_COMMETCHAT_REGION)
  .build();

CometChat.init(VUE_APP_COMMETCHAT_APP_ID, cometChatAppSetting).then(
  () => {
    console.log("Initialization completed successfully");

    new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");
  },
  (error) => {
    console.log("Initialization failed with error:", error);
  }
);
