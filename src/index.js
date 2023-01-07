import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import "./static/fonts/stylesheet.css";
import "./static/bsicons.css";
import "./index.css";
import App from "./App";
axios.defaults.baseURL = "http://localhost:5000/";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
