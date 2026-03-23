<template>
  <label class="d-flex align-center ga-2 cursor-pointer">
    <input
      type="radio"
      :name="name"
      class="radio-input w-4 h-4 rounded-circle flex-shrink-0 ma-0 cursor-pointer border-sm border-rf_border bg-rf_bg"
    />
    <span class="text-body-2 text-rf_label">
      {{ label }}
    </span>
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  name:  { type: String, required: true },
});
</script>

<style scoped>
.radio-input {
  accent-color: #2563eb;
  transition: all 0.15s ease;
}

.radio-input:checked {
  border-color: #2563eb;
}

.radio-input:focus {
  outline: 2px solid rgba(37, 99, 235, 0.4);
  outline-offset: 2px;
}
</style>