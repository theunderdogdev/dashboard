import logo from "../static/logo-dash.svg";

const NavBar = () => {
	const navOpen = () => {
		const nav = document.querySelector("nav");
		nav.classList.add("active");
	};
	const navClose = () => {
		const nav = document.querySelector("nav");
		nav.classList.remove("active");
	};
	return (
		<>
			<button
				className="w-10 h-10 rounded-full bg-slate-500 bg-opacity-10 btn-hover text-white fixed top-3 left-3 z-[8]"
				onClick={navOpen}
			>
				<i className="bi bi-list"></i>
			</button>
			<nav className="fixed top-0 left-0 w-64 h-screen z-[9] p-2 bg-neutral-900 shadow-xl shadow-black">
				<button
					className="w-10 h-10 rounded-full btn-hover text-white absolute top-3 right-3 z-[1]"
					onClick={navClose}
				>
					<i className="bi bi-x-lg"></i>
				</button>
				<div className="brand flex gap-2 items-center relative pb-1 z-0">
					<img src={logo} className="w-10 h-10" alt="" />
					<h1 className="brand-name text-white">brand</h1>
				</div>
				<div className="mt-4 flex flex-col gap-3 list-none p-2">
					<button className="nav-item w-full py-2 pl-4 text-slate-300 text-left rounded-tl-full rounded-bl-full active">
						<i className="bi bi-columns mr-3 text-xl"></i>
						Dashboard
					</button>
					<button className="nav-item w-full py-2 pl-4 text-slate-300 text-left rounded-tl-full rounded-bl-full">
						<i className="bi bi-envelope-at mr-3 text-xl"></i>
						Email
					</button>
					<button className="nav-item w-full py-2 pl-4 text-slate-300 text-left rounded-tl-full rounded-bl-full">
						<i className="bi bi-file-earmark-text mr-3 text-xl"></i>
						Invoice
					</button>
					<button className="nav-item w-full py-2 pl-4 text-slate-300 text-left rounded-tl-full rounded-bl-full">
						<i className="bi bi-person mr-3 text-xl"></i>
						User
					</button>
				</div>
			</nav>
		</>
	);
};

export default NavBar;
