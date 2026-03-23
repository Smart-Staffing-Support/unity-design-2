<template>
  <label class="d-flex align-center ga-3 cursor-pointer select-none checkbox-label">
    <!-- Hidden native checkbox -->
    <input
      type="checkbox"
      :checked="checked"
      class="position-absolute overflow-hidden pa-0 border-0"
      style="width: 1px; height: 1px; margin: -1px; clip: rect(0, 0, 0, 0); white-space: nowrap;"
      @change="$emit('update:checked', $event.target.checked)"
    />

    <!-- Custom Checkbox -->
    <div
      class="d-flex align-center justify-center rounded-lg flex-shrink-0 checkbox-box"
      style="width: 20px; height: 20px; border: 2px solid; border-radius: 6px; transition: background 0.15s, border-color 0.15s;"
      :class="checked ? 'bg-checkbox_field_box_checked border-checkbox_field_box_checked' : 'bg-checkbox_field_box_bg border-checkbox_field_box_border_unchecked'"
    >
      <Check
        :size="12"
        :stroke-width="4"
        class="text-white check-icon"
        style="transition: transform 0.2s;"
        :style="checked ? 'transform: scale(1);' : 'transform: scale(0);'"
      />
    </div>

    <!-- Label -->
    <span
      class="checkbox-text"
      style="font-size: 14px; letter-spacing: 0.1em; transition: color 0.15s;"
      :class="checked ? 'text-checkbox_field_label_checked' : 'text-checkbox_field_label'"
    >
      {{ label }}
    </span>
  </label>
</template>

<script setup>
import { Check } from 'lucide-vue-next'

  const props = defineProps ({
    label:   { type: String,  required: true  },
    checked: { type: Boolean, default: false  },
  })

  const emits = defineEmits (['update:checked'])

</script>

<style scoped>
.checkbox-label:hover .checkbox-box {
  border-color: rgb(var(--v-theme-checkbox_hover_border));
}

.checkbox-label:hover .checkbox-text {
  color: rgb(var(--v-theme-checkbox_field_label_hover));
}
</style>
