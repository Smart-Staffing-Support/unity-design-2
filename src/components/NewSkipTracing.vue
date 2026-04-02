<template>
  <div class="animate-fade w-100 skip-tracing skip-tracing-dossier-scroll">
    <div class="d-flex align-center ga-3 mb-8 skip-tracing-page-header">
      <div class="skip-tracing-page-header-icon pa-3 rounded-lg d-flex align-center justify-center bg-billing_modal_icon_bg">
        <Search :size="24" class="skip-tracing-page-header-icon-svg text-primary" />
      </div>
      <div>
        <h3 class="text-h5 text-high-emphasis skip-tracing-page-title">Skip Tracing</h3>
        <p class="text-caption font-weight-bold text-uppercase text-medium-emphasis skip-tracing-page-subtitle">
          Credit, property &amp; asset intelligence
        </p>
      </div>
    </div>

    <!-- Credit Identity -->
    <v-row class="mb-6" align="stretch">
      <v-col cols="12" lg="3" class="d-flex align-self-start">
        <v-sheet
          class="credit-score-card pa-4 d-flex flex-column justify-center align-center position-relative overflow-hidden w-100 rounded-xl border border-sm border-custom-blue bg-newskiptracing_bg"
          color="transparent"
        >
          <svg
            class="credit-score-wave text-primary"
            viewBox="0 0 200 80"
            aria-hidden="true"
          >
            <polyline
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3.5"
              stroke-opacity="0.22"
              points="0,52 62,52 80,18 97,62 118,33 150,33 162,52 200,52"
            />
          </svg>

          <span class="credit-score-label mb-1 text-primary">Credit Score</span>

          <input
            type="text"
            value="695"
            readonly
            class="credit-score-input text-h4 font-weight-black text-high-emphasis"
          />

          <div class="d-flex align-center ga-2 mt-1">
            <div class="credit-score-status-dot rounded-circle flex-shrink-0 bg-success" />
            <span class="credit-score-status text-success">Good Standing</span>
          </div>
        </v-sheet>
      </v-col>

      <v-col cols="12" lg="9" class="d-flex">
        <v-sheet
          class="pa-6 h-100 w-100 rounded-xl border border-sm border-custom-blue bg-contact_menu_card_bg skip-tracing-card-radius"
          color="surface"
          border
        >
          <v-row align="center">
            <v-col cols="12" md="6">
              <InputField label="Revolving Credit" placeholder="$2,130" type="text" />
            </v-col>
            <v-col cols="12" md="6">
              <InputField label="Available Credit" placeholder="$1,000" type="text" />
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Property & Asset Valuation -->
    <v-sheet
      class="skip-tracing-section-sheet pa-8 mb-8 rounded-xl bg-contact_menu_card_bg"
      color="surface"
      border
    >
      <div class="d-flex align-center ga-2 mb-7 skip-tracing-section-header">
        <div class="skip-tracing-section-accent flex-shrink-0 rounded-sm bg-contact_menu_icon_violet" />
        <span class="skip-tracing-section-title font-weight-black text-uppercase text-high-emphasis">
          Property &amp; Asset Valuation
        </span>
      </div>

      <div class="property-valuation-grid">
        <div class="property-valuation-grid__item">
          <div class="d-flex flex-column ga-2 w-100 property-ownership-select">
            <label
              class="property-ownership-label text-body-2 text-capitalize text-select_field_label"
              for="skip-tracing-property-ownership"
            >
              Property Ownership
            </label>
            <div class="position-relative property-ownership-select-inner">
              <select
                id="skip-tracing-property-ownership"
                v-model="propertyOwnership"
                class="property-ownership-select-control w-100 text-caption font-weight-bold bg-select_field_bg text-select_field_text border-sm border-opacity-100 border-select_field_border rounded-xl pl-4 pr-10 py-2 hover:bg-select_field_hover_bg focus:border-select_field_focus_border"
              >
                <option
                  v-for="opt in propertyOwnershipOptions"
                  :key="opt.value"
                  :value="opt.value"
                  class="bg-select_field_option_bg text-select_field_option_text"
                >
                  {{ opt.label }}
                </option>
              </select>
              <ChevronDown
                :size="18"
                stroke-width="2"
                class="property-ownership-chevron position-absolute text-select_field_chevron"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <div class="property-valuation-grid__item">
          <InputField label="Mortgage Amount" />
        </div>
        <div class="property-valuation-grid__item">
          <InputField label="Available Equity" />
        </div>
        <div class="property-valuation-grid__item">
          <InputField label="Zillow Valuation" />
        </div>
        <div class="property-valuation-grid__item">
          <InputField label="Est. Monthly Rent" />
        </div>
      </div>
    </v-sheet>

    <div class="d-flex justify-end align-center pt-10 pb-2 skip-tracing-actions">
      <v-btn
        color="primary"
        variant="flat"
        class="skip-tracing-save-btn text-none font-weight-semibold"
        rounded="xl"
        elevation="0"
      >
        <template #prepend>
          <Save :size="18" :stroke-width="2" />
        </template>
        Save changes
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChevronDown, Save, Search } from 'lucide-vue-next';
import InputField from './shared/InputField.vue';

defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
});

const propertyOwnershipOptions = [
  { value: 'none', label: 'None' },
  { value: 'own', label: 'Own' },
  { value: 'rent', label: 'Rent' },
];

const propertyOwnership = ref('none');
</script>

<style scoped>
.border-custom-blue {
  border-color: rgba(59, 130, 246, 0.5);
}

.skip-tracing-section-header .skip-tracing-section-title {
  font-size: 12px;
  letter-spacing: 0.2em;
  line-height: 1.25;
}

.skip-tracing-section-accent {
  width: 5px;
  height: 19px;
}

.skip-tracing-dossier-scroll {
  overflow-y: auto;
}

.skip-tracing-page-title {
  letter-spacing: -0.5px;
}

.skip-tracing-page-subtitle {
  letter-spacing: 0.15em;
}

.skip-tracing-card-radius {
  border-radius: 30px;
}

.skip-tracing-actions {
  width: 100%;
}

.skip-tracing-save-btn {
  min-height: 40px;
  padding-inline: 22px;
  font-size: 13px;
  letter-spacing: normal;
  box-shadow: 0 4px 14px rgba(26, 95, 255, 0.28);
}

.animate-fade {
  animation: fadeSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}

.credit-score-card {
  container-type: inline-size;
  box-sizing: border-box;
  aspect-ratio: 8 / 5;
  min-height: 0;
  padding-top: 14px;
  padding-bottom: 12px;
  padding-left: 18px;
  padding-right: 18px;
}

.credit-score-wave {
  position: absolute;
  top: 12px;
  right: -2px;
  width: 38%;
  max-width: 104px;
  height: auto;
  aspect-ratio: 200 / 80;
  pointer-events: none;
}

.credit-score-label {
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}

.credit-score-input {
  width: 100%;
  text-align: center;
  background: transparent;
  border: none;
  outline: none;
  font-size: clamp(1.6rem, 19cqi, 2.28rem);
  line-height: 1.05;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
  pointer-events: none;
}

.credit-score-status {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}

.credit-score-status-dot {
  width: 7px;
  height: 7px;
  position: relative;
  z-index: 1;
}

.property-valuation-grid {
  display: grid;
  gap: 17px;
  grid-template-columns: 1fr;
}

@media (min-width: 600px) {
  .property-valuation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .property-valuation-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 21px;
  }
}

.property-valuation-grid__item {
  min-width: 0;
}

.property-ownership-label {
  letter-spacing: 0.1em;
}

.property-ownership-select-control {
  appearance: none;
  -webkit-appearance: none;
  min-height: 40px;
  line-height: 1.4;
  cursor: pointer;
  box-sizing: border-box;
  outline: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.property-ownership-chevron {
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 2;
  transition: transform 0.2s ease;
}

.property-ownership-select-inner:focus-within .property-ownership-chevron {
  transform: translateY(-50%) rotate(180deg);
}
</style>
