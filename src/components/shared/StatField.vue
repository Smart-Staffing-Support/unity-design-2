<template>
  <div class="d-flex flex-column ga-2">
    <span class="text-body-2 text-capitalize text-stat_field_label">
      {{ label }}
    </span>

    <span
      :class="[
        'text-body-2',

        'text-truncate',

        'text-stat_field_value',

        isMono ? 'font-weight-medium' : '',
      ]"
    >
      {{ value }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,

    required: true,
  },

  value: {
    type: String,

    required: true,
  },

  isMono: {
    type: Boolean,
    default: false,
  },
})
</script>
 