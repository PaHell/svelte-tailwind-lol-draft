<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import BorderPane from '$lib/layout/BorderPane.svelte';
	import Player from '$lib/Player.svelte';

	const playersLeft: [player] = [
		{
			name: 'UwU Yuu and Mi'
		}
	];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<template lang="pug">
	.app-champion-select
		div(class="w-9/12 h-4/6")
			BorderPane
				.layout-hbox.w-full.h-full(slot="top")
				.layout-hbox.w-full.h-full(slot="left")
				.layout-vbox.w-full.h-full(slot="center")
					+each('playersLeft as player')
						Player(d="{player}")
				.layout-vbox.w-full.h-full(slot="right")
				.layout-vbox.w-full.h-full(slot="bottom")
</template>

<style lang="postcss" global>
	.app-champion-select {
		background-image: url('/wallpaper.jpg');
		@apply bg-cover bg-center w-full h-full flex items-center justify-center bg-slate-800;
	}
</style>
