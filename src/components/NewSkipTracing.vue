<template>
  <div class="animate-fade">

    <!-- TOP ROW: Credit Identity -->
    <v-row class="mb-6">

      <!-- Credit Score Hero Card -->
      <v-col cols="12" lg="3">
        <v-sheet
          class="pa-6 d-flex flex-column justify-center align-center position-relative overflow-hidden"
          color="transparent"
          style="border-radius: 30px !important; min-height: 160px;"
          :style="theme === 'dark'
            ? 'background: rgba(37,99,235,0.10) !important; border: 1px solid rgba(59,130,246,0.20);'
            : 'background: #eff6ff !important; border: 1px solid #bfdbfe; box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
        >
          <!-- Background icon -->
          <Activity
            :size="60"
            color="#3b82f6"
            class="position-absolute"
            style="top: 12px; right: 12px; opacity: 0.10; pointer-events: none;"
          />

          <span
            class="text-caption font-weight-black text-uppercase mb-2"
            style="letter-spacing: 0.2em; font-size: 10px;"
            :style="theme === 'dark' ? 'color: #60a5fa;' : 'color: #2563eb;'"
          >Credit Score</span>

          <input
            type="text"
            placeholder="695"
            class="credit-score-input"
            :style="theme === 'dark' ? 'color: white;' : 'color: #0f172a;'"
          />

          <div class="d-flex align-center ga-2 mt-1">
            <div class="pulse-dot" />
            <span
              class="font-weight-black text-uppercase"
              style="font-size: 10px; letter-spacing: 0.15em; color: #22c55e;"
            >Good Standing</span>
          </div>
        </v-sheet>
      </v-col>

      <!-- Credit Configuration Fields -->
      <v-col cols="12" lg="9">
        <v-sheet
          class="pa-6 h-100"
          color="transparent"
          style="border-radius: 30px !important;"
          :style="theme === 'dark'
            ? 'background: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.10);'
            : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
        >
          <v-row align="center">
            <v-col cols="12" md="4">
              <InputField label="Revolving Credit" placeholder="$2,130" type="text" :theme="theme" />
            </v-col>
            <v-col cols="12" md="4">
              <InputField label="Available Credit" placeholder="$1,000" type="text" :theme="theme" />
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- BOTTOM ROW: Property & Asset Valuation -->
    <v-sheet
      class="pa-8 mb-6"
      color="transparent"
      style="border-radius: 30px !important;"
      :style="theme === 'dark'
        ? 'background: rgba(15,23,42,0.4) !important; border: 1px solid rgba(255,255,255,0.05);'
        : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
    >
      <!-- Section Header -->
      <div class="d-flex align-center ga-2 mb-8">
        <div
          class="rounded-pill"
          style="width: 4px; height: 20px; background: #8b5cf6; flex-shrink: 0;"
        />
        <span
          class="text-caption font-weight-black text-uppercase"
          style="letter-spacing: 0.2em;"
          :style="theme === 'dark' ? 'color: #a78bfa;' : 'color: #7c3aed;'"
        >Property &amp; Asset Valuation</span>
      </div>

      <v-row>
        <v-col cols="12" sm="6" lg="">
          <SelectField
            label="Property Ownership"
            :options="[{value:'none',label:'None'},{value:'own',label:'Own'},{value:'rent',label:'Rent'}]"
            default-value="none"
            :theme="theme"
          />
        </v-col>
        <v-col cols="12" sm="6" lg="">
          <InputField label="Mortgage Amount" :theme="theme" />
        </v-col>
        <v-col cols="12" sm="6" lg="">
          <InputField label="Available Equity" :theme="theme" />
        </v-col>
        <v-col cols="12" sm="6" lg="">
          <InputField label="Zillow Valuation" :theme="theme" />
        </v-col>
        <v-col cols="12" sm="6" lg="">
          <InputField label="Est. Monthly Rent" :theme="theme" />
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
import { Activity, Save } from 'lucide-vue-next';
import InputField from './shared/InputField.vue';
import SelectField from './shared/SelectField.vue';

defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
});
</script>

<style scoped>
.animate-fade {
  animation: fadeSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Bare text input for the credit score hero — mimics the original transparent input */
.credit-score-input {
  width: 100%;
  text-align: center;
  background: transparent;
  border: none;
  outline: none;
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 4px;
}

.credit-score-input::placeholder {
  color: inherit;
  opacity: 0.4;
}

/* Pulsing green dot */
.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
</style>