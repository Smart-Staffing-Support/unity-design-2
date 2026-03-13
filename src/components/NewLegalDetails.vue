<template>
  <div class="animate-fade">

    <!-- SECTION 1: Complaint Information -->
    <v-sheet
      class="pa-8 mb-8"
      color="transparent"
      style="border-radius: 30px !important;"
      :style="theme === 'dark'
        ? 'background: rgba(15,23,42,0.4) !important; border: 1px solid rgba(255,255,255,0.05);'
        : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
    >
      <div class="d-flex align-center ga-2 mb-8">
        <div class="rounded-pill" style="width: 4px; height: 20px; background: #3b82f6; flex-shrink: 0;" />
        <span
          class="text-caption font-weight-black text-uppercase"
          style="letter-spacing: 0.2em;"
          :style="theme === 'dark' ? 'color: #60a5fa;' : 'color: #2563eb;'"
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
      class="pa-8 mb-8"
      color="transparent"
      style="border-radius: 30px !important;"
      :style="theme === 'dark'
        ? 'background: rgba(15,23,42,0.4) !important; border: 1px solid rgba(255,255,255,0.05);'
        : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
    >
      <div class="d-flex align-center ga-2 mb-8">
        <div class="rounded-pill" style="width: 4px; height: 20px; background: #8b5cf6; flex-shrink: 0;" />
        <span
          class="text-caption font-weight-black text-uppercase"
          style="letter-spacing: 0.2em;"
          :style="theme === 'dark' ? 'color: #a78bfa;' : 'color: #7c3aed;'"
        >Judgement Information</span>
      </div>

      <!-- Judgement Entered Toggle -->
      <div
        class="d-flex align-center ga-3 mb-8 pa-4 rounded-lg cursor-pointer"
        style="background: rgba(255,255,255,0.05);"
        @click="judgementEntered = !judgementEntered"
      >
        <v-checkbox
          v-model="judgementEntered"
          hide-details
          color="blue"
          density="compact"
          @click.stop
        />
        <label
          class="text-body-2 font-weight-bold text-uppercase cursor-pointer"
          style="letter-spacing: 0.15em;"
          :style="theme === 'dark' ? 'color: white;' : 'color: #0f172a;'"
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
      class="pa-8 mb-8"
      color="transparent"
      style="border-radius: 30px !important;"
      :style="theme === 'dark'
        ? 'background: rgba(15,23,42,0.4) !important; border: 1px solid rgba(255,255,255,0.05);'
        : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
    >
      <div class="d-flex align-center ga-2 mb-8">
        <div class="rounded-pill" style="width: 4px; height: 20px; background: #f59e0b; flex-shrink: 0;" />
        <span
          class="text-caption font-weight-black text-uppercase"
          style="letter-spacing: 0.2em;"
          :style="theme === 'dark' ? 'color: #fbbf24;' : 'color: #d97706;'"
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

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.cursor-pointer { cursor: pointer; }
</style>