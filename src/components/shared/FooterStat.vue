<script setup>
import { computed } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  highlight: { type: Boolean, default: false },
})
</script>

<template>
  <div class="d-flex flex-column">
    <span class="text-body-2" style="color: #3b82f6;">{{ label }}</span>
    <span
      class="text-body-2 font-weight-bold"
      :style="highlight
        ? 'color: #22c55e;'
        : isDark  ? 'color: white;' : 'color: #1e293b;'"
    >{{ value }}</span>
  </div>
</template>