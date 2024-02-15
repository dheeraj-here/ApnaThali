
import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { SoftUIControllerProvider } from "context";
import { Toaster } from "react-hot-toast";
import store from "./redux/store";
import { Provider } from "react-redux";

// ReactDOM.render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <SoftUIControllerProvider>
//         <div><Toaster /></div>
//         <App />
//       </SoftUIControllerProvider>
//     </Provider>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <SoftUIControllerProvider>
        <div><Toaster /></div>
        <App />
      </SoftUIControllerProvider>
    </Provider>
  </BrowserRouter>);
