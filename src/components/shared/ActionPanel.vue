<template>
  <div class="d-flex flex-column ga-6 flex-shrink-0" :class="className">

    <!-- Action Codes -->
    <div
      class="pa-6 rounded-xl overflow-y-auto"
      style="border: 1px solid; border-radius: 24px; max-height: 440px; backdrop-filter: blur(20px); transition: all 0.5s; box-shadow: 0 20px 40px rgba(0,0,0,0.15);"
      :style="isDark
        ? 'background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2);'
        : 'background: #bbdcfd; border-color: #e2e8f0; box-shadow: 0 4px 16px rgba(148,163,184,0.2);'"
    >
      <div class="d-flex align-center ga-2 mb-4">
        <Hash :size="18" :class="isDark ? 'text-blue-lighten-2' : 'text-blue-darken-1'" />
        <h3
          class="text-body-1 font-weight-bold"
          :class="isDark ? 'text-white' : 'text-grey-darken-3'"
        >
          Action Codes
        </h3>
      </div>

      <div class="d-flex flex-column ga-2">
        <button
          v-for="item in actionCodes"
          :key="item.code"
          class="pa-2 rounded-xl font-weight-bold action-btn w-100 text-left"
          style="font-size: 1rem; border: 1px solid; transition: transform 0.15s; cursor: pointer;"
          :style="item.style"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Hash } from 'lucide-vue-next'


  const props = defineProps( {
    theme: { type: String, default: 'light' },
    className: { type: String, default: '' },
  })

    const isDark = computed(() => props.theme === 'dark')

    const actionCodes = computed(() => [
      {
        code: 'PTP', label: 'Promise to Pay',
        style: isDark.value
          ? 'background: rgba(34,197,94,0.4);  color: #4ade80; border-color: rgba(34,197,94,0.3);'
          : 'background: #f0fdf4; color: #16a34a; border-color: #bbf7d0;',
      },
      {
        code: 'LM', label: 'Left Message',
        style: isDark.value
          ? 'background: rgba(59,130,246,0.4);  color: #60a5fa; border-color: rgba(59,130,246,0.3);'
          : 'background: #eff6ff; color: #2563eb; border-color: #bfdbfe;',
      },
      {
        code: 'WN', label: 'Wrong Number',
        style: isDark.value
          ? 'background: rgba(239,68,68,0.4);   color: #f87171; border-color: rgba(239,68,68,0.3);'
          : 'background: #fef2f2; color: #dc2626; border-color: #fecaca;',
      },
      {
        code: 'NA', label: 'No Answer',
        style: isDark.value
          ? 'background: rgba(245,158,11,0.4);  color: #fbbf24; border-color: rgba(245,158,11,0.3);'
          : 'background: #fffbeb; color: #d97706; border-color: #fde68a;',
      },
      {
        code: 'REF', label: 'Refused Pay',
        style: isDark.value
          ? 'background: rgba(168,85,247,0.4);  color: #c084fc; border-color: rgba(168,85,247,0.3);'
          : 'background: #faf5ff; color: #9333ea; border-color: #e9d5ff;',
      },
      {
        code: 'DIS', label: 'Disputed',
        style: isDark.value
          ? 'background: rgba(236,72,153,0.4);  color: #f472b6; border-color: rgba(236,72,153,0.3);'
          : 'background: #fdf2f8; color: #db2777; border-color: #fbcfe8;',
      },
    ])

</script>

<style scoped>
.action-btn:hover  { transform: scale(1.05); }
.action-btn:active { transform: scale(0.95); }
</style>