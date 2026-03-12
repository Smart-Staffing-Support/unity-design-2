<template>
  <div class="d-flex flex-column" style="min-height: 600px; width: 100%;">

    <!-- Tab Bar -->
    <div class="mb-6 position-relative" style="z-index: 40;">
      <div
        class="d-flex ga-2 pa-1 rounded-xl overflow-visible"
        style="backdrop-filter: blur(12px); transition: colors 0.3s ease;"
        :style="theme === 'dark'
          ? 'background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.10);'
          : 'background: transparent; border: 1px solid #cbd5e1; box-shadow: 0 10px 30px rgba(30,41,59,0.15);'"
      >
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="position-relative"
          @mouseenter="handleMouseEnter(tab.id)"
          @mouseleave="handleMouseLeave"
        >
          <!-- Tab Trigger -->
          <button
            class="d-flex align-center ga-2 px-6 py-3 rounded-xl font-weight-medium text-uppercase transition-all"
            style="font-size: 11px; letter-spacing: 0.15em; white-space: nowrap; border: none; cursor: pointer; outline: none;"
            :style="activeTab === tab.id
              ? 'background: #2563eb; color: white; box-shadow: 0 8px 24px rgba(37,99,235,0.3);'
              : theme === 'dark'
                ? 'background: transparent; color: #bfdbfe;'
                : 'background: transparent; color: #475569;'"
            @click="activeTab = tab.id"
          >
            <component :is="tab.icon" :size="18" />
            <span>{{ tab.label }}</span>
          </button>

          <!-- Dropdown -->
          <div
            v-if="hoveredTab === tab.id && submenus[tab.id]?.length"
            class="position-absolute"
            style="top: 100%; left: 0; min-width: max-content; border-radius: 16px; z-index: 50; overflow: hidden; animation: fadeInDown 0.2s ease-out; pointer-events: auto;"
            :style="theme === 'dark'
              ? 'background: rgba(15,23,42,0.98); border: 1px solid rgba(255,255,255,0.20); box-shadow: 0 24px 48px rgba(0,0,0,0.4);'
              : 'background: rgba(255,255,255,0.98); border: 1px solid #cbd5e1; box-shadow: 0 24px 48px rgba(0,0,0,0.12);'"
            @mouseenter="handleMouseEnter(tab.id)"
            @mouseleave="handleMouseLeave"
          >
            <button
              v-for="(item, idx) in submenus[tab.id]"
              :key="item"
              class="d-block w-100 text-left px-5 py-3 text-body-2 font-weight-bold text-uppercase transition-all"
              style="letter-spacing: 0.08em; white-space: nowrap; border: none; cursor: pointer; outline: none; width: 100%;"
              :style="[
                idx > 0 ? (theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.05);' : 'border-top: 1px solid #e2e8f0;') : '',
                activeCategory === item
                  ? 'background: #2563eb; color: white;'
                  : theme === 'dark'
                    ? 'background: transparent; color: rgba(255,255,255,0.80);'
                    : 'background: transparent; color: #334155;'
              ]"
              @click="activeCategory = item"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-grow-1 d-flex position-relative" style="min-height: 0;">
      <div
        v-for="tab in tabs"
        v-show="activeTab === tab.id"
        :key="tab.id"
        class="flex-grow-1 d-flex"
        style="overflow-y: auto; border-radius: 24px; transition: all 0.3s ease; backdrop-filter: blur(12px);"
        :style="theme === 'dark'
          ? 'background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.10);'
          : 'background: transparent; border: 1px solid #cbd5e1; box-shadow: 0 10px 30px rgba(30,41,59,0.15);'"
      >
        <div class="pa-8 w-100">
          <!-- Content Header -->
          <div class="d-flex align-center ga-3 mb-6">
            <div
              class="rounded-xl d-flex align-center justify-center"
              style="width: 40px; height: 40px; background: rgba(37,99,235,0.20);"
            >
              <LayoutGrid :size="20" color="#3b82f6" />
            </div>
            <h2
              class="text-h6 font-weight-bold text-uppercase"
              style="letter-spacing: -0.3px;"
              :style="theme === 'dark' ? 'color: white;' : 'color: #1e293b;'"
            >
              {{ tab.label }}<span v-if="tab.id === 'details'"> / {{ activeCategory }}</span>
            </h2>
          </div>

          <!-- Tab: Details -->
          <template v-if="tab.id === 'details'">
            <NewContactMenu   v-if="activeCategory === 'Contact Info'"     :theme="theme" />
            <NewSkipTracing   v-else-if="activeCategory === 'Skip Tracing'" :theme="theme" />
            <NewExperianReports v-else-if="activeCategory === 'experian reports'" :theme="theme" />
            <!-- Fallback -->
            <div
              v-else
              class="d-flex flex-column align-center justify-center py-20"
              style="opacity: 0.4; animation: pulse 2s ease infinite;"
            >
              <div
                class="rounded-circle d-flex align-center justify-center mb-4"
                style="width: 64px; height: 64px; background: rgba(255,255,255,0.10);"
              >
                <Activity :size="32" :color="theme === 'dark' ? 'white' : '#6b7280'" />
              </div>
              <p
                class="text-caption font-weight-black text-uppercase"
                style="letter-spacing: 0.15em;"
                :style="theme === 'dark' ? 'color: white;' : 'color: #334155;'"
              >
                Developing specialized workflow for {{ activeCategory }}...
              </p>
            </div>
          </template>

          <!-- Tab: Doc Folder -->
          <template v-else-if="tab.id === 'folder'">
            <div class="animate-fade">
              <Documents :theme="theme" />
            </div>
          </template>

          <!-- Tab: Judgment -->
          <template v-else-if="tab.id === 'judgment'">
            <NewJudgment :theme="theme" />
          </template>

          <!-- Tab: Legal Details -->
          <template v-else-if="tab.id === 'legal'">
            <NewLegalDetails :theme="theme" />
          </template>

          <!-- Tab: Allocations -->
          <template v-else-if="tab.id === 'allocations'">
            <div class="animate-fade">
              <TransactionAllocations :theme="theme" />
              <div class="d-flex justify-end pt-8">
                <v-btn
                  color="blue-darken-1"
                  class="font-weight-medium rounded-xl"
                  style="font-size: 13px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
                  elevation="0"
                  size="large"
                >
                  <template #prepend><Save :size="16" /></template>
                  Save changes
                </v-btn>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FileText, Folder, Scale, Percent, LayoutGrid, Activity, Save } from 'lucide-vue-next';
import NewContactMenu        from './NewContactMenu.vue';
import NewSkipTracing        from './NewSkipTracing.vue';
import NewExperianReports    from './NewExperianReports.vue';
import NewJudgment           from './NewJudgment.vue';
import NewLegalDetails       from './NewLegalDetails.vue';
import Documents             from './Documents.vue';
import TransactionAllocations from './TransactionAllocations.vue';

defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
  activeCreditor: {
    type: String,
    default: '',
  },
});

// ── Tabs definition ───────────────────────────────────────────────────────────
const tabs = [
  { id: 'details',     label: 'Account Details',          icon: FileText },
  { id: 'folder',      label: 'Doc Folder',               icon: Folder },
  { id: 'judgment',    label: 'Judgment',                 icon: Scale },
  { id: 'legal',       label: 'Legal Details',            icon: FileText },
  { id: 'allocations', label: 'Transactions Allocations', icon: Percent },
];

const submenus = {
  details:     ['Contact Info', 'Skip Tracing', 'experian reports'],
  folder:      ['Uploaded Files', 'Generated Docs', 'Templates', 'Archives'],
  judgment:    [],
  legal:       [],
  allocations: [],
};

// ── State ─────────────────────────────────────────────────────────────────────
const activeTab      = ref('details');
const activeCategory = ref('Contact Info');
const hoveredTab     = ref(null);
let hoverTimeout     = null;

// ── Hover handlers ────────────────────────────────────────────────────────────
function handleMouseEnter(tabId) {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }
  hoveredTab.value = tabId;
}

function handleMouseLeave() {
  hoverTimeout = setTimeout(() => {
    hoveredTab.value = null;
  }, 200);
}
</script>

<style scoped>
.animate-fade {
  animation: fadeSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.2; }
}
</style>