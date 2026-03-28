<template>
  <div class="animate-fade d-flex flex-column ga-8">

    <!-- TOP ROW: Legal & Risk Indicators -->
    <v-row class="mb-8">

      <!-- Bankruptcy Filing -->
      <v-col cols="12" md="4">
        <v-sheet
          class="pa-6 newexperianreports-card bg-contact_menu_card_bg border border-sm border-custom-blue newexperianreports-card-shadow"
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
          class="pa-6 newexperianreports-card bg-contact_menu_card_bg border border-sm border-custom-blue newexperianreports-card-shadow"
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
          class="pa-6 h-100 d-flex flex-column justify-center bg-newexperianreports_derogatory_bg newexperianreports-card border border-sm border-red-derogatory newexperianreports-card-shadow"
        >
          <InputField label="Total Derogatory Accounts" placeholder="6,380" type="text" :theme="theme" />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- MIDDLE SECTION: Delinquency Chronology -->
    <v-sheet
      class="pa-8 mb-8 newexperianreports-panel bg-newlegaldetails_bg border border-sm border-custom-blue newexperianreports-timeline-shadow"
    >
      <!-- Section Header -->
      <div class="d-flex align-center ga-2 mb-6">
        <div class="rounded-pill bg-newexperianreports_indicator flex-shrink-0 newexperianreports-indicator" />
        <span
          class="text-caption font-weight-black text-uppercase text-ac_amber_text newexperianreports-tracking"
        >Delinquency Chronology (24 Months)</span>
        <span
          class="ml-10 font-weight-bold text-body-2 text-accounts_cancel_text"
        >As Of 2-25-2026</span>
      </div>

      <!-- Delinquency Grid -->
      <v-row>
        <v-col
          v-for="item in delinquencyItems"
          :key="item.label"
          cols="12" sm="6" md="3"
        >
          <InputField :label="item.label" type="text" :theme="theme" class-name="exp-delinq-label text-accounts_header_text" />
        </v-col>
      </v-row>

      <!-- Collections Row -->
      <v-row class="mt-8 pt-8">
        <v-col cols="12" md="6">
          <InputField label="Accounts in Collections" :theme="theme" class-name="exp-delinq-label text-accounts_header_text" />
        </v-col>
        <v-col cols="12" md="6">
          <InputField label="Paid Collections (6 Months)" :theme="theme" class-name="exp-delinq-label text-accounts_header_text" />
        </v-col>
      </v-row>
    </v-sheet>

    <!-- BOTTOM ROW: Credit & Debt Balances -->
    <v-row class="mb-6">

      <!-- Revolving & Installments -->
      <v-col cols="12" lg="6">
        <v-sheet
          class="pa-8 newexperianreports-panel bg-contact_menu_card_bg border border-sm border-custom-blue newexperianreports-card-shadow"
        >
          <div
            class="text-caption font-weight-black text-uppercase mb-6 text-exp_mortgage_head newexperianreports-tracking"
          >Revolving &amp; Installments</div>
          <div class="d-flex flex-column ga-6">
            <InputField label="Monthly Payments (12M)" :theme="theme" class-name="exp-delinq-label text-accounts_header_text" />
            <InputField label="Installment Loans" :theme="theme" class-name="exp-delinq-label text-accounts_header_text" />
            <InputField label="Revolving Trades (Credit)" :theme="theme" class-name="exp-delinq-label text-accounts_header_text" />
            <InputField label="Revolving Trades (Balance)" :theme="theme" class-name="exp-delinq-label text-accounts_header_text" />
          </div>
        </v-sheet>
      </v-col>

      <!-- Mortgage & Equity -->
      <v-col cols="12" lg="6">
        <v-sheet
          class="pa-8 newexperianreports-panel bg-contact_menu_card_bg border border-sm border-custom-blue newexperianreports-card-shadow"
        >
          <div
            class="text-caption font-weight-black text-uppercase mb-6 text-exp_mortgage_head newexperianreports-tracking"
          >Mortgage &amp; Equity</div>
          <div class="d-flex flex-column ga-6">
            <InputField label="Total Mortgage Credit" :theme="theme" class-name="exp-delinq-label text-accounts_header_text" />
            <InputField label="Home Equity / 2nd Mortgage" :theme="theme" class-name="exp-delinq-label text-accounts_header_text" />
            <InputField label="1st Mortgage Balance" :theme="theme" class-name="exp-delinq-label text-accounts_header_text" />
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Save Button -->
    <div class="d-flex justify-end pt-8">
      <v-btn
        variant="flat"
        class="newexperianreports-save-btn d-flex align-center ga-2 px-8 py-3 font-weight-medium text-body-2 bg-newexperianreports_button text-accounts_cancel_text hover:bg-newexperianreports_button_hover transition-all"
        elevation="0"
      >
        <template #prepend><Save :size="18" /></template>
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

.newexperianreports-card {
  border-radius: 25px;
}

.newexperianreports-panel {
  border-radius: 30px;
}

.newexperianreports-indicator {
  width: 4px;
  height: 20px;
}

.newexperianreports-tracking {
  letter-spacing: 0.2em;
}

.newexperianreports-card-shadow {
  box-shadow: var(--v-newexperianreports_shadow);
}

.newexperianreports-timeline-shadow {
  box-shadow: var(--v-newexperianreports_timeline_shadow);
}

.newexperianreports-save-btn {
  border-radius: 16px;
  box-shadow:
    0 10px 15px -3px var(--v-newexperianreports_button_shadow),
    0 4px 6px -4px var(--v-newexperianreports_button_shadow);
}

:deep(.exp-delinq-label .text-fields_label) {
  color: inherit !important;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.border-custom-blue {
  border-color: rgba(59, 130, 246, 0.5);
}

.border-red-derogatory {
  border-color: rgba(239,68,68,0.2);
}
</style>