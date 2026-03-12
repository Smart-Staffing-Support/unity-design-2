<template>
  <v-card
    class='w-100 pa-4 mb-8 overflow-hidden position-relative border-thin bg-container border-container_border'
    style="border-radius: 25px; transition: all 0.5s;"
    :style="isDark ? 'border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(40px);' : 'border: 1px solid #cbd5e1; box-shadow: 0 4px 24px rgba(15,23,42,0.15); backdrop-filter: blur(40px);'"
    elevation="0"
  >
    <slot />
  </v-card>
</template>

<script setup>
import { useTheme } from 'vuetify';

  const theme = useTheme()
  const isDark = computed(() => theme.global.current.value.dark)
</script>