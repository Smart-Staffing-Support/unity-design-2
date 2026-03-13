<template>
  <div class="animate-fade">

    <!-- TOP ROW: Legal & Risk Indicators -->
    <v-row class="mb-8">

      <!-- Bankruptcy Filing -->
      <v-col cols="12" md="4">
        <v-sheet
          class="pa-6"
          color="transparent"
          style="border-radius: 25px !important;"
          :style="theme === 'dark'
            ? 'background: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.10);'
            : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
        >
          <SelectField
            label="Bankruptcy Filing"
            :options="[
              {value:'other', label:'Other / General'},
              {value:'7',     label:'Chapter 7'},
              {value:'11',    label:'Chapter 11'},
              {value:'13',    label:'Chapter 13'},
            ]"
            default-value="other"
            :theme="theme"
          />
        </v-sheet>
      </v-col>

      <!-- Judgments / Liens -->
      <v-col cols="12" md="4">
        <v-sheet
          class="pa-6"
          color="transparent"
          style="border-radius: 25px !important;"
          :style="theme === 'dark'
            ? 'background: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.10);'
            : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
        >
          <SelectField
            label="Judgments / Liens (12M)"
            :options="[
              {value:'yes', label:'Yes - Active'},
              {value:'no',  label:'No - None'},
            ]"
            default-value="no"
            :theme="theme"
          />
        </v-sheet>
      </v-col>

      <!-- Total Derogatory Accounts -->
      <v-col cols="12" md="4">
        <v-sheet
          class="pa-6 d-flex flex-column justify-center"
          color="transparent"
          style="border-radius: 25px !important; border: 1px solid rgba(239,68,68,0.20);"
          :style="theme === 'dark'
            ? 'background: rgba(239,68,68,0.05) !important;'
            : 'background: rgba(254,242,242,0.50) !important;'"
        >
          <InputField label="Total Derogatory Accounts" placeholder="6,380" type="text" :theme="theme" />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- MIDDLE SECTION: Delinquency Chronology -->
    <v-sheet
      class="pa-8 mb-8"
      color="transparent"
      style="border-radius: 30px !important;"
      :style="theme === 'dark'
        ? 'background: rgba(15,23,42,0.4) !important; border: 1px solid rgba(255,255,255,0.05);'
        : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 8px 32px rgba(148,163,184,0.15);'"
    >
      <!-- Section Header -->
      <div class="d-flex align-center ga-2 mb-6">
        <div
          class="rounded-pill"
          style="width: 4px; height: 20px; background: #f59e0b; flex-shrink: 0;"
        />
        <span
          class="text-caption font-weight-black text-uppercase"
          style="letter-spacing: 0.2em;"
          :style="theme === 'dark' ? 'color: #fbbf24;' : 'color: #d97706;'"
        >Delinquency Chronology (24 Months)</span>
        <span
          class="ml-10 font-weight-bold text-body-2"
          :style="theme === 'dark' ? 'color: white;' : 'color: #334155;'"
        >As Of 2-25-2026</span>
      </div>

      <!-- Delinquency Grid -->
      <v-row>
        <v-col
          v-for="item in delinquencyItems"
          :key="item.label"
          cols="12" sm="6" md="3"
        >
          <InputField :label="item.label" type="text" :theme="theme" />
        </v-col>
      </v-row>

      <!-- Collections Row -->
      <v-row
        class="mt-8 pt-8"
        :style="theme === 'dark'
          ? 'border-top: 1px solid rgba(255,255,255,0.05);'
          : 'border-top: 1px solid #f1f5f9;'"
      >
        <v-col cols="12" md="6">
          <InputField label="Accounts in Collections" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6">
          <InputField label="Paid Collections (6 Months)" :theme="theme" />
        </v-col>
      </v-row>
    </v-sheet>

    <!-- BOTTOM ROW: Credit & Debt Balances -->
    <v-row class="mb-6">

      <!-- Revolving & Installments -->
      <v-col cols="12" lg="6">
        <v-sheet
          class="pa-8"
          color="transparent"
          style="border-radius: 30px !important;"
          :style="theme === 'dark'
            ? 'background: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.10);'
            : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
        >
          <div
            class="text-caption font-weight-black text-uppercase mb-6"
            style="letter-spacing: 0.2em;"
            :style="theme === 'dark' ? 'color: #60a5fa;' : 'color: #2563eb;'"
          >Revolving &amp; Installments</div>
          <div class="d-flex flex-column ga-6">
            <InputField label="Monthly Payments (12M)" :theme="theme" />
            <InputField label="Installment Loans" :theme="theme" />
            <InputField label="Revolving Trades (Credit)" :theme="theme" />
            <InputField label="Revolving Trades (Balance)" :theme="theme" />
          </div>
        </v-sheet>
      </v-col>

      <!-- Mortgage & Equity -->
      <v-col cols="12" lg="6">
        <v-sheet
          class="pa-8"
          color="transparent"
          style="border-radius: 30px !important;"
          :style="theme === 'dark'
            ? 'background: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.10);'
            : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
        >
          <div
            class="text-caption font-weight-black text-uppercase mb-6"
            style="letter-spacing: 0.2em;"
            :style="theme === 'dark' ? 'color: #a78bfa;' : 'color: #7c3aed;'"
          >Mortgage &amp; Equity</div>
          <div class="d-flex flex-column ga-6">
            <InputField label="Total Mortgage Credit" :theme="theme" />
            <InputField label="Home Equity / 2nd Mortgage" :theme="theme" />
            <InputField label="1st Mortgage Balance" :theme="theme" />
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Save Button -->
    <div class="d-flex justify-end pt-8">
      <v-btn
        color="blue-darken-1"
        class="font-weight-medium rounded-xl"
        style="font-size: 13px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
        elevation="0"
        size="large"
      >
        <template #prepend><Save :size="16" /></template>
        Save changes
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { Save } from 'lucide-vue-next';
import SelectField from './shared/SelectField.vue';
import InputField from './shared/InputField.vue';

defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
});

const delinquencyItems = [
  { label: '30 Days' },
  { label: '60 Days' },
  { label: '90 Days' },
  { label: '120-180 Days' },
];
</script>

<style scoped>
.animate-fade {
  animation: fadeSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>