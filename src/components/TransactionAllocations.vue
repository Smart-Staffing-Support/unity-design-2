<template>
  <div style="max-width: 1600px;" class="mx-auto">

    <div class="d-flex flex-column ga-6">

      <!-- Header -->
      <div class="d-flex align-center justify-space-between px-2">
        <div>
          <h2
            class="text-h5 font-weight-regular"
            :class="isDark ? 'text-white' : 'text-grey-darken-3'"
          >
            Transaction allocations
          </h2>
          <p class="text-caption text-blue">Define percentage distribution for payment types</p>
        </div>
        <div class="pa-3 rounded-xl" style="background: rgba(59,130,246,0.1);">
          <Calculator :size="24" class="text-blue" />
        </div>
      </div>

      <!-- Main Card -->
      <div
        class="pa-6"
        style="border-radius: 40px; border: 1px solid;"
        :style="isDark
          ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.1);'
          : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
      >
        <!-- Column Headers -->
        <v-row class="px-4 mb-4">
          <v-col cols="3">
            <span class="text-body-2 font-weight-bold" :class="isDark ? 'text-white' : 'text-grey-darken-2'">Category type</span>
          </v-col>
          <v-col cols="3" class="text-center">
            <span class="text-body-2 font-weight-bold" :class="isDark ? 'text-white' : 'text-grey-darken-2'">Client %</span>
          </v-col>
          <v-col cols="3" class="text-center">
            <span class="text-body-2 font-weight-bold" :class="isDark ? 'text-white' : 'text-grey-darken-2'">Attorney %</span>
          </v-col>
          <v-col cols="3" class="text-center">
            <span class="text-body-2 font-weight-bold" :class="isDark ? 'text-white' : 'text-grey-darken-2'">Agency %</span>
          </v-col>
        </v-row>

        <!-- Allocation Rows -->
        <div class="d-flex flex-column ga-1">
          <AllocationRow
            v-for="cat in categories"
            :key="cat"
            :label="cat"
            :theme="theme"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Calculator } from 'lucide-vue-next'
import AllocationRow from './shared/AllocationRow.vue'

const props = defineProps({
  theme: { type: String, default: 'light' },
})

const isDark = computed(() => props.theme === 'dark')

const categories = [
  'Principal',
  'Interest',
  'Cost',
  'Attorney fees',
  'Over payment',
  'Payment convenience fee',
  'Legal costs',
  'Collector Percentage',
]
</script>
