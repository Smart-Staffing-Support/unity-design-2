<template>
  <div class="animate-fade d-flex flex-column ga-8">

    <!-- SECTION 1: JUDGMENT SETTINGS -->
    <v-sheet
      class="pa-8 rounded-xl bg-newjudgment_bg border border-sm border-custom-blue"
    >
      <!-- Section Header -->
      <div class="d-flex align-center ga-3 mb-8">
        <div class="pa-2 rounded-xl bg-billing_modal_icon_bg">
          <Scale :size="20" class="text-newexperianreports_button_hover" />
        </div>
        <h3
          class="text-h6 font-weight-black text-uppercase text-accounts_summary_value"
        >Judgment Settings</h3>
      </div>

      <div class="d-flex flex-column ga-8">
        <!-- Base Judgment Fields -->
        <v-row>
          <v-col cols="12" md="4"><DateField label="Judgment Date"/></v-col>
          <v-col cols="12" md="4"><InputField label="Judgment Amount" placeholder="$0.00" type="number" /></v-col>
          <v-col cols="12" md="4">
            <SelectField
              label="Pre-Judgment Interest"
              :options="[
                {value:'simple',   label:'Simple Interest'},
                {value:'compound', label:'Compound Interest'},
                {value:'none',     label:'None'},
              ]"
              default-value="simple"
            />
          </v-col>
        </v-row>

        <!-- Post-Judgment Interest Section -->
        <v-sheet
          class="pa-6 rounded-xl bg-newjudgment_card_bg border border-custom-blue"
        >
          <div class="d-flex align-center ga-3 mb-6 cursor-pointer">
            <CheckboxField
              v-model="postJudgmentInterest"
            />
            <span
              class="text-body-2 font-weight-black text-uppercase text-accounts_row_text newjudgment-tracking-wide"
            >Apply Post-Judgment Interest</span>
          </div>

          <v-row v-if="!postJudgmentInterest" align="end">
            <v-col cols="12" md="4">
              <InputField label="Interest Amount" placeholder="0.00%" type="text" />
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
              />
            </v-col>
            <v-col cols="12" md="4" class="d-flex align-end">
              <v-btn
                variant="flat"
                class="newjudgment-add-step-btn rounded-lg w-100 font-weight-black text-uppercase text-caption bg-newexperianreports_button hover:bg-billing_button_hover text-accounts_cancel_text transition-all"
                elevation="0"
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
      class="pa-8 rounded-xl bg-newjudgment_bg border border-sm border-custom-blue"
    >
      <!-- Section Header -->
      <div class="d-flex align-center ga-3 mb-8">
        <div class="pa-2 rounded-xl bg-newjudgment_iconbg">
          <CheckCircle2 :size="20" class="text-contact_menu_icon_violet" />
        </div>
        <h3
          class="text-h6 font-weight-black text-uppercase text-accounts_summary_value"
        >Pre-Judgment Components</h3>
      </div>

      <div class="d-flex flex-column ga-8">
        <!-- Toggle -->
        <div class="d-flex align-center ga-3 cursor-pointer">
          <CheckboxField
            v-model="preJudgmentPayments"
          />
          <span
            class="text-body-2 font-weight-black text-uppercase text-accounts_row_text newjudgment-tracking-wide"
          >Include Pre-Judgment Payments</span>
        </div>

        <!-- Three sub-cards + Composition card -->
        <div class="d-flex flex-wrap justify-space-between ga-4">

          <!-- Pre-Judgment Interest / Costs / Fees cards -->
          <v-sheet
            v-for="card in preJudgmentCards"
            :key="card.title"
            class="pa-6 flex-grow-1 rounded-xl newjudgment-subcard bg-newjudgment_card_bg border border-sm border-custom-blue"
          >
            <div
              class="text-body-2 font-weight-black text-uppercase mb-4 text-newjudgment_muted_text newjudgment-tracking-wide"
            >{{ card.title }}</div>

            <div class="d-flex ga-6 align-center flex-wrap">
              <!-- When preJudgmentPayments: only Remaining Balance -->
              <template v-if="preJudgmentPayments">
                <div class="d-flex align-center ga-3 cursor-pointer py-2">
                  <CheckboxField
                    v-model="preJudgmentSelection[card.title]['Remaining Balance']"
                  />
                  <span
                    class="text-caption font-weight-bold text-uppercase text-newjudgment_muted_text newjudgment-tracking-tight"
                  >Remaining Balance</span>
                </div>
              </template>
              <!-- When not preJudgmentPayments: Total + Remaining Balance -->
              <template v-else>
                <div class="d-flex align-center ga-3 cursor-pointer py-2">
                  <CheckboxField
                    v-model="preJudgmentSelection[card.title]['Total']"
                  />
                  <span
                    class="text-caption font-weight-bold text-uppercase text-newjudgment_muted_text newjudgment-tracking-tight"
                  >Total</span>
                </div>
                <div class="d-flex align-center ga-3 cursor-pointer py-2">
                  <CheckboxField
                    v-model="preJudgmentSelection[card.title]['Remaining Balance']"
                  />
                  <span
                    class="text-caption font-weight-bold text-uppercase text-newjudgment_muted_text newjudgment-tracking-tight"
                  >Remaining Balance</span>
                </div>
              </template>
            </div>
          </v-sheet>

          <!-- Judgment Amount Composition Card -->
          <v-sheet
            class="pa-6 flex-grow-1 rounded-xl newjudgment-composition bg-newjudgment_composition_bg border border-custom-blue"
          >
            <div
              class="text-body-2 font-weight-black text-uppercase mb-6 text-contact_menu_header_blue_text newjudgment-tracking-wide"
            >Judgment Amount Composition</div>

            <p
              class="text-body-2 font-weight-bold mb-4 text-text_strong_light"
            >Judgment Amount = Principal +</p>

            <v-row class="ml-1">
              <v-col
                v-for="item in compositionItems"
                :key="item"
                cols="12" md="4"
              >
                <div class="d-flex align-center ga-3 cursor-pointer py-2">
                  <CheckboxField
                    v-model="compositionSelection[item]"
                  />
                  <span
                    class="text-caption font-weight-bold text-uppercase text-newjudgment_muted_text newjudgment-tracking-tight"
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
        variant="flat"
        class="rounded-lg d-flex align-center ga-2 px-8 py-3 font-weight-medium text-body-2 bg-newexperianreports_button text-accounts_cancel_text hover:bg-newexperianreports_button_hover transition-all"
        elevation="0"
      >
        <template #prepend><Save :size="18" /></template>
        Save Judgment
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Scale, CheckCircle2, Save } from 'lucide-vue-next';
import DateField from './shared/DateField.vue';
import InputField from './shared/InputField.vue';
import SelectField from './shared/SelectField.vue';
import CheckboxField from './shared/CheckboxField.vue';

const postJudgmentInterest = ref(false);
const preJudgmentPayments  = ref(false);

const preJudgmentCards = [
  { title: 'Pre-Judgment Interest' },
  { title: 'Pre-Judgment Costs' },
  { title: 'Pre-Judgment Fees' },
];

const preJudgmentSelection = reactive({
  'Pre-Judgment Interest': { Total: false, 'Remaining Balance': false },
  'Pre-Judgment Costs': { Total: false, 'Remaining Balance': false },
  'Pre-Judgment Fees': { Total: false, 'Remaining Balance': false },
});

const compositionItems = [
  'Pre-Judgment Interest',
  'Pre-Judgment Costs',
  'Pre-Judgment Fees',
];

const compositionSelection = reactive({
  'Pre-Judgment Interest': true,
  'Pre-Judgment Costs': false,
  'Pre-Judgment Fees': false,
});
</script>

<style scoped>
.animate-fade {
  animation: fadeSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.newjudgment-subcard {
  min-width: 180px;
}

.newjudgment-composition {
  min-width: 240px;
}

.newjudgment-tracking-wide {
  letter-spacing: 0.1em;
}

.newjudgment-add-step-btn {
  height: 40px;
  min-height: 40px;
  max-height: 40px;
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