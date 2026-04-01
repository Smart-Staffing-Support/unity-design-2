<template>
  <div class="w-100">
    <div class="d-flex flex-column ga-6">
      <!-- Header -->
      <div class="d-flex align-center justify-space-between px-2">
        <div>
          <h2 class="text-h5 font-weight-regular mb-1 text-client_header_title">
            Transaction allocations
          </h2>
          <p class="text-caption mt-0 transaction-alloc__subtitle text-fields_label">
            Define percentage distribution for payment types
          </p>
        </div>
        <div class="transaction-alloc__icon-surface bg-client_header_icon_bg d-flex align-center justify-center flex-shrink-0">
          <Calculator :size="24" class="text-primary" />
        </div>
      </div>

      <!-- Main Card -->
      <div class="pa-6 rounded-xl border-thin border-opacity-50 bg-secondary_container_bg border-secondary_container_border">
        <!-- Column Headers -->
        <v-row class="px-4 mb-4">
          <v-col cols="3">
            <span class="text-body-2 font-weight-bold text-client_header_title">Category type</span>
          </v-col>
          <v-col cols="3" class="text-center">
            <span class="text-body-2 font-weight-bold text-client_header_title">Client %</span>
          </v-col>
          <v-col cols="3" class="text-center">
            <span class="text-body-2 font-weight-bold text-client_header_title">Attorney %</span>
          </v-col>
          <v-col cols="3" class="text-center">
            <span class="text-body-2 font-weight-bold text-client_header_title">Agency %</span>
          </v-col>
        </v-row>

        <!-- Allocation Rows -->
        <div class="d-flex flex-column">
          <AllocationRow
            v-for="cat in categories"
            :key="cat"
            :label="cat"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Calculator } from 'lucide-vue-next'
import AllocationRow from './shared/AllocationRow.vue'

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

<style scoped>
.transaction-alloc__subtitle {
  font-size: 11px;
  line-height: 1.35;
}

.transaction-alloc__icon-surface {
  width: 48px;
  height: 48px;
  border-radius: 14px;
}


</style>
