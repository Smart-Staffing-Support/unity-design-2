<script setup>
const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  theme: { type: String, default: 'dark' },
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
        : theme === 'dark' ? 'color: white;' : 'color: #1e293b;'"
    >{{ value }}</span>
  </div>
</template>