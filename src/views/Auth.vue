<template>
  <div class="light">
    <div class="pageWrapper" v-if="!loader">
      <div class="input-form">
        <form v-on:submit.prevent="login">
          <h3>Hello!</h3>
          <p>
            Welcome to our little Vue demo powered by CometChat. Login with the
            username "superhero1" or "superhero2" and test the chat out. To
            create your own user, see
            <a
              href="https://prodocs.cometchat.com/reference#createuser"
            >our documentation</a>
          </p>
          <input
            id="username"
            name="username"
            v-model="uid"
            type="text"
            placeholder="Enter your UID here"
            class="formInput"
          />
          <button class="pageButton" type="submit">
            Login &nbsp;&nbsp;
            <span v-if="loader" class="fa fa-spin fa-spinner"></span>
          </button>
        </form>
      </div>
    </div>
    <Loader v-else-if="loader" />
  </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
import Loader from "../lib/cometchat-components/components/Loader";

export default {
  components: {
    Loader
  },
  data() {
    return {
      uid: "",
      loader: false
    };
  },
  methods: {
    login() {
      let apiKey = process.env.VUE_APP_COMMETCHAT_API_KEY;
      this.loader = true;
      console.log(this.uid, apiKey);

      CometChat.login(this.uid, apiKey).then(
        user => {
          this.loader = false;
          console.log("Login successfully:", { user });
          this.$router.push({
            name: "chat"
          });
        },
        error => {
          this.loader = false;
          console.log(error);
          alert(
            "Whops. Something went wrong. This commonly happens when you enter a username that doesn't exist. Check the console for more information"
          );
          console.log("Login failed with error:", error.code);
        }
      );
    }
  }
};
</script>

<style>
.pageWrapper {
  padding-top: 50px;
  text-align: center;
  display: flex;
}

.input-form {
  margin: 0 auto;
  width: 400px;
}

.formInput {
  border: 2px solid #aaa;
  width: 100%;
  padding: 10px;
  font-weight: 550;
  color: #555;
  margin-top: 40px;
  margin-bottom: 30px;
}

p {
  margin: auto;
  padding: 10px;
}

.pageButton {
  color: white;
  padding: 10px;
  text-align: center;
  background: #333;
  width: 100%;
}

.pageButton:hover {
  cursor: pointer;
  color: white;
  background: #333333;
}
</style>
