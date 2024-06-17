<script lang="ts">
	import { globalState, config } from "$lib/../store";

	export let team: string;
	let showBans: boolean = false;
	let bans : ChampionBan[] = [];

	globalState.subscribe((val : GlobalState) => {
		console.log('Updating Bans');
		showBans = !!val?.blueTeam?.bans?.length
			&& !!val?.redTeam?.bans?.length;
		if (val?.[team]?.bans) {
			bans = val[team].bans;
			console.log({bans});
		}
	});
</script>

<template lang="pug">
+if('showBans')
	.animate__bounceIn.app-bans.app-blur
		+each('Array(5) as _, i')
			.app-ban-img(class:active="{bans?.[i]?.isActive}")
				+if('bans[i]?.champion?.squareImg')
					img.animate__bounceIn(src="{import.meta.env.VITE_URL_BACKEND + bans[i].champion.squareImg}", alt="")
					+else
						svg.animate__bounceIn(xmlns="http://www.w3.org/2000/svg")
							line(x1="10%",y1="10%",x2="90%",y2="90%")
</template>

<style lang="postcss" global>
	.app-bans {
		@apply h-12 p-2
		flex flex-row;

		& .app-ban-img {
			@apply w-8 h-8
			rounded-lg
			overflow-hidden
			flex justify-center items-center
			transition-shadow;

			&:not(:last-child) {
				@apply mr-2;
			}

			& img {
				width: 120%;
				height: 120%;
			}

			& svg {
				@apply w-4 h-4 flex-shrink-0;

				& line {
					fill: none;
					stroke: #ef4444;
					stroke-width: 2px;
					stroke-linecap: round;
					filter: drop-shadow(0 0 1px black);
				}
			}

			&:after {
				content: '';
				@apply fixed block w-8 h-8 rounded-lg transition-shadow;
				box-shadow: inset 0 0 0 1px rgb(255 255 255 / 10%);
			}

			&.active {
				animation: glow 2s infinite ease;

				&:after {
					box-shadow: inset 0 0 0 1px #ef4444;
				}
			}
		}
	}

	@keyframes glow {
		0%,100% {
			box-shadow: 0 0 1px rgb(239 68 68 / 1), 0 0 4px rgb(239 68 68 / .6);
		}
		50% {
			box-shadow: 0 0 1px rgb(239 68 68 / 1), 0 0 12px rgb(239 68 68 / .6);
		}
	}
</style>
