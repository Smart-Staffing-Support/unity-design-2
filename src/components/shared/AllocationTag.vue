<template>
  <div
    class="d-flex align-center ga-3 pa-3 rounded-xl allocation-tag bg-alloc_tag_bg border-sm border-alloc_tag_border text-alloc_tag_surface_text"
    style="cursor: grab; transition: background 0.2s, border-color 0.2s;"
  >
    <!-- Drag Handle -->
    <div class="d-flex flex-column ga-1">
      <div
        class="rounded-pill bg-alloc_tag_drag"
        style="height: 2px; width: 12px;"
      />
      <div
        class="rounded-pill bg-alloc_tag_drag"
        style="height: 2px; width: 12px;"
      />
      <div
        class="rounded-pill bg-alloc_tag_drag"
        style="height: 2px; width: 12px;"
      />
    </div>

    <!-- Order -->
    <span
      class="font-weight-black text-uppercase text-alloc_tag_order_text"
      style="font-size: 10px; letter-spacing: 0.15em;"
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

const props = defineProps({
  label: { type: String, required: true },
  order: { type: Number, required: true },
  theme: { type: String, default: 'light' },
})

</script>

<style scoped>
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
