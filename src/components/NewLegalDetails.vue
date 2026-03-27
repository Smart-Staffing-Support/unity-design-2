<template>
  <div class="animate-fade d-flex flex-column ga-8">

    <!-- SECTION 1: Complaint Information -->
    <v-sheet
      class="pa-8 newlegaldetails-panel bg-newlegaldetails_bg border border-sm border-custom-blue newlegaldetails-panel-shadow"
    >
      <div class="d-flex align-center ga-2 mb-8">
        <div class="rounded-pill bg-newexperianreports_button_hover flex-shrink-0 newlegaldetails-header-indicator" />
        <span
          class="text-caption font-weight-black text-uppercase text-contact_menu_header_blue_text newlegaldetails-header-tracking"
        >Complaint Information</span>
      </div>

      <v-row>
        <v-col cols="12" md="6" lg="4">
          <SelectField
            label="County"
            :options="[{value:'la',label:'Los Angeles'},{value:'sf',label:'San Francisco'},{value:'sd',label:'San Diego'}]"
            default-value="la"
            :theme="theme"
          />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField
            label="Court"
            :options="[{value:'superior',label:'Superior Court'},{value:'district',label:'District Court'},{value:'municipal',label:'Municipal Court'}]"
            default-value="superior"
            :theme="theme"
          />
        </v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Complaint Sent Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Complaint Filed Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><InputField label="Court Number" type="text" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Sent For Service Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField
            label="Process Server"
            :options="[{value:'server1',label:'Server 1'},{value:'server2',label:'Server 2'}]"
            default-value="server1"
            :theme="theme"
          />
        </v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Complaint Served Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Answer Filed Date" :theme="theme" /></v-col>
      </v-row>
    </v-sheet>

    <!-- SECTION 2: Judgement Information -->
    <v-sheet
      class="pa-8 newlegaldetails-panel bg-newlegaldetails_bg border border-sm border-custom-blue newlegaldetails-panel-shadow"
      color="transparent"
    >
      <div class="d-flex align-center ga-2 mb-8">
        <div class="rounded-pill bg-contact_menu_icon_violet flex-shrink-0 newlegaldetails-header-indicator" />
        <span
          class="text-caption font-weight-black text-uppercase text-exp_mortgage_head newlegaldetails-header-tracking"
        >Judgement Information</span>
      </div>

      <!-- Judgement Entered Toggle -->
      <div
        class="d-flex align-center ga-3 mb-8 pa-4 rounded-lg cursor-pointer bg-newlegaldetails_toggle_bg"
        @click="judgementEntered = !judgementEntered"
      >
        <v-checkbox
          v-model="judgementEntered"
          class="newlegaldetails-checkbox-lg"
          hide-details
          color="summary_stat_total_bg"
          base-color="judgment_checkbox_border"
          density="compact"
        />
        <label
          class="text-body-2 font-weight-bold text-uppercase cursor-pointer text-accounts_summary_value newlegaldetails-toggle-tracking"
        >Judgement Entered</label>
      </div>

      <!-- Conditional Fields -->
      <v-row v-if="judgementEntered">
        <v-col cols="12" md="6" lg="4"><DateField label="Judgement Sent Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Judgement Entered Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Abstract Recorded Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Satisfaction of Judgement Sent Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><InputField label="Attorney Fees Sought" placeholder="$0.00" type="text" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><InputField label="Attorney Fees Awarded" placeholder="$0.00" type="text" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><InputField label="Name of Judge" type="text" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField
            label="County Abstracted"
            :options="[{value:'la',label:'Los Angeles'},{value:'sf',label:'San Francisco'},{value:'sd',label:'San Diego'}]"
            default-value="la"
            :theme="theme"
          />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField
            label="Court Abstracted"
            :options="[{value:'superior',label:'Superior Court'},{value:'district',label:'District Court'}]"
            default-value="superior"
            :theme="theme"
          />
        </v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Judgement Expiration Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Judgement Reminder Date" :theme="theme" /></v-col>
      </v-row>
    </v-sheet>

    <!-- SECTION 3: Garnishment Information -->
    <v-sheet
      class="pa-8 newlegaldetails-panel bg-newlegaldetails_bg border border-sm border-custom-blue newlegaldetails-panel-shadow"
    >
      <div class="d-flex align-center ga-2 mb-8">
        <div class="rounded-pill bg-newexperianreports_indicator flex-shrink-0 newlegaldetails-header-indicator" />
        <span
          class="text-caption font-weight-black text-uppercase text-ac_amber_text newlegaldetails-header-tracking"
        >Garnishment Information</span>
      </div>

      <v-row>
        <v-col cols="12" md="6" lg="4"><DateField label="Writ Sent For Filing Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Writ Returned Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Garnish Wages Sent Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Garnish Wages Received Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Bank Garnish Sent Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Bank Garnish Received Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Unsatisfied Return Rec'd Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Garnish Recheck Date" :theme="theme" /></v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField
            label="County Executed"
            :options="[{value:'la',label:'Los Angeles'},{value:'sf',label:'San Francisco'},{value:'sd',label:'San Diego'}]"
            default-value="la"
            :theme="theme"
          />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField
            label="Court Executed"
            :options="[{value:'superior',label:'Superior Court'},{value:'district',label:'District Court'}]"
            default-value="superior"
            :theme="theme"
          />
        </v-col>
      </v-row>
    </v-sheet>

    <!-- Save Button -->
    <div class="d-flex justify-end pt-8">
      <v-btn
        variant="flat"
        class="newlegaldetails-save-btn d-flex align-center ga-2 px-8 py-3 font-weight-medium text-body-2 bg-newexperianreports_button text-accounts_cancel_text hover:bg-newexperianreports_button_hover transition-all"
        elevation="0"
      >
        <template #prepend><Save :size="18" /></template>
        Save changes
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Save } from 'lucide-vue-next';
import SelectField from './shared/SelectField.vue';
import DateField from './shared/DateField.vue';
import InputField from './shared/InputField.vue';

defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
});

const judgementEntered = ref(false);
</script>

<style scoped>
.animate-fade {
  animation: fadeSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.newlegaldetails-panel {
  border-radius: 30px;
}

.newlegaldetails-panel-shadow {
  box-shadow: var(--v-newjudgment_shadow);
}

.newlegaldetails-header-indicator {
  width: 4px;
  height: 20px;
}

.newlegaldetails-header-tracking {
  letter-spacing: 0.2em;
}

.newlegaldetails-toggle-tracking {
  letter-spacing: 0.2em;
}

.newlegaldetails-save-btn {
  border-radius: 16px;
  box-shadow:
    0 10px 15px -3px var(--v-newexperianreports_button_shadow),
    0 4px 6px -4px var(--v-newexperianreports_button_shadow);
}

.newlegaldetails-checkbox-lg {
  margin: 0;
  padding: 0;
  box-shadow: none !important;
}

:deep(.newlegaldetails-checkbox-lg .v-selection-control) {
  min-height: auto;
}

:deep(.newlegaldetails-checkbox-lg .v-selection-control__wrapper),
:deep(.newlegaldetails-checkbox-lg .v-selection-control__input),
:deep(.newlegaldetails-checkbox-lg .v-icon) {
  width: 20px;
  height: 20px;
  font-size: 20px;
}

:deep(.newlegaldetails-checkbox-lg .v-icon) {
  opacity: 0;
}

:deep(.newlegaldetails-checkbox-lg .v-selection-control__input) {
  border: 2px solid #3b82f6 !important;
  border-radius: 4px;
  position: relative;
  background-color: transparent;
}

:deep(.newlegaldetails-checkbox-lg .v-selection-control--dirty .v-selection-control__input) {
  background-color: #2563eb;
  border-color: #2563eb !important;
}

:deep(.newlegaldetails-checkbox-lg .v-selection-control__input::after) {
  content: '';
}

:deep(.newlegaldetails-checkbox-lg .v-selection-control--dirty .v-selection-control__input::after) {
  content: '✔';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.cursor-pointer { cursor: pointer; }

.border-custom-blue {
  border-color: rgba(59, 130, 246, 0.5);
}
</style>