<template>
  <div class="d-flex flex-column ga-2">
    <span class="text-body-2 text-capitalize text-fields_label">
      {{ label }}
    </span>
    <span
      :class="[
        'text-body-2',
        'text-truncate',
        isMono ? 'font-weight-medium' : '',
        isDark ? 'text-white' : 'text-blue-grey-darken-4',
      ]"
    >
      {{ value }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  isMono: {
    type: Boolean,
    default: false,
  },
})

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)
</script>

<style scoped>
.ls-widest {
  letter-spacing: 0.15em;
}
</style>