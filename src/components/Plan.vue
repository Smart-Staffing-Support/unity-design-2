<template>
  <div class="d-flex flex-column ga-8">

    <!-- ZONE 1: ASSIGNMENT & TERMS -->
    <div class="pa-8 rounded-plan border border-sm plan-zone-main">
      <div class="d-flex align-center mb-8 ga-4">
        <div class="d-flex align-center justify-center flex-shrink-0 rounded-xl plan-icon-tile">
          <CreditCard
            class="plan-icon-lucide"
            :size="22"
            :stroke-width="2"
          />
        </div>
        <h3 class="text-h6 font-weight-black text-uppercase plan-payment-heading">
          Payment Plan Architect
        </h3>
      </div>

      <v-row>

        <!-- Assignment Column -->
        <v-col cols="12" lg="4">
          <div class="d-flex flex-column ga-6">
            <SelectField label="Primary Collector" :options="[{value:'1',label:'Sarah Jenkins'}]" default-value="1" :theme="theme" />
            <SelectField label="Co-Collector" :options="[{value:'0',label:'None Assigned'}]" default-value="0" :theme="theme" />
          </div>
        </v-col>

        <!-- Settlement Math Column -->
        <v-col cols="12" lg="4">
          <div class="d-flex flex-column ga-10">
            <div class="d-flex flex-column ga-3">
              <div class="text-body-2 plan-calc-basis-heading">
                Calculation Basis
              </div>
              <div class="d-flex ga-4 plan-calc-basis-radios">
                <label class="d-flex align-center ga-2 cursor-pointer">
                  <input type="radio" name="basis" checked />
                  <span class="text-caption font-weight-bold plan-calc-radio-label">Current Balance</span>
                </label>
                <label class="d-flex align-center ga-2 cursor-pointer">
                  <input type="radio" name="basis" />
                  <span class="text-caption font-weight-bold plan-calc-radio-label">Settlement (Max 30%)</span>
                </label>
              </div>
            </div>
            <v-row>
              <v-col cols="6">
                <InputField label="Total Amount" placeholder="$0.00" type="number" :theme="theme" />
              </v-col>
              <v-col cols="6">
                <InputField label="Interest Rate" placeholder="0.00%" type="number" :theme="theme" />
              </v-col>
            </v-row>
          </div>
        </v-col>

        <!-- Compliance Checkboxes -->
        <v-col cols="12" lg="4">
          <div class="plan-compliance-card d-flex flex-column ga-4 justify-center pa-6 rounded-xl h-100">
            <label class="d-flex align-center ga-3 cursor-pointer">
              <input type="checkbox" class="plan-checkbox-native plan-checkbox-native--lg" />
              <div class="d-flex flex-column plan-compliance-text-block">
                <span class="text-body-2 font-weight-bold plan-compliance-title">Recurring CC / ACH</span>
                <span class="text-caption plan-compliance-sub">Enable automatic drafting</span>
              </div>
            </label>
            <label class="d-flex align-center ga-3 cursor-pointer">
              <input type="checkbox" class="plan-checkbox-native plan-checkbox-native--lg" />
              <div class="d-flex flex-column plan-compliance-text-block">
                <span class="text-body-2 font-weight-bold plan-compliance-title">Convenience Fees</span>
                <span class="text-caption plan-compliance-sub">Apply processing surcharge</span>
              </div>
            </label>
          </div>
        </v-col>

      </v-row>
    </div>

    <!-- ZONE 2: THE SCHEDULE BUILDER -->
    <v-row>

      <!-- Installment Manager -->
      <v-col cols="12" lg="6">
        <div class="pa-8 h-100 plan-installment-shell border border-sm">
          <div class="plan-installment-header d-flex justify-space-between align-center mb-6">
            <h4 class="plan-installment-schedule-title">
              Installment Schedule
            </h4>
            <v-btn
              variant="flat"
              :elevation="0"
              :ripple="false"
              class="text-uppercase d-flex align-center plan-installment-add-btn text-none"
            >
              <Plus :size="12" />
              Add Installment
            </v-btn>
          </div>

          <div class="d-flex flex-column ga-4">
            <div class="pa-4 rounded-xl plan-installment-inner">
              <v-row>
                <v-col cols="12" md="4">
                  <DateField label="First Payment On" :theme="theme" />
                </v-col>
                <v-col cols="12" md="4">
                  <InputField label="Payment Amount" placeholder="$0.00" type="number" :theme="theme" />
                </v-col>
                <v-col cols="12" md="4">
                  <InputField label="Description" placeholder="Enter description" type="text" :theme="theme" />
                </v-col>
              </v-row>
            </div>

            <!-- Placeholder -->
            <div class="d-flex align-center justify-center pa-4 rounded-xl plan-installment-placeholder">
              <span class="text-caption font-weight-black text-uppercase plan-installment-placeholder-text">
                Click "Add Installment" to stack payments
              </span>
            </div>
          </div>

          <div class="mt-6 pt-6 d-flex align-center justify-space-between plan-installment-footer-row">
            <label class="d-flex align-center ga-3 cursor-pointer">
              <input type="checkbox" class="plan-checkbox-native plan-checkbox-native--sm" />
              <span class="text-caption font-weight-black plan-reminder-label">
                Send Payment Reminders
              </span>
            </label>
          </div>

          <div class="mt-6 pt-6 d-flex align-center justify-space-between plan-installment-footer-row">
            <label class="d-flex align-center ga-3 cursor-pointer">
              <input type="checkbox" class="plan-checkbox-native plan-checkbox-native--sm" />
              <span class="text-caption font-weight-black plan-reminder-label">
                Initial Payment Is Different Amount:
              </span>
            </label>
          </div>
        </div>
      </v-col>

      <!-- Frequency & Allocation -->
      <v-col cols="12" lg="6">
        <div class="d-flex flex-column ga-6">

          <!-- Frequency Card -->
          <div class="pa-8 rounded-plan border border-sm plan-zone-secondary">
            <h4 class="text-caption font-weight-black text-uppercase mb-6 plan-tracking-frequency plan-frequency-heading">
              Frequency Settings
            </h4>
            <v-row>
              <v-col cols="12" md="6">
                <SelectField label="Repeat Cycle" :options="[{value:'1',label:'Indefinite'},{value:'2',label:'Fixed Count'}]" default-value="1" :theme="theme" />
              </v-col>
              <v-col cols="12" md="6">
                <SelectField label="Interval" :options="[{value:'w',label:'Weekly'},{value:'2w',label:'Bi-Weekly'},{value:'m',label:'Monthly'}]" default-value="m" :theme="theme" />
              </v-col>
            </v-row>
          </div>

          <!-- Allocation Order Card -->
          <div class="pa-8 rounded-plan border border-sm plan-zone-secondary">
            <h4 class="text-caption font-weight-black text-uppercase mb-6 plan-tracking-frequency plan-frequency-heading">
              Allocation Priority
            </h4>
            <div class="d-flex flex-column ga-2">
              <AllocationTag :order="1" label="Principal Balance" :theme="theme" />
              <AllocationTag :order="2" label="Interest Accrued" :theme="theme" />
              <AllocationTag :order="3" label="Legal & Service Fees" :theme="theme" />
            </div>
            <p class="mt-4 text-body-2 font-weight-bold plan-allocation-hint">
              Drag to reorder payment application priority
            </p>
          </div>

        </div>
      </v-col>

    </v-row>

    <!-- FINAL ACTION -->
    <v-btn
      block
      variant="flat"
      :elevation="0"
      class="font-weight-black text-uppercase text-h6 plan-activate-btn"
      size="x-large"
    >
      Activate Payment Plan
    </v-btn>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { CreditCard, Plus } from 'lucide-vue-next'
import SelectField from './shared/SelectField.vue'
import InputField from './shared/InputField.vue'
import DateField from './shared/DateField.vue'
import AllocationTag from './shared/AllocationTag.vue'

defineProps({
  theme: { type: String, default: 'light' },
})

const vuetifyTheme = useTheme()
const theme = computed(() => (vuetifyTheme.global.current.value.dark ? 'dark' : 'light'))
</script>

<style scoped>
.rounded-plan {
  border-radius: 35px;
}

.plan-zone-main {
  background-color: rgb(var(--v-theme-plan_architect_zone_bg));
  border-color: rgb(var(--v-theme-plan_architect_zone_border));
}

:global(.v-theme--light) .plan-zone-main {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.plan-zone-secondary {
  background-color: rgb(var(--v-theme-plan_architect_secondary_zone_bg));
  border-color: rgb(var(--v-theme-plan_architect_zone_border));
}

:global(.v-theme--light) .plan-zone-secondary {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.plan-icon-tile {
  width: 40px;
  height: 40px;
  background-color: rgb(var(--v-theme-plan_architect_icon_tile_bg));
}

.plan-icon-lucide {
  color: rgb(var(--v-theme-plan_architect_icon_foreground));
}

.plan-payment-heading {
  letter-spacing: -0.01em;
  color: rgb(var(--v-theme-plan_architect_zone_title));
}

.plan-calc-basis-heading {
  letter-spacing: 0.1em;
  font-weight: 400;
  color: rgb(var(--v-theme-plan_architect_calc_heading));
}

.plan-calc-basis-radios input[type='radio'] {
  margin: 0;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  accent-color: rgb(var(--v-theme-plan_architect_radio_accent));
}

.plan-calc-radio-label {
  color: rgb(var(--v-theme-plan_architect_radio_label));
}

.plan-compliance-card {
  background-color: rgb(var(--v-theme-plan_architect_compliance_card_bg));
  border: 1px solid rgb(var(--v-theme-plan_architect_compliance_card_border));
}

.plan-compliance-text-block {
  gap: 2px;
  min-width: 0;
}

.plan-compliance-title {
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: rgb(var(--v-theme-plan_architect_compliance_title));
}

:global(.v-theme--dark) .plan-compliance-title {
  font-weight: 800;
}

.plan-compliance-sub {
  letter-spacing: -0.01em;
  line-height: 1.35;
  color: rgb(var(--v-theme-plan_architect_compliance_sub));
  font-weight: 400;
}

:global(.v-theme--dark) .plan-compliance-sub {
  font-weight: 600;
}

.plan-checkbox-native {
  flex-shrink: 0;
  border-radius: 6px;
  accent-color: rgb(var(--v-theme-plan_architect_checkbox_accent));
}

.plan-checkbox-native--lg {
  width: 20px;
  height: 20px;
}

.plan-checkbox-native--sm {
  width: 16px;
  height: 16px;
}

.plan-installment-shell {
  border-radius: 35px;
  overflow: hidden;
  background-color: rgb(var(--v-theme-plan_architect_installment_shell_bg));
  border-color: rgb(var(--v-theme-plan_architect_installment_shell_border));
}

.plan-installment-header {
  margin: -32px -32px 16px -32px;
  padding: 12px 20px;
  background-color: rgb(var(--v-theme-plan_architect_installment_header_bg));
  border-top: 1px solid rgb(var(--v-theme-plan_architect_installment_header_border));
  border-radius: 35px 35px 0 0;
}

.plan-installment-schedule-title {
  margin: 0;
  line-height: 1.3;
  color: rgb(var(--v-theme-plan_architect_schedule_title));
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.plan-installment-add-btn.v-btn {
  background-color: rgb(var(--v-theme-plan_architect_add_btn_bg));
  color: rgb(var(--v-theme-plan_architect_add_btn_fg));
  border-radius: 10px;
  padding: 0 12px;
  min-width: 0;
  width: auto;
  height: 32px;
  min-height: 32px;
  font-weight: 700;
  font-size: 0.6875rem;
  letter-spacing: 0.06em;
  box-shadow: none;
  border: none;
  filter: none;
  --v-shadow-key-umbra-opacity: 0;
  --v-shadow-key-penumbra-opacity: 0;
  --v-shadow-key-ambient-opacity: 0;
}

:global(.v-theme--dark) .plan-installment-add-btn.v-btn {
  box-shadow: 0 4px 12px rgb(var(--v-theme-plan_architect_add_btn_shadow_blue) / 0.35);
}

.plan-installment-add-btn :deep(.v-btn__overlay),
.plan-installment-add-btn :deep(.v-btn__underlay) {
  opacity: 0;
  border-radius: inherit;
}

.plan-installment-add-btn :deep(.v-btn__content) {
  gap: 4px;
  opacity: 1;
}

.plan-installment-inner {
  background-color: rgb(var(--v-theme-plan_architect_installment_row_bg));
  border: 1px solid rgb(var(--v-theme-plan_architect_installment_row_border));
}

.plan-installment-placeholder {
  border: 2px dashed rgb(var(--v-theme-plan_architect_placeholder_dash_border));
}

.plan-installment-placeholder-text {
  letter-spacing: 0.1em;
  color: rgb(var(--v-theme-plan_architect_placeholder_text));
}

.plan-installment-footer-row {
  border-top: 1px solid rgb(var(--v-theme-plan_architect_footer_divider));
}

.plan-reminder-label {
  letter-spacing: 0.1em;
  color: rgb(var(--v-theme-plan_architect_reminder_label));
}

.plan-tracking-frequency {
  letter-spacing: 0.2em;
}

.plan-frequency-heading {
  color: rgb(var(--v-theme-plan_architect_frequency_heading));
}

.plan-allocation-hint {
  color: rgb(var(--v-theme-plan_architect_allocation_hint));
}

.plan-activate-btn.v-btn {
  background-color: rgb(var(--v-theme-plan_architect_activate_btn_bg));
  color: rgb(var(--v-theme-plan_architect_activate_btn_fg));
  border-radius: 25px;
  padding: 24px;
  letter-spacing: 0.3em;
  box-shadow: 0 8px 24px rgb(var(--v-theme-plan_architect_activate_btn_glow) / 0.2);
}

.plan-activate-btn :deep(.v-btn__overlay),
.plan-activate-btn :deep(.v-btn__underlay) {
  opacity: 0;
}
</style>
