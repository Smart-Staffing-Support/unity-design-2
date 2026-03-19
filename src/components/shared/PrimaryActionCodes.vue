<template>
  <div :class="['d-flex justify-center align-center ga-3 overflow-x-auto border-b border-t bg-container text-container_border flex-shrink-0 px-8 py-3', className]">
    <v-btn
      v-for="action in primaryActionCodes"
      :key="action.code"
      :color="action.color"
      variant="flat"
      rounded="pill"
      class="text-white font-weight-bold text-title-medium text-uppercase action-btn"
    >
      {{ action.label }}
    </v-btn>
  </div>
</template>

<script setup>


const props = defineProps({
  className: {
    type: String,
    default: '',
  },
})



const primaryActionCodes = [
  { code: 'CALL', label: 'DO NOT CALL', color: 'red-darken-2'   },
  { code: 'SMS', label: 'EMAILS ONLY', color: 'lime-darken-1'  },
  { code: 'EMAIL', label: 'ENFORCE JUDGEMENT', color: 'amber-darken-1' },
  { code: 'PTP', label: 'ABC', color: 'green-darken-2' },
]
</script>

<style scoped>
.action-btn {
  transition: filter 0.2s, transform 0.1s;
}
.action-btn:hover {
  filter: brightness(1.1);
}
.action-btn:active {
  transform: scale(0.95);
}
</style>