<template>
  <div class="animate-fade skip-tracing-root">

    <!-- TOP ROW: Credit Identity -->
    <v-row class="mb-6" align="stretch">

      <!-- Credit Score Hero Card: landscape pill (~1.6× wider than tall); do not stretch with sibling row height -->
      <v-col cols="12" lg="3" class="d-flex align-self-start">
        <v-sheet
          class="credit-score-card pa-4 d-flex flex-column justify-center align-center position-relative overflow-hidden w-100"
          color="transparent"
          :class="theme === 'dark' ? 'credit-score-card--dark' : 'credit-score-card--light'"
        >
          <!-- Faint pulse / EKG watermark -->
          <svg
            class="credit-score-wave"
            viewBox="0 0 200 80"
            aria-hidden="true"
          >
            <polyline
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              :stroke-width="theme === 'dark' ? 3.5 : 4"
              :stroke="theme === 'dark' ? 'rgba(99,145,216,0.22)' : 'rgba(14, 165, 233, 0.2)'"
              points="0,52 62,52 80,18 97,62 118,33 150,33 162,52 200,52"
            />
          </svg>

          <span class="credit-score-label mb-1">Credit Score</span>

          <input
            type="text"
            value="695"
            readonly
            class="credit-score-input"
            :class="theme === 'dark' ? 'credit-score-input--dark' : 'credit-score-input--light'"
          />

          <div class="d-flex align-center ga-2 mt-1">
            <div class="credit-score-status-dot" />
            <span class="credit-score-status">Good Standing</span>
          </div>
        </v-sheet>
      </v-col>

      <!-- Credit Configuration Fields -->
      <v-col cols="12" lg="9" class="d-flex">
        <v-sheet
          class="credit-config-sheet pa-6 h-100 w-100 skip-tracing-card-radius"
          color="transparent"
          :class="theme === 'dark' ? 'credit-config-sheet--dark' : 'credit-config-sheet--light'"
        >
          <v-row align="center">
            <v-col cols="12" md="6">
              <InputField label="Revolving Credit" placeholder="$2,130" type="text" :theme="theme" />
            </v-col>
            <v-col cols="12" md="6">
              <InputField label="Available Credit" placeholder="$1,000" type="text" :theme="theme" />
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- BOTTOM ROW: Property & Asset Valuation -->
    <v-sheet
      class="property-valuation-sheet pa-7 mb-7"
      color="transparent"
      :class="theme === 'dark' ? 'property-valuation-sheet--dark' : 'property-valuation-sheet--light'"
    >
      <!-- Section Header — image 1: generous vertical rhythm vs compact image 2 -->
      <div class="d-flex align-center ga-2 mb-7 property-valuation-header">
        <div
          class="property-valuation-accent flex-shrink-0"
          :class="theme === 'dark' ? 'property-valuation-accent--dark' : 'property-valuation-accent--light'"
        />
        <span
          class="property-valuation-title font-weight-black text-uppercase"
        >Property &amp; Asset Valuation</span>
      </div>

      <div class="property-valuation-grid">
        <div class="property-valuation-grid__item">
          <!-- Light: native select. Dark: v-menu list so highlight can be purple (OS select is always blue). -->
          <SelectField
            v-if="theme === 'light'"
            v-model="propertyOwnership"
            label="Property Ownership"
            :options="propertyOwnershipOptions"
          />
          <div
            v-else
            class="d-flex flex-column w-100 property-ownership-dark-field"
          >
            <label
              class="text-body-2 text-capitalize text-select_field_label ls-widest"
            >Property Ownership</label>
            <v-menu
              v-model="propertyOwnershipMenuOpen"
              location="bottom"
              content-class="property-ownership-dark-menu"
              :close-on-content-click="true"
              transition="fade-transition"
              :width="propertyOwnershipMenuWidth"
            >
              <template #activator="{ props: menuActivatorProps }">
                <div
                  ref="propertyOwnershipActivatorEl"
                  v-bind="menuActivatorProps"
                  class="property-ownership-dark-activator d-flex align-center position-relative w-100"
                  :class="{ 'property-ownership-dark-activator--open': propertyOwnershipMenuOpen }"
                  role="button"
                  tabindex="0"
                >
                  <span
                    class="property-ownership-dark-activator__text text-truncate flex-grow-1 min-w-0"
                  >{{
                    propertyOwnershipDisplayLabel
                  }}</span>
                  <v-icon
                    icon="chevron-down"
                    size="14"
                    class="property-ownership-dark-activator__icon"
                  />
                </div>
              </template>
              <v-list
                density="compact"
                class="property-ownership-dark-list"
                bg-color="transparent"
              >
                <v-list-item
                  v-for="opt in propertyOwnershipOptions"
                  :key="opt.value"
                  :active="propertyOwnership === opt.value"
                  rounded="0"
                  class="property-ownership-dark-list__item"
                  @click="propertyOwnership = opt.value"
                >
                  <v-list-item-title class="property-ownership-dark-list__title">
                    {{ opt.label }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
        <div class="property-valuation-grid__item">
          <InputField label="Mortgage Amount" :theme="theme" />
        </div>
        <div class="property-valuation-grid__item">
          <InputField label="Available Equity" :theme="theme" />
        </div>
        <div class="property-valuation-grid__item">
          <InputField label="Zillow Valuation" :theme="theme" />
        </div>
        <div class="property-valuation-grid__item">
          <InputField label="Est. Monthly Rent" :theme="theme" />
        </div>
      </div>
    </v-sheet>

    <!-- Save Button -->
    <div class="d-flex justify-end align-center pt-10 pb-2 skip-tracing-actions">
      <v-btn
        variant="flat"
        class="save-changes-btn"
        :class="theme === 'light' ? 'save-changes-btn--light' : 'save-changes-btn--dark'"
        elevation="0"
      >
        <template #prepend><Save :size="18" :stroke-width="2" /></template>
        Save changes
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import { Save } from 'lucide-vue-next';
import InputField from './shared/InputField.vue';
import SelectField from './shared/SelectField.vue';

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

/** Property Ownership — Skip Tracing only; wire to save/API when needed */
const propertyOwnership = ref('none');

const propertyOwnershipMenuOpen = ref(false);
const propertyOwnershipActivatorEl = ref(null);
/** Pixel width of menu — slightly narrower than activator for a more compact panel. */
const propertyOwnershipMenuWidth = ref(undefined);

watch(propertyOwnershipMenuOpen, async (open) => {
  if (!open) return;
  await nextTick();
  const el = propertyOwnershipActivatorEl.value;
  if (el instanceof HTMLElement) {
    const w = el.getBoundingClientRect().width;
    propertyOwnershipMenuWidth.value = Math.max(120, Math.round(w * 0.88));
  }
});

const propertyOwnershipDisplayLabel = computed(() => {
  const row = propertyOwnershipOptions.find((o) => o.value === propertyOwnership.value);
  return row?.label ?? '';
});
</script>

<style scoped>
/* Rounded rectangle (~12px) — shared layout; colors split by theme */
.save-changes-btn {
  --save-btn-h: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 0;
  max-width: max-content;
  flex: 0 0 auto;
  gap: 9px;
  font-size: 13px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: normal;
  line-height: 1;
  border-radius: 12px;
  padding: 0 22px;
  min-height: var(--save-btn-h);
  height: var(--save-btn-h);
  color: #ffffff;
}

.save-changes-btn--light {
  background-color: #1a5fff;
  border: 1px solid rgba(26, 95, 255, 0.45);
  box-shadow:
    0 4px 14px rgba(26, 95, 255, 0.28),
    0 2px 6px rgba(15, 23, 42, 0.06);
}

.save-changes-btn--light:hover {
  background-color: #1547d9;
  border-color: rgba(26, 95, 255, 0.55);
  box-shadow:
    0 6px 18px rgba(26, 95, 255, 0.32),
    0 2px 8px rgba(15, 23, 42, 0.08);
}

.save-changes-btn--dark {
  background-color: #1664ff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.save-changes-btn--dark:hover {
  background-color: #1254d6;
  border-color: rgba(255, 255, 255, 0.18);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.save-changes-btn :deep(.v-btn__content) {
  display: inline-flex;
  align-items: center;
}

.save-changes-btn :deep(.v-btn__prepend) {
  margin-inline: 0;
}

.save-changes-btn :deep(.v-btn__prepend svg) {
  color: #ffffff;
  stroke: currentColor;
}

.skip-tracing-root {
  width: 100%;
}

/* Shared radius for stacked cards (matches property + credit config panels) */
.skip-tracing-card-radius {
  border-radius: 30px;
}

.skip-tracing-actions {
  width: 100%;
}

.animate-fade {
  animation: fadeSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(16px); }
  /* `transform: none` — not `translateY(0)` — avoids a persistent transform on the root.
     A transformed ancestor breaks native <select> dropdown hit-testing / menu placement in Chromium. */
  to   { opacity: 1; transform: none; }
}

.credit-score-card {
  container-type: inline-size;
  box-sizing: border-box;
  /* Ref: horizontal card ~1.5–1.7× wider than tall */
  aspect-ratio: 8 / 5;
  min-height: 0;
  padding-top: 14px;
  padding-bottom: 12px;
  padding-left: 18px;
  padding-right: 18px;
}

/* Light: pale blue-white hero (ref image 1) — not the dark-navy “695 in white” look */
.credit-score-card--light {
  border-radius: 28px;
  background: #f4f9ff;
  border: 1px solid rgba(59, 130, 246, 0.22);
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
}

.credit-score-card--dark {
  border-radius: 24px;
  background: #0b1430;
  border: 1px solid #1c3a6b;
  box-shadow: none;
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
  opacity: 1;
}

.credit-score-card--light .credit-score-wave {
  opacity: 0.85;
}

.credit-score-card--dark .credit-score-wave {
  top: 14px;
  right: 0;
  max-width: 100px;
  opacity: 0.7;
}

.credit-score-label {
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}

.credit-score-card--light .credit-score-label {
  color: #2563eb;
}

.credit-score-card--dark .credit-score-label {
  color: #7dd3fc;
}

.credit-score-input {
  width: 100%;
  text-align: center;
  background: transparent;
  border: none;
  outline: none;
  font-size: clamp(1.6rem, 19cqi, 2.28rem);
  font-weight: 900;
  line-height: 1.05;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
  pointer-events: none;
}

.credit-score-input--light {
  color: #55647a;
  font-weight: 800;
}

.credit-score-input--dark {
  color: #8e98ac;
  font-weight: 900;
}

.credit-score-status {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #22c55e;
  position: relative;
  z-index: 1;
}

.credit-score-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.credit-score-card--dark .credit-score-status {
  color: #22c55e;
}

.credit-score-card--dark .credit-score-status-dot {
  background: #22c55e;
}

/* Credit configuration (top-right) */
.credit-config-sheet--light {
  background: #f4f9ff;
  border: 1px solid rgba(14, 165, 233, 0.25);
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
}

.credit-config-sheet--light :deep(label.text-date_field_label),
.credit-config-sheet--light :deep(label.ls-input-label) {
  color: #2563eb;
}

.credit-config-sheet--light :deep(.input-field) {
  border-radius: 12px;
}

.credit-config-sheet--dark {
  background: #0b1430;
  border: 1px solid #1c3a6b;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
}

.credit-config-sheet--dark :deep(label.text-date_field_label),
.credit-config-sheet--dark :deep(label.ls-input-label) {
  color: #7dd3fc;
}

.credit-config-sheet--dark :deep(.input-field) {
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(99, 145, 216, 0.22);
  border-radius: 12px;
  color: #cbd5e1;
  -webkit-text-fill-color: #cbd5e1;
  font-weight: 700;
  font-size: 0.75rem;
}

.credit-config-sheet--dark :deep(.input-field::placeholder) {
  color: rgba(203, 213, 225, 0.55);
  -webkit-text-fill-color: rgba(203, 213, 225, 0.55);
}

.credit-config-sheet--dark :deep(.input-field:hover) {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(125, 180, 230, 0.35);
}

.credit-config-sheet--dark :deep(.input-field:focus),
.credit-config-sheet--dark :deep(.input-field:focus-visible) {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(125, 211, 252, 0.45);
}

/* ── Property & Asset Valuation panel — matches credit-config-sheet cards ─── */

/* Five equal columns, full width — fixes narrow / centered 10-col layout */
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

.property-valuation-grid__item :deep(.d-flex.flex-column) {
  gap: 9px;
}

.property-valuation-grid__item :deep(label) {
  display: block;
  min-height: 0;
  margin-bottom: 0;
  font-size: 12px;
  line-height: 1.35;
}

/* Light card: image 1 — heavily rounded shell, airy padding */
.property-valuation-sheet--light {
  border-radius: 33px;
  background: #f0f7ff;
  border: 1px solid #c5d8ec;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.05);
}

.property-valuation-sheet--dark {
  border-radius: 33px;
  background: #0b1430;
  border: 1px solid #1c3a6b;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
}

.property-valuation-header .property-valuation-title {
  font-size: 12px;
  letter-spacing: 0.2em;
  line-height: 1.25;
}

.property-valuation-accent {
  width: 5px;
  height: 19px;
  border-radius: 2px;
}

.property-valuation-accent--light {
  background: #7c3aed;
}

.property-valuation-accent--dark {
  background: #8b5cf6;
}

.property-valuation-sheet--light .property-valuation-title {
  color: #7c3aed;
}

.property-valuation-sheet--dark .property-valuation-title {
  color: #a78bfa;
}

.property-valuation-sheet--light :deep(label.text-date_field_label),
.property-valuation-sheet--light :deep(label.text-select_field_label),
.property-valuation-sheet--light :deep(label.ls-input-label),
.property-valuation-sheet--light :deep(label.ls-widest) {
  color: #2563eb;
}

.property-valuation-sheet--dark :deep(label.text-date_field_label),
.property-valuation-sheet--dark :deep(label.text-select_field_label),
.property-valuation-sheet--dark :deep(label.ls-input-label),
.property-valuation-sheet--dark :deep(label.ls-widest) {
  color: #7dd3fc;
}

/* Shared control height in this panel (Mortgage Amount, Property Ownership, etc.) */
.property-valuation-sheet--light :deep(.input-field),
.property-valuation-sheet--light :deep(.select-field),
.property-valuation-sheet--dark :deep(.input-field),
.property-valuation-sheet--dark .property-ownership-dark-activator {
  min-height: calc(22px + 1.4 * 0.8125rem);
}

/* Text inputs */
.property-valuation-sheet--light :deep(.input-field) {
  background-color: #e8eef6;
  border: 1px solid #b9c9dc;
  border-radius: 13px;
  box-sizing: border-box;
  padding: 11px 15px;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.4;
}

.property-valuation-sheet--light :deep(.input-field.text-date_field_text) {
  color: #1e3a5f;
  -webkit-text-fill-color: #1e3a5f;
}

.property-valuation-sheet--light :deep(.input-field::placeholder) {
  color: #8b9eb4;
  -webkit-text-fill-color: #8b9eb4;
  font-weight: 600;
}

.property-valuation-sheet--light :deep(.input-field:hover) {
  background-color: #e2eaf4;
  border-color: #a8b9ce;
}

.property-valuation-sheet--light :deep(.input-field:focus),
.property-valuation-sheet--light :deep(.input-field:focus-visible) {
  border-color: #8ba3c0;
  background-color: #e8eef6;
}

.property-valuation-sheet--dark :deep(.input-field) {
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(99, 145, 216, 0.22);
  border-radius: 13px;
  font-size: 0.8125rem;
  box-sizing: border-box;
  padding: 11px 15px;
  font-weight: 700;
  line-height: 1.4;
}

.property-valuation-sheet--dark :deep(.input-field.text-date_field_text) {
  color: #cbd5e1;
  -webkit-text-fill-color: #cbd5e1;
}

.property-valuation-sheet--dark :deep(.input-field::placeholder) {
  color: rgba(203, 213, 225, 0.55);
  -webkit-text-fill-color: rgba(203, 213, 225, 0.55);
}

.property-valuation-sheet--dark :deep(.input-field:hover) {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(125, 180, 230, 0.35);
}

.property-valuation-sheet--dark :deep(.input-field:focus),
.property-valuation-sheet--dark :deep(.input-field:focus-visible) {
  border-color: rgba(125, 211, 252, 0.45);
  background-color: rgba(255, 255, 255, 0.08);
}

/* Property Ownership — native select + chevron (same metrics as .input-field) */
.property-valuation-sheet--light :deep(.select-field) {
  background-color: #e8eef6;
  border: 1px solid #b9c9dc;
  border-radius: 13px;
  padding: 11px 41px 11px 15px;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.4;
  color: #1e3a5f;
  -webkit-text-fill-color: #1e3a5f;
}

.property-valuation-sheet--light :deep(.select-field:hover) {
  background-color: #e2eaf4;
  border-color: #a8b9ce;
}

.property-valuation-sheet--light :deep(.select-field:focus) {
  border-color: #8ba3c0;
  background-color: #e8eef6;
}

/*
 * SelectField uses mdi-chevron-down; global icon set is Lucide, so the v-icon renders empty.
 * Draw the chevron here only for this panel (no SelectField.vue changes).
 */
.property-valuation-sheet--light :deep(.select-wrapper .chevron-icon) {
  display: none;
}

.property-valuation-sheet--light :deep(.select-wrapper) {
  position: relative;
}

.property-valuation-sheet--light :deep(.select-wrapper::after) {
  content: '';
  position: absolute;
  right: 12px;
  top: 50%;
  z-index: 2;
  width: 14px;
  height: 14px;
  margin-top: 0;
  transform: translateY(-50%);
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%235b7fa8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")
    center / contain no-repeat;
  transition: transform 0.2s ease;
}

.property-valuation-sheet--light :deep(.select-wrapper:focus-within::after) {
  transform: translateY(-50%) rotate(180deg);
}

/* Dark Property Ownership — cyan label + dark field (matches sheet inputs); list is navy + purple active */
.property-valuation-sheet--dark .property-ownership-dark-field label.text-select_field_label {
  color: #7dd3fc;
}

.property-valuation-sheet--dark .property-ownership-dark-activator {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 13px;
  padding: 11px 41px 11px 15px;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(99, 145, 216, 0.22);
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.property-valuation-sheet--dark .property-ownership-dark-activator:hover {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(125, 180, 230, 0.35);
}

.property-valuation-sheet--dark .property-ownership-dark-activator:focus-visible {
  outline: none;
  border-color: rgba(125, 211, 252, 0.45);
  background-color: rgba(255, 255, 255, 0.08);
}

.property-valuation-sheet--dark .property-ownership-dark-activator__text {
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1.4;
  color: #cbd5e1;
  -webkit-text-fill-color: #cbd5e1;
}

/* Same geometry as SelectField.vue chevron (right: 12px, vertical center) */
.property-valuation-sheet--dark .property-ownership-dark-activator__icon {
  position: absolute;
  right: 12px;
  top: 50%;
  z-index: 2;
  margin: 0;
  transform: translateY(-50%);
  color: rgba(203, 213, 225, 0.75);
  font-size: 15px;
  pointer-events: none;
  transition: transform 0.2s ease;
}

.property-valuation-sheet--dark .property-ownership-dark-activator__icon :deep(*) {
  pointer-events: none;
}

.property-valuation-sheet--dark .property-ownership-dark-activator--open .property-ownership-dark-activator__icon {
  transform: translateY(-50%) rotate(180deg);
}
</style>

<style>
/* Dark menu: width set via v-menu :width (activator); rows match light select field type scale */
.property-ownership-dark-menu {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
  box-sizing: border-box;
  /* Light outline on dark panel; square corners (ref) */
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 0;
  overflow: hidden;
  background: #0b1430;
}

.property-ownership-dark-menu .property-ownership-dark-list {
  width: 100%;
  padding: 0;
  background: #0b1430;
  border: none;
  border-radius: 0;
}

.property-ownership-dark-menu .property-ownership-dark-list__item {
  border-radius: 0;
  min-height: 30px;
  padding-inline: 10px;
  padding-block: 4px;
  color: #f8fafc;
  background: transparent;
}

.property-ownership-dark-menu .property-ownership-dark-list__item .v-list-item__content {
  padding-block: 0;
}

.property-ownership-dark-menu .property-ownership-dark-list__title,
.property-ownership-dark-menu .property-ownership-dark-list__item .v-list-item-title {
  color: #f8fafc;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.25;
}

.property-ownership-dark-menu .property-ownership-dark-list__item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.property-ownership-dark-menu .property-ownership-dark-list__item.v-list-item--active,
.property-ownership-dark-menu .property-ownership-dark-list__item--active {
  background: #6d5ae6;
  color: #ffffff;
}

.property-ownership-dark-menu .property-ownership-dark-list__item.v-list-item--active .v-list-item-title,
.property-ownership-dark-menu .property-ownership-dark-list__item--active .property-ownership-dark-list__title {
  color: #ffffff;
  font-weight: 400;
}

.property-ownership-dark-menu .property-ownership-dark-list__item.v-list-item--active:hover,
.property-ownership-dark-menu .property-ownership-dark-list__item--active:hover {
  background: #6d5ae6;
}

.property-ownership-dark-menu .property-ownership-dark-list__item .v-list-item__overlay {
  opacity: 0;
}
</style>