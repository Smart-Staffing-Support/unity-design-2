<template>
  <div class="d-flex flex-column ga-8">

    <!-- ZONE 1: ASSIGNMENT & TERMS -->
    <div class="pa-8 rounded-plan border border-sm bg-plan_architect_zone_bg plan-zone-main">
      <div class="d-flex align-center mb-8 ga-4">
        <div
          class="d-flex align-center justify-center flex-shrink-0 rounded-xl bg-plan_architect_icon_tile_bg plan-icon-tile"
        >
          <CreditCard
            class="text-plan_architect_icon_foreground"
            :size="22"
            :stroke-width="2"
          />
        </div>
        <h3 class="text-h6 font-weight-black text-uppercase text-plan_architect_zone_title plan-payment-heading">
          Payment Plan Architect
        </h3>
      </div>

      <v-row>

        <!-- Assignment Column -->
        <v-col cols="12" lg="4">
          <div class="d-flex flex-column ga-6">
            <SelectField label="Primary Collector" :options="[{value:'1',label:'Sarah Jenkins'}]" default-value="1" />
            <SelectField label="Co-Collector" :options="[{value:'0',label:'None Assigned'}]" default-value="0" />
          </div>
        </v-col>

        <!-- Settlement Math Column -->
        <v-col cols="12" lg="4">
          <div class="d-flex flex-column ga-10">
            <div class="d-flex flex-column ga-3">
              <div class="text-body-2 text-plan_architect_calc_heading plan-calc-basis-heading">
                Calculation Basis
              </div>
              <div class="d-flex ga-4 plan-calc-basis-radios">
                <label class="d-flex align-center ga-2 cursor-pointer">
                  <input
                    type="radio"
                    name="basis"
                    checked
                    class="text-plan_architect_radio_accent ma-0 flex-shrink-0"
                  />
                  <span class="text-caption font-weight-bold text-plan_architect_radio_label">Current Balance</span>
                </label>
                <label class="d-flex align-center ga-2 cursor-pointer">
                  <input type="radio" name="basis" class="text-plan_architect_radio_accent ma-0 flex-shrink-0" />
                  <span class="text-caption font-weight-bold text-plan_architect_radio_label">Settlement (Max 30%)</span>
                </label>
              </div>
            </div>
            <v-row>
              <v-col cols="6">
                <InputField label="Total Amount" placeholder="$0.00" type="number" />
              </v-col>
              <v-col cols="6">
                <InputField label="Interest Rate" placeholder="0.00%" type="number" />
              </v-col>
            </v-row>
          </div>
        </v-col>

        <!-- Compliance Checkboxes -->
        <v-col cols="12" lg="4">
          <div
            class="plan-compliance-card d-flex flex-column ga-4 justify-center pa-6 rounded-xl h-100 bg-plan_architect_compliance_card_bg border-sm"
          >
            <label class="d-flex align-center ga-3 cursor-pointer">
              <input
                type="checkbox"
                class="plan-checkbox-native plan-checkbox-native--lg text-plan_architect_checkbox_accent flex-shrink-0"
              />
              <div class="d-flex flex-column plan-compliance-text-block">
                <span class="text-body-2 font-weight-bold text-plan_architect_compliance_title plan-compliance-title">Recurring CC / ACH</span>
                <span class="text-caption text-plan_architect_compliance_sub plan-compliance-sub">Enable automatic drafting</span>
              </div>
            </label>
            <label class="d-flex align-center ga-3 cursor-pointer">
              <input
                type="checkbox"
                class="plan-checkbox-native plan-checkbox-native--lg text-plan_architect_checkbox_accent flex-shrink-0"
              />
              <div class="d-flex flex-column plan-compliance-text-block">
                <span class="text-body-2 font-weight-bold text-plan_architect_compliance_title plan-compliance-title">Convenience Fees</span>
                <span class="text-caption text-plan_architect_compliance_sub plan-compliance-sub">Apply processing surcharge</span>
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
        <div
          class="pa-8 h-100 overflow-hidden rounded-plan plan-installment-shell border border-sm bg-plan_architect_zone_bg"
        >
          <div
            class="plan-installment-header mt-n8 mx-n8 mb-4 py-3 px-5 border-t-sm d-flex justify-space-between align-center bg-plan_architect_zone_bg"
          >
            <h3
              class="text-h6 font-weight-black text-uppercase text-plan_architect_schedule_title plan-payment-heading plan-installment-schedule-title ma-0"
            >
              Installment Schedule
            </h3>
            <v-btn
              variant="flat"
              color="plan_architect_add_btn_bg"
              :elevation="0"
              :ripple="false"
              :min-width="0"
              width="auto"
              height="32"
              :min-height="32"
              class="text-uppercase d-flex align-center plan-installment-add-btn rounded-lg px-3 elevation-0 text-none text-label-small font-weight-bold"
            >
              <span class="d-inline-flex align-center ga-1">
                <Plus :size="12" />
                Add Installment
              </span>
            </v-btn>
          </div>

          <div class="d-flex flex-column ga-4">
            <div class="pa-4 rounded-xl plan-installment-inner bg-plan_architect_installment_row_bg border-sm">
              <v-row>
                <v-col cols="12" md="4">
                  <DateField label="First Payment On" />
                </v-col>
                <v-col cols="12" md="4">
                  <InputField label="Payment Amount" placeholder="$0.00" type="number" />
                </v-col>
                <v-col cols="12" md="4">
                  <InputField label="Description" placeholder="Enter description" type="text" />
                </v-col>
              </v-row>
            </div>

            <!-- Placeholder -->
            <div
              class="d-flex align-center justify-center pa-4 rounded-xl plan-installment-placeholder border-md border-dashed"
            >
              <span class="text-caption font-weight-black text-uppercase text-plan_architect_placeholder_text plan-installment-placeholder-text">
                Click "Add Installment" to stack payments
              </span>
            </div>
          </div>

          <div
            class="mt-6 pt-6 d-flex align-center justify-space-between plan-installment-footer-row border-t-sm"
          >
            <label class="d-flex align-center ga-3 cursor-pointer">
              <input
                type="checkbox"
                class="plan-checkbox-native plan-checkbox-native--sm text-plan_architect_checkbox_accent flex-shrink-0"
              />
              <span class="text-caption font-weight-black text-plan_architect_reminder_label plan-reminder-label">
                Send Payment Reminders
              </span>
            </label>
          </div>

          <div
            class="mt-6 pt-6 d-flex align-center justify-space-between plan-installment-footer-row border-t-sm"
          >
            <label class="d-flex align-center ga-3 cursor-pointer">
              <input
                type="checkbox"
                class="plan-checkbox-native plan-checkbox-native--sm text-plan_architect_checkbox_accent flex-shrink-0"
              />
              <span class="text-caption font-weight-black text-plan_architect_reminder_label plan-reminder-label">
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
          <div class="pa-8 rounded-plan border border-sm bg-plan_architect_secondary_zone_bg plan-zone-secondary">
            <h4 class="text-caption font-weight-black text-uppercase mb-6 text-plan_architect_frequency_heading plan-tracking-frequency">
              Frequency Settings
            </h4>
            <v-row>
              <v-col cols="12" md="6">
                <SelectField label="Repeat Cycle" :options="[{value:'1',label:'Indefinite'},{value:'2',label:'Fixed Count'}]" default-value="1" />
              </v-col>
              <v-col cols="12" md="6">
                <SelectField label="Interval" :options="[{value:'w',label:'Weekly'},{value:'2w',label:'Bi-Weekly'},{value:'m',label:'Monthly'}]" default-value="m" />
              </v-col>
            </v-row>
          </div>

          <!-- Allocation Order Card -->
          <div class="pa-8 rounded-plan border border-sm bg-alloc_input_bg plan-zone-secondary">
            <h4 class="text-caption font-weight-black text-uppercase mb-6 text-plan_architect_frequency_heading plan-tracking-frequency">
              Allocation Priority
            </h4>
            <div class="d-flex flex-column ga-2">
              <AllocationTag :order="1" label="Principal Balance" />
              <AllocationTag :order="2" label="Interest Accrued" />
              <AllocationTag :order="3" label="Legal & Service Fees" />
            </div>
            <p class="mt-4 text-body-2 font-weight-bold text-plan_architect_allocation_hint">
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
      color="plan_architect_activate_btn_bg"
      :elevation="0"
      :ripple="false"
      class="font-weight-black text-uppercase text-h6 plan-activate-btn pa-6 rounded-xl elevation-0"
      size="x-large"
    >
      Activate Payment Plan
    </v-btn>

  </div>
</template>

<script setup>
import { CreditCard, Plus } from 'lucide-vue-next'
import SelectField from './shared/SelectField.vue'
import InputField from './shared/InputField.vue'
import DateField from './shared/DateField.vue'
import AllocationTag from './shared/AllocationTag.vue'
</script>

<style scoped>
.rounded-plan {
  border-radius: 35px;
}

.plan-zone-main,
.plan-zone-secondary {
  border-color: rgb(var(--v-theme-plan_architect_zone_border));
}

.plan-icon-tile {
  width: 40px;
  height: 40px;
}

.plan-payment-heading {
  letter-spacing: -0.01em;
}

.plan-calc-basis-heading {
  letter-spacing: 0.1em;
  font-weight: 400;
}

.plan-calc-basis-radios input[type='radio'] {
  width: 18px;
  height: 18px;
  accent-color: currentColor;
}

.plan-compliance-card {
  border-color: rgb(var(--v-theme-plan_architect_compliance_card_border));
}

.plan-compliance-text-block {
  gap: 2px;
  min-width: 0;
}

.plan-compliance-title {
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.plan-compliance-sub {
  letter-spacing: -0.01em;
  line-height: 1.35;
  font-weight: 400;
}

.plan-checkbox-native {
  border-radius: 6px;
  accent-color: currentColor;
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
  border-color: rgb(var(--v-theme-plan_architect_installment_shell_border));
}

.plan-installment-header {
  border-radius: 35px 35px 0 0;
  border-block-start-color: rgb(var(--v-theme-plan_architect_installment_header_border));
}

.plan-installment-schedule-title {
  line-height: 1.3;
}

.plan-installment-add-btn.v-btn {
  letter-spacing: 0.06em;
}

.plan-installment-inner {
  border-color: rgb(var(--v-theme-plan_architect_installment_row_border));
}

.plan-installment-placeholder {
  border-color: rgb(var(--v-theme-plan_architect_placeholder_dash_border));
}

.plan-installment-placeholder-text {
  letter-spacing: 0.1em;
}

.plan-installment-footer-row {
  border-block-start-color: rgb(var(--v-theme-plan_architect_footer_divider));
}

.plan-reminder-label {
  letter-spacing: 0.1em;
}

.plan-tracking-frequency {
  letter-spacing: 0.2em;
}

.plan-activate-btn.v-btn {
  letter-spacing: 0.3em;
}

</style>
