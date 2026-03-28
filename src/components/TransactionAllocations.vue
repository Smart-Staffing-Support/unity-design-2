<template>
  <div
    class="w-100"
    :class="appliedTheme === 'light' ? 'transaction-alloc__theme--light' : 'transaction-alloc__theme--dark'"
  >
    <div class="d-flex flex-column ga-6">
      <!-- Header -->
      <div class="d-flex align-center justify-space-between px-2">
        <div>
          <h2 class="text-h5 font-weight-regular mb-1 transaction-alloc__title">
            Transaction allocations
          </h2>
          <p class="text-caption mt-0 transaction-alloc__subtitle">
            Define percentage distribution for payment types
          </p>
        </div>
        <div class="transaction-alloc__icon-surface d-flex align-center justify-center flex-shrink-0">
          <Calculator :size="24" class="transaction-alloc__icon-fg" />
        </div>
      </div>

      <!-- Main Card -->
      <div
        class="pa-6 rounded-xl border-thin transaction-alloc__card"
        :class="appliedTheme === 'light' ? 'elevation-1' : 'elevation-0'"
      >
        <!-- Column Headers -->
        <v-row class="px-4 mb-4">
          <v-col cols="3">
            <span class="text-body-2 font-weight-bold transaction-alloc__col-header-label">Category type</span>
          </v-col>
          <v-col cols="3" class="text-center">
            <span class="text-body-2 font-weight-bold transaction-alloc__col-header-label">Client %</span>
          </v-col>
          <v-col cols="3" class="text-center">
            <span class="text-body-2 font-weight-bold transaction-alloc__col-header-label">Attorney %</span>
          </v-col>
          <v-col cols="3" class="text-center">
            <span class="text-body-2 font-weight-bold transaction-alloc__col-header-label">Agency %</span>
          </v-col>
        </v-row>

        <!-- Allocation Rows -->
        <div class="transaction-alloc__rows d-flex flex-column">
          <AllocationRow
            v-for="cat in categories"
            :key="cat"
            :label="cat"
            :theme="appliedTheme"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Calculator } from 'lucide-vue-next'
import { useTheme } from 'vuetify'
import AllocationRow from './shared/AllocationRow.vue'

defineProps({
  theme: { type: String, default: 'light' },
})

const vuetifyTheme = useTheme()
const appliedTheme = computed(() => (vuetifyTheme.global.current.value.dark ? 'dark' : 'light'))

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

.transaction-alloc__theme--light .transaction-alloc__card {
  background-color: #f0f9ff;
  border-color: rgba(36, 98, 234, 0.48);
}

.transaction-alloc__theme--dark .transaction-alloc__card {
  background-color: rgba(15, 23, 42, 0.6);
  border-color: rgba(248, 250, 252, 0.12);
}

.transaction-alloc__theme--light .transaction-alloc__title {
  color: #2d3340;
}

.transaction-alloc__theme--dark .transaction-alloc__title {
  color: #f8fafc;
}

.transaction-alloc__theme--light .transaction-alloc__subtitle {
  color: #1d4ed8;
}

.transaction-alloc__theme--dark .transaction-alloc__subtitle {
  color: #93c5fd;
}

.transaction-alloc__theme--light .transaction-alloc__icon-surface {
  background: rgba(56, 119, 242, 0.11);
}

.transaction-alloc__theme--dark .transaction-alloc__icon-surface {
  background: rgba(56, 119, 242, 0.14);
}

.transaction-alloc__theme--light .transaction-alloc__icon-fg {
  color: #2563eb;
}

.transaction-alloc__theme--dark .transaction-alloc__icon-fg {
  color: #60a5fa;
}

.transaction-alloc__theme--light .transaction-alloc__col-header-label {
  color: #111827;
}

.transaction-alloc__theme--dark .transaction-alloc__col-header-label {
  color: #f1f5f9;
}

/* Make row divider lines (AllocationRow border-bottom) more visible. */
.transaction-alloc__theme--light .transaction-alloc__rows :deep(.allocation-row) {
  border-bottom-color: rgba(59, 130, 246, 0.18);
}

.transaction-alloc__theme--dark .transaction-alloc__rows :deep(.allocation-row) {
  border-bottom-color: rgba(148, 163, 184, 0.35);
}

</style>
