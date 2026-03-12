<template>
  <div class="pa-8 animate-fade custom-scrollbar" style="padding-left: 96px; min-height: 100vh;"
    :style="theme === 'dark' ? 'background: #020617; color: #f1f5f9;' : 'background: white; color: #0f172a;'">
    <Sidebar :active-tab="activeNav" :theme="theme" @update:active-tab="activeNav = $event"
      @toggle-theme="toggleTheme" />

    <!-- Search & Filter Bar -->
    <div class="position-relative pa-6 mb-10 rounded-xl"
      style="border-radius: 35px !important; transition: all 0.5s ease;" :style="theme === 'dark'
        ? 'background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.10);'
        : 'background: transparent; border: 1px solid #cbd5e1; box-shadow: 0 10px 30px rgba(30,41,59,0.15);'">
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
    <PrimaryActionCodes :theme="theme" class="mt-7 rounded-xl" />

    <div class="d-flex ga-8 mt-6">
      <div class="flex-grow-1 d-flex flex-column" style="min-height: 600px;">

        <!-- Tab Bar -->
        <div class="mb-6 position-relative" style="z-index: 40;">
          <div class="d-flex ga-2 pa-1 rounded-xl overflow-visible"
            style="backdrop-filter: blur(12px); transition: colors 0.3s ease;" :style="theme === 'dark'
              ? 'background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.10);'
              : 'background: transparent; border: 1px solid #cbd5e1; box-shadow: 0 10px 30px rgba(30,41,59,0.15);'">
            <div v-for="tab in tabs" :key="tab.id" class="position-relative" @mouseenter="handleMouseEnter(tab.id)"
              @mouseleave="handleMouseLeave">
              <!-- Tab Trigger -->
              <button class="d-flex align-center ga-2 px-6 py-3 rounded-xl font-weight-medium text-uppercase"
                style="font-size: 11px; letter-spacing: 0.15em; white-space: nowrap; border: none; cursor: pointer; outline: none; transition: all 0.2s ease;"
                :style="activeTab === tab.id
                  ? 'background: #2563eb; color: white; box-shadow: 0 8px 24px rgba(37,99,235,0.3);'
                  : theme === 'dark'
                    ? 'background: transparent; color: #bfdbfe;'
                    : 'background: transparent; color: #475569;'" @click="activeTab = tab.id">
                <component :is="tab.icon" :size="18" />
                <span>{{ tab.label }}</span>
              </button>

              <!-- Dropdown (for tabs with submenus) -->
              <div v-if="hoveredTab === tab.id && submenus[tab.id]?.length" class="position-absolute"
                style="top: 100%; left: 0; min-width: max-content; border-radius: 16px; z-index: 50; overflow: hidden; animation: fadeInDown 0.2s ease-out; pointer-events: auto;"
                :style="theme === 'dark'
                  ? 'background: rgba(15,23,42,0.98); border: 1px solid rgba(255,255,255,0.20); box-shadow: 0 24px 48px rgba(0,0,0,0.4);'
                  : 'background: rgba(255,255,255,0.98); border: 1px solid #cbd5e1; box-shadow: 0 24px 48px rgba(0,0,0,0.12);'"
                @mouseenter="handleMouseEnter(tab.id)" @mouseleave="handleMouseLeave">
                <button v-for="(item, idx) in submenus[tab.id]" :key="item"
                  class="d-block w-100 text-left px-5 py-3 text-body-2 font-weight-bold text-uppercase"
                  style="letter-spacing: 0.08em; white-space: nowrap; border: none; cursor: pointer; outline: none; width: 100%;"
                  :style="[
                    idx > 0 ? (theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.05);' : 'border-top: 1px solid #e2e8f0;') : '',
                    activeCategory === item
                      ? 'background: #2563eb; color: white;'
                      : theme === 'dark'
                        ? 'background: transparent; color: rgba(255,255,255,0.80);'
                        : 'background: transparent; color: #334155;'
                  ]" @click="activeCategory = item">{{ item }}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab Content Panels -->
        <div v-for="tab in tabs" v-show="activeTab === tab.id" :key="tab.id"
          class="flex-grow-1 rounded-xl transition-all"
          style="border-radius: 24px !important; overflow-y: auto; backdrop-filter: blur(12px);" :style="theme === 'dark'
            ? 'background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.10);'
            : 'background: transparent; border: 1px solid #cbd5e1; box-shadow: 0 10px 30px rgba(30,41,59,0.15);'">
          <div class="pa-8">
            <!-- Panel Header -->
            <div class="d-flex flex-column justify-start align-start ga-3 mb-6">
              <div class="d-flex align-center ga-2">
                <div class="rounded-xl d-flex align-center justify-center"
                  style="width: 40px; height: 40px; background: rgba(37,99,235,0.20);">
                  <component :is="tab.id === 'client' ? LayoutGrid : tab.id === 'accounts' ? FileSearch : History"
                    :size="20" color="#3b82f6" />
                </div>
                <h2 class="text-h6" style="letter-spacing: -0.3px;"
                  :style="theme === 'dark' ? 'color: white;' : 'color: #1e293b;'">{{ tab.label }}</h2>
              </div>

              <div class="d-flex flex-column ga-2 mt-6">
                <h2 class="text-h4 mr-10" style="letter-spacing: -0.5px;"
                  :style="theme === 'dark' ? 'color: white;' : 'color: #1e293b;'">Global Logistics Inc.</h2>
                <div class="d-flex flex-column ga-2">
                  <span class="text-h6 text-decoration-underline"
                    :style="theme === 'dark' ? 'color: white;' : 'color: #1e293b;'">#640126480</span>
                  <span class="text-body-1 text-center rounded-pill px-6 py-1 align-self-start" :style="theme === 'dark'
                    ? 'background: rgba(34,197,94,0.20); color: #22c55e;'
                    : 'background: rgba(34,197,94,0.20); color: #16a34a;'">Active</span>
                </div>
              </div>
            </div>

            <!-- Dynamic Tab Content -->
            <ClientInfo v-if="tab.id === 'client'" :theme="theme" />
            <AccountsModule v-else-if="tab.id === 'accounts'" :theme="theme" class="animate-content" />
            <Documents v-else-if="tab.id === 'documents'" :theme="theme" class="animate-content" />
            <AccountingModule v-else-if="tab.id === 'accounting'" :theme="theme" class="animate-content" />
            <RemindersFeed v-else-if="tab.id === 'reminders'" :theme="theme" class="animate-content" />
            <SettingsModule v-else-if="tab.id === 'settings'" :theme="theme" class="animate-content" />
          </div>
        </div>

      </div>
    </div>
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