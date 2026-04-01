<template>
  <div class="d-flex flex-column ga-8">

    <!-- SECTION 1: Complaint Information -->
    <div
      class="pa-8 rounded-xl border-md border-blue-darken-2 bg-secondary_container_bg"
      
      :style="'box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
    >
      <div class="d-flex align-center ga-2 mb-8">
        <div class="rounded-pill bg-blue-darken-1" style="height: 20px; width: 4px;" />
        <h4
          class="text-caption font-weight-black text-uppercase text-blue-darken-2"
          style="letter-spacing: 0.2em;"
        >
          Complaint Information
        </h4>
      </div>

      <v-row>
        <v-col cols="12" md="6" lg="4">
          <SelectField label="County" :options="[{value:'la',label:'Los Angeles'},{value:'sf',label:'San Francisco'},{value:'sd',label:'San Diego'}]" default-value="la" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField label="Court" :options="[{value:'superior',label:'Superior Court'},{value:'district',label:'District Court'},{value:'municipal',label:'Municipal Court'}]" default-value="superior" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Complaint Sent Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Complaint Filed Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <InputField label="Court Number" placeholder="" type="text" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Sent For Service Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField label="Process Server" :options="[{value:'server1',label:'Server 1'},{value:'server2',label:'Server 2'}]" default-value="server1" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Complaint Served Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Answer Filed Date" :theme="theme" />
        </v-col>
      </v-row>
    </div>

    <!-- SECTION 2: Judgement Information -->
    <div
      class="pa-8 rounded-xl border-md bg-secondary_container_bg border-secondary_container_border"
      :style="'box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
    >
      <div class="d-flex align-center ga-2 mb-8">
        <div class="rounded-pill bg-purple-darken-1" style="height: 20px; width: 4px;" />
        <h4
          class="text-caption font-weight-black text-uppercase text-purple-darken-1"
          style="letter-spacing: 0.2em;"
        >
          Judgement Information
        </h4>
      </div>

      <div
        class="d-flex align-center ga-3 mb-8 pa-4 rounded-lg bg-secondary_container_bg"
      >
        <input
          type="checkbox"
          id="judgement-checkbox"
          v-model="judgementEntered"
          style="width:20px; height:20px; border-radius:6px; border: 2px solid #2563eb; accent-color: #2563eb; cursor:pointer;"
        />
        <label
          for="judgement-checkbox"
          class="text-sm font-weight-bold text-uppercase cursor-pointer text-fields_text"
          style="letter-spacing: 0.1em;"
        >
          Judgement Entered
        </label>
      </div>

      <v-row v-if="judgementEntered">
        <v-col cols="12" md="6" lg="4">
          <DateField label="Judgement Sent Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Judgement Entered Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Abstract Recorded Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Satisfaction of Judgement Sent Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <InputField label="Attorney Fees Sought" placeholder="$0.00" type="text" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <InputField label="Attorney Fees Awarded" placeholder="$0.00" type="text" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <InputField label="Name of Judge" placeholder="" type="text" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField label="County Abstracted" :options="[{value:'la',label:'Los Angeles'},{value:'sf',label:'San Francisco'},{value:'sd',label:'San Diego'}]" default-value="la" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField label="Court Abstracted" :options="[{value:'superior',label:'Superior Court'},{value:'district',label:'District Court'}]" default-value="superior" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Judgement Expiration Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Judgement Reminder Date" :theme="theme" />
        </v-col>
      </v-row>
    </div>

    <!-- SECTION 3: Garnishment Information -->
    <div
      class="pa-8 rounded-xl border-md bg-secondary_container_bg border-secondary_container_border"
      :style=" 'box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
    >
      <div class="d-flex align-center ga-2 mb-8">
        <div class="rounded-pill bg-amber-darken-1" style="height: 20px; width: 4px;" />
        <h4
          class="text-caption font-weight-black text-uppercase text-amber-darken-2"
          style="letter-spacing: 0.2em;"
        >
          Garnishment Information
        </h4>
      </div>

      <v-row>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Writ Sent For Filing Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Writ Returned Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Garnish Wages Sent Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Garnish Wages Received Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Bank Garnish Sent Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Bank Garnish Received Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Unsatisfied Return Rec'd Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <DateField label="Garnish Recheck Date" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField label="County Executed" :options="[{value:'la',label:'Los Angeles'},{value:'sf',label:'San Francisco'},{value:'sd',label:'San Diego'}]" default-value="la" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <SelectField label="Court Executed" :options="[{value:'superior',label:'Superior Court'},{value:'district',label:'District Court'}]" default-value="superior" :theme="theme" />
        </v-col>
      </v-row>
    </div>

    <!-- Save Button -->
    <div class="d-flex justify-end pt-8">
      <v-btn
        color="blue-darken-1"
        variant="elevated"
        size ="x-large"
        class="rounded-xl"
        style="border-radius: 16px; box-shadow: 0 4px 16px rgba(37,99,235,0.2);"
      >
        <Save :size="18" class="mr-2" />
        Save changes
      </v-btn>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Save } from 'lucide-vue-next'
import SelectField from './shared/SelectField.vue'
import DateField from './shared/DateField.vue'
import InputField from './shared/InputField.vue'

const judgementEntered = ref(false)
</script>