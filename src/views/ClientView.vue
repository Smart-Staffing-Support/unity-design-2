<template>
  <div class="pa-8 animate-fade custom-scrollbar bg-main_background" style="padding-left: 96px; min-height: 100vh;">
    <Sidebar :active-tab="activeNav" :theme="theme" @update:active-tab="activeNav = $event"
      @toggle-theme="toggleTheme" />

    <!-- Search & Filter Bar -->
    <div class="position-relative pa-6 mb-10 rounded-xl bg-client_header_bg border-sm text-client_header_border rounded-xl"
      style=" transition: all 0.5s ease;" :style="theme === 'dark'
        ? ''
        : 'box-shadow: 0 10px 30px rgba(30,41,59,0.15);'">
      <v-row align="end">
        <v-col cols="12" md="4" lg="auto" class="flex-grow-1">
          <SelectField label="Client Type" :options="[]" :theme="theme" />
        </v-col>
        <v-col cols="12" md="4" lg="auto" class="flex-grow-1">
          <SelectField label="Status" :options="[]" :theme="theme" />
        </v-col>
        <v-col cols="12" md="4" lg="auto" class="flex-grow-1">
          <SelectField label="Sales Rep" :options="[]" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="auto" class="flex-grow-1">
          <FromToDate label="Next Work" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="auto" class="flex-grow-1">
          <InputField label="Client Name" placeholder="Search name..." :theme="theme" />
        </v-col>
        <v-col cols="12" lg="auto">
          <div class="d-flex align-center ga-2">
            <v-btn color="blue-darken-1" class="font-weight-bold rounded-xl flex-grow-1" style="font-size: 13px;"
              elevation="0">
              <template #prepend>
                <Search :size="16" />
              </template>
              Search
            </v-btn>
            <v-btn color="teal-darken-2" class="font-weight-bold rounded-xl flex-grow-1" style="font-size: 13px;"
              elevation="0">
              <template #prepend>
                <Download :size="16" />
              </template>
              Export
            </v-btn>
            <!-- Advanced Filters floating button -->
            <v-btn color="cyan-darken-1" class="font-weight-bold rounded-xl position-absolute"
              style="font-size: 13px; top: -20px; right: 40px;" elevation="2">
              <template #prepend>
                <SlidersHorizontal :size="16" />
              </template>
              Advanced Filters
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- Primary Action Codes -->
    <PrimaryActionCodes class="mt-7 rounded-xl" />

    <!-- tabs section -->
    <Tabs
      :tabs="tabs"
      theme="dark"
      entity-title="Global Logistics Inc."
      entity-id="#640126480"
      :entity-status="{ label: 'Active', color: 'green' }"
      @tab-change="onTabChange"
      @category-change="onCategoryChange"
    >
      <template #tab-client="{ theme }">
        <ClientInfo :theme="theme" />
      </template>
      <template #tab-accounts="{ theme, activeCategory }">
        <AccountsModule :theme="theme" :category="activeCategory" />
      </template>
      <template #tab-documents="{ theme }">
        <Documents :theme="theme" />
      </template>
      <template #tab-accounting="{ theme }">
        <AccountingModule :theme="theme" />
      </template>
      <template #tab-reminders="{ theme }">
        <RemindersFeed :theme="theme" />
      </template>
      <template #tab-settings="{ theme }">
        <SettingsModule :theme="theme" />
      </template>
    </Tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  FileText, CreditCard, NotebookPen, Folder, ClipboardList,
  SlidersHorizontal, LayoutGrid, FileSearch, History,
  Search, Download,
} from 'lucide-vue-next';

import Sidebar from '../components/shared/Sidebar.vue';
import SelectField from '../components/shared/SelectField.vue';
import FromToDate from '../components/shared/FromToDate.vue';
import InputField from '../components/shared/InputField.vue';
import PrimaryActionCodes from '../components/shared/PrimaryActionCodes.vue';
import ClientInfo from '../components/ClientInfo.vue';
import AccountsModule from '../components/AccountsModule.vue';
import Documents from '../components/Documents.vue';
import AccountingModule from '../components/AccountingModule.vue';
import RemindersFeed from '../components/RemindersFeed.vue';
import SettingsModule from '../components/SettingsModule.vue';
import Tabs from '@/components/Tabs.vue';

// ── State ─────────────────────────────────────────────────────────────────────
const activeTab = ref('client');
const activeNav = ref('crm');
const theme = ref('dark');
const activeCategory = ref('Contact Info');
const hoveredTab = ref(null);
let hoverTimeout = null;

// ── Tabs definition ───────────────────────────────────────────────────────────
const tabs = [
  { id: 'client', label: 'Client Details', icon: FileText },
  { id: 'accounts', label: 'Accounts', icon: CreditCard },
  { id: 'documents', label: 'Documents', icon: Folder },
  { id: 'accounting', label: 'Accounting', icon: NotebookPen },
  { id: 'reminders', label: 'Reminders', icon: ClipboardList },
  { id: 'settings', label: 'Settings', icon: SlidersHorizontal },
];

const submenus = {
  client: [],
  accounts: [],
  documents: [],
  accounting: [],
  reminders: [],
  settings: [],
};

// ── Methods ───────────────────────────────────────────────────────────────────
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
}

function handleMouseEnter(tabId) {
  if (hoverTimeout) { clearTimeout(hoverTimeout); hoverTimeout = null; }
  hoveredTab.value = tabId;
}

function handleMouseLeave() {
  hoverTimeout = setTimeout(() => { hoveredTab.value = null; }, 200);
}
</script>

<style scoped>
.animate-fade {
  animation: fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-content {
  animation: fadeSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
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

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.20);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.30);
}
</style>