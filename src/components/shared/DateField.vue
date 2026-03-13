<template>
  <div class="d-flex flex-column ga-2 w-100">
    <label class="text-body-2 text-capitalize text-fields_label ls-widest">
      {{ props.label }}
    </label>
    <input
      type="date"
      class="date-field w-100 bg-fields_bg border-fields_border text-fields_text"
      :class="isDark ? 'date-dark' : 'date-light'"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  label: {
    type: String,
    required: true,
  }
})

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)
</script>

<style scoped>
.ls-widest {
  letter-spacing: 0.1em;
}

.date-field {
  appearance: none;
  padding: 10px 40px 10px 16px;
  border-radius: 12px;
  border-width: 1px;
  border-style: solid;
  outline: none;
  cursor: pointer;
  font-size: 0.75rem;
  transition: background-color 0.2s, border-color 0.2s;
}

.date-dark:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.date-dark:focus {
  border-color: rgba(59, 130, 246, 0.5);
}

.date-light:hover {
  background-color: #e2e8f0;
}

.date-light:focus {
  border-color: rgba(37, 99, 235, 0.5);
}
</style>