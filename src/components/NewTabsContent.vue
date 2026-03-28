<template>
  <div class="new-tabs-content d-flex flex-column">

    <!-- Tab Bar -->
    <div class="mb-6 position-relative new-tabs-content__tab-bar">
      <div
        class="tabs-shell d-flex align-center ga-2 overflow-visible"
        :class="{ 'tabs-shell--light': light }"
      >
        <div
          v-for="(tab, tabIndex) in tabs"
          :key="tab.id"
          class="position-relative"
          @mouseenter="handleMouseEnter(tab.id)"
          @mouseleave="handleMouseLeave"
        >
          <!-- Tab Trigger -->
          <button
            type="button"
            class="tab-trigger d-flex align-center ga-2 px-6 py-3 font-weight-medium text-uppercase"
            :class="[
              { 'tab-trigger--active': activeTab === tab.id },
              tabTriggerClass(tab.id, tabIndex),
            ]"
            @click="activeTab = tab.id"
          >
            <component
              :is="tab.icon"
              :size="18"
              :stroke-width="light && activeTab !== tab.id ? 1.75 : 2"
            />
            <span>{{ tab.label }}</span>
          </button>

          <!-- Dropdown -->
          <div
            v-if="hoveredTab === tab.id && submenus[tab.id]?.length"
            class="tab-dropdown position-absolute overflow-hidden z-dropdown tab-dropdown-anim"
            @mouseenter="handleMouseEnter(tab.id)"
            @mouseleave="handleMouseLeave"
          >
            <button
              v-for="(item, idx) in submenus[tab.id]"
              :key="item"
              type="button"
              class="tab-dropdown-item d-block w-100 text-left px-5 py-3 text-body-2 font-weight-bold text-uppercase border-0 cursor-pointer w-100"
              :class="{
                'tab-dropdown-item--active': activeCategory === item,
                'tab-dropdown-item--divided': idx > 0,
              }"
              @click="activeCategory = item"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-grow-1 d-flex position-relative min-height-0">
      <div
        v-for="tab in tabs"
        v-show="activeTab === tab.id"
        :key="tab.id"
        class="content-panel flex-grow-1 d-flex"
        :class="{ 'content-panel--light': light }"
      >
        <div class="pa-8 w-100">
          <!-- Content Header -->
          <div class="d-flex align-center ga-4 mb-6">
            <div
              class="d-flex align-center justify-center flex-shrink-0 rounded-lg content-header-icon content-header-icon-size"
              :class="{ 'content-header-icon--light': light }"
            >
              <LayoutGrid
                :size="20"
                :color="themeColors.newtabscontent_header_icon_lucide"
              />
            </div>
            <h2 class="font-weight-bold text-uppercase mb-0 content-header-title">
              {{ tab.label }}<span v-if="tab.id === 'details'"> / {{ activeCategory }}</span>
            </h2>
          </div>

          <!-- Tab: Details -->
          <template v-if="tab.id === 'details'">
            <NewContactMenu v-if="activeCategory === 'Contact Info'" :theme="themeMode" />
            <NewSkipTracing v-else-if="activeCategory === 'Skip Tracing'" :theme="themeMode" />
            <NewExperianReports v-else-if="activeCategory === 'experian reports'" :theme="themeMode" />
            <div
              v-else
              class="d-flex flex-column align-center justify-center py-20 opacity-muted developing-pulse"
            >
              <div
                class="rounded-circle d-flex align-center justify-center mb-4 content-fallback-icon content-fallback-icon-size"
              >
                <Activity
                  :size="32"
                  :color="themeColors.newtabscontent_fallback_activity"
                />
              </div>
              <p class="text-caption font-weight-black text-uppercase ls-widest content-fallback-caption">
                Developing specialized workflow for {{ activeCategory }}...
              </p>
            </div>
          </template>

          <!-- Tab: Doc Folder -->
          <template v-else-if="tab.id === 'folder'">
            <div class="animate-fade">
              <Documents :theme="themeMode" />
            </div>
          </template>

          <!-- Tab: Judgment -->
          <template v-else-if="tab.id === 'judgment'">
            <NewJudgment :theme="themeMode" />
          </template>

          <!-- Tab: Legal Details -->
          <template v-else-if="tab.id === 'legal'">
            <NewLegalDetails :theme="themeMode" />
          </template>

          <!-- Tab: Allocations -->
          <template v-else-if="tab.id === 'allocations'">
            <div class="animate-fade">
              <TransactionAllocations :theme="themeMode" />
              <div class="d-flex justify-end pt-8">
                <v-btn
                  color="blue-darken-1"
                  class="font-weight-medium rounded-xl text-body-2 newtabscontent-save-btn"
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
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';
import { FileText, Folder, Scale, Percent, LayoutGrid, Activity, Save } from 'lucide-vue-next';
import NewContactMenu from './NewContactMenu.vue';
import NewSkipTracing from './NewSkipTracing.vue';
import NewExperianReports from './NewExperianReports.vue';
import NewJudgment from './NewJudgment.vue';
import NewLegalDetails from './NewLegalDetails.vue';
import Documents from './Documents.vue';
import TransactionAllocations from './TransactionAllocations.vue';

defineProps({
  activeCreditor: {
    type: String,
    default: '',
  },
});

const vuetifyTheme = useTheme();
const themeColors = computed(() => vuetifyTheme.current.value.colors);
const light = computed(() => !vuetifyTheme.global.current.value.dark);
const themeMode = computed(() => (vuetifyTheme.global.current.value.dark ? 'dark' : 'light'));

const shellBg = computed(() => themeColors.value.newtabscontent_tabbar_bg);
const shellBorder = computed(() => `1px solid ${themeColors.value.newtabscontent_tabbar_border}`);
const shellShadow = computed(() => themeColors.value.newtabscontent_tabbar_box_shadow);
const activeTabShadow = computed(() => themeColors.value.newtabscontent_active_tab_box_shadow);
const inactiveTabFg = computed(() => themeColors.value.newtabscontent_inactive_tab_fg);
const activeTabBg = computed(() => themeColors.value.newtabscontent_active_tab_bg);
const activeTabFg = computed(() => themeColors.value.newtabscontent_active_tab_fg);
const contentBg = computed(() => themeColors.value.newtabscontent_content_bg);
const contentBorder = computed(() => `1px solid ${themeColors.value.newtabscontent_content_border}`);
const contentShadow = computed(() => themeColors.value.newtabscontent_content_box_shadow);
const dropdownBg = computed(() => themeColors.value.newtabscontent_dropdown_bg);
const dropdownBorder = computed(() => `1px solid ${themeColors.value.newtabscontent_dropdown_border}`);
const dropdownShadow = computed(() => themeColors.value.newtabscontent_dropdown_shadow);
const dropdownDivider = computed(() => themeColors.value.newtabscontent_dropdown_divider);
const dropdownItemColor = computed(() => themeColors.value.newtabscontent_dropdown_color);
const dropdownActiveBg = computed(() => themeColors.value.newtabscontent_dropdown_active_bg);
const dropdownActiveFg = computed(() => themeColors.value.newtabscontent_dropdown_active_fg);
const headerIconTileBg = computed(() => themeColors.value.newtabscontent_header_icon_tile);
const titleColor = computed(() => themeColors.value.newtabscontent_title);
const fallbackIconBg = computed(() => themeColors.value.newtabscontent_fallback_icon_bg);
const fallbackCaptionColor = computed(() => themeColors.value.newtabscontent_fallback_caption);
const saveBtnShadow = computed(() => themeColors.value.newtabscontent_save_btn_box_shadow);
const tabHoverBg = computed(() => themeColors.value.newtabscontent_tab_hover_bg);
const dropdownItemHoverBg = computed(() => themeColors.value.newtabscontent_dropdown_item_hover_bg);

const tabs = [
  { id: 'details', label: 'Account Details', icon: FileText },
  { id: 'folder', label: 'Doc Folder', icon: Folder },
  { id: 'judgment', label: 'Judgment', icon: Scale },
  { id: 'legal', label: 'Legal Details', icon: FileText },
  { id: 'allocations', label: 'Transactions Allocations', icon: Percent },
];

const submenus = {
  details: ['Contact Info', 'Skip Tracing', 'experian reports'],
  folder: ['Uploaded Files', 'Generated Docs', 'Templates', 'Archives'],
  judgment: [],
  legal: [],
  allocations: [],
};

const activeTab = ref('details');
const activeCategory = ref('Contact Info');
const hoveredTab = ref(null);
let hoverTimeout = null;

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

function tabTriggerClass(tabId, tabIndex) {
  if (!light.value) return {};
  if (activeTab.value !== tabId || tabIndex !== 0) return {};
  return { 'tab-trigger--light-active-first': true };
}
</script>

<style scoped>
.new-tabs-content {
  min-height: 600px;
  width: 100%;
}

.new-tabs-content__tab-bar {
  z-index: 40;
}

.z-dropdown {
  z-index: 50;
}

.min-height-0 {
  min-height: 0;
}

.content-header-icon-size {
  width: 40px;
  height: 40px;
}

.content-fallback-icon-size {
  width: 64px;
  height: 64px;
}

.ls-widest {
  letter-spacing: 0.15em;
}

.opacity-muted {
  opacity: 0.4;
}

.tabs-shell {
  border-radius: 16px;
  padding: 6px;
  backdrop-filter: blur(12px);
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  background: v-bind(shellBg);
  border: v-bind(shellBorder);
  box-shadow: v-bind(shellShadow);
}

.tabs-shell.tabs-shell--light {
  padding: 5px 6px 5px 6px;
}

.tab-trigger {
  font-size: 11px;
  letter-spacing: 0.15em;
  white-space: nowrap;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 10px;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;
  color: v-bind(inactiveTabFg);
}

.tab-trigger--active {
  background: v-bind(activeTabBg);
  color: v-bind(activeTabFg);
  box-shadow: v-bind(activeTabShadow);
}

.tab-trigger:not(.tab-trigger--active):hover {
  background: v-bind(tabHoverBg);
}

.tab-trigger--active:hover {
  filter: brightness(1.06);
}

.tab-trigger--light-active-first {
  margin-left: 0;
  border-radius: 10px;
}

.tab-dropdown {
  top: 100%;
  left: 0;
  min-width: max-content;
  border-radius: 16px;
  background: v-bind(dropdownBg);
  border: v-bind(dropdownBorder);
  box-shadow: v-bind(dropdownShadow);
}

.tab-dropdown-anim {
  animation: fadeInDown 0.2s ease-out;
  pointer-events: auto;
}

.tab-dropdown-item {
  letter-spacing: 0.08em;
  white-space: nowrap;
  color: v-bind(dropdownItemColor);
  background: transparent;
  -webkit-appearance: none;
  appearance: none;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.tab-dropdown-item:not(.tab-dropdown-item--active):hover {
  background: v-bind(dropdownItemHoverBg);
}

.tab-dropdown-item--divided {
  border-top: 1px solid v-bind(dropdownDivider);
}

.tab-dropdown-item--active {
  background: v-bind(dropdownActiveBg);
  color: v-bind(dropdownActiveFg);
}

.tab-dropdown-item--active:hover {
  filter: brightness(1.06);
}

.content-panel {
  overflow-y: auto;
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);
  border-radius: 24px;
  background: v-bind(contentBg);
  border: v-bind(contentBorder);
  box-shadow: v-bind(contentShadow);
}

.content-panel--light {
  border-radius: 28px;
}

.content-header-icon {
  background: v-bind(headerIconTileBg);
}

.content-header-icon--light {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);
}

.content-header-title {
  font-size: 16px;
  line-height: 1.3;
  letter-spacing: 0.055em;
  color: v-bind(titleColor);
}

.content-fallback-icon {
  background: v-bind(fallbackIconBg);
}

.content-fallback-caption {
  color: v-bind(fallbackCaptionColor);
}

.developing-pulse {
  animation: pulse 2s ease infinite;
}

.newtabscontent-save-btn {
  font-size: 13px;
  box-shadow: v-bind(saveBtnShadow);
}

.animate-fade {
  animation: fadeSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
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

@keyframes pulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.2;
  }
}
</style>
