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
        size="18"
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
  position: relative;
  z-index: 0;
  -webkit-appearance: none;
  appearance: none;
  box-sizing: border-box;
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  border: 1px solid rgb(var(--v-theme-select_field_border));
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  min-height: 40px;
  line-height: 1.4;
}

.select-field:hover {
  background-color: rgb(var(--v-theme-select_field_hover_bg));
}

.select-field:focus {
  border-color: rgb(var(--v-theme-select_field_focus_border));

  outline: none;
}

.chevron-icon {
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 2;
  position: absolute;
  transition: transform 0.2s;
}

.select-wrapper:focus-within .chevron-icon {
  transform: translateY(-50%) rotate(180deg);
}

.v-theme--dark .payment-modal-select .text-select_field_label {
  color: #60a5fa;
}

.v-theme--light .payment-modal-select .text-select_field_label {
  color: #2563eb;
}

.v-theme--dark .payment-modal-select .select-field {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.v-theme--light .payment-modal-select .select-field {
  background-color: #f8fafc;
  border-color: #e2e8f0;
  color: #0f172a;
}

.v-theme--dark .payment-modal-select .select-field:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.v-theme--light .payment-modal-select .select-field:hover {
  background-color: #f1f5f9;
}

.v-theme--dark .payment-modal-select .select-field:focus {
  border-color: #3b82f6;
}

.v-theme--light .payment-modal-select .select-field:focus {
  border-color: #2563eb;
}

.v-theme--dark .payment-modal-select .select-field option {
  background-color: #0f172a;
  color: #ffffff;
}

.v-theme--light .payment-modal-select .select-field option {
  background-color: #ffffff;
  color: #0f172a;
}

.v-theme--dark .payment-modal-select .chevron-icon {
  color: rgba(255, 255, 255, 0.4);
}

.v-theme--light .payment-modal-select .chevron-icon {
  color: #94a3b8;
}
</style>
