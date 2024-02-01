import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { handletoken } from "redux/states";

export const firebaseConfig = {
  // apiKey: "AIzaSyBE0l9JtLLwCex5NhfiJU_3Mwb10rA5gBQ",
  // authDomain: "loaderadminapp.firebaseapp.com",
  // projectId: "loaderadminapp",
  // storageBucket: "loaderadminapp.appspot.com",
  // messagingSenderId: "219380222375",
  // appId: "1:219380222375:web:1d5c9d15a5829b6e9dce82",
  // measurementId: "G-ZPW0G59QL6",

  apiKey: "AIzaSyAVTja9s11-Vcm4ZWWEPhrCNxrEJEPNwFc",
  authDomain: "apnathali-42b75.firebaseapp.com",
  projectId: "apnathali-42b75",
  storageBucket: "apnathali-42b75.appspot.com",
  messagingSenderId: "457897045541",
  appId: "1:457897045541:web:23c2f4ef2bbb048da319cc",
  measurementId: "G-W3HK937X8V"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestPermission = (setValue) => {
  console.log("Requesting User Permission......");
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("Notification User Permission Granted.");
        return getToken(messaging, {
          vapidKey: `BHaK0qO3TJkk-i-GD1KS_E7jg5LW931vgeimviF2MVnUpMQ7aU0exLjqB6sUMMu5PCgEaQmi6brk71PMU6Wh-hY`,
        });
      } else {
        console.log("User Permission Denied.");
      }
    })
    .then((currentToken) => {
      console.log(currentToken, "currentToken");
      if (currentToken) {
        console.log("Client Token: ", currentToken);
        setValue(handletoken(currentToken));
        // return currentToken;
      } else {
        console.log("Failed to generate the app registration token.");
        // return null;
      }
    })
    .catch((err) => {
      console.log("An error occurred:", err);
    });
};

requestPermission((token) => {
  console.log("Token from request : ", token);
});


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });