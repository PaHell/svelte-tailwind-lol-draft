<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	export let time: number = 0;
	export let phase: string = 'No Phase';

	onMount(() => {
		const interval = setInterval(() => {
			if (time > 0) time -= 1;
			else clearInterval(interval);
		}, 1000);
	});
</script>

<template lang="pug">
.app-countdown.app-blur
	.app-countdown-time
		p(class:is_null!="{time / 10 < 1}") { Math.trunc(time / 10) }
		p(class:is_null!="{time === 0}") { time % 10 }
	.layout-vbox.flex-1
		p.text-xl.text-orange-200 { phase }
		p.text-sm.text-orange-400.uppercase Phase
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
	}
</style>
