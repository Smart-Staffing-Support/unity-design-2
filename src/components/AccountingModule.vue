<template>
  <div class="d-flex flex-column ga-6 animate-fade">

    <!-- Tab Navigation + Balance Badges -->
    <div class="d-flex flex-column flex-md-row justify-space-between align-start align-md-center ga-4 mt-8">

      <v-tabs
        v-model="activeTab"
        color="light-blue-lighten-1"
        align-tabs="start"
      >
        <v-tab value="account" class="text-title-medium">Account Billing</v-tab>
        <v-tab value="legal" class="text-title-medium">Legal Billing</v-tab>
      </v-tabs>

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
          :data="accountData"
          title="Account Billing"
          :icon="BanknoteArrowDown"
          icon-bg="rgba(197, 34, 34,0.1)"
          icon-color="rgb(197, 34, 34)"
          :columns="accountColumns"
          row-key="id"
          :actions="[
            { id: 'offset', label: 'Offset Selected Accounts', icon: ArrowRightLeft },
          ]"
          @action="onTableAction"
          show-actions-drop-down
          show-dialog-button
          dialog-button-label="Details"
          @open-dialog="selectedItem = $event; isPaymentModalOpen = true"
        />

        <!-- Footer: Icon Buttons + Totals -->
        <div class="d-flex flex-column flex-md-row justify-space-between align-start ga-6">
          <!-- Icon Buttons -->
          <div class="d-flex ga-3">
            <IconButton :icon="FileDown" />
            <IconButton :icon="Mail" />
            <IconButton :icon="Printer" />
            <IconButton :icon="MessageCircle" />
            <IconButton :icon="Link2" />
          </div>

          <!-- Totals -->
          <div
            class="pa-6 rounded-xl d-flex ga-8 flex-wrap border bg-accounting_footer_bg text_accounting_footer_border"
            
          >
            <FooterStat label="Total Attorney:" value="$0.00" />
            <FooterStat label="Total Agency:" value="$50.00" />
            <FooterStat label="Total Client:" value="$900.00" />
            <FooterStat label="Total:" value="$1,850.00" :highlight="true" />
          </div>
        </div>
      </template>

      <!-- ═══ LEGAL BILLING TAB ═══ -->
      <template v-else>

        <DynamicTable
          :data="legalData"
          title="Legal Billing"
          :icon="Gavel"
          icon-bg="rgba(197, 34, 34,0.1)"
          icon-color="rgb(197, 34, 34)"
          :columns="legalColumns"
          row-key="id"
          :expanded-fields="legalExpandedDetails"
          show-actions-drop-down
          show-dialog-button
          dialog-button-label="Details"
          @open-dialog="selectedItem = $event; isPaymentModalOpen = true"
        />
        

        <!-- Footer: Icon Buttons + Totals -->
        <div class="d-flex flex-column flex-md-row justify-space-between align-start ga-6">
          <div class="d-flex ga-3">
            <IconButton :icon="FileDown" />
            <IconButton :icon="Mail" />
            <IconButton :icon="Printer" />
            <IconButton :icon="MessageCircle" />
            <IconButton :icon="Link2" />
          </div>
          <div
            class="pa-6 rounded-xl d-flex ga-8 flex-wrap border bg-accounting_footer_bg text_accounting_footer_border"
          >
            <FooterStat label="Agency Spent:" value="$0.00" />
            <FooterStat label="Client Spent:" value="$50.00" />
            <FooterStat label="Pending:" value="$900.00" />
            <FooterStat label="Client Trust Balance:" value="$850.00" :highlight="true" />
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
        class="bg-modal_bg border text-modal_bg"
        
      >
        <!-- Modal Header -->
        <div
          class="pa-6 d-flex justify-space-between align-center border-b text-modal_border bg-modal_bg"
          style="position: sticky; top: 0; z-index: 10;"
        >
          <div class="d-flex align-center ga-3">
            <div class="pa-2 rounded-lg" style="background: rgba(59,130,246,0.10);">
              <CircleDollarSign :size="24" color="#3b82f6" />
            </div>
            <div>
              <div
                class="text-h6 font-weight-black text-uppercase text-checkbox_field_label_checked"
                style="letter-spacing: -0.3px;"
                
              >New Transaction</div>
              <div
                class="text-caption font-weight-bold text-uppercase text-settlement_placeholder"
                style="letter-spacing: 0.12em;"
              >Account: #882019 - David and Fisher</div>
            </div>
          </div>
          <button
            class="d-flex align-center justify-center rounded-circle text-modal_close"
            style="width: 32px; height: 32px; border: none; cursor: pointer; background: transparent; transition: background 0.15s;"
            @click="isPaymentModalOpen = false"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="pa-6" style="max-height: 70vh; overflow-y: auto;">
          <v-row>
            <v-col cols="12" sm="6"><DateField label="Date" /></v-col>
            <v-col cols="12" sm="6">
              <SelectField
                label="Payment Type"
                :options="[
                  {value:'credit_card', label:'Credit Card'},
                  {value:'ach',         label:'ACH'},
                  {value:'check',       label:'Check'},
                ]"
              
                @update:modelValue="paymentType = $event"
              />
            </v-col>
            <v-col cols="12" sm="6"><InputField label="ID/Check Number" /></v-col>
            <v-col cols="12" sm="6"><InputField label="Description" /></v-col>
            <v-col cols="12" sm="6"><InputField label="Amount" /></v-col>
            <v-col cols="12" sm="6"><SelectField label="From" :options="[]" /></v-col>
            <v-col cols="12" sm="6"><SelectField label="To" :options="[]" /></v-col>
            <v-col cols="12" sm="6"><CheckboxField label="Add Conv. Fee" /></v-col>
          </v-row>

          <!-- Credit Card Fields -->
          <v-sheet
            v-if="paymentType === 'credit_card'"
            class="pa-4 rounded-xl mt-6 border bg-modal_conditional_section text-modal_border"
            color="transparent"
            style="border-radius: 16px !important;"

          >
            <h3
              class="text-caption font-weight-black text-uppercase mb-4 text-select_field_label"
              style="letter-spacing: 0.15em;"
            >Credit Card Information</h3>
            <v-row>
              <v-col cols="12" sm="6"><InputField label="First Name" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Last Name" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Email" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Phone Number" /></v-col>
              <v-col cols="12"><InputField label="Address" /></v-col>
              <v-col cols="12" sm="6"><InputField label="City" /></v-col>
              <v-col cols="12" sm="6"><InputField label="State" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Zip Code" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Credit Card Number" placeholder="1234 5678 9012 3456" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Expiration Date" placeholder="MM/YY" /></v-col>
              <v-col cols="12" sm="6"><InputField label="CVV" placeholder="123" /></v-col>
            </v-row>
          </v-sheet>

          <!-- ACH Fields -->
          <v-sheet
            v-if="paymentType === 'ach'"
            class="pa-4 rounded-xl mt-6 border bg-modal_conditional_section text-modal_border"
            color="transparent"
            style="border-radius: 16px !important;"
          >
            <h3
              class="text-caption font-weight-black text-uppercase mb-4 text-select_field_label"
              style="letter-spacing: 0.15em;"
              
            >ACH Information</h3>
            <v-row>
              <v-col cols="12" sm="6">
                <SelectField
                  label="Account Type"
                  :options="[{value:'checking',label:'Checking'},{value:'savings',label:'Savings'}]"
                />
              </v-col>
              <v-col cols="12" sm="6"><InputField label="Account Name" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Account Number" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Routing Number" /></v-col>
            </v-row>
          </v-sheet>

          <!-- Check Upload Fields -->
          <v-sheet
            v-if="paymentType === 'check'"
            class="pa-4 rounded-xl mt-6  border bg-modal_conditional_section text-modal_border"
            color="transparent"
            style="border-radius: 16px !important;"
          >
            <h3
              class="text-caption font-weight-black text-uppercase mb-4 text-select_field_label"
              style="letter-spacing: 0.15em;"
            >Check Upload</h3>
            <label
              class="text-caption text-select_field_label"
            >Upload Check Image</label>
            <div
              class="mt-2 pa-6 rounded-xl text-center cursor-pointer text-checkbox_border_unchecked"
              style="border: 2px dashed; transition: background 0.15s ease;"
            >
              <input type="file" accept="image/*,.pdf" style="display: none;" id="check-upload" />
              <label for="check-upload" class="cursor-pointer d-block">
                <p class="text-body-2 font-weight-bold text-checkbox_field_label_checked">
                  Click to upload or drag and drop
                </p>
                <p class="text-caption mt-1 text-modal_upload">
                  PNG, JPG, PDF up to 10MB
                </p>
              </label>
            </div>
          </v-sheet>

          <!-- Action Buttons -->
          <div class="d-flex ga-4 mt-6">
            <button
              class="flex-grow-1 d-flex align-center justify-center ga-2 py-4 rounded-xl text-caption font-weight-black text-white"
              style="background: #2563eb; border: none; cursor: pointer; box-shadow: 0 8px 24px rgba(37,99,235,0.25); transition: background 0.15s, transform 0.1s; width: 100%;"
              @mouseover="$event.currentTarget.style.background = '#1d4ed8'"
              @mouseleave="$event.currentTarget.style.background = '#2563eb'"
              @mousedown="$event.currentTarget.style.transform = 'scale(0.97)'"
              @mouseup="$event.currentTarget.style.transform = 'scale(1)'"
            >
              <Plus :size="18" class="mr-2" /> Process Payment
            </button>
            <button
              class="flex-grow-1 d-flex align-center justify-center ga-2 py-4 rounded-xl text-caption font-weight-black text-white"
              style="background: #0f766e; border: none; cursor: pointer; box-shadow: 0 8px 24px rgba(13,148,136,0.25); transition: background 0.15s, transform 0.1s; width: 100%;"
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
import { FileDown, Mail, Printer, MessageCircle, Link2, CircleDollarSign, X, Plus, Minus,ArrowRightLeft, BanknoteArrowDown, Gavel } from 'lucide-vue-next';
import IconButton from './shared/IconButton.vue';
import SelectField from './shared/SelectField.vue';
import InputField from './shared/InputField.vue';
import DateField from './shared/DateField.vue';
import CheckboxField from './shared/CheckboxField.vue';
import DynamicTable from './shared/DynamicTable.vue';
import FooterStat from './shared/FooterStat.vue';

const activeTab = ref('account');
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