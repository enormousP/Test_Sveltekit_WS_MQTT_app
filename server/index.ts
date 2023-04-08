import { WebSocketServer } from 'ws';
import { config } from 'dotenv';
import express from 'express';
import { handler } from '../build/handler.js';
import * as http from 'http';
import mqtt from 'mqtt';

config();

const app = express();
app.use(handler);

const server = http.createServer(app);
const port = +process.env.PORT! || 4000;

const client = mqtt.connect('mqtt://test.mosquitto.org');
const topic = process.env.PUBLIC_MQTT_TOPIC!;

// Latest value for the new users/connections
let currentValue = 0;

const socketServer = new WebSocketServer({ server });
client.on('connect', () => client.subscribe(topic));

client.on('message', (_, message) => {
	socketServer.clients.forEach((client) => {
		client.send(message.toString());
	});
});

socketServer.on('connection', (ws) => {
	ws.send(currentValue.toString());
	ws.on('message', (data) => {
		currentValue = +data.toString();
		client.publish(topic, data.toString());
	});
});

server.listen(port, () => console.log(`Server running on port ${port}`));

server.once('error', errorHandler);
client.on('error', errorHandler);
socketServer.on('error', errorHandler);

function errorHandler(error) {
	console.error(error);
	process.exit(1);
}
