<template>
  <div class="d-flex flex-column ga-1">
    <span
      class="font-weight-black text-uppercase mb-1"
      style="font-size: 12px; letter-spacing: 0.15em;"
      :class="isDark ? 'text-cyan-lighten-2' : 'text-blue-darken-1'"
    >
      {{ label }}
    </span>
    <span
      class="text-subtitle-1 font-weight-black"
      :style="!value
        ? (isDark ? 'color: rgba(255,255,255,0.1);' : 'color: #94a3b8;')
        : highlight
          ? 'color: #48c78e;'
          : (isDark ? '' : '')"
      :class="!value || highlight ? '' : (isDark ? 'text-white' : 'text-grey-darken-4')"
    >
      {{ value || '—' }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'


  const props = defineProps ({
    label: { type: String, required: true },
    value: { type: String, default: null },
    highlight: { type: Boolean, default: false },
    theme: { type: String, default: 'light' },
  })

    const isDark = computed(() => props.theme === 'dark')

</script>