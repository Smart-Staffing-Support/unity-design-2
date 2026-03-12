<template>
  <div class="d-flex flex-column ga-2" :class="className">
    <label
      class="text-body-2"
      style="letter-spacing: 0.15em;"
      :class="isDark ? 'text-cyan-lighten-2' : 'text-blue-darken-1'"
    >
      {{ props.label }}
    </label>
    <div class="d-flex align-center ga-2">
      <input
        type="date"
        class="date-input w-100"
        :class="isDark ? 'date-dark' : 'date-light'"
      />
      <span class="text-grey-darken-1 font-weight-bold">-</span>
      <input
        type="date"
        class="date-input w-100"
        :class="isDark ? 'date-dark' : 'date-light'"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

  const props = defineProps({
    label: { type: String, required: true },
    theme: { type: String, default: 'light' },
    className: { type: String, default: '' },
  })

  const isDark = computed(() => props.theme === 'dark')
</script>

<style scoped>
.date-input {
  appearance: none;
  padding: 10px 16px;
  border-radius: 12px;
  border-width: 1px;
  border-style: solid;
  outline: none;
  font-size: 0.75rem;
  transition: background-color 0.2s, border-color 0.2s;
}

.date-dark {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  color-scheme: dark;
}
.date-dark:hover { background-color: rgba(255, 255, 255, 0.1); }
.date-dark:focus { border-color: rgba(59, 130, 246, 0.5); }

.date-light {
  background-color: #f1f5f9;
  border-color: #94a3b8;
  color: #1e293b;
}
.date-light:hover { background-color: #e2e8f0; }
.date-light:focus { border-color: rgba(37, 99, 235, 0.5); }
</style>
