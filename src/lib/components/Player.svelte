<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import BorderPane from '$lib/layout/BorderPane.svelte';

	export let d: player = {
		name: 'Unknown Player',
		role: 'top',
		champ: null,
		status: 'hover'
	};
</script>

<template lang="pug">
.app-player(class="{d.status}")
	BorderPane
		div(slot="left")
			.app-player-image-container
				.app-player-image-crop
					+if('d.champ')
						img.champ.text-xs(src="{`/img/champs/${d.champ}.jpg`}",
							alt="{`icon for champion ${d.champ}`}")
						+else
							img.nochamp(src="/img/nochamp.jpg", alt="icon for no champion locked")
			+if('d.status === "hover"')
				.app-player-hover
					img(src="/img/hover.svg", alt="champ hover")
		.layout-vbox-left(slot="center")
			p.text-2xl { d.name }
			p.text-lg.mb-1.text-orange-200 Picking ...
		.layout-hbox(slot="right")
			img(src="{`/img/roles/${d.role}.png`}", alt="{`role icon ${d.role}`}")
</template>

<style lang="postcss" global>
	.app-player {
		@apply w-96 h-32 bg-slate-900 rounded
            shadow-3xl backdrop-blur-md bg-opacity-75 backdrop-saturate-200;
		text-shadow: 0 1px 4px black;
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 8px 36px -4px rgba(0, 0, 0, 0.75);

		& .layout-bp-left {
			@apply w-32 h-32 flex flex-col items-center justify-center;

			& .app-player-image-container {
				@apply overflow-hidden w-24 h-24 p-1 rounded-full;
				@apply bg-gradient-to-b from-yellow-800 to-orange-900;
				box-shadow: 0 0 4px black;

				& .app-player-image-crop {
					@apply overflow-hidden w-full h-full flex items-center justify-center rounded-full;

					& img {
						&.champ {
							transform: scale(2);
							@apply h-24 mt-20;
						}
						&.nochamp {
							@apply h-24;
						}
					}
				}
				&:after {
					content: '';
					margin-top: -5.5rem;
					width: 5.5rem;
					height: 5.5rem;
					position: relative;
					@apply block overflow-hidden rounded-full;
					box-shadow: inset 0 0 8px 2px black;
				}
			}

			& .app-player-hover {
				@apply -mt-24 relative scale-150;

				& img {
					@apply h-24;
					animation: rotate 2s infinite linear;
					will-change: transform;
				}
			}
		}

		& .layout-bp-center {
			@apply flex items-center text-white;
		}

		& .layout-bp-right {
			@apply flex items-center h-full mr-4;

			& img {
				filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.75));
			}
		}

		&.active {
			@apply scale-100;
		}

		&.hover {
		}

		&.locked {
			& .app-player-image-container {
				@apply rounded-xl;
				@apply bg-gradient-to-b from-yellow-600 via-orange-500 to-orange-700;
				&:after,
				& .app-player-image-crop {
					@apply rounded-lg;
				}
			}
		}
	}

	@keyframes rotate {
		to {
			transform: rotate(360deg);
		}
	}
</style>
