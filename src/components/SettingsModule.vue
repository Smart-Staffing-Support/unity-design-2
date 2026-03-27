<template>
  <div class="d-flex flex-column flex-lg-row ga-8 animate-fade">

    <!-- Navigation Sidebar -->
    <div class="settings-nav-column d-flex flex-column ga-2">
      <button
        v-for="item in navItems"
        :key="item.id"
        type="button"
        class="settings-nav-tab d-flex align-center ga-3 px-6 py-3 text-body-2 font-weight-medium w-100 text-left"
        :class="{ 'settings-nav-tab--active': activeSection === item.id }"
        @click="activeSection = item.id"
      >
        <component :is="item.icon" :size="18" />
        {{ item.label }}
      </button>
    </div>

    <!-- Settings Form Content -->
    <v-sheet
      class="settings-sheet flex-grow-1 pa-10 bg-settings_sheet_bg border-sm border-opacity-100 border-settings_sheet_border"
      elevation="0"
    >

      <!-- COMPANY SETTINGS -->
      <div v-if="activeSection === 'company'" class="d-flex flex-column ga-8 animate-slide">
        <h3 class="text-h6 font-weight-regular text-settings_section_title">
          Company settings
        </h3>
        <v-row>
          <v-col cols="12" md="6" class="settings-match-select-col"><InputField label="Client ID" placeholder="Enter id..." /></v-col>
          <v-col cols="12" md="6"><SelectField label="Sales Agent" :options="[]" /></v-col>
          <v-col cols="12" md="6"><SelectField label="Business Type" :options="[]" /></v-col>

          <!-- Commercial / Consumer radio group -->
          <v-col cols="12" md="6">
            <div class="d-flex ga-6 flex-wrap">
              <div class="d-flex flex-column ga-3">
                <label class="text-body-2 text-date_field_label">Commercial / Consumer</label>
                <div class="d-flex ga-4">
                  <label class="d-flex align-center ga-2 cursor-pointer">
                    <input
                      type="radio"
                      name="commercialConsumer"
                      value="commercial"
                      class="radio-input"
                      :checked="commercialConsumer === 'commercial'"
                      @change="commercialConsumer = 'commercial'"
                    />
                    <span class="text-body-2 text-settings_section_title">Commercial</span>
                  </label>
                  <label class="d-flex align-center ga-2 cursor-pointer">
                    <input
                      type="radio"
                      name="commercialConsumer"
                      value="consumer"
                      class="radio-input"
                      :checked="commercialConsumer === 'consumer'"
                      @change="commercialConsumer = 'consumer'"
                    />
                    <span class="text-body-2 text-settings_section_title">Consumer</span>
                  </label>
                </div>
              </div>

              <!-- Medical radio (conditional) -->
              <div v-if="commercialConsumer === 'consumer'" class="d-flex flex-column ga-3">
                <label class="text-body-2 text-settings_medical_label">Medical</label>
                <div class="d-flex ga-4">
                  <RadioField label="Yes" name="medical" />
                  <RadioField label="No" name="medical" />
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6" class="settings-match-select-col"><InputField label="Username" /></v-col>
          <v-col cols="12" md="6" class="d-flex align-end">
            <v-btn
              color="settings_primary"
              class="font-weight-medium text-body-2 settings-primary-btn settings-round-12 w-100"
              elevation="0"
              block
            >
              Send Temporary Password
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <!-- GENERAL SETTINGS -->
      <div v-else-if="activeSection === 'general'" class="d-flex flex-column ga-8 animate-slide">
        <h3 class="text-h6 font-weight-regular text-settings_section_title">
          General settings
        </h3>
        <v-row>
          <v-col cols="12" md="6"><InputField label="Accounts Under 1 Year %" placeholder="0.00" /></v-col>
          <v-col cols="12" md="6"><InputField label="Accounts Over 1 Year %" placeholder="0.00" /></v-col>
          <v-col cols="12" md="6"><InputField label="International Accounts %" placeholder="0.00" /></v-col>
          <v-col cols="12" md="6"><InputField label="Bounced Checks %" placeholder="0.00" /></v-col>
          <v-col cols="12" md="6"><InputField label="Second Assignment %" placeholder="0.00" /></v-col>
          <v-col cols="12" md="6">
            <div class="d-flex align-end ga-4">
              <div class="flex-grow-1"><SelectField label="Under $" :options="[]" /></div>
              <div class="settings-rate-col flex-shrink-0"><InputField label="Rate %" placeholder="0" /></div>
            </div>
          </v-col>
          <v-col cols="12" md="6"><InputField label="Legal Rate %" placeholder="0.00" /></v-col>
        </v-row>
      </div>

      <!-- AUTHORIZATION -->
      <div v-else-if="activeSection === 'authorization'" class="d-flex flex-column ga-8 animate-slide">
        <h3 class="text-h6 font-weight-regular text-settings_section_title">
          Authorization
        </h3>
        <v-row>
          <v-col cols="12" md="6"><SelectField label="Credit reporting" :options="[]" /></v-col>
          <v-col cols="12" md="6"><SelectField label="Legal authorization" :options="[]" /></v-col>
          <v-col cols="12" md="6" class="settings-match-select-col"><InputField label="Settlement authorization %" /></v-col>
        </v-row>
      </div>

      <!-- CANCELLATION -->
      <div v-else-if="activeSection === 'cancellation'" class="d-flex flex-column ga-8 animate-slide">
        <h3 class="text-h6 font-weight-regular text-settings_section_title">
          Cancellation
        </h3>
        <v-row>
          <v-col cols="12" md="6"><InputField label="Hourly rate" /></v-col>
          <v-col cols="12" md="6"><InputField label="Legal hourly rate" /></v-col>
          <v-col cols="12" md="6"><InputField label="Pre Lit" /></v-col>
          <v-col cols="12" md="6"><InputField label="Post Lit" /></v-col>
        </v-row>
      </div>

      <!-- TRANSACTION ALLOCATIONS -->
      <div v-else-if="activeSection === 'allocations'" class="d-flex flex-column ga-8 animate-slide">
        <div class="settings-transaction-alloc">
          <TransactionAllocations :theme="themeMode" />
        </div>
      </div>

      <!-- Save Button -->
      <div class="settings-save-footer mt-12 pt-8 d-flex justify-end border-t border-opacity-100 border-settings_save_section_border">
        <v-btn
          color="settings_primary"
          class="font-weight-medium text-body-2 settings-primary-btn settings-round-12"
          elevation="0"
          size="large"
        >
          <template #prepend><Save :size="18" /></template>
          Save changes
        </v-btn>
      </div>

    </v-sheet>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

defineOptions({ inheritAttrs: false });
import { Building2, Settings, ShieldCheck, XCircle, Calculator, Save } from 'lucide-vue-next';
import { useTheme } from 'vuetify';
import RadioField from './shared/RadioField.vue';
import SelectField from './shared/SelectField.vue';
import InputField from './shared/InputField.vue';
import TransactionAllocations from './TransactionAllocations.vue';

const activeSection = ref('company');
const commercialConsumer = ref(null);

const vuetifyTheme = useTheme();
const themeMode = computed(() => (vuetifyTheme.global.current.value.dark ? 'dark' : 'light'));

const navItems = [
  { id: 'company', label: 'Company Settings', icon: Building2 },
  { id: 'general', label: 'General Settings', icon: Settings },
  { id: 'authorization', label: 'Authorization', icon: ShieldCheck },
  { id: 'cancellation', label: 'Cancellation', icon: XCircle },
  { id: 'allocations', label: 'Transaction Allocations', icon: Calculator },
];
</script>

<style scoped>
.animate-fade {
  animation: fadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-slide {
  animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(12px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.cursor-pointer {
  cursor: pointer;
}

.settings-nav-column {
  width: 100%;
  max-width: 256px;
  flex-shrink: 0;
}

.settings-nav-tab {
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
  min-height: 48px;
  background: transparent;
  color: rgb(var(--v-theme-settings_nav_inactive));
}

.settings-nav-tab:hover:not(.settings-nav-tab--active) {
  background-color: rgb(var(--v-theme-settings_nav_hover_bg));
}

.settings-nav-tab--active {
  background-color: rgb(var(--v-theme-settings_nav_active_bg));
  color: rgb(var(--v-theme-settings_nav_active_fg));
  box-shadow: 0 8px 24px rgb(var(--v-theme-settings_primary) / 0.25);
}

.settings-sheet {
  border-radius: 40px;
}

:global(.v-theme--light) .settings-sheet {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.settings-rate-col {
  width: 96px;
}

.settings-round-12 {
  border-radius: 12px;
}

.settings-primary-btn {
  box-shadow: 0 8px 24px rgb(var(--v-theme-settings_primary) / 0.2);
}

.radio-input {
  width: 16px;
  height: 16px;
  accent-color: rgb(var(--v-theme-settings_radio_accent));
  cursor: pointer;
  flex-shrink: 0;
}

.radio-input:focus {
  outline: 2px solid rgb(var(--v-theme-settings_radio_focus) / 0.4);
  outline-offset: 2px;
}

:deep(.settings-match-select-col .input-field) {
  background-color: rgb(var(--v-theme-select_field_bg));
  border-color: rgb(var(--v-theme-select_field_border));
  color: rgb(var(--v-theme-select_field_text));
}

:deep(.settings-match-select-col .input-field:hover) {
  background-color: rgb(var(--v-theme-select_field_hover_bg));
}

:deep(.settings-match-select-col .input-field:focus),
:deep(.settings-match-select-col .input-field:focus-visible) {
  border-color: rgb(var(--v-theme-select_field_focus_border));
}

.settings-match-select-col {
  --v-theme-date_field_bg: var(--v-theme-select_field_bg);
  --v-theme-date_field_border: var(--v-theme-select_field_border);
  --v-theme-date_field_text: var(--v-theme-select_field_text);
  --v-theme-date_field_hover_bg: var(--v-theme-select_field_hover_bg);
  --v-theme-date_field_focus_border: var(--v-theme-select_field_focus_border);
}

.settings-transaction-alloc :deep(.allocation-row) {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgb(var(--v-theme-settings_alloc_row_border));
}

.settings-transaction-alloc :deep(.allocation-row:last-child) {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgb(var(--v-theme-settings_alloc_row_border));
}
</style>
