<template>
  <span
    class="font-weight-bold rounded-pill px-3 py-1"
    style="font-size: 12px;"
    :style="pillStyle"
  >
    {{ formattedLabel }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  level: { type: String, required: true },
})

const pillStyle = computed(() => {
  const styles = {
    'urgent':     'background: #000000; color: #ef4444;',
    'super high': 'background: rgba(194,65,12,0.2);  color: #f97316;',
    'high':       'background: rgba(249,115,22,0.2); color: #ef4444;',
    'medium':     'background: rgba(245,158,11,0.1); color: #f59e0b;',
    'low':        'background: rgba(59,130,246,0.1); color: #3b82f6;',
    'none':       'background: rgba(100,116,139,0.1); color: #64748b;',
  }
  return styles[props.level] ?? styles['none']
})

const formattedLabel = computed(() =>
  props.level.charAt(0).toUpperCase() + props.level.slice(1) + ' priority'
)
</script>
