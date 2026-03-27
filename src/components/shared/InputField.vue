<template>
  <div class="d-flex flex-column ga-2 w-100" :class="props.className">
    <label
      class="text-body-2 text-capitalize text-select_field_label ls-input-label"
    >
      {{ props.label }}
    </label>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      class="input-field w-100 px-4 rounded-lg text-caption font-weight-bold bg-select_field_bg border-sm border-opacity-100 border-fields_border text-fields_text"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  className: { type: String, default: '' },
})
</script>

<style scoped>
.input-field {
  appearance: none;
  outline: none;
  transition: background-color 0.2s, border-color 0.2s;
  font-size: 0.75rem;
  padding: 10px 16px;
  border: 1px solid rgb(var(--v-theme-select_field_border));
}

.ls-input-label {
  letter-spacing: 0.15em;
}
</style>
