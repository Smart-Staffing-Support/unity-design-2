<template>
  <div
    class="d-flex align-center ga-3 pa-3 allocation-tag bg-alloc_tag_bg border-sm border-balance_row_border text-alloc_tag_surface_text"
    style="cursor: grab;"
  >
    <!-- Drag Handle -->
    <div class="d-flex flex-column allocation-tag__drag">
      <div
        class="allocation-tag__drag-line bg-alloc_tag_drag"
      />
      <div
        class="allocation-tag__drag-line bg-alloc_tag_drag"
      />
      <div
        class="allocation-tag__drag-line bg-alloc_tag_drag"
      />
    </div>

    <!-- Order -->
    <span
      class="font-weight-black text-uppercase text-alloc_tag_order_text"
      style="font-size: 10px; letter-spacing: 0.1em;"
    >
      {{ order }}
    </span>

    <!-- Label -->
    <span
      class="text-caption font-weight-bold text-alloc_tag_label"
    >
      {{ label }}
    </span>
  </div>
</template>

<script setup>

defineProps({
  label: { type: String, required: true },
  order: { type: Number, required: true },
})

</script>

<style scoped>
.allocation-tag {
  transition: background-color 0.2s, border-color 0.2s;
  border-radius: 12px;
}

.allocation-tag__drag {
  gap: 2px;
}

.allocation-tag__drag-line {
  width: 12px;
  height: 2px;
}

.allocation-tag:hover {
  background-color: rgb(var(--v-theme-alloc_tag_hover_bg));
}

.allocation-tag:focus-visible {
  border-color: rgb(var(--v-theme-alloc_tag_focus_border));
  outline: none;
}

.allocation-tag:active {
  cursor: grabbing;
}
</style>
