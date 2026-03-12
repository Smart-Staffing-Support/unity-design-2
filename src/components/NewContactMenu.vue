<template>
  <div class="animate-fade">
    <!-- 3-Column Grid: Addresses / Phone / Email -->
    <v-row class="mb-8">

      <!-- Primary Locations -->
      <v-col cols="12" md="4">
        <section class="d-flex flex-column ga-4">
          <!-- Section Header -->
          <div class="d-flex align-center ga-2 mb-2">
            <div
              class="rounded-pill"
              style="width: 4px; height: 20px; background: #2563eb; flex-shrink: 0;"
            />
            <span
              class="text-caption font-weight-black text-uppercase"
              style="letter-spacing: 0.2em;"
              :style="theme === 'dark' ? 'color: #60a5fa;' : 'color: #2563eb;'"
            >Primary Locations</span>
          </div>

          <!-- Card -->
          <v-sheet
            class="pa-8 rounded-xl d-flex flex-column ga-3"
            color="transparent"
            style="border-radius: 16px !important; transition: border-color 0.2s ease;"
            :style="theme === 'dark'
              ? 'background: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.10);'
              : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
          >
            <InputField label="Address 1" type="text" :theme="theme" />
            <SelectField
              label="Address Type"
              :options="[{value:'home',label:'Home'},{value:'work',label:'Work'},{value:'other',label:'Other'}]"
              default-value="home"
              :theme="theme"
            />
            <SelectField
              label="Verification Status"
              :options="[{value:'good',label:'Good'},{value:'unknown',label:'Unknown'},{value:'bad',label:'Bad'}]"
              default-value="good"
              :theme="theme"
            />
            <SelectField
              label="Consent Status"
              :options="[{value:'consented',label:'Consented'},{value:'not consented',label:'Not Consented'}]"
              default-value="consented"
              :theme="theme"
            />
            <v-btn
              color="blue-darken-1"
              class="font-weight-black text-uppercase rounded-xl mt-6"
              style="letter-spacing: 0.15em; font-size: 11px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
              elevation="0"
              block
            >
              Add Address
            </v-btn>
          </v-sheet>
        </section>
      </v-col>

      <!-- Phone Directory -->
      <v-col cols="12" md="4">
        <section class="d-flex flex-column ga-4">
          <!-- Section Header -->
          <div class="d-flex align-center ga-2 mb-2">
            <div
              class="rounded-pill"
              style="width: 4px; height: 20px; background: #f97316; flex-shrink: 0;"
            />
            <span
              class="text-caption font-weight-black text-uppercase"
              style="letter-spacing: 0.2em;"
              :style="theme === 'dark' ? 'color: #fb923c;' : 'color: #ea580c;'"
            >Phone Directory</span>
          </div>

          <!-- Card -->
          <v-sheet
            class="pa-8 rounded-xl d-flex flex-column ga-3"
            color="transparent"
            style="border-radius: 16px !important; transition: border-color 0.2s ease;"
            :style="theme === 'dark'
              ? 'background: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.10);'
              : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
          >
            <SelectField
              label="Phone Number"
              :options="[{value:'415-310-1981',label:'415-310-1981'},{value:'415-310-4188',label:'415-310-4188'}]"
              default-value="415-310-1981"
              :theme="theme"
            />
            <SelectField
              label="Phone Type"
              :options="[{value:'mobile',label:'Mobile'},{value:'home',label:'Home'},{value:'work',label:'Work'}]"
              default-value="mobile"
              :theme="theme"
            />
            <SelectField
              label="Source"
              :options="[{value:'experian',label:'From Experian'},{value:'idi',label:'From IDI'}]"
              default-value="experian"
              :theme="theme"
            />
            <SelectField
              label="Verification Status"
              :options="[{value:'good',label:'Good'},{value:'unknown',label:'Unknown'},{value:'bad',label:'Bad'}]"
              default-value="good"
              :theme="theme"
            />
            <SelectField
              label="Consent Status"
              :options="[{value:'consented',label:'Consented'},{value:'not consented',label:'Not Consented'}]"
              default-value="consented"
              :theme="theme"
            />
            <v-btn
              color="blue-darken-1"
              class="font-weight-black text-uppercase rounded-xl mt-6"
              style="letter-spacing: 0.15em; font-size: 11px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
              elevation="0"
              block
            >
              Add Phone Number
            </v-btn>
          </v-sheet>
        </section>
      </v-col>

      <!-- Email Accounts -->
      <v-col cols="12" md="4">
        <section class="d-flex flex-column ga-4">
          <!-- Section Header -->
          <div class="d-flex align-center ga-2 mb-2">
            <div
              class="rounded-pill"
              style="width: 4px; height: 20px; background: #14b8a6; flex-shrink: 0;"
            />
            <span
              class="text-caption font-weight-black text-uppercase"
              style="letter-spacing: 0.2em;"
              :style="theme === 'dark' ? 'color: #2dd4bf;' : 'color: #0d9488;'"
            >Email Accounts</span>
          </div>

          <!-- Card -->
          <v-sheet
            class="pa-8 rounded-xl d-flex flex-column ga-3"
            color="transparent"
            style="border-radius: 16px !important; transition: border-color 0.2s ease;"
            :style="theme === 'dark'
              ? 'background: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.10);'
              : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
          >
            <InputField label="Email Address" type="email" :theme="theme" />
            <SelectField
              label="Verification Status"
              :options="[{value:'good',label:'Good'},{value:'unknown',label:'Unknown'},{value:'bad',label:'Bad'}]"
              default-value="good"
              :theme="theme"
            />
            <SelectField
              label="Consent Status"
              :options="[{value:'consented',label:'Consented'},{value:'not consented',label:'Not Consented'}]"
              default-value="consented"
              :theme="theme"
            />
            <v-btn
              color="blue-darken-1"
              class="font-weight-black text-uppercase rounded-xl mt-6"
              style="letter-spacing: 0.15em; font-size: 11px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
              elevation="0"
              block
            >
              Add Email Address
            </v-btn>
          </v-sheet>
        </section>
      </v-col>
    </v-row>

    <!-- Footer: Legal / Employment -->
    <v-sheet
      class="d-flex flex-row justify-space-between ga-4 pa-6 mb-8"
      color="transparent"
      style="border-radius: 25px; border-style: dashed; border-width: 2px;"
      :style="theme === 'dark'
        ? 'border-color: rgba(255,255,255,0.10); background: rgba(255,255,255,0.01) !important;'
        : 'border-color: #94a3b8; background: rgba(248,250,252,0.5) !important;'"
    >
      <!-- Assignee Attorney -->
      <div class="d-flex align-start ga-3">
        <div
          class="pa-3 rounded-xl"
          :style="theme === 'dark' ? 'background: rgba(59,130,246,0.10);' : 'background: #eff6ff;'"
        >
          <User :size="20" color="#3b82f6" />
        </div>
        <InputField label="Assignee Attorney" type="text" :theme="theme" />
      </div>

      <!-- Verified Employer -->
      <div class="d-flex align-start ga-3">
        <div
          class="pa-3 rounded-xl"
          :style="theme === 'dark' ? 'background: rgba(139,92,246,0.10);' : 'background: #f5f3ff;'"
        >
          <Briefcase :size="20" color="#7c3aed" />
        </div>
        <InputField label="Verified Employer" type="text" :theme="theme" />
      </div>
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
import { User, Briefcase, Save } from 'lucide-vue-next';
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
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>