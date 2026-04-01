<template>
  <v-sheet
    class="rounded-xl w-100 pa-4 mb-8 position-relative overflow-hidden bg-client_accordion_bg border border-sm border-custom-blue"
  >
    <!-- Ambient glow blob -->
    <div class="ambient-glow position-absolute pointer-events-none rounded-circle" />

    <!-- Row 1: Debtor buttons -->
    <div
      class="d-flex flex-column flex-lg-row justify-space-between align-start align-lg-center ga-6 mb-6 pb-6 border-b-sm border-custom-blue"
    >
      <div class="d-flex align-end flex-wrap ga-3">
        <div
          v-for="(debtor, index) in debtors"
          :key="debtor.id"
          class="d-flex align-end ga-2"
        >
          <v-btn
            color="blue-darken-1"
            class="font-weight-black text-uppercase rounded-lg"
            style="letter-spacing: 0.15em; font-size: 11px;"
            elevation="0"
            size="small"
            @click="isDebtorModalOpen = true"
          >
            Add a Debtor
          </v-btn>
          <v-btn
            v-if="index > 0"
            class="font-weight-black text-uppercase rounded-lg bg-debtor_remove_btn_bg text-ac_red_text"
            style="letter-spacing: 0.15em; font-size: 11px;"
            variant="flat"
            elevation="0"
            size="small"
            @click="handleDeleteDebtor(debtor.id)"
          >
            Remove
          </v-btn>
        </div>

        <v-btn
          class="font-weight-black text-uppercase rounded-lg"
          style="letter-spacing: 0.15em; font-size: 11px; border-style: dashed;"
          color="dh_label"
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
          <SelectField label="Client's Name" :options="[]"/>
          <SelectField label="Creditor" :options="[]"/>
          <InputField label="Client #"/>
          <InputField label="Court Case #"/>
        </div>
      </v-col>

      <!-- Column 2 -->
      <v-col cols="12" md="6" lg="3" xl="2">
        <div class="d-flex flex-column ga-6">
          <SelectField label="Status Type" :options="[{value:'open',label:'Open'},{value:'close',label:'Close'},{value:'legal',label:'Legal'}]" default-value="open" />
          <SelectField label="Main Status" :options="[{value:'stat1',label:'Processing'},{value:'stat2',label:'Escalated'},{value:'stat3',label:'Final Notice'}]" default-value="stat1"/>
          <SelectField label="Sub-Status" :options="[{value:'sec-stat1',label:'Skip Tracing'},{value:'sec-stat2',label:'Asset Verify'},{value:'sec-stat3',label:'Legal Prep'}]" default-value="sec-stat1"/>
          <SelectField label="Sub-sub-Status" :options="[{value:'sec-stat1',label:'Field Agent'},{value:'sec-stat2',label:'Mail Return'},{value:'sec-stat3',label:'Call Refused'}]" default-value="sec-stat1"/>
        </div>
      </v-col>

      <!-- Column 3 -->
      <v-col cols="12" md="6" lg="3" xl="2">
        <div class="d-flex flex-column ga-6">
          <SelectField label="Account Type" :options="[{value:'comm',label:'Commercial'},{value:'cons',label:'Consumer'}]" default-value="comm"/>
          <SelectField label="Medical" :options="[{value:'1',label:'Medical'},{value:'2',label:'Non-Medical'}]" default-value="1"/>
          <SelectField label="Primary Collector" :options="[{value:'john',label:'John Doe'},{value:'jane',label:'Sarah Jenkins'}]" default-value="jane"/>
          <SelectField label="Co-Collector" :options="[{value:'jane',label:'Jane Smith'},{value:'john',label:'John Doe'}]" default-value="jane"/>
          <SelectField label="Agreement Arrangement" :options="[]" />
          <SelectField label="Last Date of Service" :options="[]" />
        </div>
      </v-col>

      <!-- Column 4 -->
      <v-col cols="12" md="6" lg="3" xl="2">
        <div class="d-flex flex-column ga-6">
          <DateField label="Charged Off"/>
          <DateField label="Referring"/>
          <DateField label="Originated"/>
          <DateField label="Next Work"/>
          <DateField label="1st Delinq"/>
          <DateField label="Statute of Limitation"/>
        </div>
      </v-col>

      <!-- Column 5 -->
      <v-col cols="12" md="6" lg="12" xl="2">
        <div class="d-flex flex-column ga-6">
          <InputField label="Principal" type="number"/>
          <InputField label="Costs/Fees" type="text"/>
          <DateField label="Interest Start Date"/>
          <InputField label="Interest Rate" type="text"/>

          <div class="d-flex align-end ga-4">
            <InputField label="Linked Account #" type="text"/>
            <v-btn
              color="blue-darken-1"
              class="font-weight-black text-uppercase rounded-lg"
              style="letter-spacing: 0.15em; font-size: 11px;"
              elevation="0"
              size="small"
            >
              Save
            </v-btn>
          </div>

          <v-btn
            color="teal-darken-2"
            class="font-weight-black text-uppercase rounded-lg"
            style="letter-spacing: 0.15em; font-size: 11px;"
            elevation="0"
            size="small"
          >
            Add Linked Account
          </v-btn>

          <div
            class="mt-2 pa-3 rounded-lg d-flex justify-space-between align-center"
          >
            <span
              class="text-body-2 font-weight-black text-debtor_linked_balance_label"
              style="letter-spacing: 0.15em;"
            >Linked Balance</span>
            <span
              class="text-body-2 font-weight-black text-ac_red_text"
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
        class="debtor-modal-shell bg-debtor_modal_bg border border-sm border-custom-blue"
        style="border-radius: 30px; overflow: hidden;"
      >
        <!-- Modal Header -->
        <div
          class="pa-6 d-flex justify-space-between align-center bg-debtor_modal_bg border-b-sm border-custom-blue"
          style="position: sticky; top: 0; z-index: 10;"
        >
          <div class="d-flex align-center ga-3">
            <div class="pa-2 rounded-lg bg-client_header_icon_bg">
              <User :size="24" class="text-blue" />
            </div>
            <div>
              <div
                class="text-h6 font-weight-black text-uppercase text-debtor_modal_title"
                style="letter-spacing: -0.3px;"
              >
                Add a Debtor
              </div>
              <div
                class="text-caption font-weight-bold text-uppercase text-debtor_modal_muted_text"
                style="letter-spacing: 0.15em;"
              >
                Provide detailed debtor information
              </div>
            </div>
          </div>
          <button
            class="d-flex align-center justify-center rounded-circle text-debtor_modal_muted_text hover:bg-debtor_modal_close_hover"
            style="width: 32px; height: 32px; border: none; cursor: pointer; transition: background 0.15s ease;"
            @click="isDebtorModalOpen = false"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="pa-6" style="max-height: 75vh; overflow-y: auto;">
          <!-- Tabs -->
          <v-tabs
            v-model="activeTab"
            class="mb-8 bg-debtor_tabs_bg border border-sm border-custom-blue"
            selected-class="debtor-type-tab-active"
            hide-slider
            density="comfortable"
          >
            <v-tab
              value="individual"
              class="debtor-type-tab font-weight-black text-uppercase"
              style="letter-spacing: 0.15em; font-size: 11px;"
            >
              Individual
            </v-tab>
            <v-tab
              value="company"
              class="debtor-type-tab font-weight-black text-uppercase"
              style="letter-spacing: 0.15em; font-size: 11px;"
            >
              Company
            </v-tab>
          </v-tabs>

          <v-tabs-window v-model="activeTab">
            <!-- Individual Tab -->
            <v-tabs-window-item value="individual">
              <v-row class="mb-2">
                <v-col cols="12" sm="6" md="3"><InputField label="First Name" type="text"/></v-col>
                <v-col cols="12" sm="6" md="3"><InputField label="Middle Name" type="text"/></v-col>
                <v-col cols="12" sm="6" md="3"><InputField label="Last Name" type="text"/></v-col>
                <v-col cols="12" sm="6" md="3"><InputField label="AKA" type="text"/></v-col>
                <v-col cols="12" sm="6" md="3"><InputField label="Prefix" type="text"/></v-col>
                <v-col cols="12" sm="6" md="3"><InputField label="Suffix" type="text"/></v-col>
                <v-col cols="12" sm="6" md="3"><InputField label="SSN" type="text"/></v-col>
                <v-col cols="12" sm="6" md="3"><DateField label="DOB"/></v-col>
                <v-col cols="12" sm="6" md="3"><InputField label="Type" type="text"/></v-col>

                <!-- Deceased -->
                <v-col cols="12" sm="6" md="3">
                  <DateField label="Deceased"/>
                </v-col>
              </v-row>

              <!-- Address Section -->
              <div
                class="pt-4 mt-2"
              >
                <div
                  class="text-caption font-weight-black text-uppercase mb-6 text-ac_blue_text"
                  style="letter-spacing: 0.2em;"
                >Address Information</div>
                <v-row>
                  <v-col cols="12" sm="6" md="3"><InputField label="Address 1" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Address 2" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="City" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3">
                    <SelectField label="State" :options="[{value:'ca',label:'CA'},{value:'ny',label:'NY'},{value:'tx',label:'TX'}]"/>
                  </v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Zip Code" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="County" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Country" type="text"/></v-col>
                </v-row>
              </div>

              <!-- Contact Section -->
              <div
                class="pt-4 mt-2"
              >
                <div
                  class="text-caption font-weight-black text-uppercase mb-6 text-ac_blue_text"
                  style="letter-spacing: 0.2em;"
                >Contact Information</div>
                <v-row>
                  <v-col cols="12" sm="6" md="3"><InputField label="Cell Number" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="2"><InputField label="Ext" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Home Number" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="2"><InputField label="Ext" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="2"><InputField label="Fax" type="text"/></v-col>
                </v-row>
              </div>
            </v-tabs-window-item>

            <!-- Company Tab -->
            <v-tabs-window-item value="company">
              <!-- Address Section -->
              <div class="pt-4">
                <div
                  class="text-caption font-weight-black text-uppercase mb-6 text-ac_blue_text"
                  style="letter-spacing: 0.2em;"
                >Address Information</div>
                <v-row>
                  <v-col cols="12" sm="6" md="3"><InputField label="Company Name" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Address 1" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Address 2" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="City" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3">
                    <SelectField label="State" :options="[{value:'ca',label:'CA'},{value:'ny',label:'NY'},{value:'tx',label:'TX'}]"/>
                  </v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Zip Code" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="County" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Country" type="text"/></v-col>
                </v-row>
              </div>

              <!-- Company Contact -->
              <div
                class="pt-4 mt-2 border-t-sm border-custom-blue"
              >
                <div
                  class="text-caption font-weight-black text-uppercase mb-6 text-ac_blue_text"
                  style="letter-spacing: 0.2em;"
                >Company Contact Information</div>
                <div class="d-flex ga-6">
                  <InputField label="Office Number" type="text"/>
                  <InputField label="Fax" type="text"/>
                </div>
              </div>

              <!-- Add Contact Section (conditional) -->
              <div
                v-if="isAddContact"
                class="pt-4 mt-2 border-t-sm border-debtor_modal_section_border"
              >
                <div
                  class="text-caption font-weight-black text-uppercase mb-6 text-ac_blue_text"
                  style="letter-spacing: 0.2em;"
                >Contact Information</div>
                <v-row align="end">
                  <v-col cols="12" sm="6" md="3"><InputField label="First Name" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Last Name" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Contact Title" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3">
                    <div class="d-flex flex-column ga-2">
                      <label
                        class="text-body-2 text-dh_label"
                        style="letter-spacing: 0.08em;"
                      >Is Personal Guarantor</label>
                      <v-checkbox
                        v-model="isPersonalGuarantor"
                        hide-details
                        color="blue"
                        density="compact"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="3"><InputField label="Phone Number" type="tel"/></v-col>
                  <v-col cols="auto" class="d-flex align-end">
                    <v-btn
                      color="teal"
                      class="font-weight-black rounded-xl mb-1"
                      elevation="0"
                      size="small"
                    >+</v-btn>
                  </v-col>
                </v-row>

                <!-- Personal Guarantor fields -->
                <v-row v-if="isPersonalGuarantor" align="end" class="mt-2">
                  <v-col cols="12" sm="6" md="3"><InputField label="SSN" type="text"/></v-col>
                  <v-col cols="12" sm="6" md="3"><DateField label="DOB"/></v-col>
                  <v-col cols="12" sm="6" md="3">
                    <div class="d-flex flex-column ga-2">
                      <label
                        class="text-body-2 text-dh_label"
                        style="letter-spacing: 0.1em;"
                      >Deceased</label>
                      <DateField label=""/>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="3" />
                  <v-col cols="12" sm="6" md="3"><InputField label="Address" type="text"/></v-col>
                  <v-col cols="auto" class="d-flex align-end">
                    <v-btn
                      color="teal"
                      class="font-weight-black rounded-xl mb-1"
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
            class="d-flex justify-end ga-3 mt-8 pt-6 border-t-sm border-custom-blue"
          >
            <v-btn
              class="font-weight-black text-uppercase rounded-xl bg-debtor_modal_cancel_bg text-debtor_modal_cancel_text hover:bg-debtor_modal_cancel_hover"
              style="letter-spacing: 0.12em; font-size: 11px;"
              variant="flat"
              elevation="0"
              @click="isDebtorModalOpen = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="teal-darken-1"
              class="font-weight-black text-uppercase rounded-xl"
              style="letter-spacing: 0.12em; font-size: 11px;"
              elevation="0"
              @click="handleContact"
            >
              {{ isAddContact ? 'Remove Contact' : 'Add Contact' }}
            </v-btn>
            <v-btn
              color="blue-darken-1"
              class="font-weight-black text-uppercase rounded-xl"
              style="letter-spacing: 0.12em; font-size: 11px;"
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


const isDebtorModalOpen = ref(false);
const isAddContact = ref(false);
const isPersonalGuarantor = ref(false);
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
.border-custom-blue {
  border-color: rgba(59, 130, 246, 0.5);
}

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