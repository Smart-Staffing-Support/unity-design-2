  <template>
  <!-- Payment Modal -->
  <v-dialog v-model="isPaymentModalOpen" max-width="672" :scrim-opacity="0.6" style="backdrop-filter: blur(8px);" scrollable>
    <v-card
      class="pa-0 overflow-hidden"
      style="border-radius: 30px;"
      :style="isDark ? 'background:#0f172a; border: 1px solid rgba(255,255,255,0.1)' : 'background:#fff; border: 1px solid #e2e8f0'"
    >
      <v-card-title
        class="d-flex justify-space-between align-center pa-6"
        style="border-bottom: 1px solid;"
        :style="isDark ? 'border-color: rgba(255,255,255,0.05)' : 'border-color: #f1f5f9'"
      >
        <div class="d-flex align-center ga-3">
          <div class="pa-2 rounded-lg" style="background: rgba(239,68,68,0.1)">
            <History :size="24" class="text-red" />
          </div>
          <div>
            <p
              :class="['text-h6 font-weight-black text-uppercase payment-history-title', isDark ? 'text-white' : 'text-grey-darken-4']"
            >Payment History</p>
            <p
              class="text-caption font-weight-bold text-uppercase text-grey payment-history-subtitle"
            >
              Account: {{ topHeader.accountNumber }}
            </p>
          </div>
        </div>
        <v-btn
          :icon="true"
          variant="text"
          :class="[isDark ? 'text-white' : 'text-grey', 'payment-history-close']"
          @click="isPaymentModalOpen = false"
        >
          <X :size="20" />
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-6">
        <div
          class="rounded-xl overflow-hidden"
          :style="isDark ? 'border: 1px solid rgba(255,255,255,0.05)' : 'border: 1px solid #f1f5f9'"
        >
          <v-table :theme="theme" density="comfortable" class="payment-history-table">
            <thead>
              <tr :class="isDark ? 'bg-grey-darken-3' : 'bg-grey-lighten-4'">
                <th class="text-blue font-weight-black text-uppercase ls-widest payment-history-header-cell">Post Date</th>
                <th class="text-blue font-weight-black text-uppercase ls-widest payment-history-header-cell">Method</th>
                <th class="text-blue font-weight-black text-uppercase ls-widest text-right payment-history-header-cell">Amount</th>
                <th class="text-blue font-weight-black text-uppercase ls-widest text-center payment-history-header-cell">Status</th>
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
                <td :class="['text-sm font-weight-bold', isDark ? 'text-white' : 'text-grey-darken-2']">{{ item.date }}</td>
                <td>
                  <div class="d-flex align-center ga-2">
                    <CreditCard :size="14" class="text-grey" />
                    <span :class="['text-caption font-weight-black text-uppercase', isDark ? 'text-white' : 'text-grey-darken-1']" style="opacity: 0.6">{{ item.method }}</span>
                  </div>
                </td>
                <td class="text-right text-sm font-weight-black text-green">{{ item.amount }}</td>
                <td class="text-center">
                  <span
                    :class="['px-2 py-1 rounded font-weight-black text-uppercase payment-history-status', item.status === 'Cleared' ? 'text-green' : 'text-red']"
                    :style="item.status === 'Cleared' ? 'background: rgba(72,199,142,0.1)' : 'background: rgba(255,82,82,0.1)'"
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
          style="letter-spacing: 0.15em; border-radius: 16px;"
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
      class="overflow-hidden"
      style="border-radius: 30px; overflow: hidden;"
      :style="isDark ? 'background:#0f172a; border: 1px solid rgba(255,255,255,0.1)' : 'background:#fff; border: 1px solid #e2e8f0'"
    >
      <div
        class="pa-6 d-flex justify-space-between align-center"
        style="position: sticky; top: 0; z-index: 10; border-bottom: 1px solid;"
        :style="isDark ? 'background:#0f172a; border-color: rgba(255,255,255,0.05)' : 'background:#fff; border-color: #f1f5f9'"
      >
        <div class="d-flex align-center ga-3">
          <div class="pa-2 rounded-lg" style="background: rgba(239,68,68,0.1)">
            <CircleDollarSign :size="24" class="text-red" />
          </div>
          <div>
            <div
              :class="['text-h6 font-weight-black text-uppercase payment-transaction-title', isDark ? 'text-white' : 'text-grey-darken-4']"
            >New Transaction</div>
            <div
              class="text-caption font-weight-bold text-uppercase text-grey payment-transaction-subtitle"
            >Account: {{ topHeader.accountNumber }} - {{ topHeader.debtor }}</div>
          </div>
        </div>
        <button
          :class="['d-flex align-center justify-center rounded-circle payment-transaction-close', isDark ? 'text-white' : 'text-grey']"
          @click="isPaymentTransactionModalOpen = false"
        >
          <X :size="20" />
        </button>
      </div>

      <div class="pa-6" style="max-height: 70vh; overflow-y: auto;">
        <v-row>
          <v-col cols="12" sm="6"><DateField label="Date" :theme="theme" /></v-col>
          <v-col cols="12" sm="6">
            <SelectField
              label="Payment Type"
              :options="[
                { value: 'credit_card', label: 'Credit Card' },
                { value: 'ach', label: 'ACH' },
                { value: 'check', label: 'Check' },
              ]"
              className="payment-modal-select"
              :theme="theme"
              @update:modelValue="paymentType = $event"
            />
          </v-col>
          <v-col cols="12" sm="6"><InputField label="ID/Check Number" :theme="theme" /></v-col>
          <v-col cols="12" sm="6"><InputField label="Description" :theme="theme" /></v-col>
          <v-col cols="12" sm="6"><InputField label="Amount" :theme="theme" /></v-col>
          <v-col cols="12" sm="6"><SelectField label="From" :options="[]" className="payment-modal-select" :theme="theme" /></v-col>
          <v-col cols="12" sm="6"><SelectField label="To" :options="[]" className="payment-modal-select" :theme="theme" /></v-col>
          <v-col cols="12" sm="6"><CheckboxField label="Add Conv. Fee" :checked="addConvenienceFee" @update:checked="addConvenienceFee = $event" /></v-col>
        </v-row>

        <v-sheet
          v-if="paymentType === 'credit_card'"
          class="pa-4 rounded-xl mt-6"
          style="border-radius: 16px !important;"
          :style="isDark ? 'background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05)' : 'background: #f8fafc; border: 1px solid #e2e8f0'"
        >
          <div
            class="text-caption font-weight-black text-uppercase mb-4 text-table_cols_title"
            style="letter-spacing: 0.15em;"
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

        <v-sheet
          v-if="paymentType === 'ach'"
          class="pa-4 rounded-xl mt-6"
          style="border-radius: 16px !important;"
          :style="isDark ? 'background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05)' : 'background: #f8fafc; border: 1px solid #e2e8f0'"
        >
          <div
            class="text-caption font-weight-black text-uppercase mb-4 text-table_cols_title"
            style="letter-spacing: 0.15em;"
          >ACH Information</div>
          <v-row>
            <v-col cols="12" sm="6">
              <SelectField
                label="Account Type"
                :options="[{ value: 'checking', label: 'Checking' }, { value: 'savings', label: 'Savings' }]"
                className="payment-modal-select"
                :theme="theme"
              />
            </v-col>
            <v-col cols="12" sm="6"><InputField label="Account Name" :theme="theme" /></v-col>
            <v-col cols="12" sm="6"><InputField label="Account Number" :theme="theme" /></v-col>
            <v-col cols="12" sm="6"><InputField label="Routing Number" :theme="theme" /></v-col>
          </v-row>
        </v-sheet>

        <v-sheet
          v-if="paymentType === 'check'"
          class="pa-4 rounded-xl mt-6"
          style="border-radius: 16px !important;"
          :style="isDark ? 'background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05)' : 'background: #f8fafc; border: 1px solid #e2e8f0'"
        >
          <div
            class="text-caption font-weight-black text-uppercase mb-4 text-table_cols_title"
            style="letter-spacing: 0.15em;"
          >Check Upload</div>
          <label
            class="text-caption font-weight-bold text-uppercase text-table_cols_title"
          >Upload Check Image</label>
          <div
            class="mt-2 pa-6 rounded-xl text-center cursor-pointer border-2 border-dashed payment-transaction-upload"
            :style="isDark ? 'background: rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.1)' : 'background: #f8fafc; border-color: #cbd5e1'"
          >
            <input type="file" accept="image/*,.pdf" style="display: none;" id="dashboard-check-upload" />
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
            class="flex-grow-1 d-flex align-center justify-center ga-2 py-3 rounded-xl text-caption font-weight-black text-uppercase text-summary_stat_total_value bg-rf_accent hover:bg-billing_button_hover payment-transaction-action"
            style="border-radius:16px;"
            @mousedown="$event.currentTarget.style.transform = 'scale(0.97)'"
            @mouseup="$event.currentTarget.style.transform = 'scale(1)'"
          >
            <Plus :size="18" class="mr-2" /> Process Payment
          </button>
          <button
            class="flex-grow-1 d-flex align-center justify-center ga-2 py-3 rounded-xl text-caption font-weight-black text-uppercase text-summary_stat_total_value bg-accounts_export_bg hover:bg-billing_skip_hover payment-transaction-action"
            style="border-radius:16px;"
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
    class='w-100 pa-4 mb-8 overflow-hidden position-relative bg-container dashboard-header-shell'
    style="border-radius: 25px;"
    elevation="0"
  >
    <div class="position-absolute bg-billing_modal_icon_bg" style="top:-96px; right:-96px; width:256px; height:256px; filter:blur(100px); border-radius:50%; pointer-events:none;" />

    <!-- Row 1: Identity & Tabs -->
    <div
      class="d-flex flex-column flex-lg-row justify-space-between align-start align-lg-center ga-6 mb-6 pb-6"
    >
      <div class="d-flex align-center ga-4">
        <div>
          <h2 class="text-h4 font-weight-black my-4 text-table_title" style="letter-spacing:-0.02em; line-height:1;">
            {{ topHeader.debtor }}
          </h2>
          <span class="text-h6 font-weight-bold text-billing_modal_subtitle">{{ topHeader.accountNumber }}</span>
        </div>

        <!-- Tabs -->
        <div
          class="d-flex ga-1 pa-2 rounded-xl bg-dh_tabs_bg dashboard-header-tabs"
        >
          <v-btn
            v-for="tab in tabs"
            :key="tab.id"
            @click="localActiveCreditor = tab.id"
            :color="localActiveCreditor === tab.id ? 'rf_accent' : 'billing_modal_subtitle'"
            :variant="localActiveCreditor === tab.id ? 'flat' : 'text'"
            class="font-weight-black text-capitalize rounded-lg dashboard-header-tab"
            style="letter-spacing: 0.05em; font-size: 1rem;"
            :class="localActiveCreditor === tab.id ? 'text-summary_stat_total_value' : 'hover:bg-fields_hover_bg'"
          >
            {{ tab.label }}
          </v-btn>
        </div>
      </div>

      <!-- Hexagon trigger -->
      <div class="position-relative hexagon-trigger" @click="isHexagonDialogOpen = true" style="cursor:pointer;">
        <Hexagon :size="110" class="text-ac_red_text hexagon-icon" />
        <span class="position-absolute text-ac_red_text font-weight-bold text-uppercase" style="font-size:10px; top:50%; left:50%; transform:translate(-50%,-50%);">reported</span>
      </div>

      <div class="d-flex flex-column align-end ga-2">
        <v-chip
          class="font-weight-black text-uppercase px-4 bg-dh_status_bg text-dh_status_text"
          style="letter-spacing: 0.15em; font-size: 1rem; height: 36px; border-radius: 999px;"
          variant="flat"
        >
          {{ topHeader.status }}
        </v-chip>
        <div class="d-flex align-center ga-2">
          <span class="text-subtitle-1 font-weight-black text-dh_age_text" style="letter-spacing:0.1em;">Account Age</span>
          <Clock :size="20" class="text-dh_age_text" />
          <span class="text-subtitle-1 font-weight-bold text-table_title">{{ accountStats[7].value }}</span>
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

        <div class="py-2 px-4 rounded-lg dashboard-header-balance-radius d-flex flex-column ga-1 balance-card dashboard-header-balance-card bg-table_header_bg">
          <span class="font-weight-black text-uppercase text-dh_bal_total_label" style="font-size:10px; letter-spacing:0.1em;">Total Balance</span>
          <span class="text-h6 font-weight-black text-dh_bal_total_value">{{ currentCreditor.balance }}</span>
        </div>

        <div class="py-2 px-4 rounded-lg dashboard-header-balance-radius d-flex flex-column ga-1 balance-card dashboard-header-balance-card bg-table_header_bg">
          <span class="font-weight-black text-uppercase text-dh_bal_total_label" style="font-size:10px; letter-spacing:0.1em;">Principal</span>
          <span class="text-subtitle-1 font-weight-black text-dh_bal_total_value">{{ principalAmount }}</span>
        </div>

        <div class="py-2 px-4 rounded-lg dashboard-header-balance-radius d-flex flex-column ga-1 balance-card dashboard-header-balance-card bg-table_header_bg">
          <span class="font-weight-black text-uppercase text-dh_bal_interest_label" style="font-size:10px; letter-spacing:0.1em;">Interest</span>
          <span class="text-subtitle-1 font-weight-black text-dh_bal_interest_value">{{ interestAmount }}</span>
        </div>

        <div class="py-2 px-4 rounded-lg dashboard-header-balance-radius d-flex flex-column ga-1 balance-card dashboard-header-balance-card bg-dh_bal_total_bg">
          <span class="font-weight-black text-uppercase text-dh_bal_costs_label" style="font-size:10px; letter-spacing:0.1em;">Costs/Fees</span>
          <span class="text-subtitle-1 font-weight-black text-dh_bal_costs_value">{{ feesAmount }}</span>
        </div>

        <!-- Payments -->
        <div @click="isPaymentModalOpen = true" class="py-2 px-4 rounded-lg dashboard-header-balance-radius d-flex flex-column ga-1 balance-card dashboard-header-balance-card bg-table_header_bg cursor-pointer">
          <div class="d-flex justify-space-between align-center">
            <span class="font-weight-black text-uppercase text-dh_bal_payments_label" style="font-size:10px; letter-spacing:0.1em;">Payments</span>
            <ExternalLink :size="18" class="text-dh_ext_icon" />
          </div>
          <span class="text-subtitle-1 font-weight-black text-dh_bal_payments_value">$1,200.00</span>
        </div>

        <!-- Make Payments -->
        <div @click="openPaymentTransactionModal" class="py-4 px-4 rounded-lg dashboard-header-balance-radius d-flex align-center justify-center balance-card bg-dh_status_bg border border-dh_bal_total_border cursor-pointer">
          <span class="text-h6 font-weight-black text-dh_make_payments_text" style="letter-spacing: 0.05em;">Make Payments</span>
        </div>

        <div class="mt-2 pa-3 rounded-xl d-flex justify-space-between align-center">
          <span class="text-body-2 font-weight-black text-billing_modal_subtitle dashboard-header-muted-label">Can Settle</span>
          <span class="text-body-2 font-weight-black text-ac_green_text">$7,445.67</span>
        </div>

        <div class="mt-2 pa-3 rounded-xl d-flex justify-space-between align-center">
          <span class="text-body-2 font-weight-black text-billing_modal_subtitle dashboard-header-muted-label">Linked Balance</span>
          <span class="text-body-2 font-weight-black text-ac_red_text">$10,000.00</span>
        </div>

        <div class="px-4 py-2 rounded-xl dashboard-header-balance-radius d-flex justify-space-between align-center linked-row border border-dh_linked_border">
          <span class="text-body-2 text-table_title" style="letter-spacing:0.05em;">John Doe</span>
          <span class="text-body-2 font-weight-black text-ac_red_text">#125438-0000</span>
        </div>
        <div class="px-4 py-2 rounded-xl dashboard-header-balance-radius d-flex justify-space-between align-center linked-row border border-dh_linked_border">
          <span class="text-body-2 text-table_title" style="letter-spacing:0.05em;">Jane Smith</span>
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
import { useTheme } from 'vuetify'
import Metric from './Metric.vue'

  const theme = useTheme()
  const props = defineProps({
    activeCreditor: { type: String, default: 'creditor 1' },
  })

  const emit = defineEmits(['update:activeCreditor'])
 
  const isDark = computed(() => theme.global.current.value.dark)
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

.payment-history-status {
  font-size: 10px;
}

.payment-history-table {
  background: transparent;
}

.payment-history-table :deep(.v-table__wrapper),
.payment-history-table :deep(table) {
  background: transparent;
}

.payment-row {
  transition: background-color 0.2s;
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
  background: transparent;
  transition: background-color 0.15s;
}

.payment-transaction-upload {
  transition: background-color 0.15s ease;
}

.payment-transaction-action {
  width: 100%;
  border: none;
  cursor: pointer;
  letter-spacing: 0.15em;
  transition:
    background-color 0.15s,
    transform 0.1s;
  box-shadow: none;
}

.dashboard-header-shell {
  transition: all 0.5s;
  backdrop-filter: blur(40px);
  box-shadow: var(--v-theme-client_section_shadow);
}

.dashboard-header-tabs {
  backdrop-filter: blur(12px);
  box-shadow: var(--v-theme-add_reminder_textarea_shadow);
}

.dashboard-header-tab {
  transition: background-color 0.2s;
}

.dashboard-header-balance-card {
  box-shadow: var(--v-theme-client_section_shadow);
}

.dashboard-header-balance-radius {
  border-radius: 14px !important;
}

.dashboard-header-muted-label {
  opacity: 0.3;
  letter-spacing: 0.1em;
}

.balance-card { transition: transform 0.2s; }
.balance-card:hover { transform: scale(1.02); }

.hexagon-trigger { transition: transform 0.2s; }
.hexagon-trigger:hover { transform: scale(1.05); }

.linked-row {
  transition: background 0.2s;
  border: 1px solid rgb(var(--v-theme-dh_linked_border));
}
</style>
