<template>
  <div class="pa-6 d-flex flex-column ga-8 h-100">

    <!-- Header -->
    <div class="d-flex justify-space-between align-center">
      <div />
      <div class="d-flex ga-2">
        <v-btn
          color="teal-darken-2"
          class="font-weight-medium rounded-xl"
          style="font-size: 13px;"
          elevation="0"
        >
          <template #prepend><FileDown :size="16" /></template>
          Export PDF / CSV
        </v-btn>

        <v-btn
          color="red-darken-1"
          class="font-weight-medium rounded-xl"
          style="font-size: 13px;"
          elevation="0"
          @click="handleCancelAccounts"
        >
          <template #prepend><XCircle :size="16" /></template>
          Cancel Selected Accounts
        </v-btn>
      </div>
    </div>

    <!-- Summary Grid -->
    <v-sheet
      class="pa-8 d-flex flex-wrap justify-space-between align-start"
      color="transparent"
      style="border-radius: 30px !important;"
      :style="theme === 'dark'
        ? 'background: #0f172a !important; border: 1px solid rgba(255,255,255,0.10);'
        : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
    >
      <div
        v-for="stat in summaryStats"
        :key="stat.label"
        class="d-flex flex-column align-center ga-1"
      >
        <span
          class="text-body-2"
          :style="theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;'"
        >{{ stat.label }}</span>
        <span
          class="text-body-1"
          :style="theme === 'dark' ? 'color: white;' : 'color: #0f172a;'"
        >{{ stat.value }}</span>
      </div>
    </v-sheet>

    <!-- Expandable Table -->
    <div
      style="overflow: hidden; border-radius: 30px; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);"
    >
      <table class="w-100 table-fixed" style="border-collapse: collapse; text-align: left;">
        <!-- Head -->
        <thead>
          <tr :style="theme === 'dark' ? 'background: rgba(255,255,255,0.05);' : 'background: #e0f2fe;'">
            <th
              v-for="col in columns"
              :key="col.key"
              class="pa-4"
              style="min-width: 120px; letter-spacing: 0.1em; font-size: 13px;"
              :style="[
                theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;',
                theme === 'dark' ? 'border-bottom: 1px solid rgba(255,255,255,0.05);' : 'border-bottom: 1px solid #e2e8f0;'
              ]"
            >
              <input v-if="col.key === 'checkbox'" type="checkbox" class="w-4 h-4" />
              <span v-else>{{ col.label }}</span>
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody>
          <template v-for="id in 6" :key="id">
            <!-- Main Row -->
            <tr
              class="cursor-pointer"
              style="transition: background 0.15s ease;"
              :style="theme === 'dark' ? '' : ''"
              @click="expandedRow = expandedRow === id ? null : id"
              @mouseover="$event.currentTarget.style.background = theme === 'dark' ? '#0f172a' : '#f1f5f9'"
              @mouseleave="$event.currentTarget.style.background = ''"
            >
              <td
                class="pa-4"
                :style="[
                  theme === 'dark' ? 'color: white;' : 'color: #334155;',
                  theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.05);' : 'border-top: 1px solid #f1f5f9;'
                ]"
              >
                <input type="checkbox" class="w-4 h-4" @click.stop />
              </td>
              <td
                class="pa-4"
                :style="theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.05);' : 'border-top: 1px solid #f1f5f9;'"
              >
                <span
                  class="text-caption font-weight-bold px-2 py-1 rounded-pill"
                  style="background: #d1fae5; color: #065f46;"
                >Active</span>
              </td>
              <td
                class="pa-4 text-body-2"
                :style="[
                  theme === 'dark' ? 'color: white;' : 'color: #334155;',
                  theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.05);' : 'border-top: 1px solid #f1f5f9;'
                ]"
              >global logistics inc</td>
              <td
                class="pa-4 text-body-2"
                :style="[
                  theme === 'dark' ? 'color: white;' : 'color: #334155;',
                  theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.05);' : 'border-top: 1px solid #f1f5f9;'
                ]"
              >$15,000</td>
              <td
                class="pa-4 text-body-2"
                :style="[
                  theme === 'dark' ? 'color: white;' : 'color: #334155;',
                  theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.05);' : 'border-top: 1px solid #f1f5f9;'
                ]"
              >$5,200</td>
              <td
                class="pa-4 text-body-2"
                :style="[
                  theme === 'dark' ? 'color: white;' : 'color: #334155;',
                  theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.05);' : 'border-top: 1px solid #f1f5f9;'
                ]"
              >$8,200</td>
              <td
                class="pa-4"
                :style="theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.05);' : 'border-top: 1px solid #f1f5f9;'"
              >
                <button
                  class="d-flex align-center justify-center rounded-pill"
                  style="width: 28px; height: 28px; border: none; cursor: pointer; transition: opacity 0.15s ease;"
                  :style="theme === 'dark' ? 'background: #60a5fa; color: white;' : 'background: #1d4ed8; color: white;'"
                  @click.stop
                >
                  <ArrowUpRight :size="14" />
                </button>
              </td>
            </tr>

            <!-- Expanded Row -->
            <tr
              v-if="expandedRow === id"
              :style="theme === 'dark'
                ? 'background: rgba(255,255,255,0.08);'
                : 'background: rgba(37,99,235,0.55);'"
            >
              <td colspan="7" class="pa-6">
                <div class="d-flex justify-space-around flex-wrap ga-4 text-body-2 w-100">

                  <!-- Left group -->
                  <div
                    v-for="detail in expandedDetails"
                    :key="detail.label"
                    class="d-flex flex-column align-center"
                  >
                    <span :style="theme === 'dark' ? `color: ${detail.color};` : `color: ${detail.colorLight}; font-weight: bold;`">
                      {{ detail.label }}
                    </span>
                    <span style="color: white;" class="text-center">{{ detail.value }}</span>
                  </div>

                  <!-- View Check -->
                  <div class="d-flex flex-column align-center" style="border-left: 1px solid white; padding-left: 24px;">
                    <span :style="theme === 'dark' ? 'color: #f87171;' : 'color: #c084fc; font-weight: bold;'">View Check</span>
                    <FileText :size="16" color="white" class="mt-1" />
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FileDown, XCircle, ArrowUpRight, FileText } from 'lucide-vue-next';

defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
});

const expandedRow = ref(null);

const summaryStats = [
  { label: 'Total Accounts',           value: '10' },
  { label: 'Total Accounts Collected', value: '4' },
  { label: 'Opened',                   value: '8' },
  { label: 'Closed',                   value: '2' },
  { label: 'Legal Accounts',           value: '1' },
  { label: 'Total Amount Collected',   value: '$4,000' },
  { label: 'Total Face Value',         value: '$100.00' },
  { label: 'Client Owes',              value: '$382,660' },
  { label: 'Agency Owes',              value: '$1,660' },
  { label: 'Last Placement Date',      value: '01/01/2024' },
];

const columns = [
  { key: 'checkbox',         label: '' },
  { key: 'status',           label: 'Status' },
  { key: 'name',             label: 'Name' },
  { key: 'totalAmount',      label: 'Total Amount' },
  { key: 'totalCollected',   label: 'Total Collected' },
  { key: 'currentBalance',   label: 'Current Balance' },
  { key: 'goToAccount',      label: 'Go to Account' },
];

const expandedDetails = [
  { label: 'Date',             value: '02/18/26', color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'ID/Check Number',  value: '#9902',    color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'Description',      value: 'payment',  color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'Agency',           value: '$50.00',   color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'Client',           value: '$450.00',  color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'Convenience Fees', value: '$250.00',  color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'Agency',           value: '$150.00',  color: '#22c55e', colorLight: '#86efac' },
  { label: 'Client',           value: '$100.00',  color: '#eab308', colorLight: '#fde047' },
  { label: 'Attorney',         value: '$100.00',  color: '#60a5fa', colorLight: '#93c5fd' },
];

function handleCancelAccounts() {
  if (confirm('Would you like to bill these accounts?')) {
    // handle confirmed cancellation
  }
}
</script>

<style scoped>
.cursor-pointer { cursor: pointer; }
.w-4 { width: 16px; }
.h-4 { height: 16px; }
</style>