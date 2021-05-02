import Hapi from "@hapi/hapi";
import DB from "./db.js";
import path from "path";
import fs from "fs";

const __dirname = path.resolve(path.dirname(""));

const server = Hapi.server({
	port: process.env.PORT || 3000,
});

// ROUTES
server.route({
	method: "GET",
	path: "/",
	handler: async (request, h) => {
		return fs.readFileSync("./../static/holi.html", "utf8");
	},
});

server.route({
	method: "GET",
	path: "/libros/all",
	options: {
		cors: true,
		handler: async (req, h) => {
			var result;

			DB.open();

			result = await DB.query(
				"select portada, nombre, autor, isbn, edicion, link, lenguaje from libros order by lenguaje"
			);

			DB.close();

			return result;
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
				error: true
			}
			return result;
		},
	},
});

await server.start();
console.log("Server running on %s", server.info.uri);
