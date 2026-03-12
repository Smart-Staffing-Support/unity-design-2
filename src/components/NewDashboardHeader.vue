<template>
  <v-sheet
    class="w-100 pa-4 mb-8 position-relative overflow-hidden"
    color="transparent"
    style="
      backdrop-filter: blur(60px);
      border-radius: 25px;
      border: 1px solid;
      transition: all 0.5s ease;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    "
    :style="theme === 'dark'
      ? 'background: rgba(15,23,42,0.6) !important; border-color: rgba(255,255,255,0.10);'
      : 'background: transparent !important; border-color: #cbd5e1; box-shadow: 0 10px 30px rgba(30,41,59,0.15);'"
  >
    <!-- Ambient glow blob -->
    <div
      class="position-absolute pointer-events-none rounded-circle"
      style="
        top: -96px; right: -96px;
        width: 256px; height: 256px;
        background: rgba(37,99,235,0.10);
        filter: blur(100px);
      "
    />

    <!-- Row 1: Debtor buttons -->
    <div
      class="d-flex flex-column flex-lg-row justify-space-between align-start align-lg-center ga-6 mb-6 pb-6"
      :style="theme === 'dark' ? 'border-bottom: 1px solid rgba(255,255,255,0.05);' : 'border-bottom: 1px solid #f1f5f9;'"
    >
      <div class="d-flex align-end flex-wrap ga-3">
        <div
          v-for="(debtor, index) in debtors"
          :key="debtor.id"
          class="d-flex align-end ga-2"
        >
          <v-btn
            color="blue-darken-1"
            class="font-weight-black text-uppercase rounded-xl"
            style="letter-spacing: 0.15em; font-size: 11px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
            elevation="0"
            size="small"
            @click="isDebtorModalOpen = true"
          >
            Add a Debtor
          </v-btn>
          <v-btn
            v-if="index > 0"
            class="font-weight-black text-uppercase rounded-xl"
            style="letter-spacing: 0.15em; font-size: 11px;"
            :color="theme === 'dark' ? 'red-lighten-1' : 'red-darken-1'"
            :variant="theme === 'dark' ? 'tonal' : 'tonal'"
            elevation="0"
            size="small"
            @click="handleDeleteDebtor(debtor.id)"
          >
            Remove
          </v-btn>
        </div>

        <v-btn
          class="font-weight-black text-uppercase rounded-xl"
          style="letter-spacing: 0.15em; font-size: 11px; border-style: dashed;"
          :color="theme === 'dark' ? 'blue-lighten-2' : 'blue-darken-1'"
          variant="outlined"
          elevation="0"
          size="small"
          @click="handleAddCoDebtor"
        >
          + Add Co-Debtor
        </v-btn>
      </div>
    </div>

    <!-- Main Grid -->
    <v-row :gutter="10">
      <!-- Column 1 -->
      <v-col cols="12" md="6" lg="3" xl="2">
        <div class="d-flex flex-column ga-6">
          <SelectField label="Client's Name" :options="[]" :theme="theme" />
          <SelectField label="Creditor" :options="[]" :theme="theme" />
          <InputField label="Client #" :theme="theme" />
          <InputField label="Court Case #" :theme="theme" />
        </div>
      </v-col>

      <!-- Column 2 -->
      <v-col cols="12" md="6" lg="3" xl="2">
        <div class="d-flex flex-column ga-6">
          <SelectField label="Status Type" :options="[{value:'open',label:'Open'},{value:'close',label:'Close'},{value:'legal',label:'Legal'}]" default-value="open" :theme="theme" />
          <SelectField label="Main Status" :options="[{value:'stat1',label:'Processing'},{value:'stat2',label:'Escalated'},{value:'stat3',label:'Final Notice'}]" default-value="stat1" :theme="theme" />
          <SelectField label="Sub-Status" :options="[{value:'sec-stat1',label:'Skip Tracing'},{value:'sec-stat2',label:'Asset Verify'},{value:'sec-stat3',label:'Legal Prep'}]" default-value="sec-stat1" :theme="theme" />
          <SelectField label="Sub-sub-Status" :options="[{value:'sec-stat1',label:'Field Agent'},{value:'sec-stat2',label:'Mail Return'},{value:'sec-stat3',label:'Call Refused'}]" default-value="sec-stat1" :theme="theme" />
        </div>
      </v-col>

      <!-- Column 3 -->
      <v-col cols="12" md="6" lg="3" xl="2">
        <div class="d-flex flex-column ga-6">
          <SelectField label="Account Type" :options="[{value:'comm',label:'Commercial'},{value:'cons',label:'Consumer'}]" default-value="comm" :theme="theme" />
          <SelectField label="Medical" :options="[{value:'1',label:'Medical'},{value:'2',label:'Non-Medical'}]" default-value="1" :theme="theme" />
          <SelectField label="Primary Collector" :options="[{value:'john',label:'John Doe'},{value:'jane',label:'Sarah Jenkins'}]" default-value="jane" :theme="theme" />
          <SelectField label="Co-Collector" :options="[{value:'jane',label:'Jane Smith'},{value:'john',label:'John Doe'}]" default-value="jane" :theme="theme" />
          <SelectField label="Agreement Arrangement" :options="[]" :theme="theme" />
          <SelectField label="Last Date of Service" :options="[]" :theme="theme" />
        </div>
      </v-col>

      <!-- Column 4 -->
      <v-col cols="12" md="6" lg="3" xl="2">
        <div class="d-flex flex-column ga-6">
          <DateField label="Charged Off" :theme="theme" />
          <DateField label="Referring" :theme="theme" />
          <DateField label="Originated" :theme="theme" />
          <DateField label="Next Work" :theme="theme" />
          <DateField label="1st Delinq" :theme="theme" />
          <DateField label="Statute of Limitation" :theme="theme" />
        </div>
      </v-col>

      <!-- Column 5 -->
      <v-col cols="12" md="6" lg="12" xl="2">
        <div class="d-flex flex-column ga-6">
          <InputField label="Principal" type="number" :theme="theme" />
          <InputField label="Costs/Fees" type="text" :theme="theme" />
          <DateField label="Interest Start Date" :theme="theme" />
          <InputField label="Interest Rate" type="text" :theme="theme" />

          <div class="d-flex align-end ga-4">
            <InputField label="Linked Account #" type="text" :theme="theme" />
            <v-btn
              color="blue-darken-1"
              class="font-weight-black text-uppercase rounded-xl"
              style="letter-spacing: 0.15em; font-size: 11px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
              elevation="0"
              size="small"
            >
              Save
            </v-btn>
          </div>

          <v-btn
            color="teal-darken-2"
            class="font-weight-black text-uppercase rounded-xl"
            style="letter-spacing: 0.15em; font-size: 11px; box-shadow: 0 8px 24px rgba(13,148,136,0.2);"
            elevation="0"
            size="small"
          >
            Add Linked Account
          </v-btn>

          <div
            class="mt-2 pa-3 rounded-xl d-flex justify-space-between align-center"
          >
            <span
              class="text-body-2 font-weight-black"
              style="letter-spacing: 0.15em;"
              :style="theme === 'dark' ? 'color: rgba(255,255,255,0.3);' : 'color: #475569;'"
            >Linked Balance</span>
            <span
              class="text-body-2 font-weight-black"
              :style="theme === 'dark' ? 'color: #f87171;' : 'color: #dc2626;'"
            >$0.00</span>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- ===================== DEBTOR DIALOG ===================== -->
    <v-dialog
      v-model="isDebtorModalOpen"
      max-width="900"
      :scrim-opacity="0.6"
      style="backdrop-filter: blur(8px);"
      scrollable
    >
      <v-sheet
        style="border-radius: 30px; overflow: hidden;"
        :style="theme === 'dark'
          ? 'background: #0f172a; border: 1px solid rgba(255,255,255,0.10);'
          : 'background: white; border: 1px solid #e2e8f0;'"
        color="transparent"
      >
        <!-- Modal Header -->
        <div
          class="pa-6 d-flex justify-space-between align-center"
          style="position: sticky; top: 0; z-index: 10;"
          :style="theme === 'dark'
            ? 'background: #0f172a; border-bottom: 1px solid rgba(255,255,255,0.05);'
            : 'background: white; border-bottom: 1px solid #e2e8f0;'"
        >
          <div class="d-flex align-center ga-3">
            <div
              class="pa-2 rounded-lg"
              style="background: rgba(59,130,246,0.1);"
            >
              <User :size="24" color="#3b82f6" />
            </div>
            <div>
              <div
                class="text-h6 font-weight-black text-uppercase"
                style="letter-spacing: -0.3px;"
                :style="theme === 'dark' ? 'color: white;' : 'color: #0f172a;'"
              >
                Add a Debtor
              </div>
              <div
                class="text-caption font-weight-bold text-uppercase"
                style="letter-spacing: 0.15em;"
                :style="theme === 'dark' ? 'color: rgba(255,255,255,0.4);' : 'color: #94a3b8;'"
              >
                Provide detailed debtor information
              </div>
            </div>
          </div>
          <button
            class="d-flex align-center justify-center rounded-circle"
            style="width: 32px; height: 32px; border: none; cursor: pointer; background: transparent; transition: background 0.15s ease;"
            :style="theme === 'dark' ? 'color: rgba(255,255,255,0.4);' : 'color: #94a3b8;'"
            @click="isDebtorModalOpen = false"
            @mouseover="$event.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f1f5f9'"
            @mouseleave="$event.currentTarget.style.background = 'transparent'"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="pa-6" style="max-height: 75vh; overflow-y: auto;">
          <!-- Tabs -->
          <v-tabs
            v-model="activeTab"
            class="mb-8 rounded-xl"
            :style="theme === 'dark'
              ? 'background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.10);'
              : 'background: #f1f5f9; border: 1px solid #cbd5e1;'"
            selected-class="bg-blue-darken-1 text-white"
            hide-slider
            density="comfortable"
          >
            <v-tab
              value="individual"
              class="font-weight-black text-uppercase rounded-xl"
              style="letter-spacing: 0.15em; font-size: 11px;"
            >
              Individual
            </v-tab>
            <v-tab
              value="company"
              class="font-weight-black text-uppercase rounded-xl"
              style="letter-spacing: 0.15em; font-size: 11px;"
            >
              Company
            </v-tab>
          </v-tabs>

          <v-tabs-window v-model="activeTab">
            <!-- Individual Tab -->
            <v-tabs-window-item value="individual">
              <v-row class="mb-2">
                <v-col cols="12" sm="6" md="3"><InputField label="First Name" type="text" :theme="theme" /></v-col>
                <v-col cols="12" sm="6" md="3"><InputField label="Middle Name" type="text" :theme="theme" /></v-col>
                <v-col cols="12" sm="6" md="3"><InputField label="Last Name" type="text" :theme="theme" /></v-col>
                <v-col cols="12" sm="6" md="3"><InputField label="AKA" type="text" :theme="theme" /></v-col>
                <v-col cols="12" sm="6" md="3"><InputField label="Prefix" type="text" :theme="theme" /></v-col>
                <v-col cols="12" sm="6" md="3"><InputField label="Suffix" type="text" :theme="theme" /></v-col>
                <v-col cols="12" sm="6" md="3"><InputField label="SSN" type="text" :theme="theme" /></v-col>
                <v-col cols="12" sm="6" md="3"><DateField label="DOB" :theme="theme" /></v-col>
                <v-col cols="12" sm="6" md="3"><InputField label="Type" type="text" :theme="theme" /></v-col>

                <!-- Deceased -->
                <v-col cols="12" sm="6" md="3">
                  <div class="d-flex flex-column ga-2">
                    <label
                      class="text-body-2"
                      style="letter-spacing: 0.1em;"
                      :style="theme === 'dark' ? 'color: #93c5fd;' : 'color: #2563eb;'"
                    >Deceased</label>
                    <div class="d-flex align-center ga-2">
                      <v-checkbox
                        v-model="isDeceased"
                        hide-details
                        color="blue"
                        density="compact"
                      />
                      <DateField label="" :theme="theme" />
                    </div>
                  </div>
                </v-col>
              </v-row>

              <!-- Address Section -->
              <div
                class="pt-4 mt-2"
                :style="theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.08);' : 'border-top: 1px solid #e2e8f0;'"
              >
                <div
                  class="text-caption font-weight-black text-uppercase mb-6"
                  style="letter-spacing: 0.2em;"
                  :style="theme === 'dark' ? 'color: #60a5fa;' : 'color: #2563eb;'"
                >Address Information</div>
                <v-row>
                  <v-col cols="12" sm="6" md="3"><InputField label="Address 1" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Address 2" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="City" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3">
                    <SelectField label="State" :options="[{value:'ca',label:'CA'},{value:'ny',label:'NY'},{value:'tx',label:'TX'}]" :theme="theme" />
                  </v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Zip Code" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="County" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Country" type="text" :theme="theme" /></v-col>
                </v-row>
              </div>

              <!-- Contact Section -->
              <div
                class="pt-4 mt-2"
                :style="theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.08);' : 'border-top: 1px solid #e2e8f0;'"
              >
                <div
                  class="text-caption font-weight-black text-uppercase mb-6"
                  style="letter-spacing: 0.2em;"
                  :style="theme === 'dark' ? 'color: #60a5fa;' : 'color: #2563eb;'"
                >Contact Information</div>
                <div class="d-flex flex-wrap ga-6">
                  <div class="d-flex align-end ga-2">
                    <InputField label="Cell Number" type="text" :theme="theme" />
                    <InputField label="Ext" type="text" :theme="theme" />
                  </div>
                  <div class="d-flex align-end ga-2">
                    <InputField label="Home Number" type="text" :theme="theme" />
                    <InputField label="Ext" type="text" :theme="theme" />
                  </div>
                  <div style="width: 160px;">
                    <InputField label="Fax" type="text" :theme="theme" />
                  </div>
                </div>
              </div>
            </v-tabs-window-item>

            <!-- Company Tab -->
            <v-tabs-window-item value="company">
              <!-- Address Section -->
              <div class="pt-4">
                <div
                  class="text-caption font-weight-black text-uppercase mb-6"
                  style="letter-spacing: 0.2em;"
                  :style="theme === 'dark' ? 'color: #60a5fa;' : 'color: #2563eb;'"
                >Address Information</div>
                <v-row>
                  <v-col cols="12" sm="6" md="3"><InputField label="Company Name" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Address 1" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Address 2" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="City" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3">
                    <SelectField label="State" :options="[{value:'ca',label:'CA'},{value:'ny',label:'NY'},{value:'tx',label:'TX'}]" :theme="theme" />
                  </v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Zip Code" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="County" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Country" type="text" :theme="theme" /></v-col>
                </v-row>
              </div>

              <!-- Company Contact -->
              <div
                class="pt-4 mt-2"
                :style="theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.08);' : 'border-top: 1px solid #e2e8f0;'"
              >
                <div
                  class="text-caption font-weight-black text-uppercase mb-6"
                  style="letter-spacing: 0.2em;"
                  :style="theme === 'dark' ? 'color: #60a5fa;' : 'color: #2563eb;'"
                >Company Contact Information</div>
                <div class="d-flex ga-6">
                  <InputField label="Office Number" type="text" :theme="theme" />
                  <InputField label="Fax" type="text" :theme="theme" />
                </div>
              </div>

              <!-- Add Contact Section (conditional) -->
              <div
                v-if="isAddContact"
                class="pt-4 mt-2"
                :style="theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.08);' : 'border-top: 1px solid #e2e8f0;'"
              >
                <div
                  class="text-caption font-weight-black text-uppercase mb-6"
                  style="letter-spacing: 0.2em;"
                  :style="theme === 'dark' ? 'color: #60a5fa;' : 'color: #2563eb;'"
                >Contact Information</div>
                <v-row align="end">
                  <v-col cols="12" sm="6" md="3"><InputField label="First Name" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Last Name" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Contact Title" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3">
                    <div class="d-flex flex-column ga-2">
                      <label
                        class="text-body-2"
                        style="letter-spacing: 0.08em; color: #7dd3fc;"
                      >Is Personal Guarantor</label>
                      <v-checkbox
                        v-model="isPersonalGuarantor"
                        hide-details
                        color="blue"
                        density="compact"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Phone Number" type="tel" :theme="theme" /></v-col>
                  <v-col cols="auto" class="d-flex align-end">
                    <v-btn
                      color="teal"
                      class="font-weight-black rounded-xl mb-1"
                      style="box-shadow: 0 8px 24px rgba(20,184,166,0.2);"
                      elevation="0"
                      size="small"
                    >+</v-btn>
                  </v-col>
                </v-row>

                <!-- Personal Guarantor fields -->
                <v-row v-if="isPersonalGuarantor" align="end" class="mt-2">
                  <v-col cols="12" sm="6" md="3"><InputField label="SSN" type="text" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3"><DateField label="DOB" :theme="theme" /></v-col>
                  <v-col cols="12" sm="6" md="3">
                    <div class="d-flex flex-column ga-2">
                      <label
                        class="text-body-2"
                        style="letter-spacing: 0.1em;"
                        :style="theme === 'dark' ? 'color: #93c5fd;' : 'color: #2563eb;'"
                      >Deceased</label>
                      <div class="d-flex align-center ga-2">
                        <v-checkbox hide-details color="blue" density="compact" />
                        <DateField label="" :theme="theme" />
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="3" />
                  <v-col cols="12" sm="6" md="3"><InputField label="Address" type="text" :theme="theme" /></v-col>
                  <v-col cols="auto" class="d-flex align-end">
                    <v-btn
                      color="teal"
                      class="font-weight-black rounded-xl mb-1"
                      style="box-shadow: 0 8px 24px rgba(20,184,166,0.2);"
                      elevation="0"
                      size="small"
                    >+</v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-tabs-window-item>
          </v-tabs-window>

          <!-- Action Buttons -->
          <div
            class="d-flex justify-end ga-3 mt-8 pt-6"
            :style="theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.08);' : 'border-top: 1px solid #e2e8f0;'"
          >
            <v-btn
              class="font-weight-black text-uppercase rounded-xl"
              style="letter-spacing: 0.12em; font-size: 11px;"
              :variant="theme === 'dark' ? 'tonal' : 'tonal'"
              :color="theme === 'dark' ? 'white' : 'grey-darken-1'"
              elevation="0"
              @click="isDebtorModalOpen = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="teal-darken-1"
              class="font-weight-black text-uppercase rounded-xl"
              style="letter-spacing: 0.12em; font-size: 11px; box-shadow: 0 8px 24px rgba(13,148,136,0.2);"
              elevation="0"
              @click="handleContact"
            >
              {{ isAddContact ? 'Remove Contact' : 'Add Contact' }}
            </v-btn>
            <v-btn
              color="blue-darken-1"
              class="font-weight-black text-uppercase rounded-xl"
              style="letter-spacing: 0.12em; font-size: 11px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
              elevation="0"
            >
              Save Debtor
            </v-btn>
          </div>
        </div>
      </v-sheet>
    </v-dialog>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import { User, X } from 'lucide-vue-next';
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

const isDebtorModalOpen = ref(false);
const isAddContact = ref(false);
const isPersonalGuarantor = ref(false);
const isDeceased = ref(false);
const activeTab = ref('individual');

const debtors = ref([{ id: 1, name: 'Marcus Thorne' }]);
const nextDebtorId = ref(2);

function handleAddCoDebtor() {
  const newId = nextDebtorId.value;
  debtors.value.push({ id: newId, name: `Co-Debtor ${newId - 1}` });
  nextDebtorId.value++;
}

function handleDeleteDebtor(id) {
  debtors.value = debtors.value.filter(d => d.id !== id);
}

function handleContact() {
  isAddContact.value = !isAddContact.value;
}
</script>

<style scoped>
/* Scrollbar for modal body */
div[style*="overflow-y: auto"]::-webkit-scrollbar {
  width: 4px;
}
div[style*="overflow-y: auto"]::-webkit-scrollbar-track {
  background: transparent;
}
div[style*="overflow-y: auto"]::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 999px;
}
div[style*="overflow-y: auto"]::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.5);
}
</style>