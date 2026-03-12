<template>
  <v-app :theme="theme">
    <Sidebar :active-tab="activeNav" @update:active-tab="activeNav = $event" @toggle-theme="toggleTheme" />

    <v-main class="pa-8">
      <v-container fluid>

        <v-card flat rounded="xl" class="pa-8 mb-8 border"
          :class="theme === 'dark' ? 'bg-grey-darken-4' : 'bg-grey-lighten-4 elevation-2'">
          <div class="d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-avatar color="blue-lighten-5" rounded="lg" class="mr-4">
                <FilterIcon :size="20" class="text-blue" />
              </v-avatar>
              <h3 class="text-h5 font-weight-black text-uppercase tracking-tight">
                Filter Accounts
              </h3>
            </div>

            <v-dialog v-model="isFiltersModalOpen" max-width="800">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" color="blue-darken-1" size="large" rounded="lg" class="font-weight-black"
                  prepend-icon="mdi-tune-variant">
                  <template v-slot:prepend>
                    <SlidersHorizontal :size="18" class="mr-2" />
                  </template>
                  Advanced Filters
                </v-btn>
              </template>

              <v-card rounded="xl">
                <FilterComponent :theme="theme" @close="isFiltersModalOpen = false" />
              </v-card>
            </v-dialog>
          </div>
        </v-card>

        <v-card flat rounded="xl" class="pa-10 mb-8 border"
          :class="theme === 'dark' ? 'bg-grey-darken-4' : 'bg-white elevation-4'">
          <div class="d-flex align-center justify-space-between mb-8">
            <div class="d-flex align-center">
              <v-avatar color="blue-lighten-5" rounded="lg" class="mr-4" size="56">
                <Layers :size="24" class="text-blue" />
              </v-avatar>
              <div>
                <h3 class="text-h5 font-weight-black text-uppercase">Bulk Account Updates</h3>
                <span class="text-caption font-weight-bold text-grey text-uppercase">
                  Changes apply to all matching accounts
                </span>
              </div>
            </div>
            <v-btn color="blue-darken-1" size="x-large" rounded="xl" class="px-8 font-weight-black" elevation="6">
              <template v-slot:prepend>
                <PlayCircle :size="18" class="mr-2" />
              </template>
              Execute Update
            </v-btn>
          </div>

          <v-row>
            <v-col cols="12" lg="4">
              <h4 class="text-overline text-blue font-weight-black d-flex align-center mb-4">
                <Zap :size="14" class="mr-2" /> Execution Scope
              </h4>
              <v-row dense>
                <v-col cols="6">
                  <v-select label="Quantity" :items="['All', 'Number', 'Percentage']" variant="outlined"
                    density="comfortable" rounded="lg" />
                </v-col>
                <v-col cols="6">
                  <v-text-field label="Value" placeholder="0" variant="outlined" density="comfortable" rounded="lg" />
                </v-col>
              </v-row>
              <v-select label="Set Account Status" :items="[]" variant="outlined" density="comfortable" rounded="lg"
                class="mt-2" />
              <v-textarea label="Account Notes" placeholder="Append note..." variant="outlined" rows="3" rounded="lg"
                class="mt-2" />

              <div class="mt-4">
                <v-row v-for="type in ['Principal', 'Interest', 'Costs']" :key="type" align="center" dense>
                  <v-col cols="3"><span class="text-body-2 font-weight-bold text-blue">{{ type }}</span></v-col>
                  <v-col cols="3"><v-text-field placeholder="0.00" density="compact" variant="underlined" /></v-col>
                  <v-col cols="3"><v-text-field placeholder="0.00" density="compact" variant="underlined" /></v-col>
                  <v-col cols="3"><v-text-field placeholder="0.00" density="compact" variant="underlined" /></v-col>
                </v-row>
              </div>
            </v-col>

            <v-col cols="12" lg="4">
              <h4 class="text-overline text-blue font-weight-black d-flex align-center mb-4">
                <UserPlus :size="14" class="mr-2" /> Assignments
              </h4>
              <v-select label="Assign to Collector" :items="[]" variant="outlined" density="comfortable" rounded="lg" />
              <v-select label="Assign to Queue" :items="[]" variant="outlined" density="comfortable" rounded="lg" />
              <v-row dense>
                <v-col cols="6"><v-text-field label="Account Age" variant="outlined" density="comfortable"
                    rounded="lg" /></v-col>
                <v-col cols="6"><v-text-field label="Next Work" type="date" variant="outlined" density="comfortable"
                    rounded="lg" /></v-col>
              </v-row>
              <v-checkbox label="Clear Next Work Dates" color="blue" density="compact" />
            </v-col>

            <v-col cols="12" lg="4">
              <h4 class="text-overline text-blue font-weight-black d-flex align-center mb-4">
                <ClipboardList :size="14" class="mr-2" /> Workflow & Compliance
              </h4>
              <v-row dense>
                <v-col cols="6"><v-select label="Generate" :items="[]" variant="outlined" density="comfortable"
                    rounded="lg" /></v-col>
                <v-col cols="6"><v-select label="File Type" :items="[]" variant="outlined" density="comfortable"
                    rounded="lg" /></v-col>
              </v-row>
              <v-select label="Action Codes" :items="[]" variant="outlined" density="comfortable" rounded="lg" />
              <v-select label="Credit Bureau Reporting" :items="[]" variant="outlined" density="comfortable"
                rounded="lg" />
            </v-col>
          </v-row>
        </v-card>

        <v-card flat rounded="xl" class="border"
          :class="theme === 'dark' ? 'bg-grey-darken-4' : 'bg-white elevation-4'">
          <v-data-table :headers="headers" :items="accounts" :theme="theme" class="bg-transparent">
            <template v-slot:item.claimStatus="{ value }">
              <v-chip :color="getStatusColor(value)" size="small" class="font-weight-black text-uppercase">
                {{ value }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import {
  Layers, Filter as FilterIcon, PlayCircle, ClipboardList,
  UserPlus, Zap, SlidersHorizontal
} from 'lucide-vue-next';

// Components
import Sidebar from '../components/shared/Sidebar.vue';
import FilterComponent from '../components/shared/FilterComponent.vue';


const activeNav = ref('crm');
const theme = ref('dark');
const isFiltersModalOpen = ref(false);

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
};

const headers = [
  { title: 'Next Work Date', key: 'nextWorkDate' },
  { title: 'Account #', key: 'accountNumber' },
  { title: 'Debtor Name', key: 'debtorName' },
  { title: 'Client Name', key: 'clientName' },
  { title: 'Collector', key: 'collector' },
  { title: 'Claim Status', key: 'claimStatus' },
  { title: 'Legal Standing', key: 'legalStanding' },
  { title: 'Balance Due', key: 'balanceDue' },
  { title: 'Originated Date', key: 'originatedDate' },
];

const accounts = ref([
  {
    id: 'ACC-001',
    nextWorkDate: '03/01/2026',
    accountNumber: 'AN-10042',
    debtorName: 'John Martinez',
    clientName: 'Allied Health',
    collector: 'Sarah K.',
    claimStatus: 'Active',
    legalStanding: 'Current',
    balanceDue: '$1,250.00',
    originatedDate: '01/15/2025',
  },
  {
    id: 'ACC-002',
    nextWorkDate: '03/05/2026',
    accountNumber: 'AN-10078',
    debtorName: 'Linda Chen',
    clientName: 'Riverside Medical',
    collector: 'Tom B.',
    claimStatus: 'Overdue',
    legalStanding: 'Delinquent',
    balanceDue: '$3,800.00',
    originatedDate: '06/10/2024',
  },
]);

const getStatusColor = (status) => {
  if (status === 'Active') return 'success';
  if (status === 'Overdue') return 'error';
  return 'warning';
};
</script>

<style scoped>
.tracking-tight {
  letter-spacing: -0.05em;
}
</style>