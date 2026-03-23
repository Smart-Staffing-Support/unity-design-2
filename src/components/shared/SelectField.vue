#

<template>
  <div class="d-flex flex-column ga-2 w-100" :class="className">
    <label class="text-body-2 text-capitalize text-select_field_label ls-widest">
      {{ label }}
    </label>

    <div class="position-relative select-wrapper">
      <select
        :value="modelValue ?? defaultValue"
        @change="handleChange"
        class="select-field w-100 text-caption font-weight-bold bg-select_field_bg text-select_field_text"
      >
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          class="bg-select_field_option_bg text-select_field_option_text"
        >
          {{ opt.label }}
        </option>
      </select>

      <v-icon
        icon="mdi-chevron-down"
        size="14"
        class="chevron-icon position-absolute text-select_field_chevron"
      />
    </div>
  </div>
</template>

<script setup>
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

const handleChange = (e) => {
  emit('update:modelValue', e.target.value)

  emit('change', e.target.value)
}
</script>

<style scoped>
.ls-widest {
  letter-spacing: 0.1em;
}

/* Native selects: border via theme tokens (same pattern as DateField). */

.select-field {
  -webkit-appearance: none;

  appearance: none;

  box-sizing: border-box;

  padding: 10px 40px 10px 16px;

  border-radius: 12px;

  outline: none;

  cursor: pointer;

  transition:
    background-color 0.2s,
    border-color 0.2s;

  border: 1px solid rgb(var(--v-theme-select_field_border));
}

.select-field:hover {
  background-color: rgb(var(--v-theme-select_field_hover_bg));
}

.select-field:focus {
  border-color: rgb(var(--v-theme-select_field_focus_border));

  outline: none;
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
