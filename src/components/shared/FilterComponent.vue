<template>
  <div
    class="d-flex flex-column overflow-hidden bg-main_background border-container_border rounded-xl"
    style="width: 90vw; max-width: 1800px; height: 90vh; border: 1px solid;"
  >

    <!-- TOP BAR -->
    <div
      class="px-8 py-4 d-flex justify-space-between align-center border-bottom border-container_border bg-filter_topbar_bg"
    >
      <div>
        <h2
          class="text-base font-weight-bold text-uppercase text-fields_text"
          style="letter-spacing: -0.01em;"
        >
          Advanced Parameters
        </h2>
        <p class="font-weight-black text-uppercase text-blue-darken-1" style="font-size: 10px; letter-spacing: 0.1em;">
          Fine-tune your search results
        </p>
      </div>

      <div class="d-flex align-end ga-4">
        <SelectField label="Pre-Defined Filters" :options="[]" :theme="theme" />
        <InputField label="Name" placeholder="" :theme="theme" type="number" />
        <v-btn
          color="blue-darken-1"
          variant="elevated"
          class="font-weight-black text-uppercase rounded-xl"
          style="min-width: 150px; letter-spacing: 0.1em; font-size: 0.7rem; box-shadow: 0 4px 16px rgba(37,99,235,0.2);"
        >
          Save Filter
        </v-btn>
      </div>

      <div class="d-flex ga-4">
        <v-btn
          variant="text"
          class="font-weight-black text-uppercase rounded-xl ga-2 text-grey-lighten-1"
          style="letter-spacing: 0.1em; font-size: 0.7rem;"
        >
          <RotateCcw :size="16" class="mr-2" /> Clear All
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="elevated"
          class="font-weight-black text-uppercase rounded-xl px-8"
          style="letter-spacing: 0.1em; font-size: 0.7rem; box-shadow: 0 4px 16px rgba(37,99,235,0.2);"
        >
          Apply Filters
        </v-btn>
      </div>
    </div>

    <!-- SCROLLABLE CONTENT -->
    <div
      class="overflow-y-auto pa-10 d-flex flex-column ga-12 bg-main_background"
      style="flex: 1; min-height: 0;"
    >

      <!-- GROUP 1: Assignment & Status -->
      <section class="d-flex flex-column ga-6">
        <div class="d-flex justify-space-between align-center">
          <h4 class="text-caption font-weight-black text-uppercase d-flex align-center ga-2 text-blue-darken-1" style="letter-spacing: 0.3em;">
            <div class="rounded-pill bg-blue-lighten-3" style="height: 4px; width: 16px;" />
            Assignment & Status
          </h4>
          <div style="width: 120px;">
            <SelectField label="Open Status" :options="[]" :theme="theme" />
          </div>
        </div>

        <v-row>
          <v-col v-for="label in multiSelects" :key="label" cols="12" md="4" lg="3">
            <MultiSearchSelect :label="label" :theme="theme" />
          </v-col>
          <v-col v-for="item in statusSelects" :key="item.label" cols="12" md="4" lg="3">
            <SelectField :label="item.label" :options="[]" :theme="theme" />
          </v-col>
        </v-row>
      </section>

      <!-- GROUP 2: Consent & Compliance -->
      <section class="d-flex flex-column ga-6">
        <h4 class="text-caption font-weight-black text-uppercase d-flex align-center ga-2 text-green-darken-2" style="letter-spacing: 0.3em;">
          <div class="rounded-pill bg-green-lighten-2" style="height: 4px; width: 16px;" />
          Consent & Compliance
        </h4>

        <v-row>
          <v-col cols="12" md="6" lg="3">
            <div
              class="px-6 py-3 d-flex flex-column ga-4 rounded-xl border bg-main_background border-secondary_container_border"
            >
              <CheckboxField v-for="l in consentGroup1" :key="l" :label="l" :theme="theme" />
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <div
              class="px-6 py-3 d-flex flex-column ga-4 rounded-xl border bg-main_background border-secondary_container_border"
            >
              <CheckboxField v-for="l in consentGroup2" :key="l" :label="l" :theme="theme" />
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <div
              class="px-6 py-3 d-flex flex-column ga-4 rounded-xl border bg-main_background border-secondary_container_border"
            >
              <CheckboxField v-for="l in consentGroup3" :key="l" :label="l" :theme="theme" />
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <div
              class="px-6 py-3 d-flex flex-column ga-4 rounded-xl border bg-main_background border-secondary_container_border"
            >
              <CheckboxField v-for="l in consentGroup4" :key="l" :label="l" :theme="theme" />
            </div>
          </v-col>
        </v-row>
      </section>

      <!-- GROUP 3: Date & Range Tracking -->
      <section class="d-flex flex-column ga-6">
        <h4 class="text-caption font-weight-black text-uppercase d-flex align-center ga-2 text-amber-darken-3" style="letter-spacing: 0.3em;">
          <div class="rounded-pill bg-amber-lighten-3" style="height: 4px; width: 16px;" />
          Date & Range Tracking
        </h4>

        <v-row class="flex-nowrap">
          <v-col v-for="label in fromToDates" :key="label" style="flex: 1; min-width: 0;">
            <FromToDate :label="label" :theme="theme" />
          </v-col>
          <v-col style="flex: 2; min-width: 0;">
            <div class="d-flex ga-2">
              <div style="flex: 1; min-width: 0;">
                <FromToDate label="Last Updated" :theme="theme" />
              </div>
              <div style="flex: 1; min-width: 0;">
                <FromToDate label="Last Skip Traced" :theme="theme" />
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row class="flex-nowrap">
          <v-col style="flex: 1; min-width: 0;">
            <FromToDate label="Reminder Due" :theme="theme" />
          </v-col>
          <v-col style="flex: 1; min-width: 0;">
            <DateField label="No Payment Made Since" :theme="theme" />
          </v-col>
          <v-col style="flex: 1; min-width: 0;">
            <InputField label="Acc Not Worked in X Days" placeholder="" :theme="theme" type="number" />
          </v-col>
          <v-col style="flex: 1; min-width: 0;">
            <InputField label="No Disposition in X Days" placeholder="" :theme="theme" type="number" />
          </v-col>
          <v-col style="flex: 1; min-width: 0;">
            <InputField label="Days Assigned" placeholder="" :theme="theme" type="number" />
          </v-col>
        </v-row>
        <v-row>
          <v-col style="max-width: 300px;">
            <div class="d-flex align-end ga-2">
              <div style="flex: 1; min-width: 0;">
                <SelectField
                  label="Account Age"
                  :options="[{value:'less',label:'Less Than'},{value:'greater',label:'Greater Than'}]"
                  :theme="theme"
                />
              </div>
              <div style="flex: 1; min-width: 0;">
                <InputField label="" placeholder="" :theme="theme" type="number" />
              </div>
            </div>
          </v-col>
        </v-row>
      </section>

      <!-- GROUP 4: Financial Limits & Sorting -->
      <section class="d-flex flex-column ga-6">
        <h4 class="text-caption font-weight-black text-uppercase d-flex align-center ga-2" style="letter-spacing: 0.3em; color: #8400ff;">
          <div class="rounded-pill" style="height: 4px; width: 16px; background-color: #8400ff;" />
          Financial Limits & Sorting
        </h4>

        <v-row>
          <v-col cols="12" md="6" lg="auto" style="flex: 1;">
            <FromToDate label="Amount Due" :theme="theme" />
          </v-col>
          <v-col cols="12" md="6" lg="auto" style="flex: 1;">
            <div class="d-flex align-end ga-4 position-relative">
              <span
                class="position-absolute text-body-2 font-weight-medium text-cyan-lighten-2"
                style="top: 0; letter-spacing: 0.1em;"
              >
                Total Amount
              </span>
              <InputField label="" placeholder="" :theme="theme" type="number" />
              <span class="text-grey-lighten-1 d-flex align-center font-weight-bold">-</span>
              <InputField label="" placeholder="" :theme="theme" type="number" />
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="auto" style="flex: 1;">
            <FromToDate label="Charge Off Date" :theme="theme" />
          </v-col>
          <v-col cols="12" md="6" lg="auto" style="flex: 1;">
            <FromToDate label="Last Payment" :theme="theme" />
          </v-col>
          <v-col cols="12" md="6" lg="auto" style="flex: 1;">
            <div class="d-flex align-end ga-4 position-relative">
              <span
                class="position-absolute text-body-2 font-weight-medium text-cyan-lighten-2"
                style="top: 0; letter-spacing: 0.1em;"
              >
                Cumulative Delinquent Days
              </span>
              <InputField label="" placeholder="" :theme="theme" type="number" />
              <span class="text-grey-lighten-1 d-flex align-center font-weight-bold">-</span>
              <InputField label="" placeholder="" :theme="theme" type="number" />
            </div>
          </v-col>
        </v-row>
      </section>

      <!-- GROUP 5: Custom Logic & Sorting -->
      <section
        class="pa-8 rounded-xl border-dashed bg-main_background border-container_border"
        style="border: 2px dashed;"
      >
        <v-row align="end">
          <v-col cols="12" lg="4">
            <SelectField label="Select Custom Field" :options="[]" :theme="theme" />
          </v-col>
          <v-col cols="12" lg="4">
            <SelectField
              label="Order Results By"
              :options="[{value:'date',label:'Date Received'},{value:'amt',label:'Total Amount'},{value:'name',label:'Debtor Name'}]"
              :theme="theme"
            />
          </v-col>
          <v-col cols="12" lg="4">
            <SelectField
              label="Sort Direction"
              :options="[{value:'asc',label:'Ascending (A-Z)'},{value:'desc',label:'Descending (Z-A)'}]"
              :theme="theme"
            />
          </v-col>
        </v-row>
      </section>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RotateCcw } from 'lucide-vue-next'
import SelectField from './SelectField.vue'
import InputField from './InputField.vue'
import MultiSearchSelect from './MultiSearchSelect.vue'
import CheckboxField from './CheckboxField.vue'
import FromToDate from './FromToDate.vue'
import DateField from './DateField.vue'



const multiSelects = [
  'Collectors', 'Co-Collectors', 'Creditors', 'Clients',
  'Action Codes', 'Legal Status', 'Main Status', 'Sub-Status',
  'Sub-Sub-Status', 'Queues', 'Collection Status', 'Sales Rep', 'State/Province',
]

const statusSelects = [
  { label: 'Account Type' }, { label: 'Email Type' },
  { label: 'Letter Flows' }, { label: 'Generated Documents' },
  { label: 'Skip Trace Type' }, { label: 'Debtor Type' },
]

const consentGroup1 = ['Email Consent', 'Address Consent', 'Phone Voice Consent', 'Phone SMS Consent']
const consentGroup2 = ['Cell Voice Consent', 'Cell SMS Consent', 'Work Phone Voice Consent', 'Work Phone SMS Consent', 'Skip Trace is Marked']
const consentGroup3 = ['OTH Phone Voice Consent', 'OTH Phone SMS Consent', 'Fax Voice Consent', 'Fax SMS Consent']
const consentGroup4 = ['Overdue Work Date', 'Has Not Generated Docs', 'No Active Reminders', 'Overdue Reminders', 'Report to Credit Bureau']

const fromToDates = ['Originated Date', 'Account Received', 'Next Work Date']
</script>