<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import type { appChampion } from '$lib/riot';

	export let rtl: boolean = false;
	export let player: player = {
		name: 'Unknown Player',
		role: 'top',
		champ: null,
		status: 'hover'
	};
	export let champion: appChampion | undefined;
</script>

<template lang="pug">
.app-player(class="{player.status}", class:rtl="{rtl}")
	.app-player-image
		+if('player.champ')
			img.champ(
				src="{champion.img}",
				alt="{`icon for champion ${champion.name}`}"
			)
			+else
				img.nochamp(src="/img/nochamp.jpg", alt="icon for no champion locked")
	.layout-vbox-left
		p.text-xl.text-white { player.name }
		+if('player.champ')
			p.text-md.text-orange-200 { champion.name }
			p.text-sm.text-orange-400.mb-1 { champion.desc }
	.layout-hbox
		img(
			src="{`/img/roles/${player.role}.svg`}",
			alt="{`role icon ${player.role}`}"
		)
</template>

<style lang="postcss" global>
	.app-player {
		width: 28rem;
		@apply w-96 h-32 p-4
		flex flex-row 
		bg-slate-900 rounded-2xl backdrop-blur-lg bg-opacity-60 backdrop-saturate-200;
		text-shadow: 0 0 4px rgb(0 0 0 / 75%);
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 10%), 0 25px 50px -12px rgb(0 0 0 / 0.25);

		& .app-player-image {
			@apply overflow-hidden w-24 h-24
			flex items-center justify-center
			rounded-lg shadow-2xl;

			& img.champ {
				@apply flex-shrink-0;
				width: 6.6rem;
				margin-top: 4.5rem;
				max-width: none;
			}
			& img.nochamp {
				@apply w-full;
			}
			&:after {
				content: '';
				@apply fixed block w-24 h-24 rounded-lg;
				box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.2);
			}
		}

		/* mid: text area */
		& div:nth-child(2) {
			@apply overflow-hidden flex-1 pl-4;

			& * {
				@apply overflow-hidden w-full
				text-ellipsis whitespace-nowrap capitalize;
			}
		}

		/* end: role icon */
		& div:nth-child(3) {
			@apply flex items-center h-full;

			& img {
				width: 2.25rem;
				@apply drop-shadow-2xl;
			}
		}

		&.rtl {
			@apply flex-row-reverse;

			& div:nth-child(2) {
				@apply pl-0 pr-4 text-right;
			}
		}

		&.active {
			@apply scale-100;
		}

		&.hover {
		}

		&.locked {
		}
	}

	@keyframes rotate {
		to {
			transform: rotate(360deg);
		}
	}
</style>
