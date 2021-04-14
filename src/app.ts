import dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: '.env' });

class Server {
	public app = express();
}

const server = new Server();

((port = process.env.APP_PORT || 5000) => {
	server.app.listen(port, () => console.log(`Listening on port ${port}`))
})