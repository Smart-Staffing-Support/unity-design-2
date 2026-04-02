<template>
  <div class="payment-plan w-100">
    <div class="d-flex flex-column ga-8">

      <!-- ZONE 1: ASSIGNMENT & TERMS -->
      <v-sheet
        class="payment-plan-section pa-8 rounded-xl bg-contact_menu_card_bg"
        color="surface"
        border
      >
        <div class="d-flex align-center mb-8 ga-4">
          <div
            class="pa-3 rounded-lg d-flex align-center justify-center flex-shrink-0 bg-billing_modal_icon_bg payment-plan-icon-tile"
          >
            <CreditCard
              class="text-primary"
              :size="22"
              :stroke-width="2"
            />
          </div>
          <h3 class="text-h6 font-weight-black text-uppercase text-high-emphasis payment-plan-page-heading ma-0">
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
                <div class="text-body-2 text-primary payment-plan-calc-basis-label">
                  Calculation Basis
                </div>
                <div class="d-flex ga-4">
                  <label class="d-flex align-center ga-2 cursor-pointer">
                    <input
                      type="radio"
                      name="basis"
                      checked
                      class="payment-plan-native-control payment-plan-native-control--radio ma-0 flex-shrink-0 text-primary"
                    />
                    <span class="text-caption font-weight-bold text-high-emphasis">Current Balance</span>
                  </label>
                  <label class="d-flex align-center ga-2 cursor-pointer">
                    <input
                      type="radio"
                      name="basis"
                      class="payment-plan-native-control payment-plan-native-control--radio ma-0 flex-shrink-0 text-primary"
                    />
                    <span class="text-caption font-weight-bold text-high-emphasis">Settlement (Max 30%)</span>
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
            <v-sheet
              class="pa-6 rounded-xl h-100 d-flex flex-column ga-4 justify-center border-custom-blue bg-table_container_bg"
              color="surface-variant"
              border
            >
              <label class="d-flex align-center ga-3 cursor-pointer">
                <input
                  type="checkbox"
                  class="payment-plan-native-control payment-plan-native-control--lg text-primary flex-shrink-0"
                />
                <div class="d-flex flex-column payment-plan-compliance-text-block">
                  <span class="text-body-2 font-weight-bold text-primary">Recurring CC / ACH</span>
                  <span class="text-caption text-medium-emphasis">Enable automatic drafting</span>
                </div>
              </label>
              <label class="d-flex align-center ga-3 cursor-pointer">
                <input
                  type="checkbox"
                  class="payment-plan-native-control payment-plan-native-control--lg text-primary flex-shrink-0"
                />
                <div class="d-flex flex-column payment-plan-compliance-text-block">
                  <span class="text-body-2 font-weight-bold text-primary">Convenience Fees</span>
                  <span class="text-caption text-medium-emphasis">Apply processing surcharge</span>
                </div>
              </label>
            </v-sheet>
          </v-col>

        </v-row>
      </v-sheet>

      <!-- ZONE 2: THE SCHEDULE BUILDER -->
      <v-row>

        <!-- Installment Manager -->
        <v-col cols="12" lg="6">
          <v-sheet
            class="pa-8 h-100 overflow-hidden rounded-xl bg-contact_menu_card_bg"
            color="surface"
            border
          >
            <div
              class="d-flex justify-space-between align-center flex-wrap ga-4 mb-8"
            >
              <div class="d-flex align-center ga-4">
                <div
                  class="pa-3 rounded-lg d-flex align-center justify-center flex-shrink-0 bg-billing_modal_icon_bg payment-plan-icon-tile"
                >
                  <CreditCard
                    class="text-primary"
                    :size="22"
                    :stroke-width="2"
                  />
                </div>
                <h3
                  class="text-h6 font-weight-black text-uppercase text-high-emphasis payment-plan-page-heading payment-plan-installment-title ma-0"
                >
                  Installment Schedule
                </h3>
              </div>
              <v-btn
                variant="flat"
                color="primary"
                :elevation="0"
                :ripple="false"
                :min-width="0"
                width="auto"
                height="32"
                :min-height="32"
                class="text-uppercase d-flex align-center rounded-lg px-3 elevation-0 text-none text-label-small font-weight-bold"
                style="letter-spacing: 0.06em;"
              >
                <span class="d-inline-flex align-center ga-1">
                  <Plus :size="12" />
                  Add Installment
                </span>
              </v-btn>
            </div>

            <div class="d-flex flex-column ga-4">
              <v-sheet
                class="pa-4 rounded-xl"
                color="surface"
                border
              >
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
              </v-sheet>

              <!-- Placeholder -->
              <div
                class="d-flex align-center justify-center pa-4 rounded-xl border-md border-dashed border-opacity-50"
              >
                <span class="text-caption font-weight-black text-uppercase text-medium-emphasis payment-plan-placeholder-label">
                  Click "Add Installment" to stack payments
                </span>
              </div>
            </div>

            <div
              class="mt-6 pt-6 d-flex align-center justify-space-between border-t"
            >
              <label class="d-flex align-center ga-3 cursor-pointer">
                <input
                  type="checkbox"
                  class="payment-plan-native-control payment-plan-native-control--sm text-primary flex-shrink-0"
                />
                <span class="text-caption font-weight-black text-high-emphasis payment-plan-reminder-label">
                  Send Payment Reminders
                </span>
              </label>
            </div>

            <div
              class="mt-6 pt-6 d-flex align-center justify-space-between border-t"
            >
              <label class="d-flex align-center ga-3 cursor-pointer">
                <input
                  type="checkbox"
                  class="payment-plan-native-control payment-plan-native-control--sm text-primary flex-shrink-0"
                />
                <span class="text-caption font-weight-black text-high-emphasis payment-plan-reminder-label">
                  Initial Payment Is Different Amount:
                </span>
              </label>
            </div>
          </v-sheet>
        </v-col>

        <!-- Frequency & Allocation -->
        <v-col cols="12" lg="6">
          <div class="d-flex flex-column ga-6">

            <!-- Frequency Card -->
            <v-sheet
              class="pa-8 rounded-xl bg-contact_menu_card_bg"
              color="surface"
              border
            >
              <h4 class="text-caption font-weight-black text-uppercase mb-6 text-primary payment-plan-subsection-heading">
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
            </v-sheet>

            <!-- Allocation Order Card -->
            <v-sheet
              class="pa-8 rounded-xl bg-contact_menu_card_bg"
              color="surface"
              border
            >
              <h4 class="text-caption font-weight-black text-uppercase mb-6 text-primary payment-plan-subsection-heading">
                Allocation Priority
              </h4>
              <div class="d-flex flex-column ga-2">
                <AllocationTag :order="1" label="Principal Balance" />
                <AllocationTag :order="2" label="Interest Accrued" />
                <AllocationTag :order="3" label="Legal & Service Fees" />
              </div>
              <p class="mt-4 text-body-2 font-weight-bold text-medium-emphasis">
                Drag to reorder payment application priority
              </p>
            </v-sheet>

          </div>
        </v-col>

      </v-row>

      <!-- FINAL ACTION -->
      <v-btn
        block
        variant="flat"
        color="success"
        :elevation="0"
        :ripple="false"
        class="font-weight-black text-uppercase text-h6 pa-6 rounded-xl elevation-0"
        size="x-large"
        style="letter-spacing: 0.3em;"
      >
        Activate Payment Plan
      </v-btn>

    </div>
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
.border-custom-blue {
  border-color: rgba(59, 130, 246, 0.5);
}

.payment-plan-icon-tile {
  width: 40px;
  height: 40px;
}

.payment-plan-page-heading {
  letter-spacing: -0.01em;
}

.payment-plan-calc-basis-label {
  letter-spacing: 0.1em;
  font-weight: 400;
}

.payment-plan-native-control {
  border-radius: 6px;
  accent-color: #2563eb;
}

.payment-plan-native-control--radio {
  width: 18px;
  height: 18px;
}

.payment-plan-native-control--lg {
  width: 20px;
  height: 20px;
}

.payment-plan-native-control--sm {
  width: 16px;
  height: 16px;
}

.payment-plan-compliance-text-block {
  gap: 2px;
  min-width: 0;
}

.payment-plan-installment-title {
  line-height: 1.3;
}

.payment-plan-placeholder-label {
  letter-spacing: 0.1em;
}

.payment-plan-reminder-label {
  letter-spacing: 0.1em;
}

.payment-plan-subsection-heading {
  letter-spacing: 0.2em;
}

</style>
