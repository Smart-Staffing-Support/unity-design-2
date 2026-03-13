<template>
  <label class="d-flex align-center ga-2 cursor-pointer">
    <input
      type="radio"
      :name="name"
      class="radio-input"
    />
    <span
      class="text-body-2"
      :style="theme === 'dark' ? 'color: #94a3b8;' : 'color: #475569;'"
    >{{ label }}</span>
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  name:  { type: String, required: true },
  theme: { type: String, default: 'dark' },
});
</script>

<style scoped>
.cursor-pointer { cursor: pointer; }

.radio-input {
  width: 16px;
  height: 16px;
  border: 1px solid #cbd5e1;
  border-radius: 50%;
  accent-color: #2563eb;
  cursor: pointer;
  flex-shrink: 0;
}

.radio-input:focus {
  outline: 2px solid rgba(37, 99, 235, 0.4);
  outline-offset: 2px;
}
</style>