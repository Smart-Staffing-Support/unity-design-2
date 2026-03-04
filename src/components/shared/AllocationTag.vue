<template>
  <div
    class="d-flex align-center ga-3 pa-3 rounded-xl allocation-tag"
    style="border: 1px solid; cursor: grab; transition: background 0.2s, border-color 0.2s;"
    :style="isDark
      ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); color: #ffffff;'
      : 'background: #f1f5f9; border-color: #cbd5e1; color: #1e293b;'"
  >
    <!-- Drag Handle -->
    <div class="d-flex flex-column ga-1">
      <div
        class="rounded-pill"
        style="height: 2px; width: 12px;"
        :style="isDark ? 'background: rgba(255,255,255,0.3);' : 'background: #94a3b8;'"
      />
      <div
        class="rounded-pill"
        style="height: 2px; width: 12px;"
        :style="isDark ? 'background: rgba(255,255,255,0.3);' : 'background: #94a3b8;'"
      />
      <div
        class="rounded-pill"
        style="height: 2px; width: 12px;"
        :style="isDark ? 'background: rgba(255,255,255,0.3);' : 'background: #94a3b8;'"
      />
    </div>

    <!-- Order -->
    <span
      class="font-weight-black text-uppercase"
      style="font-size: 10px; letter-spacing: 0.15em;"
      :style="isDark ? 'color: rgba(255,255,255,0.4);' : 'color: #94a3b8;'"
    >
      {{ order }}
    </span>

    <!-- Label -->
    <span
      class="text-caption font-weight-bold"
      :class="isDark ? 'text-white' : 'text-grey-darken-1'"
    >
      {{ label }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

//export default {
  //name: 'AllocationTag',

  const props = defineProps ({
    label: { type: String, required: true },
    order: { type: Number, required: true },
    theme: { type: String, default: 'light' },
  })

  //setup(props) {
    const isDark = computed(() => props.theme === 'dark')
    //return { isDark }
  //},
//}
</script>

<style scoped>
.allocation-tag:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}
.allocation-tag:active {
  cursor: grabbing;
}
</style>