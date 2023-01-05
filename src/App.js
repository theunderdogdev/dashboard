import NavBar from "./components/NavBar";
function App() {
	return (
		<>
			<NavBar />
			<div className="w-full mt-[6.5rem] min-h-[calc(100vh-6.5rem)] relative px-4 py-3">
				<div className="flex lg:flex-row gap-3 ">
					<div className="lg:w-2/3 sm:h-96 bg-neutral-900 rounded-md"></div>
					<div className="lg:w-1/3 sm:h-96 bg-neutral-900 rounded-md"></div>
				</div>
			</div>
		</>
	);
}

export default App;
