<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { globalState } from "$lib/../store";

	let time: number = 0;
	let phase: string|null = null;

	globalState.subscribe((val : GlobalState) => {
		time = val.timer ? val.timer : 0;
		if (val?.blueTeam?.bans?.find(b => b.isActive)
		|| val?.redTeam?.bans?.find(b => b.isActive))
			phase = 'Ban';
		else if (val?.blueTeam?.picks?.find(b => b.isActive)
		|| val?.redTeam?.picks?.find(b => b.isActive))
			phase = 'Pick';
		else if (val?.blueTeam?.picks?.length && val?.redTeam?.picks?.length)
			phase = 'Final';
		else phase = null;
	});
</script>

<template lang="pug">
+if('phase != null')
	.animate__bounceIn.app-countdown.app-blur
		.app-countdown-time
			p(class:is_null!="{time / 10 < 1}") { Math.trunc(time / 10) }
			p(class:is_null!="{time === 0}") { time % 10 }
		.layout-vbox.flex-1(class="phase-{phase.toLowerCase()}")
			p.text-xl { phase }
			p.text-sm.uppercase.mb-1 Phase
	+else
		p.text-3xl.mt-4.text-orange-200 Game will start soon...
</template>

<style lang="postcss" global>
	.app-countdown {
		@apply w-64 h-24 px-2
		flex flex-row;

		& > * {
			@apply flex-1 px-2;
		}

		& > .app-countdown-time {
			@apply flex-1 flex flex-row items-center justify-center;
			border-right: 1px solid rgb(255 255 255 / 10%);

			& * {
				@apply flex-1 text-6xl text-white font-light;

				&:first-child {
					@apply mr-1 text-right;
				}

				&.is_null {
					@apply text-orange-200;
				}
			}
		}

		& .phase-ban {
			& > p:first-child { @apply text-red-200; }
			& > p:last-child { @apply text-red-400; }
		}
		& .phase-pick {
			& > p:first-child { @apply text-orange-200; }
			& > p:last-child { @apply text-orange-400; }
		}
		& .phase-final {
			& > p:first-child { @apply text-blue-200; }
			& > p:last-child { @apply text-blue-400; }
		}
	}
</style>
