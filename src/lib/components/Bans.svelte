<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import type { appChampion } from '$lib/riot';

	export let bans: string[] | [] = [];
	export let champions: appChampion[];
</script>

<template lang="pug">
.app-bans.app-blur
	+each('bans as ban')
		.app-ban-img
			img(src="{champions[ban].img.square}", alt="{`icon of ${champions[ban].name}`}")
</template>

<style lang="postcss" global>
	.app-bans {
		@apply h-12 p-2
		flex flex-row;

		& .app-ban-img {
			@apply w-8 h-8
			rounded-lg
			overflow-hidden
			flex justify-center items-center;

			&:not(:last-child) {
				@apply mr-2;
			}

			& img {
				@apply w-9 h-9;
			}

			&:after {
				content: '';
				@apply fixed block w-8 h-8 rounded-lg;
				box-shadow: inset 0 0 0 1px rgb(255 255 255 / 10%);
			}
		}
	}
</style>
