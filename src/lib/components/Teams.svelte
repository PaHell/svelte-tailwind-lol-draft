<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	export let teams: [team, team];
	export let bestOf: number;
</script>

<template lang="pug">
.app-teams.app-blur
	+each('teams as team, tIdx')
		.layout-hbox
			img(src="{team.img}")
			.layout-vbox.flex-1
				p.text-orange-500.text-3xl.uppercase.font-bold {team.short}
				p.text-orange-200.text-xl {team.name}
				+if('bestOf !== 1')
					.layout-hbox.mt-2
						+each('Array(Math.round(bestOf/2)) as _, sIdx')
							.dot(class:active!="{sIdx <= team.score - 1}")
</template>

<style lang="postcss" global>
	.app-teams {
		@apply w-2/3 h-28
		overflow-hidden
		flex flex-row;

		& p {
			@apply w-full whitespace-nowrap text-ellipsis
			overflow-hidden;

			&:first-child {
				letter-spacing: 0.125rem;
			}
		}

		& > * {
			@apply flex-1 overflow-hidden p-4;

			&:first-child {
				border-right: 1px solid rgb(255 255 255 / 10%);
				@apply justify-end text-right;

				& > [class^='layout'] {
					@apply items-end;

					& > [class^='layout'] {
						@apply flex-row-reverse;
					}
				}
			}

			&:last-child {
				@apply flex-row-reverse;

				& > [class^='layout'] {
					@apply items-start;
				}
			}

			& > img {
				@apply w-20 h-20;
				filter: drop-shadow(0 0 8px rgb(0 0 0 / 50%));
			}

			& > [class^='layout'] {
				@apply overflow-hidden;
			}

			& .dot {
				@apply w-2 h-2 mx-1 rounded-full shadow-2xl;
				box-shadow: inset 0 0 0 1px rgb(255 255 255 / 10%);
				background-color: rgb(255 255 255 / 10%);

				&.active {
					@apply bg-orange-200;
				}
			}
		}
	}
</style>
