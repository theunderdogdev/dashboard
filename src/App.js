import NavBar from "./components/NavBar";
import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
function App() {
	Chart.register(...registerables);

	const [data, setData] = useState({ labels: [], plotVals: [] });
	const [modifs, setModifs] = useState({ attr: "intensity", mode: "sum" });
	const [usingFilter, setUsing] = useState(true);
	const [filtType, setFiltType] = useState("");
	const [filtQuery, setFiltQuery] = useState("");
	const [opts, setOpts] = useState([]);
	const changeData = function () {
		if (usingFilter) {
			axios
				.get(
					`/data?attr=${modifs.attr}&filter=y&filtType=${filtType}&filtQuery=${filtQuery}`
				)
				.then((res) => {
					const { labels, values } = res.data;
					console.log(labels, values);

					setData({ labels: labels, plotVals: values });
				});
			return;
		}
		axios.get(`/data?mode=${modifs.mode}&attr=${modifs.attr}`).then((res) => {
			const { labels, values } = res.data;
			console.log(labels, values);

			setData({ labels: labels, plotVals: values });
		});
	};

	const onSelect = (evt) => {
		const { name, value } = evt.target;
		setModifs({
			...modifs,
			[name]: value,
		});
	};
	const onFilterType = (evt) => {
		const { value } = evt.target;
		setFiltType(value);
		axios.get("/data-ranges/" + value).then((res) => {
			const { opts } = res.data;
			setOpts(opts);
		});
	};
	const onFilterQuery = (evt) => {
		const { value } = evt.target;
		setFiltQuery(value);
	};
	console.log(data);
	return (
		<>
			<NavBar />

			<div className="w-full mt-[6.5rem] min-h-[calc(100vh-6.5rem)] relative px-4 py-3">
				<button
					className="w-10 h-10 rounded-full bg-slate-500 bg-opacity-10 btn-hover text-white z-[8]"
					onClick={changeData}
				>
					<i className="bi bi-list"></i>
				</button>
				<div className=" px-3 w-fit flex items-center gap-5 border-slate-500 border-2 rounded">
					<label htmlFor="attr" className="text-slate-200">
						Attribute
					</label>
					<select
						className="p-2 bg-transparent outline-none"
						name="attr"
						id="attr"
						onChange={onSelect}
					>
						<option value="intensity">Intensity</option>
						<option value="relevance">Relevance</option>
					</select>
				</div>
				<div className="mt-3 px-3 w-fit flex items-center gap-5 border-slate-500 border-2 rounded">
					<label htmlFor="attr" className="text-slate-200">
						Mode
					</label>
					<select
						className="p-2 bg-transparent outline-none"
						name="mode"
						id="mode"
						onChange={onSelect}
					>
						<option value="sum">Sum</option>
						<option value="avg">Average</option>
						<option value="min">Minimum</option>
						<option value="max">Maximum</option>
					</select>
				</div>
				<div className="mt-3 px-3 w-fit flex items-center gap-5 border-slate-500 border-2 rounded">
					<label htmlFor="filter" className="text-slate-200">
						Filter
					</label>
					<select
						className="p-2 bg-transparent outline-none"
						name="filtType"
						id="filtType"
						onChange={onFilterType}
					>
						<option value="topic">Topics</option>
						<option value="sector">Sector</option>
						<option value="region">Region</option>
						<option value="pestle">Pestle</option>
						<option value="source">Source</option>
					</select>
				</div>
				{usingFilter ? (
					<div className="mt-3 px-3 w-fit flex items-center gap-5 border-slate-500 border-2 rounded">
						<label htmlFor="filter" className="text-slate-200">
							Query
						</label>
						<select
							className="p-2 bg-transparent outline-none"
							name="filtQ"
							id="filtQ"
							onChange={onFilterQuery}
						>
							{opts.length > 0 &&
								opts.map((opt, idx) => {
									return (
										<option key={idx} value={opt}>
											{opt}
										</option>
									);
								})}
						</select>
					</div>
				) : (
					""
				)}

				<div className="dashboard">
					<div
						className="bg-neutral-900 min-h-[45rem] h-auto md:col-span-2 lg:col-span-2 rounded-md p-2"
						id="canvasCont"
					>
						<Line
							options={{
								responsive: true,
								maintainAspectRatio: false,
								layout: {
									padding: 10,
								},
								plugins: {
									zoom: {
										pan: {
											enabled: true,
										},
									},
									legend: {
										position: "top",
										labels: {
											usePointStyle: true,
											pointStyle: "circle",
											boxWidth: 7,
											boxHeight: 7,
											font: {
												family: "Roboto Mono",
											},
										},
									},
									tooltip: {
										titleFont: {
											family: "Roboto Mono",
											weight: "400",
										},
									},

									title: {
										display: true,
										text: "Chart.js Bar Chart",
										font: {
											family: "Roboto Mono",
										},
									},
								},
								scales: {
									x: {
										title: { display: true, text: "timeline" },
										grid: {
											color: "#4755692a",
										},
										ticks: {
											font: {
												family: "Roboto Mono",
											},
										},
									},
									y: {
										title: { display: true, text: modifs.attr },
										grid: {
											color: "#4755692a",
										},
										ticks: {
											font: {
												family: "Roboto Mono",
											},
										},
									},
								},
							}}
							data={{
								labels: [...data.labels],
								datasets: [
									{
										label: "@1",
										data: [...data.plotVals],
										fill: true,
										backgroundColor: [
											"rgba(255, 99, 132, 0.2)",
											"rgba(255, 159, 64, 0.2)",
											"rgba(255, 205, 86, 0.2)",
											"rgba(75, 192, 192, 0.2)",
											"rgba(54, 162, 235, 0.2)",
											"rgba(153, 102, 255, 0.2)",
											"rgba(201, 203, 207, 0.2)",
										],
										borderColor: [
											"rgb(255, 99, 132)",
											"rgb(255, 159, 64)",
											"rgb(255, 205, 86)",
											"rgb(75, 192, 192)",
											"rgb(54, 162, 235)",
											"rgb(153, 102, 255)",
											"rgb(201, 203, 207)",
										],
										borderWidth: 1,
									},
								],
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
// grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
{
	/* <div className="card h-52 bg-neutral-900 rounded-md"></div>
					<div className="card h-52 bg-neutral-900 rounded-md"></div>
					<div className="card h-52 bg-neutral-900 rounded-md"></div>
					<div className="card h-52 bg-neutral-900 rounded-md"></div>
					<div className="card h-52 bg-neutral-900 rounded-md"></div>
					<div className="card h-52 bg-neutral-900 rounded-md"></div> 
									<div className="bg-neutral-900 rounded-md h-96"></div>

				*/
}
