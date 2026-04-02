<template>
  <div class="animate-fade w-100 client-info">
    <div class="d-flex ga-6">

      <!-- LEFT: Collapsible Drawer -->
      <div
        class="drawer-container d-flex flex-shrink-0 position-relative"
        :class="[
          isDrawerOpen ? 'drawer-container--open overflow-hidden' : 'drawer-container--closed overflow-visible',
          `drawer-skin--${drawerSkin}`,
        ]"
      >
        <!-- Toggle Handle (only visible UI when closed — tab flush left, rounded on the right) -->
        <button
          type="button"
          class="drawer-handle position-absolute d-flex align-center justify-center bg-summary_stat_total_bg transition-colors"
          :class="isDrawerOpen ? 'drawer-handle--open' : 'drawer-handle--closed'"
          :aria-expanded="isDrawerOpen"
          aria-label="Toggle search results drawer"
          @click="isDrawerOpen = !isDrawerOpen"
        >
          <component :is="isDrawerOpen ? ChevronLeft : ChevronRight" :size="18" />
        </button>

        <!-- Drawer Content -->
        <div
          v-show="isDrawerOpen"
          class="w-100 d-flex flex-column overflow-hidden drawer-content border rounded-xl border-custom-blue"
        >
          <!-- Drawer Header -->
          <div
            class="pa-5 d-flex justify-space-between align-center drawer-header"
          >
            <span class="drawer-header-title text-body-2 font-weight-black text-uppercase text-select_field_label">
              Search Results
            </span>
            <v-chip size="small" class="drawer-clients-chip rounded-lg bg-summary_stat_total_bg font-weight-black">24 Clients</v-chip>
          </div>

          <!-- Drawer List -->
          <div class="flex-grow-1 pa-4 d-flex flex-column ga-2 drawer-list">
            <div
              v-for="i in 5"
              :key="i"
              class="drawer-item px-4 py-1 rounded-xl cursor-pointer transition-all"
              :class="{ 'drawer-item--selected': i === 1 }"
            >
              <p
                class="drawer-item-title drawer-item-title--hoverable text-body-2 rounded-lg border border-custom-blue py-3 px-3 transition-all"
              >Global Logistics Inc.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Client Dossier -->
      <div class="w-100 client-info-dossier-scroll">

        <!-- Header -->
        <div class="d-flex align-center ga-3 mb-8 client-info-page-header">
          <div class="client-info-page-header-icon pa-3 rounded-lg d-flex align-center justify-center bg-billing_modal_icon_bg">
            <UserPlus :size="24" class="client-info-page-header-icon-svg text-primary" />
          </div>
          <div>
            <h3 class="text-h5 text-high-emphasis client-info-page-title">Client Profile</h3>
            <p class="text-caption font-weight-bold text-uppercase text-medium-emphasis client-info-page-subtitle">
              Complete client information &amp; configuration
            </p>
          </div>
        </div>

        <!-- SECTION 1: Firm Identity -->
        <v-sheet
          class="client-info-section-sheet pa-8 mb-8 rounded-xl bg-contact_menu_card_bg"
          color="surface"
          border
        >
          <div class="d-flex align-center ga-2 mb-6 client-info-section-header">
            <div
              class="client-info-section-accent flex-shrink-0 rounded-sm bg-contact_menu_icon_violet"
            />
            <span
              class="client-info-section-title font-weight-black text-uppercase text-high-emphasis"
            >Firm Identity</span>
          </div>
          <v-row>
            <v-col cols="12" md="4"><InputField label="Name" placeholder="e.g. Global Logistics Inc." /></v-col>
            <v-col cols="12" md="4">
              <SelectField label="Business Type" :options="[{label:'Corporation',value:'corp'},{label:'LLC',value:'llc'},{label:'Partnership',value:'partnership'}]" />
            </v-col>
            <v-col cols="12" md="4"><InputField label="Tax ID (Custom)" placeholder="XX-XXXXXXX" /></v-col>
            <v-col cols="12" md="4"><InputField label="SSN (Custom)" placeholder="XX-XXX-XXXX" /></v-col>
            <v-col cols="12" md="4">
              <CheckboxField v-model="convenienceFeeEnabled" label="Enable Convenience Fee" />
            </v-col>
          </v-row>
        </v-sheet>

        <!-- SECTION 2: Corporate Address -->
        <v-sheet
          class="client-info-section-sheet pa-8 mb-8 rounded-xl bg-contact_menu_card_bg"
          color="surface"
          border
        >
          <div class="d-flex align-center ga-2 mb-6 client-info-section-header">
            <div
              class="client-info-section-accent flex-shrink-0 rounded-sm bg-contact_menu_icon_violet"
            />
            <span
              class="client-info-section-title font-weight-black text-uppercase text-high-emphasis"
            >Corporate Address</span>
          </div>
          <v-row>
            <v-col cols="12" md="4"><InputField label="Address Line 1" placeholder="Street address" /></v-col>
            <v-col cols="12" md="4"><InputField label="Address Line 2" placeholder="Suite, apartment, etc." /></v-col>
            <v-col cols="12" md="4"><InputField label="City" /></v-col>
            <v-col cols="12" md="4"><InputField label="State/Province" /></v-col>
            <v-col cols="12" md="4"><InputField label="Zip/Postal Code" /></v-col>
            <v-col cols="12" md="4"><InputField label="Country" /></v-col>
            <v-col cols="12" md="4"><InputField label="Phone" placeholder="+1 (555) 000-0000" /></v-col>
            <v-col cols="12" md="4"><InputField label="Fax" placeholder="+1 (555) 000-0000" /></v-col>
          </v-row>
        </v-sheet>

        <!-- SECTION 3: Primary Contact -->
        <v-sheet
          class="client-info-section-sheet pa-8 mb-8 rounded-xl bg-contact_menu_card_bg"
          color="surface"
          border
        >
          <div class="d-flex align-center justify-space-between mb-6 flex-wrap ga-3">
            <div class="d-flex align-center ga-2 client-info-section-header">
              <div
                class="client-info-section-accent flex-shrink-0 rounded-sm bg-contact_menu_icon_violet"
              />
              <span
                class="client-info-section-title font-weight-black text-uppercase text-high-emphasis"
              >Primary Contact</span>
            </div>
            <v-btn
              variant="tonal"
              color="primary"
              class="font-weight-black text-uppercase rounded-xl"
              style="letter-spacing: 0.12em; font-size: 11px;"
              size="small"
            >
              <template #prepend><Plus :size="14" /></template>
              Add Contact
            </v-btn>
          </div>
          <v-row>
            <v-col cols="12" md="6"><InputField label="First Name" /></v-col>
            <v-col cols="12" md="6"><InputField label="Last Name" /></v-col>
            <v-col cols="12" md="6">
              <SelectField label="Title/Position" :options="[{label:'CEO',value:'ceo'},{label:'CFO',value:'cfo'},{label:'Manager',value:'manager'}]" />
            </v-col>
            <v-col cols="12" md="6">
              <SelectField label="Department (Custom)" :options="[{label:'Finance',value:'finance'},{label:'Operations',value:'ops'}]" />
            </v-col>
            <v-col cols="12">
              <DynamicContactList label="Email Addresses" :icon="MailIcon" type="email" />
            </v-col>
            <v-col cols="12">
              <DynamicContactList label="Phone Numbers" :icon="PhoneIcon" type="tel" />
            </v-col>
          </v-row>
        </v-sheet>

        <!-- SECTION 4: Account Configuration -->
        <v-sheet
          class="client-info-section-sheet pa-8 mb-8 rounded-xl bg-contact_menu_card_bg"
          color="surface"
          border
        >
          <div class="d-flex align-center ga-2 mb-6 client-info-section-header">
            <div
              class="client-info-section-accent flex-shrink-0 rounded-sm bg-contact_menu_icon_violet"
            />
            <span
              class="client-info-section-title font-weight-black text-uppercase text-high-emphasis"
            >Account Configuration</span>
          </div>
          <v-row>
            <v-col cols="12" md="4">
              <SelectField label="Account Type" :options="[{label:'Standard',value:'standard'},{label:'Premium',value:'premium'}]" />
            </v-col>
            <v-col cols="12" md="4">
              <SelectField label="Account Status" :options="[{label:'Active',value:'active'},{label:'Inactive',value:'inactive'}]" />
            </v-col>
            <v-col cols="12" md="4">
              <SelectField label="Assigned Sales Rep" :options="[]" />
            </v-col>
            <v-col cols="12" md="4"><InputField label="Account Age (Custom)" placeholder="0" /></v-col>
            <v-col cols="12" md="4">
              <SelectField label="Collection Priority (Custom)" :options="[{label:'High',value:'high'},{label:'Medium',value:'medium'},{label:'Low',value:'low'}]" />
            </v-col>
          </v-row>
        </v-sheet>

        <!-- SECTION 5: Notes & Communication -->
        <v-sheet
          class="client-info-section-sheet pa-8 mb-8 rounded-xl bg-contact_menu_card_bg"
          color="surface"
          border
        >
          <div class="d-flex align-center ga-2 mb-6 client-info-section-header">
            <div
              class="client-info-section-accent flex-shrink-0 rounded-sm bg-contact_menu_icon_violet"
            />
            <span
              class="client-info-section-title font-weight-black text-uppercase text-high-emphasis"
            >Notes &amp; Communication</span>
          </div>

          <!-- Note Entry -->
          <v-sheet
            class="pa-6 rounded-xl mb-6 bg-table_container_bg"
            color="surface-variant"
            border
          >
            <textarea
              v-model="newNote"
              class="note-textarea text-high-emphasis w-100"
              placeholder="Add a note to this client..."
            />
            <div class="d-flex justify-end mt-4">
              <v-btn
                color="primary"
                variant="flat"
                class="d-inline-flex align-center px-6 text-none font-weight-semibold"
                style="letter-spacing: 0.12em; font-size: 11px; border-radius: 12px; min-height: 36px;"
                elevation="0"
                size="small"
              >
                <template #prepend><Send :size="14" :stroke-width="2" /></template>
                Save Note
              </v-btn>
            </div>
          </v-sheet>

          <!-- Notes History -->
          <v-sheet
            class="pa-6 rounded-xl client-info-notes-history border bg-table_container_bg"
            color="surface-variant"
          >
            <div
              class="d-flex align-center ga-2 text-caption font-weight-black text-uppercase text-medium-emphasis mb-4 client-info-notes-history-heading"
            >
              <ClipboardList :size="14" /> Recent Notes
            </div>
            <div class="d-flex flex-column ga-3">
              <div
                v-for="i in 2"
                :key="i"
                class="pa-4 rounded-xl border"
              >
                <div class="d-flex justify-space-between align-start ga-2 mb-2">
                  <span class="text-caption font-weight-bold text-primary client-info-note-card-author">System Admin</span>
                  <span class="text-caption text-medium-emphasis client-info-note-card-date">Feb 20, 2026</span>
                </div>
                <p class="text-caption text-medium-emphasis client-info-note-card-body">
                  Revised account configuration and updated collection settings per client request.
                </p>
              </div>
            </div>
          </v-sheet>
        </v-sheet>

        <!-- SECTION 6: Client Portal Settings -->
        <v-sheet
          class="client-info-section-sheet pa-8 mb-8 rounded-xl bg-contact_menu_card_bg"
          color="surface"
          border
        >
          <div class="d-flex align-center ga-2 mb-8 client-info-section-header">
            <div
              class="client-info-section-accent flex-shrink-0 rounded-sm bg-contact_menu_icon_violet"
            />
            <span
              class="client-info-section-title font-weight-black text-uppercase text-high-emphasis"
            >Client Portal Settings</span>
          </div>

          <CheckboxField
            v-model="portalEnabled"
            label="Enable Client Portal Access"
          />

          <div v-if="portalEnabled" class="d-flex flex-column ga-6 mt-6">

            <!-- Portal User Account -->
            <v-sheet class="pa-6 rounded-xl portal-user-account-sheet border" color="surface-variant bg-table_container_bg">
              <h5
                class="text-body-2 font-weight-black text-uppercase text-high-emphasis mb-6 portal-user-account-heading"
              >Portal User Account</h5>
              <v-row align="end">
                <v-col cols="12" md="6">
                  <SelectField
                    v-model="portalViewType"
                    label="Portal View Type"
                    :options="portalViewTypeOptions"
                    class-name="portal-view-type-select-field text-primary"
                  />
                </v-col>
                <v-col cols="12" md="6"><InputField label="Email Address" placeholder="contact@example.com" /></v-col>
                <v-col cols="12" md="6"><InputField label="Username" placeholder="client_username" /></v-col>
                <v-col cols="12" md="6" class="d-flex align-end">
                  <v-btn
                    color="blue-darken-1"
                    class="font-weight-medium portal-send-temp-password w-100"
                    style="font-size: 12px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
                    elevation="0"
                    block
                    rounded="0"
                  >Send Temporary Password</v-btn>
                </v-col>
              </v-row>
            </v-sheet>

            <!-- Accordion: Permissions / Show Fields / Show Reports -->
            <v-expansion-panels
              variant="accordion"
              class="d-flex flex-column ga-3 client-info-portal-accordions"
            >
              <!-- Permissions -->
              <v-expansion-panel class="client-info-expansion-panel rounded-lg border border-custom-blue bg-contact_menu_card_bg">
                <v-expansion-panel-title>
                  <div class="d-flex align-center ga-3 rounde-lg">
                    <Shield :size="16" color="#4f46e5" />
                    <span class="text-body-2 font-weight-black text-uppercase text-high-emphasis client-info-expansion-title">Permissions</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="d-flex flex-column ga-4 pt-4 border-t">
                    <CheckboxField
                      v-for="perm in permissions"
                      :key="perm"
                      v-model="portalPermissionChecked[perm]"
                      :label="perm"
                    />
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            

              <!-- Show Fields -->
              <v-expansion-panel class="client-info-expansion-panel rounded-lg border border-custom-blue bg-contact_menu_card_bg">
                <v-expansion-panel-title>
                  <div class="d-flex align-center ga-3">
                    <Eye :size="16" color="#16a34a" />
                    <span class="text-body-2 font-weight-black text-uppercase text-high-emphasis client-info-expansion-title">Show Fields</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="d-flex flex-column ga-4 pt-4 border-t">
                    <CheckboxField
                      v-for="field in showFields"
                      :key="field"
                      v-model="portalShowFieldChecked[field]"
                      :label="field"
                    />
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Show Reports -->
              <v-expansion-panel class="client-info-expansion-panel rounded-lg border border-custom-blue bg-contact_menu_card_bg">
                <v-expansion-panel-title>
                  <div class="d-flex align-center ga-3">
                    <ClipboardMinus :size="16" color="#0891b2" />
                    <span class="text-body-2 font-weight-black text-uppercase text-high-emphasis client-info-expansion-title">Show Reports</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="d-flex flex-column ga-4 pt-4 border-t">
                    <CheckboxField
                      v-for="report in showReports"
                      :key="report"
                      v-model="portalShowReportChecked[report]"
                      :label="report"
                    />
                    <MultiSearchSelect label="Reports" />
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <!-- Add Portal User -->
            <v-btn
              color="indigo-darken-1"
              class="font-weight-black text-uppercase portal-add-user-btn w-100"
              style="letter-spacing: 0.15em; font-size: 11px;"
              elevation="0"
              block
              rounded="0"
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
import { ref, computed, reactive } from 'vue'
import {
  ChevronLeft, ChevronRight,
  UserPlus,
  Plus,
  Send, ClipboardList,
  Shield, Eye, ClipboardMinus,
  Mail as MailIcon, Phone as PhoneIcon,
} from 'lucide-vue-next';
import SelectField       from './shared/SelectField.vue';
import InputField        from './shared/InputField.vue';
import CheckboxField     from './shared/CheckboxField.vue';
import DynamicContactList from './shared/DynamicContactList.vue';
import MultiSearchSelect from './shared/MultiSearchSelect.vue';
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme();


const drawerSkin = computed(() => (vuetifyTheme.global.current.value.dark ? 'dark' : 'light'));

const isDrawerOpen = ref(false);
const newNote      = ref('');
const portalEnabled = ref(false);
const convenienceFeeEnabled = ref(false);


const portalPermissionChecked = reactive({});
const portalShowFieldChecked = reactive({});
const portalShowReportChecked = reactive({});


const portalViewType = ref('readonly');
const portalViewTypeOptions = [
  { label: 'Read-Only', value: 'readonly' },
  { label: 'Standard', value: 'standard' },
  { label: 'Full Access', value: 'full' },
];


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
.border-custom-blue {
  border-color: rgba(59, 130, 246, 0.5);
}

.client-info-section-header .client-info-section-title {
  font-size: 12px;
  letter-spacing: 0.2em;
  line-height: 1.25;
}

.client-info-section-accent {
  width: 5px;
  height: 19px;
}

.client-info-notes-history {
  max-height: 256px;
  overflow-y: auto;
}

.client-info-notes-history-heading {
  letter-spacing: 0.15em;
}

.client-info-note-card-date {
  font-size: 10px;
}



.client-info-expansion-title {
  letter-spacing: 0.12em;
}

.portal-user-account-heading {
  letter-spacing: 0.12em;
}

.client-info .portal-user-account-sheet .portal-send-temp-password.v-btn {
  /* border-radius: 12px; */
  overflow: hidden;
}

.client-info .portal-add-user-btn .v-btn__prepend .v-icon,
.client-info .portal-add-user-btn .v-btn__prepend svg {
  color: #ffffff;
  stroke: #ffffff;
}

.client-info .portal-add-user-btn .v-btn__overlay {
  opacity: 0;
}

.portal-add-user-btn {
  border-radius: 12px;
  overflow: hidden;
}

.portal-add-user-btn.v-btn {
  background-color: #5b36e3;
  border: 1px solid #5b36e3;
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(91, 54, 227, 0.35);
}

.client-info-dossier-scroll {
  overflow-y: auto;
}

.client-info-page-title {
  letter-spacing: -0.5px;
}

.client-info-page-subtitle {
  letter-spacing: 0.15em;
}

.animate-fade {
  animation: fadeSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}


.note-textarea {
  height: 80px;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  font-size: 13px;
  line-height: 1.6;
  font-weight: 500;
}

.note-textarea::placeholder {
  opacity: 0.55;
}


.drawer-list {
  overflow-y: auto;
  scrollbar-width: none; 
  -ms-overflow-style: none; 
}
.drawer-list::-webkit-scrollbar {
  width: 0;
}


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
  width: 0;
  min-width: 0;
}

.drawer-handle {
  top: 50%;
  z-index: 20;
  width: 32px;
  height: 48px;
  border: none;
  cursor: pointer;
  color: #fff;
  padding: 0;
}

.drawer-handle--open {
  right: 0;
  left: auto;
  transform: translateY(-50%);
  border-radius: 12px 0 0 12px;
}

.drawer-handle--closed {
  left: 0;
  right: auto;
  transform: translateY(-50%);
  border-radius: 0 10px 10px 0;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35);
}

.drawer-content {
  border-radius: 35px;
}

.drawer-header-title {
  letter-spacing: 0.15em;
}

.drawer-clients-chip {
  height: 34px;
  padding: 0 16px;
  font-size: 13px;
  letter-spacing: 0.02em;
}

.drawer-item {
  border-radius: 12px;
}

.drawer-item--selected .drawer-item-title--hoverable {
  border-color: rgba(59, 130, 246, 0.85);
  background-color: rgba(59, 130, 246, 0.08);
}

.drawer-item:hover:not(.drawer-item--selected) .drawer-item-title--hoverable {
  border-color: rgba(59, 130, 246, 0.55);
  background-color: rgba(59, 130, 246, 0.05);
}

.drawer-item--selected:hover .drawer-item-title--hoverable {
  border-color: rgba(59, 130, 246, 0.92);
  background-color: rgba(59, 130, 246, 0.12);
}

.drawer-item-title {
  letter-spacing: -0.2px;
  margin: 0;
}

</style>