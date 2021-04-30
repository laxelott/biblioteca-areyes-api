import Hapi from "@hapi/hapi";
import DB from "./db.js";
import path from "path";

const server = Hapi.server({
	port: 3500,
	host: "localhost",
});

await server.register(require("@hapi/vision"));

server.views({
	engines: {
		html: require("handlebars"),
	},
	relativeTo: __dirname,
	path: "templates",
});

// ROUTES
server.route({
	method: "GET",
	path: "/",
	handler: async (request, reply) => {
		reply.file(path.join(path.resolve(path.dirname("")), "holi.html"));
	},
});

server.route({
	method: "GET",
	path: "/libros/get/all",
	handler: async (request, h) => {
		var result;

		DB.open();

		result = await DB.query("select * from libros");

		DB.close();

		return result;
	},
});

await server.start();
console.log("Server running on %s", server.info.uri);
