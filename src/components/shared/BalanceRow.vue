<template>
  <div
    class="d-flex justify-space-between align-end pb-2"
    style="border-bottom: 1px solid;"
    :style="isDark ? 'border-color: rgba(255,255,255,0.05);' : 'border-color: #e2e8f0;'"
  >
    <span
      class="text-sm font-weight-bold"
      :class="isDark ? 'text-white' : 'text-grey-darken-2'"
    >
      {{ label }}
    </span>
    <span
      class="text-subtitle-1 font-weight-black"
      :class="isDark ? 'text-white' : 'text-grey-darken-4'"
    >
      {{ value }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'



  const props = defineProps ({
    label: { type: String, required: true },
    value: { type: String, required: true },
    theme: { type: String, default: 'light' },
  })

    const isDark = computed(() => props.theme === 'dark')

</script>