<template lang="pug">
.animate__bounceIn.app-branding
      img.mr-2(src="/img/logo.png", alt="Tournament Logo")
      p.text-orange-200.text-4xl Kivitas
      p.text-blue-200.text-2xl.mt-2.ml-2 LoL Tournament
</template>

<style lang="postcss" global>
	.app-branding {
		@apply w-2/3 h-28 flex flex-row items-center justify-center;

		& > img {
			@apply h-14;
			filter: drop-shadow(0 0 8px rgb(0 0 0 / 50%));
		}

		& > p {
			@apply w-auto;
		}
	}
</style>
