<template>
  <div
    class="d-flex flex-column pa-4 rounded-xl"
    :style="isTotal
      ? 'background: #2563eb; box-shadow: 0 4px 16px rgba(37,99,235,0.2);'
      : isDark
        ? 'background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05);'
        : 'background: #f0f9ff; border: 1px solid rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
  >
    <span
      class="font-weight-black mb-1"
      style="font-size: 14px; letter-spacing: 0.2em;"
      :class="isTotal ? 'text-white' : (isDark ? 'text-cyan-lighten-2' : 'text-blue-darken-1')"
    >
      {{ label }}
    </span>
    <span
      class="text-subtitle-1 font-weight-black"
      :class="isTotal ? 'text-white' : (isDark ? 'text-white' : 'text-grey-darken-2')"
    >
      {{ value }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  isTotal: { type: Boolean, default: false },
  theme: { type: String, default: 'light' },
})

const isDark = computed(() => props.theme === 'dark')
</script>