<template>
  <!-- Payment Modal -->
  <v-dialog v-model="isPaymentModalOpen" max-width="672">
    <v-card :class="['pa-0 overflow-hidden', isDark ? 'bg-grey-darken-4' : 'bg-white']" style="border-radius: 30px; border: 1px solid; " :style="isDark ? 'border-color: rgba(255,255,255,0.1)' : 'border-color: #e2e8f0'">
      <v-card-title :class="['d-flex justify-space-between align-center pa-6', isDark ? 'border-b-thin border-white' : 'border-b-thin border-grey-lighten-3']" style="border-bottom: 1px solid;">
        <div class="d-flex align-center ga-3">
          <div class="pa-2 rounded-lg" style="background: rgba(59,130,246,0.1)">
            <History class="text-blue" :size="24" />
          </div>
          <div>
            <p :class="['text-h6 font-weight-black text-uppercase', isDark ? 'text-white' : 'text-grey-darken-4']">Payment History</p>
            <p :class="['text-caption font-weight-bold text-uppercase ls-widest', isDark ? 'text-white' : 'text-grey']" style="opacity: 0.4; font-size: 10px;">
              Account: {{ topHeader.accountNumber }}
            </p>
          </div>
        </div>
        <v-btn :icon="true" variant="text" :class="isDark ? 'text-white' : 'text-grey'" @click="isPaymentModalOpen = false" style="opacity: 0.4">
          <X :size="20" />
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-6">
        <div :class="['rounded-xl overflow-hidden', isDark ? '' : '']" :style="isDark ? 'border: 1px solid rgba(255,255,255,0.05)' : 'border: 1px solid #f1f5f9'">
          <v-table :theme="theme" density="comfortable">
            <thead>
              <tr :class="isDark ? 'bg-grey-darken-3' : 'bg-grey-lighten-4'">
                <th class="text-blue font-weight-black text-uppercase ls-widest" style="font-size:10px;">Post Date</th>
                <th class="text-blue font-weight-black text-uppercase ls-widest" style="font-size:10px;">Method</th>
                <th class="text-blue font-weight-black text-uppercase ls-widest text-right" style="font-size:10px;">Amount</th>
                <th class="text-blue font-weight-black text-uppercase ls-widest text-center" style="font-size:10px;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in paymentHistory" :key="index" class="payment-row">
                <td :class="['text-sm font-weight-bold', isDark ? 'text-white' : 'text-grey-darken-2']">{{ item.date }}</td>
                <td>
                  <div class="d-flex align-center ga-2">
                    <CreditCard :size="14" class="text-grey" />
                    <span :class="['text-caption font-weight-black text-uppercase', isDark ? 'text-white' : 'text-grey-darken-1']" style="opacity: 0.6">{{ item.method }}</span>
                  </div>
                </td>
                <td class="text-right text-sm font-weight-black text-green">{{ item.amount }}</td>
                <td class="text-center">
                  <span :class="['px-2 py-1 rounded font-weight-black text-uppercase', item.status === 'Cleared' ? 'text-green' : 'text-red']" style="font-size:10px;" :style="item.status === 'Cleared' ? 'background: rgba(72,199,142,0.1)' : 'background: rgba(255,82,82,0.1)'">
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <v-btn block color="blue-darken-1" class="mt-6 font-weight-black text-uppercase ls-widest rounded-xl" size="large" style="letter-spacing: 0.15em; border-radius: 16px;">
          <Plus :size="18" class="mr-2" />
          New Payment Transaction
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- Hexagon / Account Status Modal -->
  <v-dialog v-model="isHexagonDialogOpen" max-width="672">
    <v-card class="pa-0 overflow-hidden" style="border-radius: 30px;" :style="isDark ? 'background:#0f172a; border: 1px solid rgba(255,255,255,0.1)' : 'background:#fff; border: 1px solid #e2e8f0'">
      <v-card-title class="d-flex justify-space-between align-center pa-6" style="border-bottom: 1px solid;" :style="isDark ? 'border-color: rgba(255,255,255,0.05)' : 'border-color: #f1f5f9'">
        <div class="d-flex align-center ga-3">
          <div class="pa-2 rounded-lg" style="background: rgba(239,68,68,0.1)">
            <Hexagon class="text-red" :size="24" />
          </div>
          <div>
            <p :class="['text-h6 font-weight-black text-uppercase', isDark ? 'text-white' : 'text-grey-darken-4']">Account Status</p>
            <p class="text-caption font-weight-bold text-uppercase text-grey" style="opacity: 0.4; font-size:10px;">
              Account: {{ topHeader.accountNumber }}
            </p>
          </div>
        </div>
        <v-btn :icon="true" variant="text" :class="isDark ? 'text-white' : 'text-grey'" @click="isHexagonDialogOpen = false" style="opacity: 0.4">
          <X :size="20" />
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-6">
        <div class="d-flex flex-column ga-6">
          <SelectField label="Account Status" :options="[{value:'open',label:'Open'},{value:'closed',label:'Closed'},{value:'legal',label:'Legal'},{value:'charged-off',label:'Charged Off'}]" default-value="open" :theme="theme" />
          <SelectField label="Compliance Condition" :options="[{value:'compliant',label:'Compliant'},{value:'non-compliant',label:'Non-Compliant'},{value:'pending',label:'Pending Review'}]" default-value="compliant" :theme="theme" />
          <SelectField label="Special Comment" :options="[{value:'none',label:'None'},{value:'bankruptcy',label:'Bankruptcy Filed'},{value:'dispute',label:'Under Dispute'},{value:'settlement',label:'Settlement Pending'}]" default-value="none" :theme="theme" />
          <SelectField label="Consumer Information Indicator" :options="[{value:'active',label:'Active Consumer'},{value:'inactive',label:'Inactive'},{value:'deceased',label:'Deceased'},{value:'military',label:'Military Active'}]" default-value="active" :theme="theme" />
          <SelectField label="ECOA Code" :options="[]" :theme="theme" />
        </div>
        <div class="d-flex ga-4 mt-8">
          <v-btn variant="tonal" :color="isDark ? 'grey-darken-1' : 'grey-lighten-2'" class="flex-1 font-weight-black text-uppercase ls-widest rounded-xl" size="large" @click="isHexagonDialogOpen = false" style="border-radius:16px; letter-spacing:0.15em;">
            Cancel
          </v-btn>
          <v-btn color="blue-darken-1" class="flex-1 font-weight-black text-uppercase rounded-xl" size="large" style="border-radius:16px; letter-spacing:0.15em;">
            Submit
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- Main Card -->
  <v-card
    class='w-100 pa-4 mb-8 overflow-hidden position-relative border-thin bg-container border-container_border'
    style="border-radius: 25px; transition: all 0.5s;"
    :style="isDark ? 'border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(40px);' : 'border: 1px solid #cbd5e1; box-shadow: 0 4px 24px rgba(15,23,42,0.15); backdrop-filter: blur(40px);'"
    elevation="0"
  >
    <div class="position-absolute" style="top:-96px; right:-96px; width:256px; height:256px; background:rgba(37,99,235,0.1); filter:blur(100px); border-radius:50%; pointer-events:none;" />

    <!-- Row 1: Identity & Tabs -->
    <div
      class="d-flex flex-column flex-lg-row justify-space-between align-start align-lg-center ga-6 mb-6 pb-6"
      style="border-bottom: 1px solid;"
      :style="isDark ? 'border-color: rgba(255,255,255,0.05)' : 'border-color: #f1f5f9'"
    >
      <div class="d-flex align-center ga-4">
        <div>
          <h2 :class="['text-h4 font-weight-black my-4', isDark ? 'text-white' : 'text-grey-darken-4']" style="letter-spacing:-0.02em; line-height:1;">
            {{ topHeader.debtor }}
          </h2>
          <span :class="['text-h6 font-weight-bold', isDark ? 'text-white' : 'text-grey']">{{ topHeader.accountNumber }}</span>
        </div>

        <!-- Tabs -->
        <div
          class="d-flex ga-1 pa-2 rounded-xl"
          :style="isDark ? 'background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(12px);' : 'background: rgba(241,245,249,0.8); border: 1px solid #cbd5e1; box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);'"
        >
          <v-btn
            v-for="tab in tabs"
            :key="tab.id"
            @click="localActiveCreditor = tab.id"
            :color="localActiveCreditor === tab.id ? 'blue-darken-1' : 'transparent'"
            :variant="localActiveCreditor === tab.id ? 'elevated' : 'text'"
            class="font-weight-black text-capitalize rounded-lg"
            style="letter-spacing: 0.05em; font-size: 1rem;"
            :class="localActiveCreditor !== tab.id ? (isDark ? 'text-white' : 'text-grey-darken-1') : 'text-white'"
          >
            {{ tab.label }}
          </v-btn>
        </div>
      </div>

      <!-- Hexagon trigger -->
      <div class="position-relative hexagon-trigger" @click="isHexagonDialogOpen = true" style="cursor:pointer;">
        <Hexagon :size="110" class="text-red hexagon-icon" />
        <span class="position-absolute text-red font-weight-bold text-uppercase" style="font-size:10px; top:50%; left:50%; transform:translate(-50%,-50%);">reported</span>
      </div>

      <div class="d-flex flex-column align-end ga-2">
        <v-chip
          :color="isDark ? 'amber-darken-1' : 'amber'"
          class="font-weight-black text-uppercase px-4"
          style="letter-spacing: 0.15em; font-size: 1rem; height: 36px; border-radius: 999px;"
          :text-color="isDark ? 'black' : 'grey-darken-4'"
        >
          {{ topHeader.status }}
        </v-chip>
        <div class="d-flex align-center ga-2">
          <span :class="['text-subtitle-1 font-weight-black', isDark ? 'text-blue-lighten-1' : 'text-blue-darken-1']" style="letter-spacing:0.1em;">Account Age</span>
          <Clock :size="20" :class="isDark ? 'text-blue-lighten-1' : 'text-blue-darken-1'" />
          <span :class="['text-subtitle-1 font-weight-bold', isDark ? 'text-white' : 'text-grey-darken-3']">{{ accountStats[7].value }}</span>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <v-row :gutter="10" cols="5">

      <!-- Col 1 -->
      <v-col class="d-flex flex-column ga-6">
        <StatField label="Client's Name" :value="accountStats[0].value" :theme="theme" />
        <StatField label="Creditor" :value="accountStats[1].value" :theme="theme" />
        <StatField label="Account #" :value="topHeader.accountNumber" :theme="theme" />
        <StatField label="Client #" :value="topHeader.clientNumber" :theme="theme" />
        <StatField label="Court Case #" value="124-49872-320" :theme="theme" />
        <Metric :value="563" :width="300" :height="150" />
        <!-- <v-img src="https://aoausa.com/wp-content/uploads/2020/10/credit-scale.png" alt="Credit Scale" /> -->
        <!-- <span class="text-h6 font-weight-bold ml-10">Credit score 450</span> -->
      </v-col>

      <!-- Col 2 -->
      <v-col class="d-flex flex-column ga-6">
        <SelectField label="Status Type" :options="[{value:'open',label:'Open'},{value:'close',label:'Close'},{value:'legal',label:'Legal'}]" default-value="open" :theme="theme" />
        <SelectField label="Main Status" :options="[{value:'stat1',label:'Processing'},{value:'stat2',label:'Escalated'},{value:'stat3',label:'Final Notice'}]" default-value="stat1" :theme="theme" />
        <SelectField label="Sub-Status" :options="[{value:'sec-stat1',label:'Skip Tracing'},{value:'sec-stat2',label:'Asset Verify'},{value:'sec-stat3',label:'Legal Prep'}]" default-value="sec-stat1" :theme="theme" />
        <SelectField label="Sub-sub-Status" :options="[{value:'sec-stat1',label:'Field Agent'},{value:'sec-stat2',label:'Mail Return'},{value:'sec-stat3',label:'Call Refused'}]" default-value="sec-stat1" :theme="theme" />
      </v-col>

      <!-- Col 3 -->
      <v-col  class="d-flex flex-column ga-6">
        <SelectField label="Account Type" :options="[{value:'comm',label:'Commercial'},{value:'cons',label:'Consumer'}]" default-value="comm" :theme="theme" />
        <SelectField label="Account Sub-Type" :options="[{value:'1',label:'Medical'},{value:'2',label:'Retail'},{value:'3',label:'Banking'}]" default-value="1" :theme="theme" />
        <SelectField label="Primary Collector" :options="[{value:'john',label:'John Doe'},{value:'jane',label:'Sarah Jenkins'}]" default-value="jane" :theme="theme" />
        <SelectField label="Co-Collector" :options="[{value:'jane',label:'Jane Smith'},{value:'john',label:'John Doe'}]" default-value="jane" :theme="theme" />
        <SelectField label="Agreement Arrangement" :options="[]" default-value="jane" :theme="theme" />
        <SelectField label="Last Date of Service" :options="[]" default-value="jane" :theme="theme" />
      </v-col>

      <!-- Col 4 -->
      <v-col  class="d-flex flex-column ga-6">
        <DateField label="Charged Off" :theme="theme" />
        <DateField label="Referring" :theme="theme" />
        <DateField label="Originated" :theme="theme" />
        <DateField label="Next Work" :theme="theme" />
        <DateField label="1st Delinq" :theme="theme" />
        <DateField label="Statute of Limitation" :theme="theme" />
      </v-col>

      <!-- Col 5: Balance Cards -->
      <v-col class="d-flex flex-column ga-3">

        <div class="py-2 px-4 rounded-xl d-flex flex-column ga-1 balance-card" :style="isDark ? 'background: rgba(37,99,235,0.4); border: 1px solid rgba(59,130,246,0.2)' : 'background: rgba(239,246,255,0.5); border: 1px solid #dbeafe; box-shadow: 0 1px 2px rgba(0,0,0,0.05)'">
          <span :class="['font-weight-black text-uppercase', isDark ? 'text-blue-lighten-2' : 'text-blue-darken-2']" style="font-size:10px; letter-spacing:0.1em;">Total Balance</span>
          <span :class="['text-h6 font-weight-black', isDark ? 'text-white' : 'text-blue-darken-4']">{{ currentCreditor.balance }}</span>
        </div>

        <div class="py-2 px-4 rounded-xl d-flex flex-column ga-1 balance-card" :style="isDark ? 'background: rgba(71,85,105,0.6); border: 1px solid rgba(59,130,246,0.2)' : 'background: rgba(239,246,255,0.5); border: 1px solid #dbeafe; box-shadow: 0 1px 2px rgba(0,0,0,0.05)'">
          <span :class="['font-weight-black text-uppercase', isDark ? 'text-blue-lighten-2' : 'text-blue-darken-2']" style="font-size:10px; letter-spacing:0.1em;">Principal</span>
          <span :class="['text-subtitle-1 font-weight-black', isDark ? 'text-white' : 'text-blue-darken-4']">{{ principalAmount }}</span>
        </div>

        <div class="py-2 px-4 rounded-xl d-flex flex-column ga-1 balance-card" :style="isDark ? 'background: rgba(71,85,105,0.6); border: 1px solid rgba(59,130,246,0.2)' : 'background: rgba(255,241,242,0.5); border: 1px solid #fee2e2; box-shadow: 0 1px 2px rgba(0,0,0,0.05)'">
          <span :class="['font-weight-black text-uppercase', isDark ? 'text-blue-lighten-2' : 'text-red-darken-2']" style="font-size:10px; letter-spacing:0.1em;">Interest</span>
          <span :class="['text-subtitle-1 font-weight-black', isDark ? 'text-white' : 'text-red-darken-4']">{{ interestAmount }}</span>
        </div>

        <div class="py-2 px-4 rounded-xl d-flex flex-column ga-1 balance-card" :style="isDark ? 'background: rgba(71,85,105,0.6); border: 1px solid rgba(59,130,246,0.2)' : 'background: rgba(240,253,250,0.5); border: 1px solid #ccfbf1; box-shadow: 0 1px 2px rgba(0,0,0,0.05)'">
          <span :class="['font-weight-black text-uppercase', isDark ? 'text-blue-lighten-2' : 'text-teal-darken-2']" style="font-size:10px; letter-spacing:0.1em;">Costs/Fees</span>
          <span :class="['text-subtitle-1 font-weight-black', isDark ? 'text-white' : 'text-teal-darken-4']">{{ feesAmount }}</span>
        </div>

        <!-- Payments -->
        <div @click="isPaymentModalOpen = true" class="py-2 px-4 rounded-xl d-flex flex-column ga-1 balance-card" style="cursor:pointer;" :style="isDark ? 'background: rgba(71,85,105,0.6); border: 1px solid rgba(59,130,246,0.2)' : 'background: rgba(255,247,237,0.5); border: 1px solid #fed7aa; box-shadow: 0 1px 2px rgba(0,0,0,0.05)'">
          <div class="d-flex justify-space-between align-center">
            <span :class="['font-weight-black text-uppercase', isDark ? 'text-blue-lighten-2' : 'text-orange-darken-2']" style="font-size:10px; letter-spacing:0.1em;">Payments</span>
            <ExternalLink :size="18" class="text-grey-lighten-1" />
          </div>
          <span :class="['text-subtitle-1 font-weight-black', isDark ? 'text-white' : 'text-orange-darken-4']">$1,200.00</span>
        </div>

        <!-- Make Payments -->
        <div @click="isPaymentModalOpen = true" class="py-4 px-4 rounded-xl d-flex align-center justify-center balance-card" style="cursor:pointer; background: #eab308; border: 1px solid #dbeafe;">
          <span class="text-h6 font-weight-black" style="color: #092B9C; letter-spacing: 0.05em;">Make Payments</span>
        </div>

        <div class="mt-2 pa-3 rounded-xl d-flex justify-space-between align-center" style="border-top: 1px solid;" :style="isDark ? 'border-color: rgba(255,255,255,0.05)' : 'border-color: #f1f5f9'">
          <span :class="['text-body-2 font-weight-black', isDark ? 'text-white' : 'text-grey-darken-1']" style="opacity:0.3; letter-spacing:0.1em;">Can Settle</span>
          <span :class="['text-body-2 font-weight-black', isDark ? 'text-green-lighten-1' : 'text-green-darken-1']">$7,445.67</span>
        </div>

        <div class="mt-2 pa-3 rounded-xl d-flex justify-space-between align-center">
          <span :class="['text-body-2 font-weight-black', isDark ? 'text-white' : 'text-grey-darken-1']" style="opacity:0.3; letter-spacing:0.1em;">Linked Balance</span>
          <span :class="['text-body-2 font-weight-black', isDark ? 'text-red-lighten-1' : 'text-red-darken-1']">$10,000.00</span>
        </div>

        <div class="px-4 py-2 rounded-xl d-flex justify-space-between align-center linked-row" :style="isDark ? 'border: 1px solid rgba(239,68,68,0.6)' : 'border: 1px solid rgba(239,68,68,0.7)'">
          <span :class="['text-body-2', isDark ? 'text-white' : 'text-grey-darken-1']" style="letter-spacing:0.05em;">John Doe</span>
          <span :class="['text-body-2 font-weight-black', isDark ? 'text-red-lighten-1' : 'text-red-darken-1']">#125438-0000</span>
        </div>
        <div class="px-4 py-2 rounded-xl d-flex justify-space-between align-center linked-row" :style="isDark ? 'border: 1px solid rgba(239,68,68,0.6)' : 'border: 1px solid rgba(239,68,68,0.7)'">
          <span :class="['text-body-2', isDark ? 'text-white' : 'text-grey-darken-1']" style="letter-spacing:0.05em;">Jane Smith</span>
          <span :class="['text-body-2 font-weight-black', isDark ? 'text-red-lighten-1' : 'text-red-darken-1']">#125438-0000</span>
        </div>

      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Clock, ExternalLink, X, CreditCard, History, Plus, Hexagon } from 'lucide-vue-next'
import SelectField from './shared/SelectField.vue'
import DateField from './shared/DateField.vue'
import StatField from './shared/StatField.vue'
import { useTheme } from 'vuetify'
import Metric from './Metric.vue'

  const theme = useTheme()
  const props = defineProps({
    activeCreditor: { type: String, default: 'creditor 1' },
  })

  const emit = defineEmits(['update:activeCreditor'])
 
  const isDark = computed(() => theme.global.current.value.dark)
  const isPaymentModalOpen = ref(false)
  const isHexagonDialogOpen = ref(false)

  const localActiveCreditor = computed({
    get: () => props.activeCreditor,
    set: (val) => emit('update:activeCreditor', val),
  })

  const topHeader = {
    debtor: 'Marcus Thorne',
    business: 'Thorne Architecture & Design Ltd.',
    accountNumber: 'DC-99281-XT',
    clientNumber: '6512-7981-4503',
    status: 'Active / Legal',
    lastUpdated: 'Feb 09, 2026 - 14:30',
  }

  const getCreditorData = (id) => {
    switch (id) {
      case 'creditor 2': return { name: 'Global Credit Corp', client: 'Blue Star Logistics', balance: '$12,450.00' }
      case 'creditor 3': return { name: 'Vanguard Assets', client: 'Peak performance Inc', balance: '$8,900.00' }
      case 'creditor 4': return { name: 'Sentinel Recovery', client: 'Oceanic Enterprises', balance: '$15,200.00' }
      default: return { name: 'Apex Financial Group', client: 'Apex Realty Group', balance: '$10,636.67' }
    }
  }

  const currentCreditor = computed(() => getCreditorData(localActiveCreditor.value))

  const accountStats = computed(() => [
    { label: "Client's Name", value: currentCreditor.value.client },
    { label: 'Creditor', value: currentCreditor.value.name },
    { label: 'Collector', value: 'Sarah Jenkins' },
    { label: 'Que', value: 'Priority High (Q1)' },
    { label: 'Referring', value: 'Internal Referral' },
    { label: 'Account Type', value: 'Consumer Credit' },
    { label: 'Client Claim', value: currentCreditor.value.balance },
    { label: 'Account Age', value: '142 Days' },
    { label: 'Status', value: 'Legal Review' },
    { label: 'Originated', value: 'Sept 12, 2025' },
  ])

  const tabs = [
    { id: 'creditor 1', label: 'philip james' },
    { id: 'creditor 2', label: 'mark hakim' },
    { id: 'creditor 3', label: 'jason north' },
    { id: 'creditor 4', label: 'allan jones' },
  ]

  const paymentHistory = [
    { date: 'Jan 15, 2026', amount: '$500.00', method: 'ACH Transfer', status: 'Cleared' },
    { date: 'Dec 12, 2025', amount: '$250.00', method: 'Credit Card', status: 'Cleared' },
    { date: 'Nov 10, 2025', amount: '$250.00', method: 'Credit Card', status: 'Cleared' },
  ]

  const principalAmount = computed(() => {
    if (localActiveCreditor.value === 'creditor 1') return '$3,507.76'
    if (localActiveCreditor.value === 'creditor 2') return '$4,200.00'
    return '$2,850.00'
  })

  const interestAmount = computed(() => {
    if (localActiveCreditor.value === 'creditor 1') return '$6,076.59'
    if (localActiveCreditor.value === 'creditor 2') return '$1,150.00'
    return '$840.00'
  })

  const feesAmount = computed(() => localActiveCreditor.value === 'creditor 1' ? '$1,052.32' : '$450.00')


</script>

<style scoped>
.ls-widest { letter-spacing: 0.15em; }

.balance-card { transition: transform 0.2s; }
.balance-card:hover { transform: scale(1.02); }

.payment-row:hover { background: rgba(59, 130, 246, 0.05); }

.hexagon-trigger:hover .hexagon-icon { color: #f87171 !important; }
.hexagon-trigger { transition: transform 0.2s; }
.hexagon-trigger:hover { transform: scale(1.05); }

.linked-row { transition: background 0.2s; }
</style>