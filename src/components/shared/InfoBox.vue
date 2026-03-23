<template>
  <div class="d-flex flex-column">
    <span class="text-caption font-weight-black mb-1 text-infobox_label infobox-label">
      {{ label }}
    </span>
    <div class="d-flex align-baseline ga-2">
      <span class="text-h6 font-weight-black text-infobox_value infobox-value">
        {{ value || '—' }}
      </span>
      <span
        v-if="subValue"
        class="text-caption font-weight-bold text-infobox_subvalue infobox-subvalue"
      >
        / {{ subValue }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: String, default: null },
  subValue: { type: String, default: null },
})
</script>

<style scoped>
.infobox-label {
  font-size: 12px;
}

.infobox-subvalue {
  font-size: 12px;
}
</style>

