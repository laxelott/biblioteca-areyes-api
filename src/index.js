import Hapi from "@hapi/hapi";
import DB from "./db.js";
import path from "path";
import inert from "@hapi/inert";

const __dirname = path.resolve(path.dirname(""));

const server = Hapi.server({
	port: process.env.PORT || 80,
	routes: {
		files: {
			relativeTo: path.join(__dirname, "static"),
		},
	},
});

await server.register(inert);
await DB.init();

// ROUTES
server.route({
	method: "GET",
	path: "/",
	handler: (request, h) => {
		return h.file("holi.html");
	},
});

server.route({
	method: "GET",
	path: "/libros/all",
	options: {
		cors: true,
		handler: async (req, h) => {
			let libros = await (
				await DB.collection("libros")
			)
				.find(
					{},
					{
						// Exclude _id from results
						projection: {
							_id: 0,
						},
					}
				)
				.toArray();

			return libros;
		},
	},
});

server.route({
	method: "GET",
	path: "/libros/search/{categoria}/{libro}",
	options: {
		cors: true,
		handler: async (request, h) => {
			var result;
			/*
			DB.open();

			result = await DB.query("select * from libros");

			DB.close();
*/
			result = {
				message: "Not yet implemented! :C",
				error: true,
			};
			return result;
		},
	},
});

await server.start();
console.log("Server running on %s", server.info.uri);
