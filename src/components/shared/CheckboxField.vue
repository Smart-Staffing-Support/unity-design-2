<template>
  <label class="d-flex align-center ga-3 cursor-pointer select-none position-relative">
    <!-- Covers the full row so clicks always hit the native control -->
    <input
      type="checkbox"
      :checked="modelValue"
      class="checkbox-hit ma-0 border-0"
      @change="$emit('update:modelValue', $event.target.checked)"
    />

    <div class="flex-shrink-0" style="width: 20px; height: 20px;">
      <div
        class="rounded-md checkbox-box border-checkbox_field_box_border_unchecked d-flex align-center justify-center"
        :class="{ 'checkbox-box--checked': modelValue }"
        style="width: 20px; height: 20px; transition: background 0.15s, border-color 0.15s, border-width 0.15s;"
        aria-hidden="true"
      >
        <Check
          v-if="modelValue"
          :size="16"
          stroke-width="4"
          class="checkbox-check-icon"
        />
      </div>
    </div>

    <span
      class="checkbox-text"
      style="font-size: 14px; letter-spacing: 0.1em; transition: color 0.15s;"
      :class="modelValue ? 'text-checkbox_field_label_checked' : 'text-checkbox_field_label'"
    >
      {{ label }}
    </span>
  </label>
</template>

<script setup>
import { Check } from 'lucide-vue-next';

defineProps({
  label: { type: String, required: true },
  modelValue: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.checkbox-hit {
  position: absolute;
  inset: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.checkbox-text {
  position: relative;
  z-index: 0;
  pointer-events: none;
}

/* Unchecked: ring uses theme border */
.checkbox-box:not(.checkbox-box--checked) {
  border: 2px solid;
}

.checkbox-box--checked {
  border: 1px solid rgb(var(--v-theme-checkbox_field_box_checked));
  background: rgb(var(--v-theme-checkbox_field_box_checked));
}

.checkbox-check-icon {
  color: #ffffff;
}

/* Unchecked: blue border on hover */
.checkbox-label:hover .checkbox-box:not(.checkbox-box--checked) {
  border-color: #60a5fa;
}

.checkbox-label:hover .checkbox-text {
  color: rgb(var(--v-theme-checkbox_field_label_hover));
}

/* Remove focus ring after click */
.checkbox-hit:focus,
.checkbox-hit:focus-visible,
.checkbox-hit:active {
  outline: none;
  box-shadow: none;
}

.checkbox-box,
.checkbox-box:focus,
.checkbox-box:focus-within {
  outline: none;
  box-shadow: none;
}
</style>
