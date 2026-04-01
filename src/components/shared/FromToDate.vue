<template>
  <div class="d-flex flex-column ga-2" :class="className">
    <label
      class="text-caption text-cyan-lighten-2"
      style="letter-spacing: 0.15em;"
    >
      {{ props.label }}
    </label>
    <div class="d-flex align-center ga-2">
      <input type="date" class="date-input bg-date_field_bg border-date_field_border text-date_field_text" />
      <input type="date" class="date-input bg-date_field_bg border-date_field_border text-date_field_text" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true },
  className: { type: String, default: '' },
})
</script>

<style scoped>
.date-input {
  appearance: none;
  padding: 10px 8px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  outline: none;
  font-size: 0.7rem;
  width: 100%;
  color-scheme: dark;
  transition: background-color 0.2s, border-color 0.2s;
}
.date-input:hover { background-color: rgba(255, 255, 255, 0.1) !important; }
.date-input:focus { border-color: rgba(59, 130, 246, 0.5); }
</style>
