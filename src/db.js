import connData from "./../data/connection-data.json";
import mongodb from "mongodb";

var DB = {
	client: mongodb.MongoClient,
	init: async () => {
		let uri = `mongodb+srv://${connData.user}:${connData.password}@${connData.host}`;

		DB.client = new mongodb.MongoClient(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		await DB.client.connect();
	},
	collection: async (clusterName) => {
		return await DB.client.db(connData.database).collection(clusterName);
	},
	close: async () => {
		await DB.client.close();
	}
};

export default DB;
