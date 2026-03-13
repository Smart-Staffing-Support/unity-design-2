<template>
  <div class="d-flex flex-column ga-8">

    <!-- SECTION 1: JUDGMENT SETTINGS -->
    <div
      class="pa-8"
      style="border-radius: 35px; border: 1px solid;"
      :style="isDark
        ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.1);'
        : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
    >
      <div class="d-flex align-center ga-3 mb-8">
        <div class="pa-2 rounded-xl" style="background: rgba(59,130,246,0.1);">
          <Scale class="text-blue" :size="20" />
        </div>
        <h3
          class="text-h6 font-weight-black text-uppercase"
          style="letter-spacing: -0.01em;"
          :class="isDark ? 'text-white' : 'text-grey-darken-4'"
        >
          Judgment Settings
        </h3>
      </div>

      <div class="d-flex flex-column ga-8">

        <!-- Base Judgment Fields -->
        <v-row>
          <v-col cols="12" md="4">
            <DateField label="Judgment Date" :theme="theme" />
          </v-col>
          <v-col cols="12" md="4">
            <InputField label="Judgment Amount" placeholder="$0.00" type="number" :theme="theme" />
          </v-col>
          <v-col cols="12" md="4">
            <SelectField
              label="Pre-Judgment Interest"
              :options="[{value:'simple',label:'Simple Interest'},{value:'compound',label:'Compound Interest'},{value:'none',label:'None'}]"
              default-value="simple"
              :theme="theme"
            />
          </v-col>
        </v-row>

        <!-- Post-Judgment Interest Section -->
        <div
          class="pa-6 rounded-xl"
          style="border: 1px solid;"
          :style="isDark
            ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1);'
            : 'background: #f8fafc; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
        >
          <label class="d-flex align-center ga-3 cursor-pointer mb-6">
            <input
              type="checkbox"
              v-model="postJudgmentInterest"
              style="width:20px; height:20px; border-radius:6px; accent-color: #2563eb;"
            />
            <span
              class="text-sm font-weight-black text-uppercase"
              style="letter-spacing: 0.1em;"
              :class="isDark ? 'text-white' : 'text-grey-darken-2'"
            >
              Apply Post-Judgment Interest
            </span>
          </label>

          <v-row v-if="!postJudgmentInterest" align="end">
            <v-col cols="12" md="4">
              <InputField label="Interest Amount" placeholder="0.00%" type="text" :theme="theme" />
            </v-col>
            <v-col cols="12" md="4">
              <SelectField
                label="Compounding"
                :options="[{value:'daily',label:'Daily'},{value:'monthly',label:'Monthly'},{value:'annually',label:'Annually'}]"
                default-value="daily"
                :theme="theme"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-btn
                color="blue-darken-1"
                variant="elevated"
                class="rounded-xl font-weight-black text-uppercase w-100"
                style="letter-spacing: 0.1em; font-size: 0.7rem; border-radius: 16px; box-shadow: 0 4px 16px rgba(37,99,235,0.2);"
              >
                Add Step
              </v-btn>
            </v-col>
          </v-row>
        </div>

      </div>
    </div>

    <!-- SECTION 2: PRE-JUDGMENT COMPONENTS -->
    <div
      class="pa-8"
      style="border-radius: 35px; border: 1px solid;"
      :style="isDark
        ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.1);'
        : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
    >
      <div class="d-flex align-center ga-3 mb-8">
        <div class="pa-2 rounded-xl" style="background: rgba(139,92,246,0.1);">
          <CheckCircle2 class="text-purple" :size="20" />
        </div>
        <h3
          class="text-h6 font-weight-black text-uppercase"
          style="letter-spacing: -0.01em;"
          :class="isDark ? 'text-white' : 'text-grey-darken-4'"
        >
          Pre-Judgment Components
        </h3>
      </div>

      <div class="d-flex flex-column ga-8">

        <!-- Toggle -->
        <label class="d-flex align-center ga-3 cursor-pointer">
          <input
            type="checkbox"
            v-model="preJudgmentPayments"
            style="width:20px; height:20px; border-radius:6px; accent-color: #2563eb;"
          />
          <span
            class="text-sm font-weight-black text-uppercase"
            style="letter-spacing: 0.1em;"
            :class="isDark ? 'text-white' : 'text-grey-darken-2'"
          >
            Include Pre-Judgment Payments
          </span>
        </label>

        <!-- Conditional Panels -->
        <div class="d-flex flex-wrap ga-4">

          <!-- Pre-Judgment Interest -->
          <div
            class="pa-6 rounded-xl flex-1"
            style="border: 2px solid;"
            :style="isDark
              ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1);'
              : 'background: #f8fafc; border-color: #e2e8f0;'"
          >
            <h4
              class="text-sm font-weight-black text-uppercase mb-4"
              style="letter-spacing: 0.1em;"
              :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'"
            >
              Pre-Judgment Interest
            </h4>
            <div class="d-flex ga-6 align-center">
              <template v-if="preJudgmentPayments">
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-caption font-weight-bold text-uppercase" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" style="letter-spacing:-0.01em;">Remaining Balance</span>
                </label>
              </template>
              <template v-else>
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-caption font-weight-bold text-uppercase" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" style="letter-spacing:-0.01em;">Total</span>
                </label>
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-caption font-weight-bold text-uppercase" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" style="letter-spacing:-0.01em;">Remaining Balance</span>
                </label>
              </template>
            </div>
          </div>

          <!-- Pre-Judgment Costs -->
          <div
            class="pa-6 rounded-xl flex-1"
            style="border: 2px solid;"
            :style="isDark
              ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1);'
              : 'background: #f8fafc; border-color: #e2e8f0;'"
          >
            <h4
              class="text-sm font-weight-black text-uppercase mb-4"
              style="letter-spacing: 0.1em;"
              :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'"
            >
              Pre-Judgment Costs
            </h4>
            <div class="d-flex ga-6 align-center">
              <template v-if="preJudgmentPayments">
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-caption font-weight-bold text-uppercase" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" style="letter-spacing:-0.01em;">Remaining Balance</span>
                </label>
              </template>
              <template v-else>
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-caption font-weight-bold text-uppercase" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" style="letter-spacing:-0.01em;">Total</span>
                </label>
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-caption font-weight-bold text-uppercase" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" style="letter-spacing:-0.01em;">Remaining Balance</span>
                </label>
              </template>
            </div>
          </div>

          <!-- Pre-Judgment Fees -->
          <div
            class="pa-6 rounded-xl flex-1"
            style="border: 2px solid;"
            :style="isDark
              ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1);'
              : 'background: #f8fafc; border-color: #e2e8f0;'"
          >
            <h4
              class="text-sm font-weight-black text-uppercase mb-4"
              style="letter-spacing: 0.1em;"
              :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'"
            >
              Pre-Judgment Fees
            </h4>
            <div class="d-flex ga-6 align-center">
              <template v-if="preJudgmentPayments">
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-caption font-weight-bold text-uppercase" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" style="letter-spacing:-0.01em;">Remaining Balance</span>
                </label>
              </template>
              <template v-else>
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-caption font-weight-bold text-uppercase" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" style="letter-spacing:-0.01em;">Total</span>
                </label>
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-caption font-weight-bold text-uppercase" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" style="letter-spacing:-0.01em;">Remaining Balance</span>
                </label>
              </template>
            </div>
          </div>

          <!-- Judgment Amount Composition -->
          <div
            class="pa-6 rounded-xl w-100"
            style="border: 2px dashed;"
            :style="isDark
              ? 'background: rgba(59,130,246,0.05); border-color: rgba(59,130,246,0.2);'
              : 'background: rgba(239,246,255,0.3); border-color: #93c5fd;'"
          >
            <h4
              class="text-sm font-weight-black text-uppercase mb-6"
              style="letter-spacing: 0.1em;"
              :class="isDark ? 'text-blue-lighten-2' : 'text-blue-darken-1'"
            >
              Judgment Amount Composition
            </h4>
            <p
              class="text-sm font-weight-bold mb-4"
              :class="isDark ? 'text-white' : 'text-grey-darken-3'"
            >
              Judgment Amount = Principal +
            </p>
            <v-row class="ml-1">
              <v-col cols="12" md="4">
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" checked style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-caption font-weight-bold text-uppercase" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" style="letter-spacing:-0.01em;">Pre-Judgment Interest</span>
                </label>
              </v-col>
              <v-col cols="12" md="4">
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-caption font-weight-bold text-uppercase" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" style="letter-spacing:-0.01em;">Pre-Judgment Costs</span>
                </label>
              </v-col>
              <v-col cols="12" md="4">
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-caption font-weight-bold text-uppercase" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" style="letter-spacing:-0.01em;">Pre-Judgment Fees</span>
                </label>
              </v-col>
            </v-row>
          </div>

        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="d-flex justify-end">
      <v-btn
        color="blue-darken-1"
        variant="elevated"
        class="rounded-xl ga-2"
        style="border-radius: 16px; box-shadow: 0 4px 16px rgba(37,99,235,0.2);"
      >
        <Save :size="18" class="mr-2" />
        Save Judgment
      </v-btn>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CheckCircle2, Save, Scale } from 'lucide-vue-next'
import DateField from './shared/DateField.vue'
import InputField from './shared/InputField.vue'
import SelectField from './shared/SelectField.vue'

const props = defineProps({
  theme: { type: String, default: 'light' },
})

const isDark = computed(() => props.theme === 'dark')
const postJudgmentInterest = ref(false)
const preJudgmentPayments = ref(false)
</script>

<style scoped>
.checkbox-label {
  transition: opacity 0.2s;
}
.checkbox-label:hover {
  opacity: 0.8;
}
</style>