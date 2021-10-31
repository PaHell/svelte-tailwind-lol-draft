<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
</script>

<template lang="pug">
.app-branding
      img.mr-2(src="/img/logo.png", alt="Tournament Logo")
      p.py-4.text-orange-200.text-center.text-4xl Branding
</template>

<style lang="postcss" global>
	.app-branding {
		@apply w-2/3 flex flex-row items-center justify-center;

		& > img {
			@apply h-14;
			filter: drop-shadow(0 0 8px rgb(0 0 0 / 50%));
		}

		& > p {
			@apply w-auto;
		}
	}
</style>
