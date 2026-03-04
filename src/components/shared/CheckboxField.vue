<template>
  <label class="d-flex align-center ga-3 cursor-pointer select-none checkbox-label">
    <!-- Hidden native checkbox -->
    <input
      type="checkbox"
      :checked="checked"
      class="sr-only"
      @change="$emit('update:checked', $event.target.checked)"
    />

    <!-- Custom Checkbox -->
    <div
      class="d-flex align-center justify-center rounded-lg checkbox-box"
      style="width: 20px; height: 20px; border: 2px solid; border-radius: 6px; flex-shrink: 0; transition: background 0.15s, border-color 0.15s;"
      :style="checked
        ? 'background: #2563eb; border-color: #2563eb;'
        : isDark
          ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1);'
          : 'background: #f1f5f9; border-color: #cbd5e1;'"
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
      :style="checked
        ? (isDark ? 'color: #ffffff;' : 'color: #0f172a;')
        : (isDark ? 'color: #ffffff;' : 'color: #334155;')"
    >
      {{ label }}
    </span>
  </label>
</template>

<script setup>
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'

//export default {
  //name: 'CheckboxField',

  //components: { Check },

  const props = defineProps ({
    label:   { type: String,  required: true  },
    checked: { type: Boolean, default: false  },
    theme:   { type: String,  default: 'light'},
  })

  const emits = defineEmits (['update:checked'])

  //setup(props) {
    const isDark = computed(() => props.theme === 'dark')
    //return { isDark }
  //},
//}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.checkbox-label:hover .checkbox-box {
  border-color: rgba(59, 130, 246, 0.5) !important;
}

.checkbox-label:hover .checkbox-text {
  color: #0f172a;
}
</style>