<template>
  <div class="d-flex flex-column ga-2 w-100" :class="className">
    <label class="text-body-2 text-capitalize text-fields_label ls-widest">
      {{ label }}
    </label>
    <div class="position-relative select-wrapper">
      <select
        :value="modelValue ?? defaultValue"
        @change="handleChange"
        :class="[
          'select-field',
          'w-100',
          'text-caption',
          'font-weight-bold',
          'bg-fields_bg',
          'border-fields_border',
          'text-fields_text',
          isDark ? 'select-dark' : 'select-light',
        ]"
      >
        
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          :class="isDark ? 'bg-grey-darken-4 text-white' : 'bg-white text-blue-grey-darken-4'"
        >
          {{ opt.label }}
        </option>
      </select>
      <v-icon
        icon="mdi-chevron-down"
        size="14"
        :class="[
          'chevron-icon',
          'position-absolute',
          isDark ? 'text-white-darken-4' : 'text-blue-grey-lighten-1',
        ]"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  defaultValue: {
    type: String,
    default: undefined,
  },
  modelValue: {
    type: String,
    default: undefined,
  },
  className: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'change'])
const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

const handleChange = (e) => {
  emit('update:modelValue', e.target.value)
  emit('change', e.target.value)
}
</script>

<style scoped>
.ls-widest {
  letter-spacing: 0.1em;
}

.select-field {
  appearance: none;
  padding: 10px 40px 10px 16px;
  border-radius: 12px;
  border-width: 1px;
  border-style: solid;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.select-dark:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.select-dark:focus {
  border-color: rgba(59, 130, 246, 0.5);
}

.select-light {
  background-color: #f1f5f9;
  border-color: #94a3b8;
  color: #334155;
}

.select-light:hover {
  background-color: #e2e8f0;
}

.select-light:focus {
  border-color: rgba(37, 99, 235, 0.5);
}

.chevron-icon {
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  transition: transform 0.2s;
}

.select-wrapper:focus-within .chevron-icon {
  transform: translateY(-50%) rotate(180deg);
}
</style>