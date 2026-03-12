<template>
  <div class="animate-fade">

    <!-- SECTION 1: JUDGMENT SETTINGS -->
    <v-sheet
      class="pa-8 mb-8"
      color="transparent"
      style="border-radius: 35px !important;"
      :style="theme === 'dark'
        ? 'background: rgba(15,23,42,0.6) !important; border: 1px solid rgba(255,255,255,0.10);'
        : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
    >
      <!-- Section Header -->
      <div class="d-flex align-center ga-3 mb-8">
        <div class="pa-2 rounded-xl" style="background: rgba(59,130,246,0.10);">
          <Scale :size="20" color="#3b82f6" />
        </div>
        <h3
          class="text-h6 font-weight-black text-uppercase"
          style="letter-spacing: -0.3px;"
          :style="theme === 'dark' ? 'color: white;' : 'color: #0f172a;'"
        >Judgment Settings</h3>
      </div>

      <div class="d-flex flex-column ga-8">
        <!-- Base Judgment Fields -->
        <v-row>
          <v-col cols="12" md="4"><DateField label="Judgment Date" :theme="theme" /></v-col>
          <v-col cols="12" md="4"><InputField label="Judgment Amount" placeholder="$0.00" type="number" :theme="theme" /></v-col>
          <v-col cols="12" md="4">
            <SelectField
              label="Pre-Judgment Interest"
              :options="[
                {value:'simple',   label:'Simple Interest'},
                {value:'compound', label:'Compound Interest'},
                {value:'none',     label:'None'},
              ]"
              default-value="simple"
              :theme="theme"
            />
          </v-col>
        </v-row>

        <!-- Post-Judgment Interest Section -->
        <v-sheet
          class="pa-6 rounded-xl"
          color="transparent"
          style="border-radius: 16px !important; border-width: 2px; border-style: solid;"
          :style="theme === 'dark'
            ? 'background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.10);'
            : 'background: #f8fafc !important; border-color: #e2e8f0;'"
        >
          <div class="d-flex align-center ga-3 mb-6 cursor-pointer" @click="postJudgmentInterest = !postJudgmentInterest">
            <v-checkbox
              v-model="postJudgmentInterest"
              hide-details
              color="blue"
              density="compact"
              @click.stop
            />
            <span
              class="text-body-2 font-weight-black text-uppercase"
              style="letter-spacing: 0.15em;"
              :style="theme === 'dark' ? 'color: white;' : 'color: #334155;'"
            >Apply Post-Judgment Interest</span>
          </div>

          <v-row v-if="!postJudgmentInterest" align="end">
            <v-col cols="12" md="4">
              <InputField label="Interest Amount" placeholder="0.00%" type="text" :theme="theme" />
            </v-col>
            <v-col cols="12" md="4">
              <SelectField
                label="Compounding"
                :options="[
                  {value:'daily',    label:'Daily'},
                  {value:'monthly',  label:'Monthly'},
                  {value:'annually', label:'Annually'},
                ]"
                default-value="daily"
                :theme="theme"
              />
            </v-col>
            <v-col cols="12" md="4" class="d-flex align-end">
              <v-btn
                color="blue-darken-1"
                class="font-weight-black text-uppercase rounded-xl"
                style="letter-spacing: 0.15em; font-size: 11px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
                elevation="0"
                block
              >
                Add Step
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </div>
    </v-sheet>

    <!-- SECTION 2: PRE-JUDGMENT COMPONENTS -->
    <v-sheet
      class="pa-8 mb-8"
      color="transparent"
      style="border-radius: 35px !important;"
      :style="theme === 'dark'
        ? 'background: rgba(15,23,42,0.6) !important; border: 1px solid rgba(255,255,255,0.10);'
        : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
    >
      <!-- Section Header -->
      <div class="d-flex align-center ga-3 mb-8">
        <div class="pa-2 rounded-xl" style="background: rgba(139,92,246,0.10);">
          <CheckCircle2 :size="20" color="#7c3aed" />
        </div>
        <h3
          class="text-h6 font-weight-black text-uppercase"
          style="letter-spacing: -0.3px;"
          :style="theme === 'dark' ? 'color: white;' : 'color: #0f172a;'"
        >Pre-Judgment Components</h3>
      </div>

      <div class="d-flex flex-column ga-8">
        <!-- Toggle -->
        <div class="d-flex align-center ga-3 cursor-pointer" @click="preJudgmentPayments = !preJudgmentPayments">
          <v-checkbox
            v-model="preJudgmentPayments"
            hide-details
            color="blue"
            density="compact"
            @click.stop
          />
          <span
            class="text-body-2 font-weight-black text-uppercase"
            style="letter-spacing: 0.15em;"
            :style="theme === 'dark' ? 'color: white;' : 'color: #334155;'"
          >Include Pre-Judgment Payments</span>
        </div>

        <!-- Three sub-cards + Composition card -->
        <div class="d-flex flex-wrap justify-space-between ga-4">

          <!-- Pre-Judgment Interest / Costs / Fees cards -->
          <v-sheet
            v-for="card in preJudgmentCards"
            :key="card.title"
            class="pa-6 flex-grow-1"
            color="transparent"
            style="border-radius: 16px !important; min-width: 180px;"
            :style="theme === 'dark'
              ? 'background: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.10);'
              : 'background: #f8fafc !important; border: 1px solid rgba(37,99,235,0.4);'"
          >
            <div
              class="text-body-2 font-weight-black text-uppercase mb-4"
              style="letter-spacing: 0.15em;"
              :style="theme === 'dark' ? 'color: #94a3b8;' : 'color: #475569;'"
            >{{ card.title }}</div>

            <div class="d-flex ga-6 align-center flex-wrap">
              <!-- When preJudgmentPayments: only Remaining Balance -->
              <template v-if="preJudgmentPayments">
                <div class="d-flex align-center ga-3 cursor-pointer py-2">
                  <v-checkbox hide-details color="blue" density="compact" />
                  <span
                    class="text-caption font-weight-bold text-uppercase"
                    style="letter-spacing: 0.05em;"
                    :style="theme === 'dark' ? 'color: #94a3b8;' : 'color: #475569;'"
                  >Remaining Balance</span>
                </div>
              </template>
              <!-- When not preJudgmentPayments: Total + Remaining Balance -->
              <template v-else>
                <div class="d-flex align-center ga-3 cursor-pointer py-2">
                  <v-checkbox hide-details color="blue" density="compact" />
                  <span
                    class="text-caption font-weight-bold text-uppercase"
                    style="letter-spacing: 0.05em;"
                    :style="theme === 'dark' ? 'color: #94a3b8;' : 'color: #475569;'"
                  >Total</span>
                </div>
                <div class="d-flex align-center ga-3 cursor-pointer py-2">
                  <v-checkbox hide-details color="blue" density="compact" />
                  <span
                    class="text-caption font-weight-bold text-uppercase"
                    style="letter-spacing: 0.05em;"
                    :style="theme === 'dark' ? 'color: #94a3b8;' : 'color: #475569;'"
                  >Remaining Balance</span>
                </div>
              </template>
            </div>
          </v-sheet>

          <!-- Judgment Amount Composition Card -->
          <v-sheet
            class="pa-6 flex-grow-1"
            color="transparent"
            style="border-radius: 16px !important; border-style: dashed !important; border-width: 2px !important; min-width: 240px;"
            :style="theme === 'dark'
              ? 'background: rgba(59,130,246,0.05) !important; border-color: rgba(59,130,246,0.20) !important;'
              : 'background: rgba(239,246,255,0.30) !important; border-color: #93c5fd !important;'"
          >
            <div
              class="text-body-2 font-weight-black text-uppercase mb-6"
              style="letter-spacing: 0.15em;"
              :style="theme === 'dark' ? 'color: #60a5fa;' : 'color: #2563eb;'"
            >Judgment Amount Composition</div>

            <p
              class="text-body-2 font-weight-bold mb-4"
              :style="theme === 'dark' ? 'color: white;' : 'color: #1e293b;'"
            >Judgment Amount = Principal +</p>

            <v-row class="ml-1">
              <v-col
                v-for="item in compositionItems"
                :key="item"
                cols="12" md="4"
              >
                <div class="d-flex align-center ga-3 cursor-pointer py-2">
                  <v-checkbox
                    hide-details
                    color="blue"
                    density="compact"
                    :model-value="item === 'Pre-Judgment Interest'"
                  />
                  <span
                    class="text-caption font-weight-bold text-uppercase"
                    style="letter-spacing: 0.05em;"
                    :style="theme === 'dark' ? 'color: #94a3b8;' : 'color: #475569;'"
                  >{{ item }}</span>
                </div>
              </v-col>
            </v-row>
          </v-sheet>

        </div>
      </div>
    </v-sheet>

    <!-- Save Button -->
    <div class="d-flex justify-end">
      <v-btn
        color="blue-darken-1"
        class="font-weight-medium rounded-xl"
        style="font-size: 13px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
        elevation="0"
        size="large"
      >
        <template #prepend><Save :size="16" /></template>
        Save Judgment
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Scale, CheckCircle2, Save } from 'lucide-vue-next';
import DateField from './shared/DateField.vue';
import InputField from './shared/InputField.vue';
import SelectField from './shared/SelectField.vue';

defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
});

const postJudgmentInterest = ref(false);
const preJudgmentPayments  = ref(false);

const preJudgmentCards = [
  { title: 'Pre-Judgment Interest' },
  { title: 'Pre-Judgment Costs' },
  { title: 'Pre-Judgment Fees' },
];

const compositionItems = [
  'Pre-Judgment Interest',
  'Pre-Judgment Costs',
  'Pre-Judgment Fees',
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

.cursor-pointer { cursor: pointer; }
</style>