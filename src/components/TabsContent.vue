<template>
  <div class="d-flex flex-column w-100" style="min-height: 600px; flex: 1;">

    <!-- Tab Bar -->
    <div class="mb-6 position-relative" style="z-index: 40;">

      <div
        class="d-flex ga-2 pa-1 rounded-xl overflow-visible"
        style="backdrop-filter: blur(12px); border: 1px solid; transition: background 0.2s;"
        :style="isDark
          ? 'background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.1);'
          : 'background: transparent; border-color: #cbd5e1; box-shadow: 0 4px 16px rgba(15,23,42,0.15);'"
      >
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="position-relative"
          @mouseenter="handleMouseEnter(tab.id)"
          @mouseleave="handleMouseLeave"
        >
          <!-- Tab Trigger -->
          <v-btn
            :color="activeTab === tab.id ? 'blue-darken-1' : 'transparent'"
            :variant="activeTab === tab.id ? 'elevated' : 'text'"
            :class="['rounded-lg ga-2', activeTab !== tab.id ? (isDark ? 'text-blue-lighten-4' : 'text-grey-darken-1') : 'text-white']"
            style="white-space: nowrap;"
            @click="activeTab = tab.id"
          >
            <component :is="tab.icon" :size="18" />
            <span class="font-weight-medium text-uppercase" style="font-size: 0.7rem; letter-spacing: 0.1em;">{{ tab.label }}</span>
          </v-btn>

          <!-- Dropdown -->
          <div
            v-if="hoveredTab === tab.id && submenus[tab.id]?.length"
            class="position-absolute rounded-xl overflow-visible"
            style="top: 100%; left: 0; min-width: max-content; border: 1px solid; box-shadow: 0 20px 40px rgba(0,0,0,0.3); backdrop-filter: blur(12px); z-index: 50; animation: fadeInDown 0.2s ease-out; pointer-events: auto;"
            :style="isDark
              ? 'background: rgba(15,23,42,0.98); border-color: rgba(255,255,255,0.2);'
              : 'background: rgba(255,255,255,0.98); border-color: #cbd5e1;'"
            @mouseenter="handleMouseEnter(tab.id)"
            @mouseleave="handleMouseLeave"
          >
            <button
              v-for="(item, idx) in submenus[tab.id]"
              :key="item"
              class="d-block w-100 text-left font-weight-bold text-uppercase"
              style="padding: 12px 20px; font-size: 0.75rem; letter-spacing: 0.05em; white-space: nowrap; transition: background 0.15s, color 0.15s; border: none; cursor: pointer; width: 100%;"
              :style="[
                idx > 0 ? ('border-top: 1px solid ' + (isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0')) : '',
                activeCategory === item
                  ? 'background: #2563eb; color: #ffffff;'
                  : isDark
                    ? 'background: transparent; color: rgba(255,255,255,0.8);'
                    : 'background: transparent; color: #374151;'
              ]"
              @click="activeCategory = item"
              @mouseenter="e => { if (activeCategory !== item) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : '#eff6ff'; }"
              @mouseleave="e => { if (activeCategory !== item) e.currentTarget.style.background = 'transparent'; }"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="d-flex position-relative" style="flex: 1; min-height: 0;">
      <div class="d-flex w-100" style="flex: 1;">
        <div
          class="overflow-y-auto rounded-xl w-100"
          style="flex: 1; border: 1px solid; backdrop-filter: blur(12px); transition: all 0.3s;"
          :style="isDark
            ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.1);'
            : 'background: transparent; border-color: #cbd5e1; box-shadow: 0 4px 16px rgba(15,23,42,0.15);'"
        >
          <div class="pa-8">
            <!-- Content Header -->
            <div class="d-flex align-center ga-3 mb-6">
              <div
                class="rounded-lg d-flex align-center justify-center"
                style="width: 40px; height: 40px; background: rgba(37,99,235,0.2);"
              >
                <LayoutGrid v-if="activeTab === 'details'" :size="20" class="text-blue" />
                <FileSearch v-else-if="activeTab === 'financials'" :size="20" class="text-blue" />
                <History v-else :size="20" class="text-blue" />
              </div>
              <h2
                :class="['text-h6 font-weight-bold text-uppercase', isDark ? 'text-white' : 'text-grey-darken-3']"
                style="letter-spacing: 0.02em;"
              >
                {{ tabs.find(t => t.id === activeTab)?.label }} / {{ activeCategory }}
              </h2>
            </div>

            <!-- Details Tab -->
            <template v-if="activeTab === 'details'">
              <CategoryView :category="activeCategory" :theme="theme" :active-creditor="activeCreditor" />
            </template>

            <!-- Financials Tab -->
            <template v-else-if="activeTab === 'financials'">
              <Financials :theme="theme" />
            </template>

            <!-- Plan Tab -->
            <template v-else-if="activeTab === 'plan'">
              <Plan :theme="theme" />
            </template>

            <!-- Folder Tab -->
            <template v-else-if="activeTab === 'folder'">
              <div class="d-flex flex-column ga-8">
                <Documents :theme="theme" />
              </div>
            </template>

            <!-- Judgment Tab -->
            <template v-else-if="activeTab === 'judgment'">
              <Judgment :theme="theme" />
            </template>

            <!-- Legal Tab -->
            <template v-else-if="activeTab === 'legal'">
              <LegalDetails :theme="theme" />
            </template>

            <!-- Allocations Tab -->
            <template v-else-if="activeTab === 'allocations'">
              <div class="d-flex flex-column ga-8">
                <TransactionAllocations :theme="theme" />
                <div class="d-flex justify-end pt-8" style="border-top: 1px solid rgba(255,255,255,0.05)">
                  <v-btn color="blue-darken-1" variant="elevated" class="rounded-xl ga-2" size="large" style="box-shadow: 0 4px 16px rgba(37,99,235,0.3);">
                    <Save :size="18" class="mr-2" />
                    Save changes
                  </v-btn>
                </div>
              </div>
            </template>

            <!-- Reminders Tab -->
            <template v-else-if="activeTab === 'reminders'">
              <div class="d-flex flex-column ga-8">
                <RemindersFeed :theme="theme" />
              </div>
            </template>

            <!-- Audit Logs Tab -->
            <template v-else-if="activeTab === 'logs'">
              <div class="d-flex flex-column ga-8">
                <AuditLogs :theme="theme" />
              </div>
            </template>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import {
  FileText, CreditCard, Calendar, Folder, ClipboardList,
  Activity, LayoutGrid, FileSearch, History, Scale, Percent, Save,
} from 'lucide-vue-next'

import TransactionAllocations from './TransactionAllocations.vue'
import RemindersFeed from './RemindersFeed.vue'
import AuditLogs from './AuditLogs.vue'
import Documents from './Documents.vue'
import Settlement from './Settlement.vue'
import ExperianReports from './ExperianReports.vue'
import Dispute from './Dispute.vue'
import ContactInfoMenu from './ContactInfoMenu.vue'
import SkipTracing from './SkipTracing.vue'
import LegalDetails from './LegalDetails.vue'
import Judgment from './Judgment.vue'
import Plan from './Plan.vue'
import Financials from './Financials.vue'
import CategoryView from './shared/CategoryView.vue'

const props = defineProps({
  theme: { type: String, default: 'light' },
  activeCreditor: { type: String, default: 'creditor 1' },
})

const vuetifyTheme = useTheme()
const isDark = computed(() => vuetifyTheme.global.current.value.dark)

const activeTab = ref('details')
const activeCategory = ref('Contact Info')
const hoveredTab = ref(null)
const hoverTimeoutRef = ref(null)

const tabs = [
  { id: 'details',     label: 'Account Details',          icon: FileText     },
  { id: 'financials',  label: 'Financials',               icon: CreditCard   },
  { id: 'plan',        label: 'Payment Plan',             icon: Calendar     },
  { id: 'folder',      label: 'Doc Folder',               icon: Folder       },
  { id: 'judgment',    label: 'Judgment',                 icon: Scale        },
  { id: 'legal',       label: 'Legal Details',            icon: FileText     },
  { id: 'allocations', label: 'Transactions Allocations', icon: Percent      },
  { id: 'reminders',   label: 'Reminders',                icon: ClipboardList},
  { id: 'logs',        label: 'Audit Logs',               icon: Activity     },
]

const submenus = {
  details:     ['Contact Info', 'Skip Tracing', 'dispute', 'experian reports', 'settlement'],
  financials:  [],
  plan:        [],
  folder:      ['Uploaded Files', 'Generated Docs', 'Templates', 'Archives'],
  judgment:    [],
  legal:       [],
  allocations: [],
  reminders:   [],
  logs:        [],
}

const handleMouseEnter = (tabId) => {
  if (hoverTimeoutRef.value) {
    clearTimeout(hoverTimeoutRef.value)
    hoverTimeoutRef.value = null
  }
  hoveredTab.value = tabId
}

const handleMouseLeave = () => {
  hoverTimeoutRef.value = setTimeout(() => {
    hoveredTab.value = null
  }, 200)
}
</script>

<style>
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
</style>
