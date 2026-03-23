<template>
  <div class="d-flex flex-column ga-2">
    <label class="text-body-2 multi-select-label text-mss_label">
      {{ label }}
    </label>

    <div
      class="position-relative d-flex align-center justify-space-between pa-3 rounded-lg border-sm border-opacity-100 cursor-pointer multi-select-trigger bg-mss_trigger_bg border-mss_trigger_border text-mss_trigger_text"
      :class="hoverClass"
    >
      <span class="multi-select-placeholder text-caption font-weight-bold font-italic text-mss_placeholder">
        Select Multiple...
      </span>
      <ChevronDown :size="14" class="multi-select-chevron text-mss_placeholder" />

      <span
        v-if="isFilter"
        class="advanced-filter-badge position-absolute font-weight-bold text-white rounded bg-mss_filter_badge"
      >
        Advanced Filter
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { useTheme } from 'vuetify'

defineProps({
  label: { type: String, required: true },
  isFilter: { type: Boolean, default: false },
})

const vuetifyTheme = useTheme()
const hoverClass = computed(() =>
  vuetifyTheme.global.current.value.dark ? 'mss-hover-dark' : 'mss-hover-light'
)
</script>

<style scoped>
.multi-select-label {
  letter-spacing: 0.15em;
}

.multi-select-trigger {
  min-height: 44px;
  transition: background 0.2s, border-color 0.2s;
}

.mss-hover-light:hover {
  background: #E2E8F0;
  border-color: #90A1B9;
}

.mss-hover-dark:hover {
  background: #232E43;
  border-color: #303848;
}

.multi-select-placeholder {
  font-size: 13px;
  line-height: 1;
}

.advanced-filter-badge {
  bottom: -20px;
  right: 12px;
  font-size: 10px;
  padding: 2px 4px;
}
</style>