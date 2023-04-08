<script lang="ts">
	import Indicator from './Indicator.svelte';
	import PowerIndicatorStore from '../lib/powerIndicator';
	import { onMount } from 'svelte';

	let value = 0;
	let socket: WebSocket;

	onMount(() => {
		socket = PowerIndicatorStore.connect();
		PowerIndicatorStore.subscribe((val) => (value = val));
	});

	const handleChange = (val: number) => {
		value = val;
		socket.send(JSON.stringify(val));
	};
</script>

<div class="container">
	<h1 class="title">Мощность:</h1>
	<Indicator {value} onValueChange={handleChange} />
</div>

<style>
	.container {
		width: 250px;
	}

	.title {
		text-align: center;
	}
</style>
