<template>
  <div class="animate-fade client-info" :class="`client-info--${theme}`">
    <div class="d-flex ga-6">

      <!-- LEFT: Collapsible Drawer -->
      <div
        class="drawer-container d-flex flex-shrink-0 position-relative overflow-hidden"
        :class="[
          isDrawerOpen ? 'drawer-container--open' : 'drawer-container--closed',
          `drawer-skin--${drawerSkin}`,
        ]"
      >
        <!-- Toggle Handle -->
        <button
          class="drawer-handle position-absolute d-flex align-center justify-center transition-colors"
          @click="isDrawerOpen = !isDrawerOpen"
        >
          <component :is="isDrawerOpen ? ChevronLeft : ChevronRight" :size="18" />
        </button>

        <!-- Drawer Content -->
        <div
          class="w-100 d-flex flex-column overflow-hidden drawer-content"
        >
          <!-- Drawer Header -->
          <div
            class="pa-5 d-flex justify-space-between align-center drawer-header"
          >
            <span class="drawer-header-title text-body-2 font-weight-black text-uppercase">
              Search Results
            </span>
            <v-chip size="small" class="drawer-clients-chip font-weight-black">24 Clients</v-chip>
          </div>

          <!-- Drawer List -->
          <div class="flex-grow-1 pa-4 d-flex flex-column ga-2 drawer-list">
            <div
              v-for="i in 5"
              :key="i"
              class="drawer-item px-4 py-1 rounded-xl cursor-pointer transition-all"
              :class="{ 'drawer-item--selected': i === 1 }"
            >
              <p class="drawer-item-title text-body-2">Global Logistics Inc.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Client Dossier -->
      <div class="w-100" style="overflow-y: auto;">

        <!-- Header -->
        <div class="d-flex align-center ga-3 mb-8">
          <div class="pa-3 rounded-xl" style="background: rgba(37,99,235,0.10);">
            <UserPlus :size="24" color="#2563eb" />
          </div>
          <div>
            <h3
              class="text-h5"
              style="letter-spacing: -0.5px;"
              :style="theme === 'dark' ? 'color: white;' : 'color: #1f2937;'"
            >Client Profile</h3>
            <p
              class="text-caption font-weight-bold text-uppercase"
              style="letter-spacing: 0.15em;"
              :style="theme === 'dark' ? 'color: #64748b;' : 'color: #475569;'"
            >Complete client information &amp; configuration</p>
          </div>
        </div>

        <!-- SECTION 1: Firm Identity -->
        <v-sheet v-bind="sectionProps" class="pa-8 mb-8">
          <div class="d-flex align-center ga-3 mb-6">
            <div class="pa-2 rounded-xl" style="background: rgba(59,130,246,0.10);">
              <Briefcase :size="18" color="#2563eb" />
            </div>
            <h4 class="text-h6" style="letter-spacing: -0.3px;" :style="sectionTitleStyle">Firm Identity</h4>
          </div>
          <v-row>
            <v-col cols="12" md="4"><InputField label="Name" placeholder="e.g. Global Logistics Inc." :theme="theme" /></v-col>
            <v-col cols="12" md="4">
              <SelectField label="Business Type" :options="[{label:'Corporation',value:'corp'},{label:'LLC',value:'llc'},{label:'Partnership',value:'partnership'}]" :theme="theme" />
            </v-col>
            <v-col cols="12" md="4"><InputField label="Tax ID (Custom)" placeholder="XX-XXXXXXX" :theme="theme" /></v-col>
            <v-col cols="12" md="4"><InputField label="SSN (Custom)" placeholder="XX-XXX-XXXX" :theme="theme" /></v-col>
            <v-col cols="12" md="4"><CheckboxField label="Enable Convenience Fee" :theme="theme" /></v-col>
          </v-row>
        </v-sheet>

        <!-- SECTION 2: Corporate Address -->
        <v-sheet v-bind="sectionProps" class="pa-8 mb-8">
          <div class="d-flex align-center ga-3 mb-6">
            <div class="pa-2 rounded-xl" style="background: rgba(34,197,94,0.10);">
              <MapPin :size="18" color="#16a34a" />
            </div>
            <h4 class="text-h6" style="letter-spacing: -0.3px;" :style="sectionTitleStyle">Corporate Address</h4>
          </div>
          <v-row>
            <v-col cols="12" md="4"><InputField label="Address Line 1" placeholder="Street address" :theme="theme" /></v-col>
            <v-col cols="12" md="4"><InputField label="Address Line 2" placeholder="Suite, apartment, etc." :theme="theme" /></v-col>
            <v-col cols="12" md="4"><InputField label="City" :theme="theme" /></v-col>
            <v-col cols="12" md="4"><InputField label="State/Province" :theme="theme" /></v-col>
            <v-col cols="12" md="4"><InputField label="Zip/Postal Code" :theme="theme" /></v-col>
            <v-col cols="12" md="4"><InputField label="Country" :theme="theme" /></v-col>
            <v-col cols="12" md="4"><InputField label="Phone" placeholder="+1 (555) 000-0000" :theme="theme" /></v-col>
            <v-col cols="12" md="4"><InputField label="Fax" placeholder="+1 (555) 000-0000" :theme="theme" /></v-col>
          </v-row>
        </v-sheet>

        <!-- SECTION 3: Primary Contact -->
        <v-sheet v-bind="sectionProps" class="pa-8 mb-8">
          <div class="d-flex align-center justify-space-between mb-6">
            <div class="d-flex align-center ga-3">
              <div class="pa-2 rounded-xl" style="background: rgba(168,85,247,0.10);">
                <User :size="18" color="#9333ea" />
              </div>
              <h4 class="text-h6" style="letter-spacing: -0.3px;" :style="sectionTitleStyle">Primary Contact</h4>
            </div>
            <v-btn
              variant="tonal"
              color="blue"
              class="font-weight-black text-uppercase rounded-xl"
              style="letter-spacing: 0.12em; font-size: 11px;"
              size="small"
            >
              <template #prepend><Plus :size="14" /></template>
              Add Contact
            </v-btn>
          </div>
          <v-row>
            <v-col cols="12" md="6"><InputField label="First Name" :theme="theme" /></v-col>
            <v-col cols="12" md="6"><InputField label="Last Name" :theme="theme" /></v-col>
            <v-col cols="12" md="6">
              <SelectField label="Title/Position" :options="[{label:'CEO',value:'ceo'},{label:'CFO',value:'cfo'},{label:'Manager',value:'manager'}]" :theme="theme" />
            </v-col>
            <v-col cols="12" md="6">
              <SelectField label="Department (Custom)" :options="[{label:'Finance',value:'finance'},{label:'Operations',value:'ops'}]" :theme="theme" />
            </v-col>
            <v-col cols="12">
              <DynamicContactList label="Email Addresses" :icon="MailIcon" type="email" :theme="theme" />
            </v-col>
            <v-col cols="12">
              <DynamicContactList label="Phone Numbers" :icon="PhoneIcon" type="tel" :theme="theme" />
            </v-col>
          </v-row>
        </v-sheet>

        <!-- SECTION 4: Account Configuration -->
        <v-sheet v-bind="sectionProps" class="pa-8 mb-8">
          <div class="d-flex align-center ga-3 mb-6">
            <div class="pa-2 rounded-xl" style="background: rgba(59,130,246,0.10);">
              <LayoutGrid :size="18" color="#2563eb" />
            </div>
            <h4 class="text-h6" style="letter-spacing: -0.3px;" :style="sectionTitleStyle">Account Configuration</h4>
          </div>
          <v-row>
            <v-col cols="12" md="4">
              <SelectField label="Account Type" :options="[{label:'Standard',value:'standard'},{label:'Premium',value:'premium'}]" :theme="theme" />
            </v-col>
            <v-col cols="12" md="4">
              <SelectField label="Account Status" :options="[{label:'Active',value:'active'},{label:'Inactive',value:'inactive'}]" :theme="theme" />
            </v-col>
            <v-col cols="12" md="4">
              <SelectField label="Assigned Sales Rep" :options="[]" :theme="theme" />
            </v-col>
            <v-col cols="12" md="4"><InputField label="Account Age (Custom)" placeholder="0" :theme="theme" /></v-col>
            <v-col cols="12" md="4">
              <SelectField label="Collection Priority (Custom)" :options="[{label:'High',value:'high'},{label:'Medium',value:'medium'},{label:'Low',value:'low'}]" :theme="theme" />
            </v-col>
          </v-row>
        </v-sheet>

        <!-- SECTION 5: Notes & Communication -->
        <v-sheet v-bind="sectionProps" class="pa-8 mb-8">
          <div class="d-flex align-center ga-3 mb-6">
            <div class="pa-2 rounded-xl" style="background: rgba(245,158,11,0.10);">
              <MessageSquare :size="18" color="#d97706" />
            </div>
            <h4 class="text-h6" style="letter-spacing: -0.3px;" :style="sectionTitleStyle">Notes &amp; Communication</h4>
          </div>

          <!-- Note Entry -->
          <v-sheet
            class="pa-6 rounded-xl mb-6"
            color="transparent"
            style="border-width: 2px; border-style: solid; border-radius: 16px; transition: border-color 0.2s ease;"
            :style="theme === 'dark'
              ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.05);'
              : 'background: #f8fafc; border-color: #e2e8f0;'"
          >
            <textarea
              v-model="newNote"
              class="note-textarea"
              :class="theme === 'dark' ? 'note-textarea--dark' : 'note-textarea--light'"
              placeholder="Add a note to this client..."
            />
            <div class="d-flex justify-end mt-4">
              <v-btn
                color="blue-darken-1"
                class="font-weight-bold text-uppercase rounded-xl"
                style="letter-spacing: 0.12em; font-size: 11px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
                elevation="0"
                size="small"
              >
                <template #prepend><Send :size="14" /></template>
                Save Note
              </v-btn>
            </div>
          </v-sheet>

          <!-- Notes History -->
          <v-sheet
            class="pa-6 rounded-xl"
            color="transparent"
            style="border-width: 2px; border-style: solid; border-radius: 16px; max-height: 256px; overflow-y: auto;"
            :style="theme === 'dark'
              ? 'background: rgba(15,23,42,0.4); border-color: rgba(255,255,255,0.05);'
              : 'background: #f8fafc; border-color: #e2e8f0;'"
          >
            <div
              class="d-flex align-center ga-2 text-caption font-weight-black text-uppercase mb-4"
              style="letter-spacing: 0.15em;"
              :style="theme === 'dark' ? 'color: #64748b;' : 'color: #475569;'"
            >
              <ClipboardList :size="14" /> Recent Notes
            </div>
            <div class="d-flex flex-column ga-3">
              <div
                v-for="i in 2"
                :key="i"
                class="pa-4 rounded-xl transition-all"
                style="border: 1px solid;"
                :style="theme === 'dark'
                  ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.05);'
                  : 'background: white; border-color: #94a3b8;'"
              >
                <div class="d-flex justify-space-between align-start ga-2 mb-2">
                  <span class="text-caption font-weight-bold" :style="theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;'">System Admin</span>
                  <span class="text-caption" :style="theme === 'dark' ? 'color: #475569;' : 'color: #94a3b8;'" style="font-size: 10px;">Feb 20, 2026</span>
                </div>
                <p class="text-caption" :style="theme === 'dark' ? 'color: #cbd5e1;' : 'color: #475569;'">
                  Revised account configuration and updated collection settings per client request.
                </p>
              </div>
            </div>
          </v-sheet>
        </v-sheet>

        <!-- SECTION 6: Client Portal Settings -->
        <v-sheet v-bind="sectionProps" class="pa-8 mb-8">
          <div class="d-flex align-center ga-3 mb-8">
            <div class="pa-2 rounded-xl" style="background: rgba(99,102,241,0.10);">
              <Lock :size="18" color="#4f46e5" />
            </div>
            <h4 class="text-h6" style="letter-spacing: -0.3px;" :style="sectionTitleStyle">Client Portal Settings</h4>
          </div>

          <CheckboxField label="Enable Client Portal Access" :theme="theme" @update:modelValue="portalEnabled = $event" />

          <div v-if="portalEnabled" class="d-flex flex-column ga-6 mt-6">

            <!-- Portal User Account -->
            <v-sheet
              class="pa-6 rounded-xl"
              color="transparent"
              style="border-width: 2px; border-style: solid; border-radius: 16px;"
              :style="theme === 'dark'
                ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.05);'
                : 'background: #f8fafc; border-color: #e2e8f0;'"
            >
              <h5
                class="text-body-2 font-weight-black text-uppercase mb-6"
                style="letter-spacing: 0.12em;"
                :style="theme === 'dark' ? 'color: white;' : 'color: #1f2937;'"
              >Portal User Account</h5>
              <v-row align="end">
                <v-col cols="12" md="6">
                  <SelectField label="Portal View Type" :options="[{label:'Read-Only',value:'readonly'},{label:'Standard',value:'standard'},{label:'Full Access',value:'full'}]" :theme="theme" />
                </v-col>
                <v-col cols="12" md="6"><InputField label="Email Address" placeholder="contact@example.com" :theme="theme" /></v-col>
                <v-col cols="12" md="6"><InputField label="Username" placeholder="client_username" :theme="theme" /></v-col>
                <v-col cols="12" md="6" class="d-flex align-end">
                  <v-btn
                    color="blue-darken-1"
                    class="font-weight-medium rounded-xl"
                    style="font-size: 12px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
                    elevation="0"
                    block
                  >Send Temporary Password</v-btn>
                </v-col>
              </v-row>
            </v-sheet>

            <!-- Accordion: Permissions / Show Fields / Show Reports -->
            <v-expansion-panels
              variant="accordion"
              class="d-flex flex-column ga-3"
              style="border-radius: 16px;"
            >
              <!-- Permissions -->
              <v-expansion-panel
                style="border-radius: 16px; border-width: 2px; border-style: solid; overflow: hidden;"
                :style="theme === 'dark'
                  ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.05);'
                  : 'background: #f8fafc; border-color: #e2e8f0;'"
              >
                <v-expansion-panel-title>
                  <div class="d-flex align-center ga-3">
                    <Shield :size="16" color="#4f46e5" />
                    <span class="text-body-2 font-weight-black text-uppercase" style="letter-spacing: 0.12em;" :style="theme === 'dark' ? 'color: white;' : 'color: #0f172a;'">Permissions</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div
                    class="d-flex flex-column ga-4 pt-4"
                    :style="theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.05);' : 'border-top: 1px solid #e2e8f0;'"
                  >
                    <CheckboxField v-for="perm in permissions" :key="perm" :label="perm" :theme="theme" />
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Show Fields -->
              <v-expansion-panel
                style="border-radius: 16px; border-width: 2px; border-style: solid; overflow: hidden;"
                :style="theme === 'dark'
                  ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.05);'
                  : 'background: #f8fafc; border-color: #e2e8f0;'"
              >
                <v-expansion-panel-title>
                  <div class="d-flex align-center ga-3">
                    <Eye :size="16" color="#16a34a" />
                    <span class="text-body-2 font-weight-black text-uppercase" style="letter-spacing: 0.12em;" :style="theme === 'dark' ? 'color: white;' : 'color: #0f172a;'">Show Fields</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div
                    class="d-flex flex-column ga-4 pt-4"
                    :style="theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.05);' : 'border-top: 1px solid #e2e8f0;'"
                  >
                    <CheckboxField v-for="field in showFields" :key="field" :label="field" :theme="theme" />
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Show Reports -->
              <v-expansion-panel
                style="border-radius: 16px; border-width: 2px; border-style: solid; overflow: hidden;"
                :style="theme === 'dark'
                  ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.05);'
                  : 'background: #f8fafc; border-color: #e2e8f0;'"
              >
                <v-expansion-panel-title>
                  <div class="d-flex align-center ga-3">
                    <ClipboardMinus :size="16" color="#0891b2" />
                    <span class="text-body-2 font-weight-black text-uppercase" style="letter-spacing: 0.12em;" :style="theme === 'dark' ? 'color: white;' : 'color: #0f172a;'">Show Reports</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div
                    class="d-flex flex-column ga-4 pt-4"
                    :style="theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.05);' : 'border-top: 1px solid #e2e8f0;'"
                  >
                    <CheckboxField v-for="report in showReports" :key="report" :label="report" :theme="theme" />
                    <MultiSearchSelect label="Reports" :theme="theme" />
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <!-- Add Portal User -->
            <v-btn
              color="indigo-darken-1"
              class="font-weight-black text-uppercase rounded-xl"
              style="letter-spacing: 0.15em; font-size: 11px; box-shadow: 0 8px 24px rgba(99,102,241,0.25);"
              elevation="0"
              block
            >
              <template #prepend><Plus :size="16" /></template>
              Add Portal User
            </v-btn>

          </div>
        </v-sheet>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  ChevronLeft, ChevronRight,
  UserPlus, User,
  Briefcase, MapPin,
  Plus, LayoutGrid,
  MessageSquare, Send, ClipboardList,
  Lock, Shield, Eye, ClipboardMinus,
  Mail as MailIcon, Phone as PhoneIcon,
} from 'lucide-vue-next';
import SelectField       from './shared/SelectField.vue';
import InputField        from './shared/InputField.vue';
import CheckboxField     from './shared/CheckboxField.vue';
import DynamicContactList from './shared/DynamicContactList.vue';
import MultiSearchSelect from './shared/MultiSearchSelect.vue';
import { useTheme } from 'vuetify';

const props = defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
});

/** Drawer visuals follow the active Vuetify theme so light mode always matches the app toggle. */
const vuetifyTheme = useTheme();
const drawerSkin = computed(() => (vuetifyTheme.global.current.value.dark ? 'dark' : 'light'));

const isDrawerOpen = ref(false);
const newNote      = ref('');
const portalEnabled = ref(false);

// ── Shared section sheet props ────────────────────────────────────────────────
const sectionProps = computed(() => ({
  color: 'transparent',
  style: 'border-radius: 30px;',
  style2: props.theme === 'dark'
    ? 'background: rgba(15,23,42,0.4); border: 1px solid rgba(255,255,255,0.05);'
    : 'background: #f0f9ff; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);',
}));

const sectionTitleStyle = computed(() =>
  props.theme === 'dark' ? 'color: white; letter-spacing: -0.3px;' : 'color: #1f2937; letter-spacing: -0.3px;'
);

// ── Accordion data ─────────────────────────────────────────────────────────────
const permissions = [
  'Select All', 'Edit Collection Status', 'Edit Account Manually',
  'Upload Bulk Files', 'Search for Accounts', 'Enter Payments',
  'Upload Documents', 'Upload Client Files',
];

const showFields = [
  'Select All', 'Date of First Delinquency', 'Originated Date',
  'Debtor Employer', 'Show Debtor Notes', 'Show Call Notes',
  'Show Account Notes', 'Show Doc Notes',
];

const showReports = [
  'Select All', 'Accounts Report', 'Client Statement No Adjustment',
  'Client Statement Report No Interest', 'Client Statement With Adjustment',
  'Open / Closed Report', 'Payment With Client Distribution',
  'Payments With Notes', 'Portfolio Dashboard Report', 'Portfolio Liquidation',
];
</script>

<style scoped>
.animate-fade {
  animation: fadeIn 0.5s ease both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Textarea */
.note-textarea {
  width: 100%;
  height: 80px;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  font-size: 13px;
  line-height: 1.6;
  font-weight: 500;
}
.note-textarea--dark        { color: white; }
.note-textarea--dark::placeholder  { color: #475569; }
.note-textarea--light       { color: #1e293b; }
.note-textarea--light::placeholder { color: #94a3b8; }

/* Hide drawer scrollbar while keeping scroll behavior */
.drawer-list {
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge Legacy */
}
.drawer-list::-webkit-scrollbar {
  width: 0;
}

/* Drawer layout + theming (no inline styles in the template) */
.drawer-container {
  transition: width 0.3s ease, transform 0.3s ease;
  height: min(460px, calc(100vh - 260px));
  align-self: flex-start;
  transform: translateX(0);
}
.drawer-container--open {
  width: 360px;
}
.drawer-container--closed {
  width: 32px;
}

.drawer-handle {
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  z-index: 20;
  width: 32px;
  height: 48px;
  border: none;
  cursor: pointer;
  color: #fff;
  border-radius: 12px 0 0 12px;
}

.drawer-content {
  border-radius: 35px;
}

.drawer-header-title {
  letter-spacing: 0.15em;
}

.drawer-clients-chip {
  border-radius: 12px;
  height: 34px;
  padding: 0 16px;
  font-size: 13px;
  letter-spacing: 0.02em;
}

.drawer-item {
  border: 0.8px solid transparent;
  border-radius: 12px;
}
.drawer-item-title {
  letter-spacing: -0.2px;
  margin: 0;
}

/* Light: palette aligned to design ref (body #EAF6FF, header #DDF0FF, primary #3B82F6) */
.drawer-skin--light .drawer-content {
  background-color: #eaf6ff;
  border: 1px solid rgba(59, 130, 246, 0.14);
  border-radius: 32px;
}
.drawer-skin--light .drawer-header {
  background-color: #ddf0ff;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
}
.drawer-skin--light .drawer-header-title {
  color: #2563eb;
  font-weight: 900;
  letter-spacing: 0.16em;
}
.drawer-skin--light .drawer-handle {
  background-color: #2563eb;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
}
.drawer-skin--light .drawer-handle:hover {
  background-color: #2563eb;
}
.drawer-skin--light .drawer-clients-chip {
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 800;
  letter-spacing: 0.04em;
  font-size: 12px;
  box-shadow: 0 8px 22px rgba(37, 99, 235, 0.45);
}
.drawer-skin--light .drawer-item-title {
  color: #1f2937;
}
.drawer-skin--light .drawer-item--selected {
  border-color: #2563eb;
  background-color: #ddf0ff;
}
.drawer-skin--light .drawer-item--selected:hover {
  background-color: #ddf0ff;
}

/* Dark: explicit palette (follows Vuetify dark via drawer-skin--dark) */
.drawer-skin--dark .drawer-content {
  background-color: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.drawer-skin--dark .drawer-header {
  background-color: rgba(59, 130, 246, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.drawer-skin--dark .drawer-header-title {
  color: #7dd3fc;
}
.drawer-skin--dark .drawer-handle {
  background-color: #2563eb;
}
.drawer-skin--dark .drawer-handle:hover {
  background-color: #3b82f6;
}
.drawer-skin--dark .drawer-clients-chip {
  background-color: #2563eb;
  color: #fff;
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.25);
}
.drawer-skin--dark .drawer-item-title {
  color: #fff;
}
.drawer-skin--dark .drawer-item--selected {
  border-color: #60a5fa;
  background-color: rgba(59, 130, 246, 0.18);
}
.drawer-skin--dark .drawer-item--selected:hover {
  background-color: rgba(59, 130, 246, 0.18);
}
</style>