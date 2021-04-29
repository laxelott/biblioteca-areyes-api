import Hapi from "@hapi/hapi";
import DB from "./db.js";

const server = Hapi.server({
	port: 3500,
	host: "localhost",
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