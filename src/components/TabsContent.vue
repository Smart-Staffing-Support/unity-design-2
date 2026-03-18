<template>
  <div class="d-flex flex-column w-100" style="min-height: 600px; flex: 1;">

    <!-- Tab Content -->
    <div class="d-flex position-relative" style="flex: 1; min-height: 0;">
      <div class="d-flex w-100" style="flex: 1;">
        
            
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
             <template #tab-details="{ theme, activeCategory }">
                <ContactInfoMenu v-if="activeCategory === 'Contact Info'"  :theme="theme" />
                <SkipTracing v-else-if="activeCategory === 'Skip Tracing'" :theme="theme" />
                <Dispute v-else-if="activeCategory === 'Dispute'" :theme="theme" />
                <ExperianReports v-else-if="activeCategory === 'Experian Reports'" :theme="theme" />
                <Settlement v-else-if="activeCategory === 'Settlement'"   :theme="theme" />
             </template>
            

            <!-- Financials Tab -->
            <template #tab-financials="{ theme }">
              <Financials :theme="theme" />
            </template>

            <!-- Plan Tab -->
            <template #tab-plan="{ theme }">
              <Plan :theme="theme" />
            </template>

            <!-- Folder Tab -->
            <template #tab-folder="{ theme }">
              <div class="d-flex flex-column ga-8">
                <Documents :theme="theme" />
              </div>
            </template>

            <!-- Judgment Tab -->
            <template #tab-judgment="{ theme }">
              <Judgment :theme="theme" />
            </template>

            <!-- Legal Tab -->
            <template #tab-legal="{ theme }">
              <LegalDetails :theme="theme" />
            </template>

            <!-- Allocations Tab -->
            <template #tab-allocations="{ theme }">
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
            <template #tab-reminders="{ theme }">
              <div class="d-flex flex-column ga-8">
                <RemindersFeed :theme="theme" />
              </div>
            </template>

            <!-- Audit Logs Tab -->
            <template #tab-logs="{ theme }">
              <div class="d-flex flex-column ga-8">
                <AuditLogs :theme="theme" />
              </div>
            </template>
            </Tabs>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  FileText, CreditCard, Calendar, Folder, ClipboardList,
  Activity, Scale, Percent, Save,
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
import Tabs from './Tabs.vue'

const props = defineProps({
  theme: { type: String, default: 'light' },
  activeCreditor: { type: String, default: 'creditor 1' },
})



const activeTab = ref('details')
const activeCategory = ref('Contact Info')

const tabs = [
  {
    id: 'details',
    label: 'Account Details',
    icon: FileText,
    submenu: ['Contact Info', 'Skip Tracing', 'Dispute', 'Experian Reports', 'Settlement'],
  },
  { id: 'financials',  label: 'Financials',               icon: CreditCard   },
  { id: 'plan',        label: 'Payment Plan',             icon: Calendar     },
  {
    id: 'folder',
    label: 'Doc Folder',
    icon: Folder,
    submenu: ['Uploaded Files', 'Generated Docs', 'Templates', 'Archives'],
  },
  { id: 'judgment',    label: 'Judgment',                 icon: Scale        },
  { id: 'legal',       label: 'Legal Details',            icon: FileText     },
  { id: 'allocations', label: 'Transactions Allocations', icon: Percent      },
  { id: 'reminders',   label: 'Reminders',                icon: ClipboardList},
  { id: 'logs',        label: 'Audit Logs',               icon: Activity     },
]

const onTabChange = (tabId) => {
  activeTab.value = tabId
}

const onCategoryChange = (category) => {
  activeCategory.value = category
}
</script>

<style>
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
</style>
