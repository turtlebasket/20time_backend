import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { exit } from 'process';
import { graphqlHTTP } from 'express-graphql';
import schema from './data/schema';

dotenv.config({ path: '.env' });
const { PORT, NODE_ENV, MONGO_URI } = process.env;

const app = express();
const db = mongoose.connection;

try {
	db.openUri(MONGO_URI as string, {useNewUrlParser: true, useUnifiedTopology: true})
} catch (e) {
	console.log(e)
	console.log("Failed to connect to MongoDB database.")
	exit(0);
}

app.use("/test", (req: Request, res: Response) => {
	res.send("Hello.")
});

app.use("/api", graphqlHTTP({
	schema: schema,
	graphiql: NODE_ENV === 'development' || NODE_ENV === 'dev' ? true : false,
}))

app.listen(PORT, () => {
	console.log(`Running at port ${PORT}`)
})