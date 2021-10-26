<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
</script>

<template lang="pug">
	.layout-border-pane
            header.layout-bp-top
                  slot(name="top")
            main.layout-bp-mid
                  aside.layout-bp-left
                        slot(name="left")
                  article.layout-bp-center
                        slot(name="center")
                  aside.layout-bp-right
                        slot(name="right")
            footer.layout-bp-bottom
                  slot(name="bottom")
</template>

<style lang="postcss" global>
	.layout-border-pane {
		@apply w-full h-full flex flex-col;

		& > main {
			@apply flex-1 flex flex-row;
			& > article {
				@apply flex-1;
			}
		}

		& > header,
		& > footer,
		& > main > aside {
			@apply flex-shrink-0;
		}
	}
</style>
