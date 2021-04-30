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
		return fs.readFileSync("./holi.html", "utf8");
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
				"select nombre, autor, isbn, edicion, link, portada from libros"
			);

			DB.close();

			return result;
		},
	},
});

server.route({
	method: "GET",
	path: "/libros/get/{libro?}",
	options: {
		cors: true,
		handler: async (request, h) => {
			var result;

			DB.open();

			result = await DB.query("select * from libros");

			DB.close();

			return result;
		},
	},
});

await server.start();
console.log("Server running on %s", server.info.uri);
