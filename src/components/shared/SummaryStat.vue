<template>
  <div
    class="d-flex flex-column pa-4 rounded-xl"
    :class="
      isTotal
        ? 'bg-summary_stat_total_bg summary-stat--total'
        : 'bg-summary_stat_card_bg border border-summary_stat_card_border border-opacity-100 summary-stat--card'
    "
  >
    <span
      class="font-weight-black mb-1"
      style="font-size: 14px; letter-spacing: 0.2em"
      :class="isTotal ? 'text-summary_stat_total_label' : 'text-stat_field_label'"
    >
      {{ label }}
    </span>
    <span
      class="text-subtitle-1 font-weight-black"
      :class="isTotal ? 'text-summary_stat_total_value' : 'text-summary_stat_value'"
    >
      {{ value }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  isTotal: { type: Boolean, default: false },
  
})
</script>
<style scoped>
.summary-stat--total {
  box-shadow:
    0 10px 15px -3px rgb(var(--v-theme-summary_stat_total_bg) / 0.2),
    0 4px 6px -4px rgb(var(--v-theme-summary_stat_total_bg) / 0.2);
}

.v-theme--light .summary-stat--card {
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
}
</style>
