<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { globalState, config, teams } from "$lib/../store";
	import PlayerCard from '$lib/components/PlayerCard.svelte';
	
	export let team: string;
	let picks : ChampionBan[] = [];

	globalState.subscribe((val : GlobalState) => {
		console.log('Updating Picks');
		if (val?.[team]?.picks) {
			picks = val[team].picks;
			console.log(picks);
		}
	});

	const roleIcons = [
		"/img/roles/top.svg",
		"/img/roles/jngl.svg",
		"/img/roles/mid.svg",
		"/img/roles/adc.svg",
		"/img/roles/supp.svg"
	];
</script>

<template lang="pug">
	+if('$globalState?.[team]?.picks')
		+each('$globalState[team].picks as player, index')
			PlayerCard(
				rtl="{team === teams.BLUE}",
				player="{player}",
				role="{roleIcons[index]}")
</template>

<style lang="postcss" global>
</style>
