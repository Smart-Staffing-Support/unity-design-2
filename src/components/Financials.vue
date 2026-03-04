<template>
  <div class="d-flex flex-column ga-8">

    <!-- SECTION 1: ADD NEW TRANSACTION -->
    <div
      class="pa-8"
      style="border-radius: 35px; border: 1px solid;"
      :style="isDark
        ? 'background: rgba(15,23,42,0.4); border-color: rgba(255,255,255,0.05);'
        : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
    >
      <div class="d-flex align-center ga-3 mb-8">
        <div class="pa-2 rounded-xl" style="background: rgba(34,197,94,0.1);">
          <Plus class="text-green" :size="20" />
        </div>
        <h3
          class="text-h6 font-weight-black text-uppercase"
          style="letter-spacing: -0.01em;"
          :class="isDark ? 'text-white' : 'text-grey-darken-4'"
        >
          Add New Transaction
        </h3>
      </div>

      <v-row>
        <v-col cols="12" md="4" lg="2">
          <DateField label="Post Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="4" lg="2">
          <SelectField label="Description" :options="[{value:'pmt',label:'Payment'},{value:'adj',label:'Adjustment'}]" default-value="pmt" :theme="theme" />
        </v-col>
        <v-col cols="12" md="4" lg="2">
          <InputField label="Amount" placeholder="$0.00" type="number" :theme="theme" />
        </v-col>
        <v-col cols="12" md="4" lg="2">
          <InputField label="Note / Check #" placeholder="Enter details..." :theme="theme" />
        </v-col>
        <v-col cols="12" md="4" lg="2">
          <SelectField label="Collector" :options="[{value:'sj',label:'Sarah Jenkins'}]" default-value="sj" :theme="theme" />
        </v-col>
        <v-col cols="12" md="4" lg="2">
          <SelectField label="Co-Collector" :options="[{value:'none',label:'None'}]" default-value="none" :theme="theme" />
        </v-col>
      </v-row>

      <v-btn
        block
        color="blue-darken-1"
        class="mt-8 font-weight-black text-uppercase rounded-xl"
        size="large"
        style="letter-spacing: 0.15em; border-radius: 16px; box-shadow: 0 4px 16px rgba(37,99,235,0.2);"
      >
        Post Transaction to Ledger
      </v-btn>
    </div>

    <!-- SECTION 2: TRANSACTION SUMMARY -->
    <v-row>
      <v-col cols="6" md="4" lg="2">
        <SummaryStat :theme="theme" label="Principal"        value="$10,000.00" />
      </v-col>
      <v-col cols="6" md="4" lg="2">
        <SummaryStat :theme="theme" label="Interest"         value="$450.32"    />
      </v-col>
      <v-col cols="6" md="4" lg="2">
        <SummaryStat :theme="theme" label="Costs"            value="$125.00"    />
      </v-col>
      <v-col cols="6" md="4" lg="2">
        <SummaryStat :theme="theme" label="Subtotal"         value="$10,575.32" />
      </v-col>
      <v-col cols="6" md="4" lg="2">
        <SummaryStat :theme="theme" label="Total Paid"       value="-$1,200.00" />
      </v-col>
      <v-col cols="6" md="4" lg="2">
        <SummaryStat :theme="theme" label="Current Balance"  value="$9,375.32"  :is-total="true" />
      </v-col>
    </v-row>

    <!-- SECTION 3: TRANSACTION HISTORY TABLE -->
    <div
      class="overflow-hidden"
      style="border-radius: 35px; border: 1px solid;"
      :style="isDark
        ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.1);'
        : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
    >
      <!-- Table Header -->
      <div
        class="pa-6 d-flex justify-space-between align-center"
        style="border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(100,116,139,0.05);"
      >
        <h4 class="text-caption font-weight-black text-uppercase text-blue" style="letter-spacing: 0.2em;">
          Transaction History Ledger
        </h4>
        <v-btn
          variant="tonal"
          :color="isDark ? 'white' : 'grey-darken-1'"
          size="small"
          class="rounded-xl font-weight-black text-uppercase ga-2"
          style="font-size: 10px; letter-spacing: 0.1em; border-radius: 12px;"
        >
          <Printer :size="14" class="mr-2" />
          Print Ledger
        </v-btn>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto" style="max-width: 1300px;">
        <v-table :theme="theme" density="comfortable">
          <thead>
            <tr :class="isDark ? '' : 'bg-sky-lighten-4'" :style="isDark ? 'background: rgba(255,255,255,0.05)' : 'background: #e0f2fe'">
              <th
                v-for="head in tableHeaders"
                :key="head"
                class="font-weight-black"
                style="font-size: 16px; min-width: 120px; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.05);"
                :class="isDark ? 'text-cyan-lighten-2' : 'text-grey-darken-2'"
              >
                {{ head }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="i in [1, 2]"
              :key="i"
              class="transaction-row"
            >
              <td class="pa-4 text-body-2" :class="isDark ? 'text-white' : 'text-grey-darken-2'">02/13/2026</td>
              <td class="pa-4">
                <span class="px-2 py-1 rounded font-weight-black text-uppercase" style="font-size:10px; background: rgba(34,197,94,0.1); color: #48c78e;">
                  Payment
                </span>
              </td>
              <td class="pa-4 text-body-2 text-grey-darken-1">#TRX-9902</td>
              <td class="pa-4 text-body-2 text-grey-darken-1">Ck #4402</td>
              <td class="pa-4 text-body-2 text-grey-darken-1">S. Jenkins</td>
              <td class="pa-4 text-body-2 text-green">$500.00</td>
              <td class="pa-4 text-body-2 text-grey-darken-1">$400.00</td>
              <td class="pa-4 text-body-2 text-grey-darken-1">$100.00</td>
              <td class="pa-4 text-body-2 text-grey-darken-1">$0.00</td>
              <td class="pa-4 text-body-2 text-grey-darken-1">$0.00</td>
              <td class="pa-4 text-body-2 text-grey-darken-1">$0.00</td>
              <td class="pa-4 text-body-2 text-grey-darken-1">$50.00</td>
              <td class="pa-4 text-body-2 text-grey-darken-1">$450.00</td>
              <td class="pa-4 text-body-2 text-blue">$9,375.32</td>
              <td class="pa-4">
                <select
                  class="text-caption font-weight-black text-uppercase"
                  style="background: transparent; outline: none; cursor: pointer; border: none;"
                  :style="isDark ? 'color: rgba(255,255,255,0.4);' : 'color: #94a3b8;'"
                >
                  <option style="background: #1e293b;">Edit</option>
                  <option style="background: #1e293b;">Delete</option>
                  <option style="background: #1e293b;">Void</option>
                </select>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Plus, Printer } from 'lucide-vue-next'
import DateField from './shared/DateField.vue'
import SelectField from './shared/SelectField.vue'
import InputField from './shared/InputField.vue'
import SummaryStat from './shared/SummaryStat.vue'

const props = defineProps({
  theme: { type: String, default: 'light' },
})

const isDark = computed(() => props.theme === 'dark')

const tableHeaders = [
  'Date', 'Description', 'ID', 'Note', 'Collector',
  'Amount', 'Principal', 'Interest', 'Costs', 'Atty Fees',
  '3rd Party', 'Agency', 'Client', 'Balance', 'Action',
]
</script>

<style scoped>
.transaction-row {
  transition: background 0.15s;
}
.transaction-row:hover {
  background: rgba(59, 130, 246, 0.05) !important;
}
</style>