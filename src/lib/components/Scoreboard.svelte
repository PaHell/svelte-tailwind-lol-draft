<script lang="ts">
	import { onMount } from "svelte";

	export let order: [string, string];

	let config: CookieConfig;

	onMount(() => {
		setInterval(() => {
			const stored = localStorage.getItem("config");
			if (stored != null) {
				config = JSON.parse(stored);
				console.log(config);
				config = config;
			}
		}, 1000);
	});
</script>

<template lang="pug">
+if('config?.blueTeam != null && config?.redTeam != null && config?.teams?.length >= 2')
	.animate__bounceIn.app-teams.app-blur
			+each('order as teamStr, index')
				.layout-hbox
					img(src="{`/img/teams/${config.teams[config[teamStr]].short}.png`}", alt="")
					.layout-vbox.flex-1
						p.animate__bounceIn.text-orange-500.text-4xl.uppercase.font-bold {config.teams[config[teamStr]].short}
						p.animate__bounceIn.text-orange-200.text-2xl {config.teams[config[teamStr]].name}
						+if('config.bestOf !== 1')
							.layout-hbox.mt-2
								+each('Array(Math.round(config.bestOf/2)) as _, index')
									.animate__bounceIn.dot(class:active!="{index <= config.teams[config[teamStr]].score - 1}")
</template>

<style lang="postcss" global>
	.app-teams {
		width: 36rem;
		@apply mx-4 mb-4 overflow-hidden
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
