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
      class="pa-8 d-flex flex-wrap justify-space-between align-start border bg-secondary_container_bg text-secondary_container_border"
      color="transparent"
      style="border-radius: 30px !important; border: 1px solid;"
    >
      <div
        v-for="stat in summaryStats"
        :key="stat.label"
        class="d-flex flex-column align-center ga-1"
      >
        <span
          class="text-body-2 text-select_field_label"
        >{{ stat.label }}</span>
        <span
          class="text-body-1 text-checkbox_field_label_checked"
        >{{ stat.value }}</span>
      </div>
    </v-sheet>

    <!-- Expandable Table -->
     <DynamicTable
        :data="data"
        title="Accounts"
        :icon="CircleDollarSign"
        icon-bg="rgba(34,197,94,0.1)"
        icon-color="rgb(34,197,94)"
        :columns="columns"
        row-key="id"
        :expanded-fields="expandedDetails"
        show-dialog-button
        dialog-button-label="Go to Account"
        @open-dialog="selectedItem = $event; dialogVisible = true"
        @open-expandable-dialog="selectedItem = $event; dialogVisible = true"
        show-expandable-dialog
        expandableDialogBtn="View Check"
      />
    
  </div>
</template>

<script setup>
import { FileDown, XCircle, CircleDollarSign } from 'lucide-vue-next';
import DynamicTable from './shared/DynamicTable.vue';

defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
});

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
  { key: 'status', title: 'Status' },
  { key: 'name',   title: 'Name' },
  { key: 'totalAmount', title: 'Total Amount' },
  { key: 'totalCollected', title: 'Total Collected' },
  { key: 'currentBalance', title: 'Current Balance' },
];

const data = [
  { 
    id: 1,
    status: 'Active',
    name: 'global logistics inc',
    totalAmount: '$15,000',
    totalCollected: '$10,000',
    currentBalance: '$5,000',
    date: '02/18/26',
    checkNum: '#9902',
    desc: 'Payment',
    agency: '$50',
    client: '$450',
    convFees: '$250',
    agencyFees: '$150',
    clientFees: '$100',
    attorneyFees: '$100'
  }
]


const expandedDetails = [
  { key: 'date', label: 'Date' },
  { key: 'desc', label: 'Description' },
  { key: 'checkNum', label: 'ID/Check Number' },
  { key: 'desc', label: 'Description' },
  { key: 'agency', label: 'Agency' },
  { key: 'client', label: 'Client' },
  { key: 'convFees', label: 'Conv.Fees' },
  { key: 'agencyFees', label: 'Agency Fees' },
  { key: 'clientFees', label: 'Client Fees' },
  { key: 'attorneyFees', label: 'Attorney Fees' },
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