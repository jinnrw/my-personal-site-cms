<template>
  <div class="success">
    <p>Log In Successed!</p>
    <h1>{{ aboutContent.title }}</h1>
    <div v-html="aboutContent.aboutMe"></div>
    <div>
      <p>{{ email }}</p>
      <p>{{ userId }}</p>
    </div>
    <div>
      <h1>Update About Me</h1>
      <textarea v-model="aboutContent.aboutMe" placeholder="about me"></textarea>
      <button @click="update">Update</button> 
    </div>
    <button @click="logOut">Log out</button> 
  </div>
</template>

<script>
import { db } from "../main";
import firebase from "firebase/app";

export default {
  name: "AuthSuccess",
  data() {
    return {
      aboutContent: [],
      email: "",
      userId: "",
    };
  },
  firestore() {
    return {
      aboutContent: db.collection("Pages").doc("About")
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = firebase.auth().currentUser;
        if (this.user) {
          this.email = this.user.email;
          this.userId = this.user.uid;
        }
        console.log("currentUser: " + user);
      } else {
        console.log("no user");
      }
    });
  },
  methods: {
    logOut() {
      console.log("Sign Out");
      firebase.auth().signOut();
    },
    update() {
      var aboutRef = db.collection("Pages").doc("About");

      // Set the "capital" field of the city 'DC'
      return aboutRef
        .update({
          aboutMe: this.aboutContent.aboutMe
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  }
};
</script>
