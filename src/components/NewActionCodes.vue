<template>
  <div :class="['d-flex flex-column ga-6 flex-shrink-0', className]">
    <!-- Action Codes -->
    <v-sheet
      class="rounded-xl pa-6"
      style="
        backdrop-filter: blur(20px);
        max-height: 440px;
        overflow-y: auto;
        transition: all 0.5s ease;
        border-radius: 24px !important;
      "
      :style="theme === 'dark'
        ? 'background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.20);'
        : 'background: transparent; border: 1px solid #cbd5e1; box-shadow: 0 10px 30px rgba(30,41,59,0.15);'"
      color="transparent"
    >
      <!-- Header -->
      <div class="d-flex align-center ga-2 mb-4">
        <Hash :size="18" :color="theme === 'dark' ? '#93c5fd' : '#1d4ed8'" />
        <span
          class="font-weight-bold text-body-1"
          :style="theme === 'dark' ? 'color: white;' : 'color: #1e293b;'"
        >
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

defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
  className: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
/* Custom scrollbar — mirrors the original custom-scrollbar utility */
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