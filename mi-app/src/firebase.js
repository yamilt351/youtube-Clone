import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDhJF6wmsa-JTgWmHGh0DKCtTWdIulfVqk",
  authDomain: "video-fcf50.firebaseapp.com",
  projectId: "video-fcf50",
  storageBucket: "video-fcf50.appspot.com",
  messagingSenderId: "798880389614",
  appId: "1:798880389614:web:b7a6273cf25408c1d816ff",
};
const app = initializeApp(firebaseConfig);

export const auth= getAuth();
export default app;