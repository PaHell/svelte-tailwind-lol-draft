<script lang="ts">
      export let spell : Spell;
</script>

<template lang="pug">
.animate__bounceIn.app-spell
      +if('spell.icon')
            img.animate__bounceIn(src="{import.meta.env.VITE_URL_BACKEND + spell.icon}", alt="")
</template>

<style lang="postcss" global>
      .app-spell {
            @apply w-8 h-8
            rounded-md
            overflow-hidden
            flex justify-center items-center
            transition-shadow;

            & img {
                  width: 2.125rem;
                  height: 2.125rem;
            }

            &:after {
                  content: '';
                  @apply fixed block w-8 h-8 rounded-md;
                  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 35%);
            }
      }
</style>
