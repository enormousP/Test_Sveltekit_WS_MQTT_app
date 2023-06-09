import { writable } from 'svelte/store';

const PowerIndicatorStore = writable(0);

const connect = () => {
	const socket = new WebSocket(`ws:${process.env.VERCEL_URL}`);

	socket.addEventListener('message', (event) => {
		const value = JSON.parse(event.data) as number;
		PowerIndicatorStore.set(value);
	});

	return socket;
};

export default {
	subscribe: PowerIndicatorStore.subscribe,
	connect
};
