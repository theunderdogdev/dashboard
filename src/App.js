import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
function App() {
	Chart.register(...registerables);

	return (
		<>
			<NavBar />
			<div className="w-full mt-[6.5rem] min-h-[calc(100vh-6.5rem)] relative px-4 py-3">
				<button className="w-10 h-10 rounded-full bg-slate-500 bg-opacity-10 btn-hover text-white z-[8]">
					<i className="bi bi-list"></i>
				</button>
				<div className="dashboard grid md:grid-cols-1 lg:grid-cols-3 gap-4">
					<div className="card h-52 bg-neutral-900"></div>
					<div className="card h-52 bg-neutral-900"></div>
					<div className="card h-52 bg-neutral-900"></div>
					<div
						className="bg-neutral-900 lg:col-span-2 rounded-md h-96"
						id="chart"
					></div>
					<div className="bg-neutral-900 rounded-md h-96"></div>
				</div>
			</div>
		</>
	);
}

export default App;
