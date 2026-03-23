<template>
  <div class="d-flex flex-column ga-1">
    <span
      class="font-weight-black text-uppercase mb-1 text-asset_stat_label"
      style="font-size: 12px; letter-spacing: 0.15em;"
    >
      {{ label }}
    </span>
    <span
      class="text-subtitle-1 font-weight-black"
      :class="!value ? 'text-asset_stat_value_empty' : highlight ? 'text-asset_stat_value_highlight' : 'text-asset_stat_value'"
    >
      {{ value || '—' }}
    </span>
  </div>
</template>

<script setup>
  defineProps ({
    label: { type: String, required: true },
    value: { type: String, default: null },
    highlight: { type: Boolean, default: false },
  })
</script>
