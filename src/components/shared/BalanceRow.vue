<template>
  <div
    class="d-flex justify-space-between align-end pb-2 border-0 border-b-sm border-balance_row_border"
  >
    <span
      class="text-sm font-weight-bold text-balance_row_label"
    >
      {{ label }}
    </span>
    <span
      class="text-subtitle-1 font-weight-black text-balance_row_value"
    >
      {{ value }}
    </span>
  </div>
</template>

<script setup>
  defineProps ({
    label: { type: String, required: true },
    value: { type: String, required: true },
  })
</script>
