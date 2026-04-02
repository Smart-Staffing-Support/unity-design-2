  <template>
  <!-- Payment Modal -->
  <v-dialog v-model="isPaymentModalOpen" max-width="672" :scrim-opacity="0.6" style="backdrop-filter: blur(8px);" scrollable>
    <v-card
      class="pa-0 overflow-hidden bg-modal_bg border border-custom-blue rounded-xl"
    >
      <v-card-title
        class="d-flex justify-space-between align-center pa-6 border-b border-custom-blue bg-modal_bg"
      >
        <div class="d-flex align-center ga-3">
          <div class="pa-2 rounded-lg bg-ac_red_bg">
            <History :size="24" class="text-ac_red_text" />
          </div>
          <div>
            <p
              class="text-h6 font-weight-black text-uppercase payment-history-title text-table_title"
            >Payment History</p>
            <p
              class="text-caption font-weight-bold text-uppercase text-billing_modal_subtitle payment-history-subtitle"
            >
              Account: {{ topHeader.accountNumber }}
            </p>
          </div>
        </div>
        <v-btn
          :icon="true"
          variant="text"
          class="text-modal_close payment-history-close hover:bg-debtor_modal_close_hover"
          @click="isPaymentModalOpen = false"
        >
          <X :size="20" />
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-6">
        <div
          class="rounded-xl overflow-hidden border border-custom-blue bg-table_container_bg"
        >
          <v-table density="comfortable" class="payment-history-table bg-table_container_bg">
            <thead>
              <tr class="bg-table_header_bg">
                <th class="text-table_cols_title font-weight-black text-uppercase ls-widest payment-history-header-cell">Post Date</th>
                <th class="text-table_cols_title font-weight-black text-uppercase ls-widest payment-history-header-cell">Method</th>
                <th class="text-table_cols_title font-weight-black text-uppercase ls-widest text-right payment-history-header-cell">Amount</th>
                <th class="text-table_cols_title font-weight-black text-uppercase ls-widest text-center payment-history-header-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in paymentHistory"
                :key="index"
                :class="[
                  'payment-row hover:bg-fields_hover_bg',
                  index !== paymentHistory.length - 1 ? 'border-b border-table_header_border' : '',
                ]"
              >
                <td class="text-sm font-weight-bold text-table_title">{{ item.date }}</td>
                <td>
                  <div class="d-flex align-center ga-2">
                    <CreditCard :size="14" class="text-billing_modal_subtitle" />
                    <span class="text-caption font-weight-black text-uppercase text-billing_modal_subtitle payment-history-method">{{ item.method }}</span>
                  </div>
                </td>
                <td class="text-right text-sm font-weight-black text-ac_green_text">{{ item.amount }}</td>
                <td class="text-center">
                  <span
                    :class="[
                      'px-2 py-1 rounded font-weight-black text-uppercase payment-history-status',
                      item.status === 'Cleared' ? 'text-ac_green_text bg-ac_green_bg' : 'text-ac_red_text bg-ac_red_bg',
                    ]"
                  >
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <v-btn
          block
          class="mt-6 font-weight-black text-uppercase ls-widest rounded-xl bg-rf_accent hover:bg-billing_button_hover text-summary_stat_total_value"
          size="large"
          @click="openPaymentTransactionModal"
        >
          <Plus :size="18" class="mr-2" />
          New Payment Transaction
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- New Payment Transaction Modal -->
  <v-dialog
    v-model="isPaymentTransactionModalOpen"
    max-width="680"
    :scrim-opacity="0.6"
    style="backdrop-filter: blur(8px);"
    scrollable
  >
    <v-sheet
      class="overflow-hidden bg-modal_bg border border-custom-blue  rounded-xl"
    >
      <div
        class="pa-6 d-flex justify-space-between align-center border-b border-custom-blue  bg-modal_bg payment-transaction-header"
      >
        <div class="d-flex align-center ga-3">
          <div class="pa-2 rounded-lg bg-ac_red_bg">
            <CircleDollarSign :size="24" class="text-ac_red_text" />
          </div>
          <div>
            <div
              class="text-h6 font-weight-black text-uppercase payment-transaction-title text-table_title"
            >New Transaction</div>
            <div
              class="text-caption font-weight-bold text-uppercase text-billing_modal_subtitle payment-transaction-subtitle"
            >Account: {{ topHeader.accountNumber }} - {{ topHeader.debtor }}</div>
          </div>
        </div>
        <button
          class="d-flex align-center justify-center rounded-circle payment-transaction-close text-modal_close hover:bg-debtor_modal_close_hover"
          @click="isPaymentTransactionModalOpen = false"
        >
          <X :size="20" />
        </button>
      </div>

      <div class="pa-6 payment-transaction-body">
        <v-row>
          <v-col cols="12" sm="6"><DateField label="Date" /></v-col>
          <v-col cols="12" sm="6">
            <SelectField
              label="Payment Type"
              :options="[
                { value: 'credit_card', label: 'Credit Card' },
                { value: 'ach', label: 'ACH' },
                { value: 'check', label: 'Check' },
              ]"
              className="payment-modal-select"
              @update:modelValue="paymentType = $event"
            />
          </v-col>
          <v-col cols="12" sm="6"><InputField label="ID/Check Number" /></v-col>
          <v-col cols="12" sm="6"><InputField label="Description" /></v-col>
          <v-col cols="12" sm="6"><InputField label="Amount" /></v-col>
          <v-col cols="12" sm="6"><SelectField label="From" :options="[]" className="payment-modal-select" /></v-col>
          <v-col cols="12" sm="6"><SelectField label="To" :options="[]" className="payment-modal-select" /></v-col>
          <v-col cols="12" sm="6"><CheckboxField label="Add Conv. Fee" :checked="addConvenienceFee" @update:checked="addConvenienceFee = $event" /></v-col>
        </v-row>

        <v-sheet
          v-if="paymentType === 'credit_card'"
          class="pa-4 rounded-xl mt-6 border border-table_container_border bg-billing_payment_section_bg"
        >
          <div
            class="text-caption font-weight-black text-uppercase mb-4 text-table_cols_title payment-transaction-section-title"
          >Credit Card Information</div>
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

        <v-sheet
          v-if="paymentType === 'ach'"
          class="pa-4 rounded-xl mt-6 border border-table_container_border bg-billing_payment_section_bg "
        >
          <div
            class="text-caption font-weight-black text-uppercase mb-4 text-table_cols_title payment-transaction-section-title"
          >ACH Information</div>
          <v-row>
            <v-col cols="12" sm="6">
              <SelectField
                label="Account Type"
                :options="[{ value: 'checking', label: 'Checking' }, { value: 'savings', label: 'Savings' }]"
                className="payment-modal-select"
              />
            </v-col>
            <v-col cols="12" sm="6"><InputField label="Account Name" /></v-col>
            <v-col cols="12" sm="6"><InputField label="Account Number" /></v-col>
            <v-col cols="12" sm="6"><InputField label="Routing Number" /></v-col>
          </v-row>
        </v-sheet>

        <v-sheet
          v-if="paymentType === 'check'"
          class="pa-4 rounded-xl mt-6 border border-table_container_border bg-billing_payment_section_bg"
        >
          <div
            class="text-caption font-weight-black text-uppercase mb-4 text-table_cols_title payment-transaction-section-title"
          >Check Upload</div>
          <label
            class="text-caption font-weight-bold text-uppercase text-table_cols_title"
          >Upload Check Image</label>
          <div
            class="mt-2 pa-6 rounded-xl text-center cursor-pointer border-2 border-dashed border-table_container_border bg-billing_upload_bg hover:bg-billing_upload_hover payment-transaction-upload"
          >
            <input type="file" accept="image/*,.pdf" class="dashboard-check-upload-input" id="dashboard-check-upload" />
            <label for="dashboard-check-upload" class="cursor-pointer d-block">
              <p class="text-body-2 font-weight-bold text-fields_text">
                Click to upload or drag and drop
              </p>
              <p class="text-caption mt-1 text-billing_upload_hint">
                PNG, JPG, PDF up to 10MB
              </p>
            </label>
          </div>
        </v-sheet>

        <div class="d-flex ga-4 mt-6">
          <button
            class="flex-grow-1 d-flex align-center justify-center ga-2 py-2 px-4 rounded-xl font-weight-black text-uppercase text-summary_stat_total_value bg-rf_accent hover:bg-billing_button_hover payment-transaction-action"
            @mousedown="$event.currentTarget.style.transform = 'scale(0.97)'"
            @mouseup="$event.currentTarget.style.transform = 'scale(1)'"
          >
            <Plus :size="18" class="mr-2" /> Process Payment
          </button>
          <button
            class="flex-grow-1 d-flex align-center justify-center ga-2 py-3 rounded-xl text-caption font-weight-black text-uppercase text-summary_stat_total_value bg-accounts_export_bg hover:bg-billing_skip_hover payment-transaction-action"
            @mousedown="$event.currentTarget.style.transform = 'scale(0.97)'"
            @mouseup="$event.currentTarget.style.transform = 'scale(1)'"
          >
            <Minus :size="18" class="mr-2" /> Skip Payment Processing
          </button>
        </div>
      </div>
    </v-sheet>
  </v-dialog>

  <!-- Hexagon / Account Status Modal -->
  <v-dialog v-model="isHexagonDialogOpen" max-width="672">
    <v-card class="pa-0 overflow-hidden bg-modal_bg border border-modal_border rounded-xl border-custom-blue">
      <v-card-title class="d-flex justify-space-between align-center pa-6 border-b border-custom-blue bg-modal_bg">
        <div class="d-flex align-center ga-3">
          <div class="pa-2 rounded-lg bg-ac_red_bg">
            <Hexagon class="text-ac_red_text" :size="24" />
          </div>
          <div>
            <p class="text-h6 font-weight-black text-uppercase text-table_title">Account Status</p>
            <p class="text-caption font-weight-bold text-uppercase text-billing_modal_subtitle payment-history-subtitle">
              Account: {{ topHeader.accountNumber }}
            </p>
          </div>
        </div>
        <v-btn :icon="true" variant="text" class="text-modal_close payment-history-close hover:bg-debtor_modal_close_hover" @click="isHexagonDialogOpen = false">
          <X :size="20" />
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-6">
        <div class="d-flex flex-column ga-6 ">
          <SelectField label="Account Status" :options="[{value:'open',label:'Open'},{value:'closed',label:'Closed'},{value:'legal',label:'Legal'},{value:'charged-off',label:'Charged Off'}]" default-value="open" />
          <SelectField label="Compliance Condition" :options="[{value:'compliant',label:'Compliant'},{value:'non-compliant',label:'Non-Compliant'},{value:'pending',label:'Pending Review'}]" default-value="compliant" />
          <SelectField label="Special Comment" :options="[{value:'none',label:'None'},{value:'bankruptcy',label:'Bankruptcy Filed'},{value:'dispute',label:'Under Dispute'},{value:'settlement',label:'Settlement Pending'}]" default-value="none" />
          <SelectField label="Consumer Information Indicator" :options="[{value:'active',label:'Active Consumer'},{value:'inactive',label:'Inactive'},{value:'deceased',label:'Deceased'},{value:'military',label:'Military Active'}]" default-value="active" />
          <SelectField label="ECOA Code" :options="[]" />
        </div>
        <div class="d-flex ga-4 mt-8">
          <v-btn variant="flat" class="flex-grow-1 font-weight-black text-uppercase ls-widest rounded-lg bg-debtor_modal_cancel_bg text-debtor_modal_cancel_text hover:bg-debtor_modal_cancel_hover account-status-action" size="large" @click="isHexagonDialogOpen = false">
            Cancel
          </v-btn>
          <v-btn variant="flat" class="flex-grow-1 font-weight-black text-uppercase ls-widest rounded-lg bg-rf_accent hover:bg-billing_button_hover text-summary_stat_total_value account-status-action" size="large">
            Submit
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- Main Card -->
  <v-card
    class='w-100 pa-4 mb-8 overflow-hidden position-relative bg-container border border-container_border dashboard-header-shell border-custom-blue rounded-xl '
    elevation="0 "
  >
    <div class="position-absolute bg-billing_modal_icon_bg" style="top:-96px; right:-96px; width:256px; height:256px; filter:blur(100px);  pointer-events:none;" />

    <!-- Row 1: Identity & Tabs -->
    <div
      class="d-flex flex-column flex-lg-row justify-space-between align-start align-lg-center ga-6 mb-6 pb-6"
    >
      <div class="d-flex align-center ga-4">
        <div>
          <h2 class="font-weight-black my-4 text-table_title dashboard-header-debtor-name" style="letter-spacing:-0.02em; line-height:1;">
            {{ topHeader.debtor }}
          </h2>
          <span class="font-weight-bold text-billing_modal_subtitle dashboard-header-account-number">{{ topHeader.accountNumber }}</span>
        </div>

        <!-- Tabs -->
        <div
          class="d-flex ga-1 pa-2 bg-dh_tabs_bg border rounded-lg -border border-custom-blue"
        >
          <v-btn
            v-for="tab in tabs"
            :key="tab.id"
            @click="localActiveCreditor = tab.id"
            :color="localActiveCreditor === tab.id ? 'rf_accent' : 'newtabscontent_inactive_tab_fg'"
            :variant="localActiveCreditor === tab.id ? 'flat' : 'text'"
            class="font-weight-black text-capitalize rounded-lg dashboard-header-tab"
            :class="localActiveCreditor === tab.id
              ? 'text-summary_stat_total_value dashboard-header-tab--active'
              : 'hover:bg-fields_hover_bg dashboard-header-tab--inactive'"
          >
            {{ tab.label }}
          </v-btn>
        </div>
      </div>

      <!-- Hexagon trigger -->
      <div class="position-relative hexagon-trigger text-accounts_cancel_bg" @click="isHexagonDialogOpen = true" style="cursor:pointer;">
        <Hexagon :size="110" class="hexagon-icon" />
        <span class="position-absolute font-weight-bold text-uppercase hexagon-trigger-label" style="font-size:10px; top:50%; left:50%; transform:translate(-50%,-50%);">reported</span>
      </div>

      <div class="d-flex flex-column align-end ga-2">
        <v-chip
          class="font-weight-black text-uppercase px-4 bg-dh_status_bg text-dh_status_text rounded-lg"
          style="letter-spacing: 0.15em; font-size: 1rem; height: 36px;"
          variant="flat"
        >
          {{ topHeader.status }}
        </v-chip>
        <div class="d-flex align-center ga-2">
          <span class="text-subtitle-1 font-weight-black text-dh_age_text" style="letter-spacing:0.1em;">Account Age</span>
          <Clock :size="20" class="text-dh_age_text" />
          <span class="text-subtitle-1 font-weight-bold text-table_title">{{ accountAge }}</span>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <v-row :gutter="10" cols="5">

      <!-- Col 1 -->
      <v-col class="d-flex flex-column ga-4">
        <StatField label="Client's Name" :value="clientName" />
        <StatField label="Creditor" :value="creditorName" />
        <StatField label="Account #" :value="topHeader.accountNumber" />
        <StatField label="Client #" :value="topHeader.clientNumber" />
        <StatField label="Court Case #" value="124-49872-320" />
        <Metric :value="563" :width="300" :height="150" />
      </v-col>

      <!-- Col 2 -->
      <v-col class="d-flex flex-column ga-4">
        <SelectField label="Status Type" :options="[{value:'open',label:'Open'},{value:'close',label:'Close'},{value:'legal',label:'Legal'}]" default-value="open" />
        <SelectField label="Main Status" :options="[{value:'stat1',label:'Processing'},{value:'stat2',label:'Escalated'},{value:'stat3',label:'Final Notice'}]" default-value="stat1" />
        <SelectField label="Sub-Status" :options="[{value:'sec-stat1',label:'Skip Tracing'},{value:'sec-stat2',label:'Asset Verify'},{value:'sec-stat3',label:'Legal Prep'}]" default-value="sec-stat1" />
        <SelectField label="Sub-sub-Status" :options="[{value:'sec-stat1',label:'Field Agent'},{value:'sec-stat2',label:'Mail Return'},{value:'sec-stat3',label:'Call Refused'}]" default-value="sec-stat1" />
      </v-col>

      <!-- Col 3 -->
      <v-col  class="d-flex flex-column ga-4">
        <SelectField label="Account Type" :options="[{value:'comm',label:'Commercial'},{value:'cons',label:'Consumer'}]" default-value="comm" />
        <SelectField label="Account Sub-Type" :options="[{value:'1',label:'Medical'},{value:'2',label:'Retail'},{value:'3',label:'Banking'}]" default-value="1" />
        <SelectField label="Primary Collector" :options="[{value:'john',label:'John Doe'},{value:'jane',label:'Sarah Jenkins'}]" default-value="jane" />
        <SelectField label="Co-Collector" :options="[{value:'jane',label:'Jane Smith'},{value:'john',label:'John Doe'}]" default-value="jane" />
        <SelectField label="Agreement Arrangement" :options="[]" default-value="jane" />
        <SelectField label="Last Date of Service" :options="[]" default-value="jane" />
      </v-col>

      <!-- Col 4 -->
      <v-col  class="d-flex flex-column ga-4">
        <DateField label="Charged Off" />
        <DateField label="Referring" />
        <DateField label="Originated" />
        <DateField label="Next Work" />
        <DateField label="1st Delinq" />
        <DateField label="Statute of Limitation" />
      </v-col>

      <!-- Col 5: Balance Cards -->
      <v-col class="d-flex flex-column ga-3">

        <div class="py-2 px-4 rounded-lg rounded-lg d-flex flex-column ga-1 balance-card dashboard-header-balance-card bg-table_header_bg">
          <span class="font-weight-black text-uppercase text-dh_bal_total_label" style="font-size:10px; letter-spacing:0.1em;">Total Balance</span>
          <span class="text-h6 font-weight-black text-dh_bal_total_value">{{ currentCreditor.balance }}</span>
        </div>

        <div class="py-2 px-4 rounded-lg rounded-lg d-flex flex-column ga-1 balance-card dashboard-header-balance-card bg-table_header_bg">
          <span class="font-weight-black text-uppercase text-dh_bal_total_label" style="font-size:10px; letter-spacing:0.1em;">Principal</span>
          <span class="text-subtitle-1 font-weight-black text-dh_bal_total_value">{{ principalAmount }}</span>
        </div>

        <div class="py-2 px-4 rounded-lg rounded-lg d-flex flex-column ga-1 balance-card dashboard-header-balance-card bg-table_header_bg">
          <span class="font-weight-black text-uppercase text-dh_bal_interest_label" style="font-size:10px; letter-spacing:0.1em;">Interest</span>
          <span class="text-subtitle-1 font-weight-black text-dh_bal_interest_value">{{ interestAmount }}</span>
        </div>

        <div class="py-2 px-4 rounded-lg rounded-lg d-flex flex-column ga-1 balance-card dashboard-header-balance-card bg-dh_bal_total_bg">
          <span class="font-weight-black text-uppercase text-dh_bal_costs_label" style="font-size:10px; letter-spacing:0.1em;">Costs/Fees</span>
          <span class="text-subtitle-1 font-weight-black text-dh_bal_costs_value">{{ feesAmount }}</span>
        </div>

        <!-- Payments -->
        <div @click="isPaymentModalOpen = true" class="py-2 px-4 rounded-lg rounded-lg d-flex flex-column ga-1 balance-card dashboard-header-balance-card bg-table_header_bg cursor-pointer">
          <div class="d-flex justify-space-between align-center">
            <span class="font-weight-black text-uppercase text-dh_bal_payments_label" style="font-size:10px; letter-spacing:0.1em;">Payments</span>
            <ExternalLink :size="18" class="text-dh_ext_icon" />
          </div>
          <span class="text-subtitle-1 font-weight-black text-dh_bal_payments_value">$1,200.00</span>
        </div>

        <!-- Make Payments -->
        <div @click="openPaymentTransactionModal" class="py-4 px-4 rounded-lg d-flex align-center justify-center balance-card bg-dh_status_bg border border-dh_bal_total_border cursor-pointer">
          <span class="text-h6 font-weight-black text-dh_make_payments_text" style="letter-spacing: 0.05em;">Make Payments</span>
        </div>

        <div class="mt-2 pa-3 rounded-xl d-flex justify-space-between align-center">
          <span class="text-body-2 font-weight-black text-debtor_linked_balance_label dashboard-header-secondary-label">Can Settle</span>
          <span class="text-body-2 font-weight-black text-ac_green_text">$7,445.67</span>
        </div>

        <div class="mt-2 pa-3 rounded-xl d-flex justify-space-between align-center">
          <span class="text-body-2 font-weight-black text-debtor_linked_balance_label dashboard-header-secondary-label">Linked Balance</span>
          <span class="text-body-2 font-weight-black text-ac_red_text">$10,000.00</span>
        </div>

        <div class="px-4 py-2 rounded-lg d-flex justify-space-between align-center linked-row border border-dh_linked_border bg-modal_bg text-ac_red_text">
          <span class="text-body-2 text-debtor_linked_balance_label dashboard-header-linked-name">John Doe</span>
          <span class="text-body-2 font-weight-black text-ac_red_text">#125438-0000</span>
        </div>
        <div class="px-4 py-2 rounded-lg d-flex justify-space-between align-center linked-row border border-dh_linked_border bg-modal_bg text-ac_red_text">
          <span class="text-body-2 text-debtor_linked_balance_label dashboard-header-linked-name">Jane Smith</span>
          <span class="text-body-2 font-weight-black text-ac_red_text">#125438-0000</span>
        </div>

      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Clock, ExternalLink, X, CreditCard, History, Plus, Hexagon, CircleDollarSign, Minus } from 'lucide-vue-next'
import SelectField from './shared/SelectField.vue'
import DateField from './shared/DateField.vue'
import StatField from './shared/StatField.vue'
import InputField from './shared/InputField.vue'
import CheckboxField from './shared/CheckboxField.vue'
import Metric from './Metric.vue'

  const props = defineProps({
    activeCreditor: { type: String, default: 'creditor 1' },
  })

  const emit = defineEmits(['update:activeCreditor'])
 
  const isPaymentModalOpen = ref(false)
  const isPaymentTransactionModalOpen = ref(false)
  const isHexagonDialogOpen = ref(false)
  const paymentType = ref('')
  const addConvenienceFee = ref(false)

  const localActiveCreditor = computed({
    get: () => props.activeCreditor,
    set: (val) => emit('update:activeCreditor', val),
  })

  const topHeader = {
    debtor: 'Marcus Thorne',
    accountNumber: 'DC-99281-XT',
    clientNumber: '6512-7981-4503',
    status: 'Active / Legal',
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

  const clientName = computed(() => currentCreditor.value.client)
  const creditorName = computed(() => currentCreditor.value.name)
  const accountAge = '142 Days'

  const tabs = [
    { id: 'creditor 1', label: 'Philip James' },
    { id: 'creditor 2', label: 'Mark Hakim' },
    { id: 'creditor 3', label: 'Jason North' },
    { id: 'creditor 4', label: 'Allan Jones' },
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

  const openPaymentTransactionModal = () => {
    isPaymentModalOpen.value = false
    paymentType.value = ''
    addConvenienceFee.value = false
    isPaymentTransactionModalOpen.value = true
  }


</script>

<style scoped>
.ls-widest { letter-spacing: 0.15em; }
.payment-history-title {
  letter-spacing: -0.3px;
}

.payment-history-subtitle {
  opacity: 0.4;
  font-size: 10px;
}

.payment-history-close {
  opacity: 0.4;
}

.payment-history-header-cell {
  font-size: 10px;
}

.payment-history-method {
  opacity: 0.6;
}

.payment-history-status {
  font-size: 10px;
}

.payment-history-table {
  background: inherit;
}

.payment-history-table :deep(.v-table__wrapper),
.payment-history-table :deep(table) {
  background: inherit;
}

.payment-row {
  transition: background-color 0.2s;
}

.payment-transaction-header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.payment-transaction-body {
  max-height: 70vh;
  overflow-y: auto;
}

.payment-transaction-title {
  letter-spacing: -0.3px;
}

.payment-transaction-subtitle {
  opacity: 0.4;
  letter-spacing: 0.12em;
}

.payment-transaction-close {
  width: 32px;
  height: 32px;
  border: none;
  cursor: pointer;
  opacity: 0.4;
  transition: background-color 0.15s;
}

.payment-transaction-section-title {
  letter-spacing: 0.15em;
}

.payment-transaction-upload {
  transition: background-color 0.15s ease;
}

.dashboard-check-upload-input {
  display: none;
}

.payment-transaction-action {
  width: 100%;
  border: none;
  cursor: pointer;
  letter-spacing: 0.15em;
  transition:
    background-color 0.15s,
    transform 0.1s;
}

.account-status-action {
  letter-spacing: 0.15em;
}

.dashboard-header-shell {
  transition: all 0.5s;
  backdrop-filter: blur(40px);
  box-shadow: var(--v-theme-client_section_shadow);
}

.dashboard-header-shell {
  transition: all 0.5s;
  backdrop-filter: blur(40px);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
}


.border-custom-blue {
  border-color: rgba(59, 130, 246, 0.3);
}


.dashboard-header-tab {
  min-width: unset;
  height: auto !important;
  padding: 10px 16px;
  font-size: 1.125rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  line-height: 1.1;
  white-space: nowrap;
  transition: background-color 0.2s, box-shadow 0.2s, color 0.2s;
}

.dashboard-header-tab--inactive {
  box-shadow: none;
}

.dashboard-header-tab--active {
  box-shadow: 0 15px 30px -10px rgba(var(--v-theme-rf_accent), 0.6);
}

.dashboard-header-secondary-label {
  letter-spacing: 0.1em;
}

.dashboard-header-debtor-name {
  font-size: 2.25rem;
}

.dashboard-header-account-number {
  font-size: 1.25rem;
}

.dashboard-header-linked-name {
  letter-spacing: 0.05em;
}

.balance-card { transition: transform 0.2s; }
.balance-card:hover { transform: scale(1.02); }

.hexagon-trigger { transition: transform 0.2s; }
.hexagon-trigger:hover {
  transform: scale(1.05);
  color: rgb(var(--v-theme-dh_reported_hover));
}

.hexagon-icon,
.hexagon-trigger-label {
  color: currentColor;
}

.linked-row {
  transition: background-color 0.2s, border-color 0.2s;
}

.linked-row:hover {
  background-color: rgb(var(--v-theme-dh_linked_row_hover));
}
</style>
