import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GoogleOAuthProvider
      clientId="963077110039-a25ipd3d3aal87omlseibm178m2n6jht.apps.googleusercontent.com"
      onSuccess={(response) => console.log(response)}
      onError={() => console.log("Error")}
    >
      <App />
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
