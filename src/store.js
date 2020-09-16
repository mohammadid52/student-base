import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { createStore, combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";

import { composeWithDevTools } from "redux-devtools-extension";
const fbConfig = {
  apiKey: "AIzaSyCHdloNlMc86oqxwlGEEyRfbb5nPaDJdFQ",
  authDomain: "student-base-d55f7.firebaseapp.com",
  databaseURL: "https://student-base-d55f7.firebaseio.com",
  projectId: "student-base-d55f7",
  storageBucket: "student-base-d55f7.appspot.com",
  messagingSenderId: "529772597952",
  appId: "1:529772597952:web:402ed49bcfea54409f5325",
  measurementId: "G-EGWHTFXZ7N",
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

firebase.initializeApp(fbConfig);
firebase.firestore();

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const initialState = {};
const store = createStore(rootReducer, initialState, composeWithDevTools());

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
export default store;
