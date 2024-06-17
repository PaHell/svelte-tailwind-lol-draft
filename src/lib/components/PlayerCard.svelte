<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import Spell from '$lib/components/Spell.svelte';
	import { globalState, config } from "$lib/../store";
	import { getChampion } from '$lib/riot';

	export let rtl: boolean = false;
	export let player : ChampionPick;
	export let role : string;
</script>

<template lang="pug">
.animate__bounceIn.app-player.app-blur(class:active="{player.isActive}")
	+if('player.isActive')
		Loading
	.layout-hbox(class:rtl="{rtl}")
		.app-player-image
			+if('player.champion.loadingImg')
				img.animate__bounceIn.champ(src="{import.meta.env.VITE_URL_BACKEND + player.champion.squareImg}", alt="")
				+else
					img.animate__bounceIn.nochamp(src="/img/nochamp.png", alt="icon for no champion locked")
		.app-player-spells
			Spell(spell="{player.spell1}")
			Spell(spell="{player.spell2}")
		.app-player-text.layout-vbox-left
			+if('player.displayName')
				p.animate__bounceIn.text-xl.text-white { player.displayName }
			+if('player.champion.name')
				p.animate__bounceIn.text-md.text-orange-200 { player.champion.name }
				+await('getChampion(player.champion.idName) then ddChamp')
					p.text-sm.text-orange-400.mb-1 { ddChamp.desc }
		+if('role')
			.app-player-role.layout-hbox
				img.animate__bounceIn(
					src="{role}",
					alt="role icon"
				)
</template>

<style lang="postcss" global>
	.app-player,
	.app-player > .app-loading {
		@apply h-28 overflow-hidden;
		width: 21rem;
	}
	.app-player.picking {
		@apply bg-slate-900 bg-opacity-70;
	}
	.app-player [class^='layout'] {
		@apply p-4;

		& .app-player-image {
			@apply overflow-hidden w-20 h-20
			flex items-center justify-center
			rounded-lg shadow-2xl;

			& img.champ {
				@apply flex-shrink-0;
				width: 5.75rem;
				height: 5.75rem;
			}
			& img.nochamp {
				@apply w-full bg-slate-900 bg-opacity-70;
			}
			&:after {
				content: '';
				@apply fixed block w-20 h-20 rounded-lg;
				box-shadow: inset 0 0 0 1px rgb(255 255 255 / 35%);
			}
		}

		& .app-player-text {
			@apply overflow-hidden flex-1 pl-4;

			& * {
				@apply overflow-hidden w-full
				text-ellipsis whitespace-nowrap capitalize;
			}
		}

		& .app-player-role {
			@apply flex items-center h-full;

			& img {
				width: 24px;
				@apply drop-shadow-2xl;
			}
		}

		& .app-player-spells {
			@apply flex flex-col items-center
				h-full pl-2;

			& > *:not(:last-child) {
				@apply mb-2;
			}
		}

		&.rtl {
			@apply flex-row-reverse;

			& .app-player-spells {
				@apply pl-0 pr-2;
			}

			& .app-player-text {
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
