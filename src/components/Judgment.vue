<template>
  <div class="d-flex flex-column ga-8">

    <!-- SECTION 1: JUDGMENT SETTINGS -->
    <div
      class="pa-8 rounded-xl border-md bg-secondary_container_bg border-secondary_container_border"
      :style="!isDark ? 'box-shadow: 0 1px 3px rgba(0,0,0,0.08);' : ''"
    >
      <div class="d-flex align-center ga-3 mb-8">
        <div class="pt-2 px-2 rounded-xl" style="background: rgba(37,99,235,0.20);">
          <Scale class="judgment-icon" :size="20" />
        </div>
        <h3
          class="text-h6 font-weight-black text-uppercase text-fields_text"
          style="letter-spacing: -0.01em;"
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
          class="pa-6 rounded-xl border-md bg-fields_bg border-secondary_container_border"
          :style="!isDark ? 'box-shadow: 0 1px 3px rgba(0,0,0,0.08);' : ''"
        >
          <label class="d-flex align-center ga-3 cursor-pointer mb-6">
            <input
              type="checkbox"
              v-model="postJudgmentInterest"
              style="width:20px; height:20px; border-radius:6px; accent-color: #2563eb;"
            />
            <span
              class="text-sm font-weight-black text-uppercase text-fields_text"
              style="letter-spacing: 0.1em;"
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
                class="rounded-sm font-weight-bold text-uppercase w-100"
                style="letter-spacing: 0.1em; font-size: 0.7rem; border-radius: 12px; padding: 21px 0; box-shadow: 0 4px 16px rgba(37,99,235,0.2);"
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
      class="pa-8 rounded-xl border-md bg-secondary_container_bg border-secondary_container_border"
      :style="!isDark ? 'box-shadow: 0 1px 3px rgba(0,0,0,0.08);' : ''"
    >
      <div class="d-flex align-center ga-3 mb-8">
        <div class="px-2 pt-2 rounded-circle pre-icon">
          <CheckCircle2 class="text-purple" :size="20" />
        </div>
        <h3
          class="text-h6 font-weight-black text-uppercase text-fields_text"
          style="letter-spacing: -0.01em;"
        >
          Pre-Judgment
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
            class="text-sm font-weight-bold text-fields_text"
            style="letter-spacing: 0.1em;"
          >
            Include Pre-Judgment Payments
          </span>
        </label>

        <!-- Conditional Panels -->
        <div class="d-flex ga-4">

          <!-- Pre-Judgment Interest -->
          <div
            class="pa-6 rounded-xl flex-1 bg-judgment_composition_bg composition-border"
            style="border-radius: 24px; min-width: 260px;"
          >
            <h4
              class="text-sm font-weight-bold mb-4 text-judgment_labels"
              style="letter-spacing: 0.1em;"
            >
              Pre-Judgment Interest
            </h4>
            <div class="d-flex ga-6 align-center">
              <template v-if="preJudgmentPayments">
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-body-medium text-judgment_labels" style="letter-spacing:-0.01em;">Remaining Balance</span>
                </label>
              </template>
              <template v-else>
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-body-medium text-judgment_labels" style="letter-spacing:-0.01em;">Total</span>
                </label>
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-body-medium text-judgment_labels" style="letter-spacing:-0.01em;">Remaining Balance</span>
                </label>
              </template>
            </div>
          </div>

          <!-- Pre-Judgment Costs -->
          <div
            class="pa-6 rounded-xl flex-1 bg-judgment_composition_bg composition-border"
            style="border-radius: 24px; min-width: 260px;"
          >
            <h4
              class="text-sm font-weight-bold mb-4 text-judgment_labels"
              style="letter-spacing: 0.1em;"
            >
              Pre-Judgment Costs
            </h4>
            <div class="d-flex ga-6 align-center">
              <template v-if="preJudgmentPayments">
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-body-medium text-judgment_labels" style="letter-spacing:-0.01em;">Remaining Balance</span>
                </label>
              </template>
              <template v-else>
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-body-medium text-judgment_labels" style="letter-spacing:-0.01em;">Total</span>
                </label>
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-body-medium text-judgment_labels" style="letter-spacing:-0.01em;">Remaining Balance</span>
                </label>
              </template>
            </div>
          </div>

          <!-- Pre-Judgment Fees -->
          <div
            class="pa-6 rounded-xl flex-1 bg-judgment_composition_bg composition-border"
            style="border-radius: 24px; min-width: 260px;"
          >
            <h4
              class="text-sm font-weight-bold mb-4 text-judgment_labels"
              style="letter-spacing: 0.1em;"
            >
              Pre-Judgment Fees
            </h4>
            <div class="d-flex ga-6 align-center">
              <template v-if="preJudgmentPayments">
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-body-medium text-judgment_labels" style="letter-spacing:-0.01em;">Remaining Balance</span>
                </label>
              </template>
              <template v-else>
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-body-medium text-judgment_labels" style="letter-spacing:-0.01em;">Total</span>
                </label>
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-body-medium text-judgment_labels" style="letter-spacing:-0.01em;">Remaining Balance</span>
                </label>
              </template>
            </div>
          </div>

          <!-- Judgment Amount Composition -->
          <div
            class="pa-6 rounded-xl flex-1 bg-secondary_container_bg"
            style="border: 2px dashed #2563eb;"          >
            <h4
              class="text-sm font-weight-bold mb-6 text-blue-darken-1"
              style="letter-spacing: 0.1em;"
            >
              Judgment Amount Composition
            </h4>
            <p
              class="text-sm font-weight-bold mb-4 text-fields_text"
            >
              Judgment Amount = Principal +
            </p>
            <v-row class="ml-1">
              <v-col cols="12" md="4">
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" checked style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-body-medium text-judgment_labels" style="letter-spacing:-0.01em;">Pre-Judgment Interest</span>
                </label>
              </v-col>
              <v-col cols="12" md="4">
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-body-medium text-judgment_labels" style="letter-spacing:-0.01em;">Pre-Judgment Costs</span>
                </label>
              </v-col>
              <v-col cols="12" md="4">
                <label class="d-flex align-center ga-3 cursor-pointer checkbox-label">
                  <input type="checkbox" style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;" />
                  <span class="text-body-medium text-judgment_labels" style="letter-spacing:-0.01em;">Pre-Judgment Fees</span>
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
import { useTheme } from 'vuetify'

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)  
const postJudgmentInterest = ref(false)
const preJudgmentPayments = ref(false)
</script>

<style scoped>
.composition-border {
  border: 2px solid rgba(var(--v-theme-judgment_composition_border))
}

.pre-icon {
  background: rgba(141, 84, 255, .1);
  color: #8e51ff;
}

.judgment-icon {
  color: #3b82f6;
}

.checkbox-label {
  transition: opacity 0.2s;
}
.checkbox-label:hover {
  opacity: 0.8;
}
</style>