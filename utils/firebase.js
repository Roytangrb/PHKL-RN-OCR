import Config from '../config/default'

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
  apiKey: Config.FIREBASE.apiKey,
  authDomain: Config.FIREBASE.authDomain,
  projectId: Config.FIREBASE.projectId,
})

export default firebase