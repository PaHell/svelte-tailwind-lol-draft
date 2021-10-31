<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { getChampions } from '$lib/riot';
	import BorderPane from '$lib/layout/BorderPane.svelte';
	import PlayerCard from '$lib/components/PlayerCard.svelte';
	import Countdown from '$lib/components/Countdown.svelte';
	import Bans from '$lib/components/Bans.svelte';
	import Teams from '$lib/components/Teams.svelte';
	import Branding from '$lib/components/Branding.svelte';

	let phase = 'Ban';
	let time = 30;
	let bans = [
		['Darius', 'Jax', 'Yasuo', 'Nautilus', 'Blitzcrank'],
		['Sett', 'Evelynn', 'Talon', 'Ezreal', 'Soraka']
	];
	let teams: [team, team] = [
		{
			name: 'doMINION',
			short: 'min',
			score: 1,
			img: '/img/teams/minion.png'
		},
		{
			name: "Herald's Call",
			short: 'hrd',
			score: 2,
			img: '/img/teams/herald.png'
		}
	];
	const players: [player[], player[]] = [
		[
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
		],
		[
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
		]
	];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<template lang="pug">
+await('getChampions() then champions')
	.app-champion-select.h-full
		BorderPane
			//.layout-hbox(slot="top")
			.layout-vbox.h-full.pl-8.space-y-8(slot="left")
				+each('players[0] as player')
					PlayerCard(
						rtl="true",
						player="{player}",
						champion="{champions[player.champ]}")
			.layout-vbox.h-full(slot="center")
				.layout-hbox.w-full
					Teams(teams="{teams}", bestOf="{5}")
				.layout-hbox.space-x-4
					Bans(bans="{bans[0]}", champions="{champions}")
					Countdown(
						phase="{phase}",
						time="{time}")
					Bans(bans="{bans[1]}", champions="{champions}")
				Branding
			.layout-vbox.h-full.pr-8.space-y-8(slot="right")
				+each('players[1] as player')
					PlayerCard(
						player="{player}",
						champion="{champions[player.champ]}")
			//.layout-vbox(slot="bottom")
</template>

<style lang="postcss" global>
	.app-champion-select {
		background-image: url('/img/wallpaper/champion-nautilus.jpg');
		@apply w-full h-full
		flex items-center justify-center
		bg-slate-900 bg-cover bg-center;
		text-shadow: 0 0 4px rgb(0 0 0 / 75%);

		& .layout-bp-center > * {
			@apply justify-between py-8;
		}

		& .layout-bp-left > .layout-vbox > .app-player {
			&:nth-child(1),
			&:nth-child(5) {
				transform: translateX(3rem);
			}
			&:nth-child(2),
			&:nth-child(4) {
				transform: translateX(1rem);
			}
		}

		& .layout-bp-right > .layout-vbox > .app-player {
			&:nth-child(1),
			&:nth-child(5) {
				transform: translateX(-3rem);
			}
			&:nth-child(2),
			&:nth-child(4) {
				transform: translateX(-1rem);
			}
		}
	}
</style>
