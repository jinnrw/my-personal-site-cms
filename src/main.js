import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { config } from './firebaseConfig'
import router from './router'

Vue.use(VueFire)
Vue.use(VueRouter)

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged((user) => {
  console.log("firebase on Auth State Changed");
  
  if (user) {
    console.log(user);
    router.push('/success')
  } else {
    console.log("user not logged in");
    router.push('/auth')
  }
});

export const db = firebase.firestore()
const settings = { /* your settings... */
  timestampsInSnapshots: true
};
db.settings(settings);


Vue.config.productionTip = false

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});