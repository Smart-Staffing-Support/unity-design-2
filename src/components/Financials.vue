<template>
  <div class="d-flex flex-column ga-8">

    <!-- SECTION 1: ADD NEW TRANSACTION -->
    <div
      class="pa-8 bg-financial_header_bg text-financial_header_border"
      style="border-radius: 35px; border: 1px solid; box-shadow: 0 1px 3px rgba(0,0,0,0.08);"
    >
      <div class="d-flex align-center ga-3 mb-8">
        <div class="pa-2 rounded-xl" style="background: rgba(34,197,94,0.1);">
          <Plus class="text-green" :size="20" />
        </div>
        <h3
          class="text-h6 font-weight-black text-uppercase text-checkbox_field_label_checked"
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
        style="letter-spacing: 0.15em; box-shadow: 0 4px 16px rgba(37,99,235,0.2);"
      >
        Post Transaction to Ledger
      </v-btn>
    </div>

    <!-- SECTION 2: TRANSACTION SUMMARY -->
    <v-row>
      <v-col cols="6" md="4" lg="2">
        <SummaryStat :theme="theme" label="Principal" value="$10,000.00" />
      </v-col>
      <v-col cols="6" md="4" lg="2">
        <SummaryStat :theme="theme" label="Interest" value="$450.32"    />
      </v-col>
      <v-col cols="6" md="4" lg="2">
        <SummaryStat :theme="theme" label="Costs" value="$125.00"    />
      </v-col>
      <v-col cols="6" md="4" lg="2">
        <SummaryStat :theme="theme" label="Subtotal" value="$10,575.32" />
      </v-col>
      <v-col cols="6" md="4" lg="2">
        <SummaryStat :theme="theme" label="Total Paid" value="-$1,200.00" />
      </v-col>
      <v-col cols="6" md="4" lg="2">
        <SummaryStat :theme="theme" label="Current Balance" value="$9,375.32"  :is-total="true" />
      </v-col>
    </v-row>

    <!-- SECTION 3: TRANSACTION HISTORY TABLE -->

    <DynamicTable
      :data="data"
      title="Transaction History"
      :icon="History"
      icon-bg="rgba(34,197,94,0.1)"
      icon-color="rgb(34,197,94)"
      :columns="columns"
      row-key="id"
      show-actions-drop-down
      :actions="[
        { id: 'print', label: 'Print Ledger', icon: Printer },
      ]"
      @action="onTableAction"
    />
  
  </div>
</template>

<script setup>
import { Plus, Printer, History } from 'lucide-vue-next'
import DateField from './shared/DateField.vue'
import SelectField from './shared/SelectField.vue'
import InputField from './shared/InputField.vue'
import SummaryStat from './shared/SummaryStat.vue'
import DynamicTable from './shared/DynamicTable.vue'

const columns = [
  { key: 'date', title: 'Date'},
  { key: 'desc', title: 'Description'},
  { key: 'checkNum', title: 'Check Number'},
  { key: 'note', title: 'Note'},
  { key: 'collector', title: 'Collector'},
  { key: 'amount', title: 'Amount'},
  { key: 'principal', title: 'Principal'},
  { key: 'interest', title: 'Interest'},
  { key: 'costs', title: 'Costs'},
  { key: 'attFees', title: 'Attorney Fees'},
  { key: 'thirdParty', title: '3rd Party'},
  { key: 'agency', title: 'Agency'},
  { key: 'client', title: 'Client'},
  { key: 'balance', title: 'Balance'},
]

const data = [
  {
    id: 1,
    date: '02/13/2026',
    desc: 'Payment',
    checkNum: '#TRX-9902',
    note: 'Ck #4402',
    collector: 'S. Jenkins',
    amount: '$500.00',
    principal: '$400.00',
    interest: '$100.00',
    costs: '$0.00',
    attFees: '$0.00',
    thirdParty: '$0.00',
    agency: '$50.00',
    client: '$450.00',
    balance: '$9,375.32'
  }
]

function onTableAction(id) {
  if (id === 'print') return 
}
</script>

<style scoped>
.transaction-row {
  transition: background 0.15s;
}
.transaction-row:hover {
  background: rgba(59, 130, 246, 0.05) !important;
}
</style>