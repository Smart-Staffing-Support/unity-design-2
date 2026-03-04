<template>
  <div class="d-flex flex-column">
    <span
      class="font-weight-black mb-1"
      style="font-size: 12px; letter-spacing: 0.15em;"
      :style="isDark ? 'color: rgba(255,255,255,0.8);' : ''"
      :class="!isDark ? 'text-grey-darken-2' : ''"
    >
      {{ label }}
    </span>
    <div class="d-flex align-baseline ga-2">
      <span
        class="text-h6 font-weight-black"
        :class="isDark ? 'text-white' : 'text-grey-darken-3'"
      >
        {{ value || '—' }}
      </span>
      <span
        v-if="subValue"
        class="text-caption font-weight-bold text-grey"
      >
        / {{ subValue }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineProps({
  label: { type: String, required: true },
  value: { type: String, default: null },
  subValue: { type: String, default: null },
  theme: { type: String, default: 'light' },
})

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, default: null },
  subValue: { type: String, default: null },
  theme: { type: String, default: 'light' },
})

const isDark = computed(() => props.theme === 'dark')
</script>