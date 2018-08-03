<template>
  <div class="hello">
    <p>Home: {{ homeContent }}</p>
      <h1>{{ homeContent.title }}</h1>
      <h1>{{ homeContent.heroText }}</h1>
    <p>About: {{ aboutContent }}</p>

      <div>
        <h1>Welcome to My Awesome App</h1>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </div>
  </div>
</template>

<script>
import { db } from "../main";
import firebase from "firebase/app";
import { config } from "../firebaseConfig";
var firebaseui = require("firebaseui");

export default {
  data() {
    return {
      homeContent: [],
      aboutContent: []
    };
  },
  firestore() {
    return {
      homeContent: db.collection("Pages").doc("Home"),
      aboutContent: db.collection("Pages").doc("About")
    };
  },
  created() {
    // Initialize the FirebaseUI Widget using Firebase.
    this.signIn();
  },
  methods: {
    signIn() {
      var ui = new firebaseui.auth.AuthUI(firebase.auth());

      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById("loader").style.display = "none";
          }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: "popup",
        signInSuccessUrl: "/success",
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
      };

      // The start method will wait until the DOM is loaded.
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
