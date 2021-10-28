<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { get, API } from '$lib/http';
	import BorderPane from '$lib/layout/BorderPane.svelte';
	import Player from '$lib/components/Player.svelte';

	const playersLeft: [player, player, player, player, player] = [
		{
			name: 'UwU Yuu & Mi',
			role: 'top',
			champ: 'camille',
			status: 'locked'
		},
		{
			name: 'Muskatnuzz',
			role: 'jngl',
			champ: 'master-yi',
			status: 'locked'
		},
		{
			name: 'UwU Kat',
			role: 'mid',
			champ: 'katarina',
			status: 'hover'
		},
		{
			name: 'UwU Spezial',
			role: 'adc',
			champ: 'kaisa',
			status: ''
		},
		{
			name: 'UwU Alpirsbacher',
			role: 'supp',
			champ: null,
			status: ''
		}
	];

	get(API.RIOT_DEV, '/riot/account/v1/accounts/me')
		.then((data) => {
			console.log(JSON.stringify(data));
		})
		.catch((error) => {
			console.log(JSON.stringify(error));
		});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<template lang="pug">
	.app-champion-select
		div
			BorderPane
				.layout-hbox.w-full.h-full(slot="top")
				.layout-hbox.w-full.h-full(slot="left")
				.layout-vbox.w-full.h-full.space-y-8(slot="center")
					+each('playersLeft as player')
						Player(d="{player}")
				.layout-vbox.w-full.h-full(slot="right")
				.layout-vbox.w-full.h-full(slot="bottom")
</template>

<style lang="postcss" global>
	.app-champion-select {
		background-image: url('/img/wallpaper/wallpaper4.jpg');
		@apply bg-cover bg-center w-full h-full flex items-center justify-center bg-slate-800;
	}
</style>
