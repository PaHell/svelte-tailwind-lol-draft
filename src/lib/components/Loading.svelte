<template lang="pug">
.app-loading
	svg(xmlns="http://www.w3.org/2000/svg", fill="none")
		rect(
			x="0",
			y="0",
			width="100%",
			height="100%",
		)
</template>

<style lang="postcss" global>
	.app-loading {
		--app-loading-scope: 54.3rem;
		@apply fixed pointer-events-none;

		& .app-loading-gradient {
			@apply w-full h-full;
			opacity: 0.25;
			background-image: conic-gradient(
				from 270deg,
				#ff4800 10%,
				#dfd902 35%,
				#20dc68,
				#0092f4,
				#da54d8 72% 75%,
				#ff4800 95%
			);
		}
		& svg {
			width: 100%;
			height: 100%;
			& .app-loading-blend {
				mix-blend-mode: lighten;
			}

			/* 54.3rem */
			& rect {
				rx: 1rem;
				ry: 1rem;
				stroke-linejoin: round;
				paint-order: stroke;
				stroke: #fb923c;
				stroke-width: 2px;
				stroke-dashoffset: calc(var(--app-loading-scope) / 4);
				stroke-dasharray: calc(var(--app-loading-scope) / 4);
				animation: loading 8s infinite linear;
				/*
				*/
			}
		}
	}

	@keyframes loading {
		from {
			stroke-dashoffset: calc(var(--app-loading-scope) / 1);
		}
		to {
			stroke-dashoffset: calc(var(--app-loading-scope) * 0);
		}
	}
</style>
