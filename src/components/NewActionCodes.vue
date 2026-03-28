<template>
  <div :class="['d-flex flex-column ga-6 flex-shrink-0', className]">
    <!-- Action Codes -->
    <v-sheet
      class="rounded-xl pa-6 overflow-y-auto bg-main_background border-md border-secondary_container_border border"
      style="
        backdrop-filter: blur(20px);
        max-height: 440px;
        transition: all 0.5s ease;
        border-radius: 24px !important;
        box-shadow: 0 10px 30px rgba(30,41,59,0.15);
      "
    >
      <!-- Header -->
      <div class="d-flex align-center ga-2 mb-4">
        <Hash :size="18" color="#2563eb" />
        <span class="font-weight-bold text-body-1 text-fields_text ">
          Action Codes
        </span>
      </div>

      <!-- MultiSearchSelect -->
      <MultiSearchSelect label="Select Action Codes" :theme="theme" />
    </v-sheet>
  </div>
</template>

<script setup>
import { Hash } from 'lucide-vue-next';
import MultiSearchSelect from './shared/MultiSearchSelect.vue';

</script>

<style scoped>
/* Custom scrollbar */
.v-sheet::-webkit-scrollbar {
  width: 4px;
}
.v-sheet::-webkit-scrollbar-track {
  background: transparent;
}
.v-sheet::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 999px;
}
.v-sheet::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.6);
}
</style>