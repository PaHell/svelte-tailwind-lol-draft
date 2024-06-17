<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import BorderPane from '$lib/layout/BorderPane.svelte';

	let config : CookieConfig = {
		blueTeam: null,
		redTeam: null,
		bestOf: 1,
		teams: []
	};
	let input : CookieTeam = {
		short: "",
		name: "",
		score: 0
	};
	let inputBestOf = 5;

	if (browser) {
		const stored = localStorage.getItem("config");
		if (stored != null) config = JSON.parse(stored);
	}

	function addTeam(event : Event) {
		event.preventDefault();
		console.log("Adding Team");
		config.teams.push({...input});
		config.teams = config.teams;
		config = config;
		save();
	}

	function removeTeam(index : number) {
		console.log("Removing Team");
		config.teams.splice(index, 1);
		config.teams = config.teams;
		config = config;
		save();
	}

	function setRed(index : number) {
		console.log("Set Red Team");
		config.redTeam = index;
		config = config;
		save();
	}

	function setBlue(index : number) {
		console.log("Set Blue Team");
		config.blueTeam = index;
		config = config;
		save();
	}

	function setBestOf() {
		console.log("Set BestOf");
		config.bestOf = inputBestOf;
		config = config;
		save();
	}

	function updateScore(index, value) {
		console.log("Update Score", index, value);
		config.teams[index] = value;
		config.teams = config.teams;
		config = config;
		save();
	}

	function save() {
		if (browser) {
			localStorage.setItem("config", JSON.stringify(config, null, 2));
		}
	}
</script>

<svelte:head>
	<title>Setup</title>
</svelte:head>

<template lang="pug">
	BorderPane
		p(slot="top").text.text-3xl.p-4 Setup
		div(slot="left")
			.flex.flex-col.space-y-4.border.p-4.ml-4.mb-4
				p.text-lg Best Of
				input.border(
					placeholder="Best Of",
					type="number",
					bind:value="{inputBestOf}")
				button.p-4.bg-blue-500(on:click!="{() => setBestOf()}") Save
			.flex.flex-col.space-y-4.border.p-4.ml-4
				p.text-lg New Team
				input.border(
					autofocus
					placeholder="short / icon",
					bind:value="{input.short}")
				input.border(
					placeholder="name",
					bind:value="{input.name}")
				input.border(
					placeholder="score",
					type="number",
					bind:value="{input.score}")
				button.p-4.bg-blue-500(on:click!="{(e) => addTeam(e)}") Add
		div(slot="center").px-8.py-4
			p.text-lg.mb-4 All Teams
			table.w-full
				tr.h-12
					th Short
					th Name
					th Score
					th.w-0 -
				+each('config.teams as team, index')
					tr
						td { team.short }
						td { team.name }
						td
							input.border(
								placeholder="score",
								type="number",
								on:change!="{() => save()}"
								bind:value="{team.score}")
						td
							.flex
								button.p-4.bg-blue-300(on:click!="{() => setBlue(index)}") Blue
								button.p-4.mr-4.bg-red-300(on:click!="{() => setRed(index)}") Red
								button.p-4.bg-red-500(on:click!="{() => removeTeam(index)}") Remove
</template>

<style lang="postcss" global>
</style>
