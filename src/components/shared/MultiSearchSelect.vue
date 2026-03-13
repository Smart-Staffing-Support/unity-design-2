<template>
  <div class="d-flex flex-column ga-2">
    <label
      class="text-body-2"
      style="letter-spacing: 0.15em;"
      :class="isDark ? 'text-cyan-lighten-2' : 'text-blue-darken-1'"
    >
      {{ label }}
    </label>
    <div
      class="position-relative d-flex align-center justify-space-between pa-3 rounded-xl multi-select"
      style="border: 1px solid; transition: background 0.2s, border-color 0.2s; cursor: pointer;"
      :style="isDark
        ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); color: #ffffff;'
        : 'background: #f1f5f9; border-color: #94a3b8; color: #1e293b;'"
    >
      <span class="text-caption font-weight-bold text-grey font-italic">Select Multiple...</span>
      <ChevronDown :size="14" class="text-grey" />
      <span
        v-if="isFilter"
        class="position-absolute font-weight-bold text-white"
        style="bottom: -20px; right: 12px; background: #f97316; font-size: 10px; padding: 2px 4px; border-radius: 4px;"
      >
        Advanced Filter
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps({
  label: { type: String, required: true },
  theme: { type: String, default: 'light' },
  isFilter: { type: Boolean, default: false },
})

const isDark = computed(() => props.theme === 'dark')
</script>

<style scoped>
.multi-select:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}
</style>