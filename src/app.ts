import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { exit } from 'process';
import schema from './data/schema';
// import jwtAuth from './auth/jwtAuth';

dotenv.config({ path: '.env' });
const { PORT, NODE_ENV, MONGO_URI } = process.env;

const app = express();
const db = mongoose.connection;

const apolloServer = new ApolloServer({
	schema,
	context: ({req, res}) => ({req, res}),
	// context: NODE_ENV === 'development' || NODE_ENV === 'dev' ? {} : jwtAuth,
	playground: NODE_ENV === 'development' || NODE_ENV === 'dev' ? true : false,
});

apolloServer.applyMiddleware({app, path: '/api'});

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


app.listen(PORT, () => {
	console.log(`Running at port ${PORT}`)
})