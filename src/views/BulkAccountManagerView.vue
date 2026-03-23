<template>
  <div
    class="pa-8 pl-24 animate-fade"
    style="min-height: 100vh;"
    :style="theme === 'dark' ? 'background: #020617;' : 'background: white;'"
  >
    <Sidebar v-model:activeTab="activeTab" />

    <div class="d-flex flex-column ga-8" style="padding-left: 80px;">

      <!-- 1. FILTER SECTION -->
      <v-sheet class="pa-8" v-bind="sheetProps">
        <div class="d-flex justify-space-between align-center ga-3 flex-wrap">
          <div class="d-flex align-center ga-3">
            <div class="pa-2 rounded-xl" style="background: rgba(59,130,246,0.10);">
              <Filter :size="20" color="#3b82f6" />
            </div>
            <h3 class="text-h6 font-weight-black text-uppercase" :style="titleStyle">
              Filter Accounts
            </h3>
          </div>
          <v-btn v-bind="btnProps" @click="isFiltersModalOpen = true">
            <template #prepend><SlidersHorizontal :size="18" /></template>
            Advanced Filters
          </v-btn>
        </div>
      </v-sheet>

      <!-- 2. BULK ACTIONS SECTION -->
      <v-sheet class="pa-10" v-bind="sheetProps">

        <!-- Section Header -->
        <div class="d-flex align-center justify-space-between mb-10 ga-6 flex-wrap">
          <div class="d-flex align-center ga-4">
            <div class="pa-3 rounded-xl" style="background: rgba(37,99,235,0.10);">
              <Layers :size="24" color="#2563eb" />
            </div>
            <div>
              <h3 class="text-h6 font-weight-black text-uppercase" :style="titleStyle">
                Bulk Account Updates
              </h3>
              <p class="text-caption font-weight-bold text-uppercase text-medium-emphasis mt-1"
                style="letter-spacing: 0.12em;">
                Changes apply to all matching accounts
              </p>
            </div>
          </div>
          <v-btn v-bind="btnProps" size="large">
            <template #prepend><PlayCircle :size="18" /></template>
            Execute Update
          </v-btn>
        </div>

        <!-- Three-column grid -->
        <v-row>

          <!-- Column 1: Execution Scope -->
          <v-col cols="12" lg="4" class="d-flex flex-column ga-6">
            <h4 class="d-flex align-center ga-2 text-caption font-weight-black text-uppercase text-blue-lighten-1"
              style="letter-spacing: 0.2em;">
              <Zap :size="14" /> Execution Scope
            </h4>

            <div class="d-flex align-end ga-4">
              <SelectField
                label="Quantity"
                :options="[{label:'All',value:'all'},{label:'Number',value:'number'},{label:'Percentage',value:'percentage'}]"
                :theme="theme"
              />
              <InputField label="Quantity" placeholder="0" :theme="theme" />
            </div>

            <SelectField label="Set Account Status" :options="[]" :theme="theme" />

            <!-- Add/Remove + Account Notes -->
            <v-row align="start">
              <v-col cols="4">
                <SelectField label="Add/Remove" :options="addRemoveOpts" :theme="theme" />
              </v-col>
              <v-col cols="8" class="d-flex flex-column ga-2">
                <label class="text-body-2" :style="labelStyle">Account Notes</label>
                <textarea
                  class="note-textarea"
                  :class="theme === 'dark' ? 'note-textarea--dark' : 'note-textarea--light'"
                  placeholder="Append note to all selected..."
                />
              </v-col>
            </v-row>

            <!-- Fee grid via v-row/v-col -->
            <div>
              <v-row class="mb-1">
                <v-col cols="3" />
                <v-col v-for="h in feeHeaders" :key="h" cols="3"
                  class="text-caption font-weight-bold text-uppercase text-medium-emphasis"
                  style="letter-spacing: 0.08em;">
                  {{ h }}
                </v-col>
              </v-row>
              <v-row v-for="row in feeRows" :key="row.label" align="end" class="mb-1">
                <v-col cols="3" class="text-body-2 font-weight-medium pb-2" :style="labelStyle">
                  {{ row.label }}
                </v-col>
                <v-col v-for="n in 3" :key="n" cols="3">
                  <InputField label="" placeholder="0.00" :theme="theme" />
                </v-col>
              </v-row>
            </div>
          </v-col>

          <!-- Column 2: Assignments -->
          <v-col cols="12" lg="4" class="d-flex flex-column ga-6">
            <h4 class="d-flex align-center ga-2 text-caption font-weight-black text-uppercase text-blue-lighten-1"
              style="letter-spacing: 0.2em;">
              <UserPlus :size="14" /> Assignments
            </h4>
            <SelectField label="Assign to Collector" :options="[]" :theme="theme" />
            <SelectField label="Assign to Queue" :options="[]" :theme="theme" />
            <SelectField label="Assign to Client" :options="[]" :theme="theme" />
            <SelectField label="Assign to Referring" :options="[]" :theme="theme" />
            <SelectField label="Assign to Sales Rep" :options="[]" :theme="theme" />
            <v-row>
              <v-col cols="6"><InputField label="Account Age" placeholder="Days" :theme="theme" /></v-col>
              <v-col cols="6"><DateField  label="Next Work Date" :theme="theme" /></v-col>
            </v-row>
            <CheckboxField label="Clear Next Work Dates" :theme="theme" />
          </v-col>

          <!-- Column 3: Workflow & Compliance -->
          <v-col cols="12" lg="4" class="d-flex flex-column ga-6">
            <h4 class="d-flex align-center ga-2 text-caption font-weight-black text-uppercase text-blue-lighten-1"
              style="letter-spacing: 0.2em;">
              <ClipboardList :size="14" /> Workflow &amp; Compliance
            </h4>
            <v-row>
              <v-col cols="6"><SelectField label="Generate"  :options="[]" :theme="theme" /></v-col>
              <v-col cols="6"><SelectField label="File Type" :options="[]" :theme="theme" /></v-col>
            </v-row>
            <SelectField label="Email Notification" :options="[]" :theme="theme" />
            <SelectField label="Add Reminder"       :options="[]" :theme="theme" />
            <v-row>
              <v-col cols="5"><SelectField label="Add/Remove"   :options="addRemoveOpts" :theme="theme" /></v-col>
              <v-col cols="7"><SelectField label="Action Codes" :options="[]"            :theme="theme" /></v-col>
            </v-row>
            <SelectField label="Status Detail" :options="[]" :theme="theme" />
            <v-row>
              <v-col cols="5"><SelectField label="Add/Remove" :options="addRemoveOpts" :theme="theme" /></v-col>
              <v-col cols="7"><SelectField label="Flow Letter" :options="[]"           :theme="theme" /></v-col>
            </v-row>
            <SelectField label="Credit Bureau Reporting" :options="[]" :theme="theme" />
            <v-row>
              <v-col cols="6"><SelectField label="Set" :options="[]"        :theme="theme" /></v-col>
              <v-col cols="6"><InputField  label="To"  placeholder="..."    :theme="theme" /></v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-sheet>

      <!-- 3. FILTER RESULTS TABLE -->
      <DynamicTable
        :theme="theme"
        :data="accounts"
        :columns="columns"
        :expandable="false"
        title="Filter Results"
        row-key="id"
        @export="console.log('export')"
        @email-results="console.log('email')"
        @bulk-action="(rows) => console.log('bulk action on', rows)"
      >
        <template #icon>
          <ClipboardList :size="24" color="#22c55e" />
        </template>
      </DynamicTable>

    </div>

    <!-- FILTERS MODAL -->
    <v-dialog v-model="isFiltersModalOpen" max-width="800" :scrim-opacity="0.6">
      <FilterComponent :theme="theme" />
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  Layers, Filter, PlayCircle, ClipboardList,
  UserPlus, Zap, SlidersHorizontal,
} from 'lucide-vue-next';

import Sidebar from '../components/shared/Sidebar.vue';
import DateField from '../components/shared/DateField.vue';
import SelectField from '../components/shared/SelectField.vue';
import InputField from '../components/shared/InputField.vue';
import CheckboxField from '../components/shared/CheckboxField.vue';
import FilterComponent from '../components/shared/FilterComponent.vue';
import DynamicTable from '../components/shared/DynamicTable.vue';

const activeNav          = ref('crm');
const theme              = ref('dark');
const isFiltersModalOpen = ref(false);

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
}

// ── Shared computed helpers ───────────────────────────────────────────────────
const titleStyle = computed(() =>
  theme.value === 'dark'
    ? 'color: white; letter-spacing: -0.3px;'
    : 'color: #0f172a; letter-spacing: -0.3px;'
);

const labelStyle = computed(() =>
  theme.value === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;'
);

const sheetProps = computed(() => ({
  color: 'transparent',
  style: `border-radius: 35px !important; ${
    theme.value === 'dark'
      ? 'background: rgba(15,23,42,0.4) !important; border: 1px solid rgba(255,255,255,0.05);'
      : 'background: transparent !important; border: 1px solid #cbd5e1; box-shadow: 0 10px 30px rgba(30,41,59,0.15);'
  }`,
}));

const btnProps = {
  color: 'blue-darken-1',
  class: 'font-weight-black text-uppercase rounded-xl',
  style: 'letter-spacing: 0.15em; font-size: 11px; box-shadow: 0 8px 24px rgba(37,99,235,0.25);',
  elevation: '0',
};

// ── Static data ───────────────────────────────────────────────────────────────
const addRemoveOpts = [
  { label: 'Add',    value: 'add'    },
  { label: 'Remove', value: 'remove' },
];

const feeHeaders = ['Advanced %', 'Attorney %', 'Agency %'];

const feeRows = [
  { label: 'Principal'     },
  { label: 'Interest'      },
  { label: 'Costs'         },
  { label: 'Attorney Fees' },
  { label: 'Over Payment'  },
];

const accounts = ref([
  {
    id: 'ACC-001', nextWorkDate: '03/01/2026', accountNumber: 'AN-10042',
    debtorName: 'John Martinez', clientName: 'Allied Health', collector: 'Sarah K.',
    claimStatus: 'Active', legalStanding: 'Current', balanceDue: '$1,250.00', originatedDate: '01/15/2025',
  },
  {
    id: 'ACC-002', nextWorkDate: '03/05/2026', accountNumber: 'AN-10078',
    debtorName: 'Linda Chen', clientName: 'Riverside Medical', collector: 'Tom B.',
    claimStatus: 'Overdue', legalStanding: 'Delinquent', balanceDue: '$3,800.00', originatedDate: '06/10/2024',
  },
]);

const columns = [
  { key: 'nextWorkDate',   title: 'Next Work Date'  },
  { key: 'accountNumber',  title: 'Account #'        },
  { key: 'debtorName',     title: 'Debtor Name'      },
  { key: 'clientName',     title: 'Client Name'      },
  { key: 'collector',      title: 'Collector'        },
  { key: 'claimStatus',    title: 'Claim Status', type: 'status' },
  { key: 'legalStanding',  title: 'Legal Standing'   },
  { key: 'balanceDue',     title: 'Balance Due'      },
  { key: 'originatedDate', title: 'Originated Date'  },
];
</script>

<style scoped>
.animate-fade {
  animation: fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.note-textarea {
  width: 100%;
  height: 96px;
  padding: 12px 16px;
  border-radius: 16px;
  outline: none;
  resize: none;
  font-size: 13px;
  font-weight: 500;
  transition: border-color 0.2s ease;
}
.note-textarea--dark {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.10);
  color: white;
}
.note-textarea--dark::placeholder { color: rgba(255, 255, 255, 0.30); }
.note-textarea--dark:focus        { border-color: rgba(59, 130, 246, 0.5); }
.note-textarea--light {
  background: white;
  border: 1px solid #9ca3af;
  color: #334155;
}
.note-textarea--light::placeholder { color: #94a3b8; }
.note-textarea--light:focus        { border-color: rgba(37, 99, 235, 0.5); }
</style>