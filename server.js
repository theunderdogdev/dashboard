const express = require("express");
const mongoose = require("mongoose");
const { writeFileSync } = require("fs");
mongoose.connect("mongodb://127.0.0.1/dashboard", {
	useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
	console.log("Connected");
});
const schema = new mongoose.Schema(
	{
		end_year: String,
		intensity: Number,
		sector: String,
		topic: String,
		insight: String,
		url: String,
		region: String,
		start_year: String,
		impact: String,
		added: Date,
		published: Date,
		country: String,
		relevance: Number,
		pestle: String,
		source: String,
		title: String,
		likelihood: Number,
	},
	{ collection: "data" }
);
const dataModel = mongoose.model("Data", schema, "data");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", async (req, res) => {
	const datas = await dataModel.find({});
	res.json({ msg: "Server connection successful" });
});
app.get("/data/", (req, res) => {
	const { attr, mode, filter } = req.query;
	const compareFn = (a, b) => {
		if (a._id.year === b._id.year) {
			return a._id.month - b._id.month;
		} else {
			return a._id.year - b._id.year;
		}
	};
	const sendData = (data) => {
		data.sort(compareFn);
		console.log(data);
		const labels = [],
			values = [];
		data.forEach((dat) => {
			labels.push(dat._id.year + "-" + dat._id.month);
			values.push(dat.values);
		});
		console.log(labels, values);
		res.json({ msg: "received query", labels: labels, values: values });
	};
	if (filter === "y") {
		const { filtType, filtQuery } = req.query;
		dataModel
			.find({ [filtType]: filtQuery })
			.select(filtType + " " + attr + " added")
			.then((docs) => {
				const labels = [],
					values = [];
				docs.forEach((doc) => {
					labels.push(doc.added);
					values.push(doc[attr]);
				});
				res.json({ labels, values });
			});
	} else {
		dataModel.aggregate(
			[
				{
					$group: {
						_id: { year: { $year: "$added" }, month: { $month: "$added" } },
						values: { ["$" + mode]: "$" + attr },
					},
				},
			],
			(err, data) => {
				sendData(data);
			}
		);
	}
});
app.get("/data-ranges/:attr", (req, res) => {
	const { attr } = req.params;
	// if (attr === "end_year") {
	// 	dataModel
	// 		.find({ end_year: { $ne: "" } })
	// 		.select("end_year")
	// 		.sort({ end_year: -1 })
	// 		.then((data) => {
	// 			res.json({
	// 				msg: "req acomplished",
	// 				min: parseInt(data[0].end_year),
	// 				max: parseInt(data[data.length - 1].end_year),
	// 			});
	// 		});
	// } else {
	dataModel
		.find({ [attr]: { $nin: ["", null] } })
		.select(attr)
		.distinct(attr, (err, docs) => {
			res.json({ msg: "ok", opts: docs });
		});
	// }
});
app.listen(5000, () => {
	console.log("Server running on port 5000");
});
