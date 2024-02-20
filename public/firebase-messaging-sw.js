// importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');



// firebaseConfig = {
//     apiKey: "AIzaSyDo2y1PoSiG_huWdNmQtGTG8UIa07f8rGE",
//     authDomain: "easysolution-5d8b3.firebaseapp.com",
//     projectId: "easysolution-5d8b3",
//     storageBucket: "easysolution-5d8b3.appspot.com",
//     messagingSenderId: "47297759745",
//     appId: "1:47297759745:web:1c76ea1296419c53828e00",
//     measurementId: "G-1W0XD2RN9J"
//   };
//   firebase.initializeApp(firebaseConfig);
//   const messaging = firebase.messaging();
//   messaging.onBackgroundMessage((payload) => {
//     // console.log(
//     //   "[firebase-messaging-sw.js] Received background message ",
//     //   payload
//     // );
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//       body: payload.notification.body,
//       icon: payload.notification.image,
//     };
//     self.registration.showNotification(notificationTitle, notificationOptions);
//   });

importScripts('https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAVTja9s11-Vcm4ZWWEPhrCNxrEJEPNwFc",
  authDomain: "apnathali-42b75.firebaseapp.com",
  projectId: "apnathali-42b75",
  storageBucket: "apnathali-42b75.appspot.com",
  messagingSenderId: "457897045541",
  appId: "1:457897045541:web:23c2f4ef2bbb048da319cc",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});