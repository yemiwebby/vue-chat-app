<template>
  <div>
    <div class="page-wrapper">
      <div
        class="page-int-wrapper"
        id="pageWrapper"
        :class="{
          'left-open': leftOpen,
          'center-open': centerOpen,
          'right-open': rightOpen,
        }"
      >
        <div class="ccl-left-panel">
          <GroupList />
        </div>
        <MessageContainer :currentUser="currentUser" />
        <RightSidebar />
      </div>
    </div>
  </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
import GroupList from "../lib/cometchat-components/components/GroupList";
import MessageContainer from "../lib/cometchat-components/components/MessageContainer";
import RightSidebar from "../lib/cometchat-components/components/RightSidebar";

export default {
  components: {
    GroupList,
    MessageContainer,
    RightSidebar
  },
  data() {
    return {
      currentUser: null,
      leftOpen: true,
      centerOpen: false,
      rightOpen: false
    };
  },
  created() {
    CometChat.getLoggedinUser().then(
      user => {
        console.log("we are here", user);
        this.currentUser = user;
        if (!user) {
          this.$router.push({
            name: "home"
          });
        }
      },
      error => {
        console.log(error);
        this.$router.push({
          name: "home"
        });
      }
    );
  },
  mounted() {
    this.$root.$on("selectedUser", data => {
      console.log(data);
      const el = document.getElementById("pageWrapper");
      if (el.classList.contains("left-open")) {
        el.classList.add("center-open");
        el.classList.remove("left-open");
      }
    });
  }
};
</script>
