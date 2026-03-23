<template>
  <span
    class="font-weight-bold rounded-pill px-3 py-1 importance-pill"
    :class="importanceClass"
  >
    {{ formattedLabel }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  level: { type: String, required: true },
})

const importanceClass = computed(() => {
  const levelToClass = {
    urgent: 'bg-importance_urgent_bg importance-pill__text--urgent',
    'super high': 'bg-importance_super_high_bg importance-pill__text--super-high',
    high: 'bg-importance_high_bg importance-pill__text--high',
    medium: 'bg-importance_medium_bg importance-pill__text--medium',
    low: 'bg-importance_low_bg importance-pill__text--low',
    none: 'bg-importance_none_bg importance-pill__text--none',
  }

  return levelToClass[props.level] ?? levelToClass.none
})

const formattedLabel = computed(() =>
  props.level.charAt(0).toUpperCase() + props.level.slice(1) + ' priority'
)
</script>

<style scoped>
.importance-pill {
  font-size: 12px;
}

.importance-pill__text--urgent {
  color: #ef4444;
}
.importance-pill__text--super-high {
  color: #f97316;
}
.importance-pill__text--high {
  color: #ef4444;
}
.importance-pill__text--medium {
  color: #f59e0b;
}
.importance-pill__text--low {
  color: #3b82f6;
}
.importance-pill__text--none {
  color: #64748b;
}
</style>
