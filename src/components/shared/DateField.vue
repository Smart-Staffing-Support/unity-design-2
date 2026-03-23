<template>
  <div class="d-flex flex-column ga-2 w-100">
    <label class="text-body-2 text-capitalize text-date_field_label ls-widest">
      {{ props.label }}
    </label>
    <input
      type="date"
      class="date-field w-100 bg-date_field_bg text-date_field_text"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  }
})
</script>

<style scoped>
.ls-widest {
  letter-spacing: 0.1em;
}

.date-field {
  -webkit-appearance: none;
  appearance: none;
  box-sizing: border-box;
  padding: 10px 40px 10px 16px;
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  font-size: 0.75rem;
  transition: background-color 0.2s, border-color 0.2s;
  border: 1px solid rgb(var(--v-theme-date_field_border));
}

.date-field:hover {
  background-color: rgb(var(--v-theme-date_field_hover_bg));
}

.date-field:focus {
  border-color: rgb(var(--v-theme-date_field_focus_border));
  outline: none;
}
</style>
