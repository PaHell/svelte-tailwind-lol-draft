<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { getChampions } from '$lib/riot';
	import BorderPane from '$lib/layout/BorderPane.svelte';
	import PlayerCard from '$lib/components/PlayerCard.svelte';

	const playersLeft: player[] = [
		{
			name: 'UwU Yuu & Mi',
			role: 'top',
			champ: 'Sion',
			status: 'locked'
		},
		{
			name: 'Muskatnuzz',
			role: 'jngl',
			champ: 'MasterYi',
			status: 'locked'
		},
		{
			name: 'UwU Kat',
			role: 'mid',
			champ: 'Katarina',
			status: 'hover'
		},
		{
			name: 'UwU ADCurryKing',
			role: 'adc',
			champ: 'Kaisa',
			status: ''
		},
		{
			name: 'Babylon BW',
			role: 'supp',
			champ: null,
			status: ''
		}
	];

	const playersRight: player[] = [
		{
			name: 'SJ Haubi',
			role: 'top',
			champ: 'Camille',
			status: 'locked'
		},
		{
			name: 'UwU Senior Hawk',
			role: 'jngl',
			champ: 'Kayn',
			status: 'locked'
		},
		{
			name: 'Orianne Botlane',
			role: 'mid',
			champ: 'Orianna',
			status: 'hover'
		},
		{
			name: 'DavidNoah',
			role: 'adc',
			champ: 'Ziggs',
			status: ''
		},
		{
			name: 'TerrorGamerGirl',
			role: 'supp',
			champ: null,
			status: ''
		}
	];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<template lang="pug">
	.app-champion-select
		BorderPane
			.layout-hbox.w-full.h-full(slot="top")
			.layout-vbox.w-full.h-full.pl-8.space-y-8(slot="left")
				+await('getChampions() then champions')
					+each('playersLeft as player')
						PlayerCard(
							rtl="true",
							player="{player}",
							champion="{champions[player.champ]}")
			.layout-vbox.w-full.h-full(slot="center")
				//img(src="/img/map.png", alt="League of Legends Map 3D")
			.layout-vbox.w-full.h-full.pr-8.space-y-8(slot="right")
				+await('getChampions() then champions')
					+each('playersRight as player')
						PlayerCard(
							player="{player}",
							champion="{champions[player.champ]}")
			.layout-vbox.w-full.h-full(slot="bottom")
</template>

<style lang="postcss" global>
	.app-champion-select {
		background-image: url('/img/wallpaper/wallpaper4.jpg');
		@apply w-full h-full
		flex items-center justify-center
		bg-slate-800 bg-cover bg-center;
	}
</style>
