<template>
  <div class="animate-fade d-flex flex-column ga-8">

    <!-- SECTION 1: Complaint Information -->
    <v-sheet
      class="pa-8 rounded-xl bg-newlegaldetails_bg border border-sm border-custom-blue"
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
          />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField
            label="Court"
            :options="[{value:'superior',label:'Superior Court'},{value:'district',label:'District Court'},{value:'municipal',label:'Municipal Court'}]"
            default-value="superior"
          />
        </v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Complaint Sent Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Complaint Filed Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><InputField label="Court Number" type="text" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Sent For Service Date" /></v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField
            label="Process Server"
            :options="[{value:'server1',label:'Server 1'},{value:'server2',label:'Server 2'}]"
            default-value="server1"
          />
        </v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Complaint Served Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Answer Filed Date" /></v-col>
      </v-row>
    </v-sheet>

    <!-- SECTION 2: Judgement Information -->
    <v-sheet
      class="pa-8 rounded-xl bg-newlegaldetails_bg border border-sm border-custom-blue"
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
        <CheckboxField
          v-model="judgementEntered"
        />
        <label
          class="text-body-2 font-weight-bold text-uppercase cursor-pointer text-accounts_summary_value newlegaldetails-toggle-tracking"
        >Judgement Entered</label>
      </div>

      <!-- Conditional Fields -->
      <v-row v-if="judgementEntered">
          <v-col cols="12" md="6" lg="4"><DateField label="Judgement Sent Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Judgement Entered Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Abstract Recorded Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Satisfaction of Judgement Sent Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><InputField label="Attorney Fees Sought" placeholder="$0.00" type="text" /></v-col>
        <v-col cols="12" md="6" lg="4"><InputField label="Attorney Fees Awarded" placeholder="$0.00" type="text" /></v-col>
        <v-col cols="12" md="6" lg="4"><InputField label="Name of Judge" type="text" /></v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField
            label="County Abstracted"
            :options="[{value:'la',label:'Los Angeles'},{value:'sf',label:'San Francisco'},{value:'sd',label:'San Diego'}]"
            default-value="la"
          />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField
            label="Court Abstracted"
            :options="[{value:'superior',label:'Superior Court'},{value:'district',label:'District Court'}]"
            default-value="superior"
          />
        </v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Judgement Expiration Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Judgement Reminder Date" /></v-col>
      </v-row>
    </v-sheet>

    <!-- SECTION 3: Garnishment Information -->
    <v-sheet
      class="pa-8 rounded-xl bg-newlegaldetails_bg border border-sm border-custom-blue"
    >
      <div class="d-flex align-center ga-2 mb-8">
        <div class="rounded-pill bg-newexperianreports_indicator flex-shrink-0 newlegaldetails-header-indicator" />
        <span
          class="text-caption font-weight-black text-uppercase text-ac_amber_text newlegaldetails-header-tracking"
        >Garnishment Information</span>
      </div>

      <v-row>
        <v-col cols="12" md="6" lg="4"><DateField label="Writ Sent For Filing Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Writ Returned Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Garnish Wages Sent Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Garnish Wages Received Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Bank Garnish Sent Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Bank Garnish Received Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Unsatisfied Return Rec'd Date" /></v-col>
        <v-col cols="12" md="6" lg="4"><DateField label="Garnish Recheck Date" /></v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField
            label="County Executed"
            :options="[{value:'la',label:'Los Angeles'},{value:'sf',label:'San Francisco'},{value:'sd',label:'San Diego'}]"
            default-value="la"
          />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField
            label="Court Executed"
            :options="[{value:'superior',label:'Superior Court'},{value:'district',label:'District Court'}]"
            default-value="superior"
          />
        </v-col>
      </v-row>
    </v-sheet>

    <!-- Save Button -->
    <div class="d-flex justify-end pt-8">
      <v-btn
        variant="flat"
        class="newlegaldetails-save-btn rounded-lg d-flex align-center ga-2 px-8 py-3 font-weight-medium text-body-2 bg-newexperianreports_button text-accounts_cancel_text hover:bg-newexperianreports_button_hover transition-all"
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
import CheckboxField from './shared/CheckboxField.vue';

const judgementEntered = ref(false);
</script>

<style scoped>
.animate-fade {
  animation: fadeSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
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

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.cursor-pointer { cursor: pointer; }

.border-custom-blue {
  border-color: rgba(59, 130, 246, 0.5);
}
</style>