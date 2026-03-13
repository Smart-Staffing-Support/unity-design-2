<template>
  <div class="d-flex flex-column ga-8">

    <!-- ZONE 1: ASSIGNMENT & TERMS -->
    <div
      class="pa-8"
      style="border-radius: 35px; border: 1px solid;"
      :style="isDark
        ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.1);'
        : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
    >
      <div class="d-flex align-center ga-3 mb-8">
        <div class="pa-2 rounded-xl" style="background: rgba(59,130,246,0.1);">
          <CreditCard class="text-blue" :size="20" />
        </div>
        <h3
          class="text-h6 font-weight-black text-uppercase"
          style="letter-spacing: -0.01em;"
          :class="isDark ? 'text-white' : 'text-grey-darken-4'"
        >
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
              <label
                class="text-body-2"
                style="letter-spacing: 0.1em;"
                :class="isDark ? 'text-cyan-lighten-2' : 'text-blue-darken-1'"
              >
                Calculation Basis
              </label>
              <div class="d-flex ga-4">
                <label class="d-flex align-center ga-2 cursor-pointer">
                  <input type="radio" name="basis" checked style="width:16px; height:16px; accent-color: #2563eb;" />
                  <span class="text-caption font-weight-bold" :class="isDark ? 'text-white' : 'text-grey-darken-2'">Current Balance</span>
                </label>
                <label class="d-flex align-center ga-2 cursor-pointer">
                  <input type="radio" name="basis" style="width:16px; height:16px; accent-color: #2563eb;" />
                  <span class="text-caption font-weight-bold" :class="isDark ? 'text-white' : 'text-grey-darken-2'">Settlement (Max 30%)</span>
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
          <div
            class="d-flex flex-column ga-4 justify-center pa-6 rounded-xl h-100"
            style="background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.1);"
          >
            <label class="d-flex align-center ga-3 cursor-pointer">
              <input type="checkbox" style="width:20px; height:20px; border-radius:6px; accent-color: #2563eb;" />
              <div class="d-flex flex-column">
                <span class="text-sm font-weight-black" :class="isDark ? 'text-cyan-lighten-2' : 'text-blue-darken-1'">Recurring CC / ACH</span>
                <span
                  class="font-weight-bold"
                  style="font-size: 12px; letter-spacing: -0.01em;"
                  :style="isDark ? 'color: rgba(255,255,255,0.8);' : ''"
                  :class="!isDark ? 'text-grey-darken-2' : ''"
                >
                  Enable automatic drafting
                </span>
              </div>
            </label>
            <label class="d-flex align-center ga-3 cursor-pointer">
              <input type="checkbox" style="width:20px; height:20px; border-radius:6px; accent-color: #2563eb;" />
              <div class="d-flex flex-column">
                <span class="text-sm font-weight-black" :class="isDark ? 'text-cyan-lighten-2' : 'text-blue-darken-1'">Convenience Fees</span>
                <span
                  class="font-weight-bold"
                  style="font-size: 12px; letter-spacing: -0.01em;"
                  :style="isDark ? 'color: rgba(255,255,255,0.8);' : ''"
                  :class="!isDark ? 'text-grey-darken-2' : ''"
                >
                  Apply processing surcharge
                </span>
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
          class="pa-8 h-100"
          style="border-radius: 35px; border: 1px solid;"
          :style="isDark
            ? 'background: rgba(15,23,42,0.4); border-color: rgba(255,255,255,0.05);'
            : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
        >
          <div class="d-flex justify-space-between align-center mb-6">
            <h4 class="text-caption font-weight-black text-uppercase text-blue" style="letter-spacing: 0.2em;">
              Installment Schedule
            </h4>
            <v-btn
              color="blue-darken-1"
              variant="elevated"
              size="small"
              class="rounded-lg font-weight-black text-uppercase ga-2"
              style="font-size: 10px; letter-spacing: 0.1em; border-radius: 8px;"
            >
              <Plus :size="14" class="mr-1" />
              Add Installment
            </v-btn>
          </div>

          <div class="d-flex flex-column ga-4">
            <div
              class="pa-4 rounded-xl"
              style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05);"
            >
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
            <div
              class="d-flex align-center justify-center pa-4 rounded-xl"
              style="border: 2px dashed;"
              :style="isDark ? 'border-color: rgba(255,255,255,0.2);' : 'border-color: #cbd5e1;'"
            >
              <span
                class="font-weight-black text-uppercase"
                style="font-size: 12px; letter-spacing: 0.1em;"
                :style="isDark ? 'color: rgba(255,255,255,0.6);' : 'color: #94a3b8;'"
              >
                Click "Add Installment" to stack payments
              </span>
            </div>
          </div>

          <div
            class="mt-6 pt-6 d-flex align-center justify-space-between"
            style="border-top: 1px solid rgba(255,255,255,0.05);"
          >
            <label class="d-flex align-center ga-3 cursor-pointer">
              <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb;" />
              <span
                class="font-weight-black"
                style="font-size: 12px; letter-spacing: 0.1em;"
                :class="isDark ? 'text-white' : 'text-grey-darken-2'"
              >
                Send Payment Reminders
              </span>
            </label>
          </div>

          <div
            class="mt-6 pt-6 d-flex align-center justify-space-between"
            style="border-top: 1px solid rgba(255,255,255,0.05);"
          >
            <label class="d-flex align-center ga-3 cursor-pointer">
              <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb;" />
              <span
                class="font-weight-black"
                style="font-size: 12px; letter-spacing: 0.1em;"
                :class="isDark ? 'text-white' : 'text-grey-darken-2'"
              >
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
          <div
            class="pa-8"
            style="border-radius: 35px; border: 1px solid;"
            :style="isDark
              ? 'background: rgba(15,23,42,0.4); border-color: rgba(255,255,255,0.05);'
              : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
          >
            <h4 class="text-caption font-weight-black text-uppercase text-blue mb-6" style="letter-spacing: 0.2em;">
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
          <div
            class="pa-8"
            style="border-radius: 35px; border: 1px solid;"
            :style="isDark
              ? 'background: rgba(15,23,42,0.4); border-color: rgba(255,255,255,0.05);'
              : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
          >
            <h4 class="text-caption font-weight-black text-uppercase text-blue mb-6" style="letter-spacing: 0.2em;">
              Allocation Priority
            </h4>
            <div class="d-flex flex-column ga-2">
              <AllocationTag :order="1" label="Principal Balance"    :theme="theme" />
              <AllocationTag :order="2" label="Interest Accrued"     :theme="theme" />
              <AllocationTag :order="3" label="Legal & Service Fees" :theme="theme" />
            </div>
            <p class="mt-4 text-grey font-weight-bold" style="font-size: 14px;">
              Drag to reorder payment application priority
            </p>
          </div>

        </div>
      </v-col>

    </v-row>

    <!-- FINAL ACTION -->
    <v-btn
      block
      color="green-darken-1"
      class="font-weight-black text-uppercase text-h6"
      style="border-radius: 25px; padding: 24px; letter-spacing: 0.3em; box-shadow: 0 8px 24px rgba(22,163,74,0.2);"
      size="x-large"
    >
      Activate Payment Plan
    </v-btn>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CreditCard, Plus } from 'lucide-vue-next'
import SelectField from './shared/SelectField.vue'
import InputField from './shared/InputField.vue'
import DateField from './shared/DateField.vue'
import AllocationTag from './shared/AllocationTag.vue'

const props = defineProps({
  theme: { type: String, default: 'light' },
})

const isDark = computed(() => props.theme === 'dark')
</script>
