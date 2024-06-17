<script lang="ts">
	import { onMount } from 'svelte';
	import { globalState, config, error, teams } from '../store';
	import BorderPane from '$lib/layout/BorderPane.svelte';
	import Countdown from '$lib/components/Countdown.svelte';
	import Bans from '$lib/components/Bans.svelte';
	import Scoreboard from '$lib/components/Scoreboard.svelte';
	import Branding from '$lib/components/Branding.svelte';
	import Picks from '$lib/components/Picks.svelte';

	let errorDetails = '';

	onMount(() => {
        Window.PB.on('newState', state => {
            globalState.set(state.state);
            config.set(state.state.config);
        });

        Window.PB.on('heartbeat', hb => {
            console.info(`Got new config: ${JSON.stringify(hb.config)}`);
            config.set(hb.config);
        });

        try {
            Window.PB.start();
		if (Window.PB.getQueryVariable('status') === '1') {
			const status = {
				backend: Window.PB.getQueryVariable('backend'),
				error: error,
				config: config,
			}
			errorDetails = `${JSON.stringify(status, undefined, 4)}`;
		}
        } catch {
            error.set('error: failed to read backend url query param. make sure you set ?backend=ws://[ip]:[port] as query parameter.')
        }
	});
</script>

<svelte:head>
	<title>Champ Select</title>
</svelte:head>

<template lang="pug">
	.app-champion-select.h-full
		BorderPane
			.layout-vbox.h-full.pl-8.space-y-8(slot="left")
				Picks(team="{teams.BLUE}")
			.layout-vbox.h-full(slot="center")
				.layout-vbox.w-full.h-full
					Scoreboard(order="{[teams.BLUE, teams.RED]}")
					.layout-hbox.space-x-4
						Bans(team="{teams.BLUE}")
						Countdown
						Bans(team="{teams.RED}")
					+if('errorDetails')
						p.text.text-red-500 {errorDetails}
				Branding
			.layout-vbox.h-full.pr-8.space-y-8(slot="right")
				Picks(team="{teams.RED}")
</template>

<style lang="postcss" global>
	.app-champion-select {
		@apply w-full h-full
		flex items-center justify-center;
		text-shadow: 0 0 4px rgb(0 0 0 / 75%);

		& .layout-bp-center > * {
			@apply justify-between py-8;
		}

		& .layout-bp-left > .layout-vbox > .app-player {
			&:nth-child(1),
			&:nth-child(5) {
				transform: translateX(5rem);
			}
			&:nth-child(2),
			&:nth-child(4) {
				transform: translateX(2rem);
			}
		}

		& .layout-bp-right > .layout-vbox > .app-player {
			&:nth-child(1),
			&:nth-child(5) {
				transform: translateX(-5rem);
			}
			&:nth-child(2),
			&:nth-child(4) {
				transform: translateX(-2rem);
			}
		}
	}
</style>
