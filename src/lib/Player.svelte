<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import BorderPane from '$lib/layout/BorderPane.svelte';

	export let d: player = {
		name: 'Unknown Player'
	};
</script>

<template lang="pug">
      .app-player
            BorderPane
                  div(slot="left")
                        .app-player-image-container
                              .app-player-image-crop
                                    img(src="/ornn.jpg", alt="#")
                  div(slot="center")
                        p.text-2xl.text-white { d.name }
                        p.text-lg.mb-1.text-slate-500 Picking ...
</template>

<style lang="postcss" global>
	.app-player {
		@apply w-96 h-32 overflow-hidden bg-slate-900 rounded-md
            shadow-lg backdrop-blur bg-opacity-25;
		backdrop-filter: blur(8px);

		& .layout-bp-left {
			@apply w-32 h-32 flex flex-col items-center justify-center;

			& .app-player-image-container {
				@apply overflow-hidden w-24 h-24 border-2 border-yellow-300 border-solid rounded-full;

				& .app-player-image-crop {
					@apply overflow-hidden w-full h-full flex items-center justify-center;

					& img {
						transform: scale(2);
						@apply h-28 bg-slate-600 mt-12;
					}
				}
			}
		}

		& .layout-bp-center {
			@apply flex items-center;
		}
	}
</style>
