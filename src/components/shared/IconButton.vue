<template>
  <button
    class="pa-2 rounded-lg border d-inline-flex align-center justify-center bg-main_background border-icon_btn_border icon-btn"
    style="cursor: pointer; transition: transform 0.15s ease; box-shadow: var(--v-theme-icon_btn_shadow);"
  >
    <component 
      :is="icon" 
      :size="20" 
      :color="`rgb(var(--v-theme-icon_btn_icon_color))`" 
    />
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.icon-btn {
  transition: transform 0.15s ease;
}

.icon-btn:hover {
  transform: scale(1.10);
}
</style>