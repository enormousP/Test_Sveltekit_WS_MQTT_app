<script lang="ts">
	import RangeInput from './RangeInput.svelte';
	export let value: number;
	export let onValueChange: (val: number) => any;
</script>

<p class="percent">{value}%</p>
<RangeInput on:change={(e) => onValueChange(e.detail)} {value} />

<style>
	.percent {
		text-align: center;
		font-size: 3rem;
		font-weight: bold;
		margin: 10px 0;
	}
</style>
