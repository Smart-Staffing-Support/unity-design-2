<template>
  <div class="d-flex flex-column ga-6 animate-fade">

    <!-- Tab Navigation + Balance Badges -->
    <div class="d-flex flex-column flex-md-row justify-space-between align-start align-md-center ga-4 mt-8">

      <!-- Tabs -->
      <div class="d-flex ga-6">
        <button
          class="tab-btn pb-4 text-body-1 font-weight-medium"
          :class="activeTab === 'account' ? 'tab-btn--active' : 'tab-btn--inactive'"
          :style="activeTab === 'account'
            ? 'color: #38bdf8; border-bottom: 2px solid #38bdf8;'
            : theme === 'dark' ? 'color: white; border-bottom: 2px solid transparent;' : 'color: #475569; border-bottom: 2px solid transparent;'"
          @click="activeTab = 'account'"
        >Account Billing</button>
        <button
          class="tab-btn pb-4 text-body-1 font-weight-medium"
          :style="activeTab === 'legal'
            ? 'color: #38bdf8; border-bottom: 2px solid #38bdf8;'
            : theme === 'dark' ? 'color: white; border-bottom: 2px solid transparent;' : 'color: #475569; border-bottom: 2px solid transparent;'"
          @click="activeTab = 'legal'"
        >Legal Billing</button>
      </div>

      <!-- Balance Badges -->
      <div class="d-flex ga-4">
        <div
          class="pa-3 px-8 rounded-lg d-flex flex-column justify-center align-center ga-2"
          style="background: #0f766e;"
        >
          <span class="text-body-2 font-weight-bold text-white">Client Owes: $382,660</span>
        </div>
        <div
          class="pa-3 px-8 rounded-lg d-flex flex-column justify-center align-center ga-2"
          style="background: #1e40af;"
        >
          <span class="text-body-2 font-weight-bold text-white">Company Owes: $382,660</span>
        </div>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="d-flex flex-column ga-6">

      <!-- ═══ ACCOUNT BILLING TAB ═══ -->
      <template v-if="activeTab === 'account'">

        <DynamicTable
          :theme="theme"
          :data="accountData"
          title="Account Billing"
          :icon="ListFilterPlus"
          icon-bg="rgba(34,197,94,0.1)"
          icon-color="rgb(34,197,94)"
          :columns="accountColumns"
          row-key="id"
          :actions="[
            { id: 'offset', label: 'Offset Selected Accounts', icon: ArrowRightLeft },
          ]"
          @action="onTableAction"
          show-actions-drop-down
          show-dialog-button
          dialog-button-label="Details"
          @open-dialog="selectedItem = $event; dialogVisible = true"
        />

        <!-- Footer: Icon Buttons + Totals -->
        <div class="d-flex flex-column flex-md-row justify-space-between align-start ga-6">
          <!-- Icon Buttons -->
          <div class="d-flex ga-3">
            <IconButton :icon="FileDown" :theme="theme" />
            <IconButton :icon="Mail" :theme="theme" />
            <IconButton :icon="Printer" :theme="theme" />
            <IconButton :icon="MessageCircle" :theme="theme" />
            <IconButton :icon="Link2" :theme="theme" />
          </div>
          <!-- Totals -->
          <div
            class="pa-6 rounded-xl d-flex ga-8 flex-wrap"
            :style="theme === 'dark'
              ? 'background: #0f172a; border: 1px solid #2563eb;'
              : 'background: #f0f9ff; border: 1px solid #e2e8f0; box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
          >
            <FooterStat label="Total Attorney:" value="$0.00" :theme="theme" />
            <FooterStat label="Total Agency:" value="$50.00" :theme="theme" />
            <FooterStat label="Total Client:" value="$900.00" :theme="theme" />
            <FooterStat label="Total:" value="$1,850.00" :theme="theme" :highlight="true" />
          </div>
        </div>
      </template>

      <!-- ═══ LEGAL BILLING TAB ═══ -->
      <template v-else>

        <DynamicTable
          :theme="theme"
          :data="legalData"
          title="Legal Accounting"
          :icon="ListFilterPlus"
          icon-bg="rgba(34,197,94,0.1)"
          icon-color="rgb(34,197,94)"
          :columns="legalColumns"
          row-key="id"
          :expanded-fields="legalExpandedDetails"
          show-actions-drop-down
          show-dialog-button
          dialog-button-label="Details"
          @open-dialog="selectedItem = $event; dialogVisible = true"
        />
        

        <!-- Footer: Icon Buttons + Totals -->
        <div class="d-flex flex-column flex-md-row justify-space-between align-start ga-6">
          <div class="d-flex ga-3">
            <IconButton :icon="FileDown" :theme="theme" />
            <IconButton :icon="Mail" :theme="theme" />
            <IconButton :icon="Printer" :theme="theme" />
            <IconButton :icon="MessageCircle" :theme="theme" />
            <IconButton :icon="Link2" :theme="theme" />
          </div>
          <div
            class="pa-6 rounded-xl d-flex ga-8 flex-wrap"
            :style="theme === 'dark'
              ? 'background: #0f172a; border: 1px solid #2563eb;'
              : 'background: #f0f9ff; border: 1px solid #e2e8f0; box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
          >
            <FooterStat label="Agency Spent:" value="$0.00" :theme="theme" />
            <FooterStat label="Client Spent:" value="$50.00" :theme="theme" />
            <FooterStat label="Pending:" value="$900.00" :theme="theme" />
            <FooterStat label="Client Trust Balance:" value="$850.00" :theme="theme" :highlight="true" />
          </div>
        </div>
      </template>
    </div>

    <!-- ═══ PAYMENT MODAL ═══ -->
    <v-dialog
      v-model="isPaymentModalOpen"
      max-width="680"
      :scrim-opacity="0.6"
      style="backdrop-filter: blur(8px);"
      scrollable
    >
      <v-sheet
        style="border-radius: 30px; overflow: hidden;"
        color="transparent"
        :style="theme === 'dark'
          ? 'background: #0f172a !important; border: 1px solid rgba(255,255,255,0.10);'
          : 'background: white !important; border: 1px solid #e2e8f0;'"
      >
        <!-- Modal Header -->
        <div
          class="pa-6 d-flex justify-space-between align-center"
          style="position: sticky; top: 0; z-index: 10;"
          :style="theme === 'dark'
            ? 'background: #0f172a; border-bottom: 1px solid rgba(255,255,255,0.05);'
            : 'background: white; border-bottom: 1px solid #e2e8f0;'"
        >
          <div class="d-flex align-center ga-3">
            <div class="pa-2 rounded-lg" style="background: rgba(59,130,246,0.10);">
              <CircleDollarSign :size="24" color="#3b82f6" />
            </div>
            <div>
              <div
                class="text-h6 font-weight-black text-uppercase"
                style="letter-spacing: -0.3px;"
                :style="theme === 'dark' ? 'color: white;' : 'color: #0f172a;'"
              >New Transaction</div>
              <div
                class="text-caption font-weight-bold text-uppercase"
                style="letter-spacing: 0.12em;"
                :style="theme === 'dark' ? 'color: rgba(255,255,255,0.5);' : 'color: #94a3b8;'"
              >Account: #882019 - David and Fisher</div>
            </div>
          </div>
          <button
            class="d-flex align-center justify-center rounded-circle"
            style="width: 32px; height: 32px; border: none; cursor: pointer; background: transparent; transition: background 0.15s;"
            :style="theme === 'dark' ? 'color: rgba(255,255,255,0.4);' : 'color: #94a3b8;'"
            @click="isPaymentModalOpen = false"
            @mouseover="$event.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f1f5f9'"
            @mouseleave="$event.currentTarget.style.background = 'transparent'"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="pa-6" style="max-height: 70vh; overflow-y: auto;">
          <v-row>
            <v-col cols="12" sm="6"><DateField label="Date" :theme="theme" /></v-col>
            <v-col cols="12" sm="6">
              <SelectField
                label="Payment Type"
                :options="[
                  {value:'credit_card', label:'Credit Card'},
                  {value:'ach',         label:'ACH'},
                  {value:'check',       label:'Check'},
                ]"
                :theme="theme"
                @update:modelValue="paymentType = $event"
              />
            </v-col>
            <v-col cols="12" sm="6"><InputField label="ID/Check Number" :theme="theme" /></v-col>
            <v-col cols="12" sm="6"><InputField label="Description" :theme="theme" /></v-col>
            <v-col cols="12" sm="6"><InputField label="Amount" :theme="theme" /></v-col>
            <v-col cols="12" sm="6"><SelectField label="From" :options="[]" :theme="theme" /></v-col>
            <v-col cols="12" sm="6"><SelectField label="To" :options="[]" :theme="theme" /></v-col>
            <v-col cols="12" sm="6"><CheckboxField label="Add Conv. Fee" :theme="theme" /></v-col>
          </v-row>

          <!-- Credit Card Fields -->
          <v-sheet
            v-if="paymentType === 'credit_card'"
            class="pa-4 rounded-xl mt-6"
            color="transparent"
            style="border-radius: 16px !important; border: 1px solid;"
            :style="theme === 'dark'
              ? 'background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.10);'
              : 'background: #f8fafc !important; border-color: #e2e8f0;'"
          >
            <div
              class="text-caption font-weight-black text-uppercase mb-4"
              style="letter-spacing: 0.15em;"
              :style="theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;'"
            >Credit Card Information</div>
            <v-row>
              <v-col cols="12" sm="6"><InputField label="First Name" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Last Name" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Email" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Phone Number" :theme="theme" /></v-col>
              <v-col cols="12"><InputField label="Address" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="City" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="State" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Zip Code" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Credit Card Number" placeholder="1234 5678 9012 3456" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Expiration Date" placeholder="MM/YY" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="CVV" placeholder="123" :theme="theme" /></v-col>
            </v-row>
          </v-sheet>

          <!-- ACH Fields -->
          <v-sheet
            v-if="paymentType === 'ach'"
            class="pa-4 rounded-xl mt-6"
            color="transparent"
            style="border-radius: 16px !important; border: 1px solid;"
            :style="theme === 'dark'
              ? 'background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.10);'
              : 'background: #f8fafc !important; border-color: #e2e8f0;'"
          >
            <div
              class="text-caption font-weight-black text-uppercase mb-4"
              style="letter-spacing: 0.15em;"
              :style="theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;'"
            >ACH Information</div>
            <v-row>
              <v-col cols="12" sm="6">
                <SelectField
                  label="Account Type"
                  :options="[{value:'checking',label:'Checking'},{value:'savings',label:'Savings'}]"
                  :theme="theme"
                />
              </v-col>
              <v-col cols="12" sm="6"><InputField label="Account Name" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Account Number" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Routing Number" :theme="theme" /></v-col>
            </v-row>
          </v-sheet>

          <!-- Check Upload Fields -->
          <v-sheet
            v-if="paymentType === 'check'"
            class="pa-4 rounded-xl mt-6"
            color="transparent"
            style="border-radius: 16px !important; border: 1px solid;"
            :style="theme === 'dark'
              ? 'background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.10);'
              : 'background: #f8fafc !important; border-color: #e2e8f0;'"
          >
            <div
              class="text-caption font-weight-black text-uppercase mb-4"
              style="letter-spacing: 0.15em;"
              :style="theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;'"
            >Check Upload</div>
            <label
              class="text-caption font-weight-bold text-uppercase"
              :style="theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;'"
            >Upload Check Image</label>
            <div
              class="mt-2 pa-6 rounded-xl text-center cursor-pointer"
              style="border: 2px dashed; transition: background 0.15s ease;"
              :style="theme === 'dark'
                ? 'border-color: rgba(255,255,255,0.10);'
                : 'border-color: #cbd5e1; background: #f8fafc;'"
              @mouseover="$event.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f1f5f9'"
              @mouseleave="$event.currentTarget.style.background = theme === 'dark' ? 'transparent' : '#f8fafc'"
            >
              <input type="file" accept="image/*,.pdf" style="display: none;" id="check-upload" />
              <label for="check-upload" class="cursor-pointer d-block">
                <p class="text-body-2 font-weight-bold" :style="theme === 'dark' ? 'color: white;' : 'color: #334155;'">
                  Click to upload or drag and drop
                </p>
                <p class="text-caption mt-1" :style="theme === 'dark' ? 'color: #64748b;' : 'color: #94a3b8;'">
                  PNG, JPG, PDF up to 10MB
                </p>
              </label>
            </div>
          </v-sheet>

          <!-- Action Buttons -->
          <div class="d-flex ga-4 mt-6">
            <button
              class="flex-grow-1 d-flex align-center justify-center ga-2 py-4 rounded-xl text-caption font-weight-black text-uppercase text-white"
              style="background: #2563eb; border: none; cursor: pointer; letter-spacing: 0.15em; box-shadow: 0 8px 24px rgba(37,99,235,0.25); transition: background 0.15s, transform 0.1s; width: 100%;"
              @mouseover="$event.currentTarget.style.background = '#1d4ed8'"
              @mouseleave="$event.currentTarget.style.background = '#2563eb'"
              @mousedown="$event.currentTarget.style.transform = 'scale(0.97)'"
              @mouseup="$event.currentTarget.style.transform = 'scale(1)'"
            >
              <Plus :size="18" class="mr-2" /> Process Payment
            </button>
            <button
              class="flex-grow-1 d-flex align-center justify-center ga-2 py-4 rounded-xl text-caption font-weight-black text-uppercase text-white"
              style="background: #0f766e; border: none; cursor: pointer; letter-spacing: 0.15em; box-shadow: 0 8px 24px rgba(13,148,136,0.25); transition: background 0.15s, transform 0.1s; width: 100%;"
              @mouseover="$event.currentTarget.style.background = '#0d6b63'"
              @mouseleave="$event.currentTarget.style.background = '#0f766e'"
              @mousedown="$event.currentTarget.style.transform = 'scale(0.97)'"
              @mouseup="$event.currentTarget.style.transform = 'scale(1)'"
            >
              <Minus :size="18" class="mr-2" /> Skip Payment Processing
            </button>
          </div>
        </div>
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FileDown, Mail, Printer, MessageCircle, Link2, CircleDollarSign, X, Plus, Minus,ArrowRightLeft } from 'lucide-vue-next';
import IconButton from './shared/IconButton.vue';
import SelectField from './shared/SelectField.vue';
import InputField from './shared/InputField.vue';
import DateField from './shared/DateField.vue';
import CheckboxField from './shared/CheckboxField.vue';
import DynamicTable from './shared/DynamicTable.vue';
import FooterStat from './shared/FooterStat.vue';

defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
});

const activeTab = ref('account');
const expandedRow = ref(null);
const isPaymentModalOpen = ref(false);
const paymentType = ref('');

// ── Table column headers ───────────────────────────────────────────────────────
const accountColumns = [
  { title: 'Account Number', key: 'accountNumber' },
  { title: 'status', key: 'status' },
  { title: 'ID/Check Number', key: 'checkNum' },
  { title: 'Description', key: 'desc' },
  { title: 'Attorney Fees', key: 'attFees' },
  { title: 'Agency Fees', key: 'agencyFees' },
  { title: 'Client Fees', key: 'clientFees' },
  { title: 'convenience Fees', key: 'convFees' },
  { title: 'Attorney Owes', key: 'attOwes' },
  { title: 'Agency Owes', key: 'agencyOwes' },
  { title: 'Client Owes', key: 'clientOwes' },
];

const accountData = [
  {
    id: 1,
    accountNumber: '#882019',
    status: 'active',
    checkNum: 'Ck-4402',
    desc: 'Monthly Payment',
    attFees: '$25.00',
    agencyFees: '$75.00',
    clientFees: '$5.00',
    convFees: '$0.00',
    attOwes: '$25.00',
    agencyOwes: '$450.00',
    clientOwes: '$550.00',
  },
  {
    id: 2,
    accountNumber: '#654987321',
    status: 'active',
    checkNum: 'Ck-4402',
    desc: 'Monthly Payment',
    attFees: '$25.00',
    agencyFees: '$75.00',
    clientFees: '$5.00',
    convFees: '$0.00',
    attOwes: '$25.00',
    agencyOwes: '$450.00',
    clientOwes: '$550.00',
  },
]

const legalColumns = [
  { title: 'Account Number', key: 'accNum' },
  { title: 'Full Name/Company', key: 'name' },
  { title: 'Status', key: 'status' },
  { title: 'Current Balance Due', key: 'balance' },
  { title: 'Statute of Limitation', key: 'sol' },
  { title: 'Client Sent', key: 'clientSent' },
  { title: 'Agency Spent', key: 'agencySpent' },
  { title: 'Total Pending', key: 'pending' },
  { title: 'Trust Balance', key: 'trust' }
];

const legalData = [
  {
    id: 1,
    accNum: '#65487-9201',
    name: 'David and Fisher',
    status: 'Law Suit Pending',
    balance: '$85.00',
    sol: '2-25-2023',
    clientSent: '$500.00',
    agencySent: '$400.00',
    pending: '$270.00',
    trust: '$370.00',
    date: '02/18/26',
    description: 'Payment',
    checkNum: '#9902',
    note: 'payment',
    agent: 'John Doe',
    amount: '$50.00',
    agency: '$50.00',
    client: '$450.00',
    clientSent: '$350.00',
    agencySpent: '$50.00',
    convenienceFees: '$250.00'
  },
  {
    id: 2,
    accNum: '#31878-9201',
    name: 'David and Fisher',
    status: 'Law Suit Pending',
    balance: '$85.00',
    sol: '2-25-2023',
    clientSent: '$500.00',
    agencySent: '$400.00',
    pending: '$270.00',
    trust: '$370.00',
    date: '02/18/26',
    description: 'Payment',
    checkNum: '#9902',
    note: 'payment',
    agent: 'John Doe',
    amount: '$50.00',
    agency: '$50.00',
    client: '$450.00',
    clientSent: '$350.00',
    agencySpent: '$50.00',
    convenienceFees: '$250.00'
  }
]

// ── Legal expanded row detail cells ───────────────────────────────────────────
const legalExpandedDetails = [
  { key: 'date', label: 'Date' },
  { key: 'description', label: 'Description' },
  { key: 'checkNum', label: 'ID/Check Number' },
  { key: 'note', label: 'Note' },
  { key: 'agent', label: 'Agent' },
  { key: 'amount', label: 'Amount' },
  { key: 'agency', label: 'Agency' },
  { key: 'client', label: 'Client' },
  { key: 'clientSent', label: 'Client Sent' },
  { key: 'agencySpent', label: 'Agency Spent' },
  { key: 'convenienceFees', label: 'Convenience Fees' },
];

function onTableAction(id) {
  if (id === 'offset') return 
}

</script>

<style scoped>
.animate-fade {
  animation: fadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.tab-btn {
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
  padding-left: 0;
  padding-right: 0;
}

.cursor-pointer { cursor: pointer; }
</style>