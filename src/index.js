import React from "react";
import ReactDOM from "react-dom/client";
import "./static/fonts/stylesheet.css";
import "./static/bsicons.css";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
