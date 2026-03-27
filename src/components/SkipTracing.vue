<template>
  <div class="d-flex flex-column ga-6">

    <!-- TOP ROW: Credit Identity -->
    <v-row>

      <!-- Credit Score Hero Card -->
      <v-col cols="12" lg="3">
        <div
          class="pa-6 d-flex flex-column justify-center align-center position-relative overflow-hidden h-100 skiptracing-panel bg-st_hero_bg border border-sm border-custom-blue skiptracing-panel-shadow"
        >
          <!-- Background icon -->
          <div class="position-absolute pa-4 skiptracing-corner-icon">
            <Activity :width="60" :height="60" class="text-newexperianreports_button_hover" />
          </div>

          <span
            class="font-weight-black text-uppercase mb-2 text-contact_menu_header_blue_text skiptracing-hero-label"
          >
            Credit Score
          </span>

          <span
            class="font-weight-black mb-1 text-accounts_summary_value skiptracing-hero-score"
          >
            695
          </span>

          <div class="d-flex align-center ga-1">
            <div
              class="rounded-circle bg-asset_stat_value_highlight pulse-dot skiptracing-status-dot"
            />
            <span
              class="font-weight-black text-uppercase text-asset_stat_value_highlight skiptracing-status-label"
            >
              Good Standing
            </span>
          </div>
        </div>
      </v-col>

      <!-- Credit Configuration Fields -->
      <v-col cols="12" lg="9">
        <div
          class="pa-6 h-100 skiptracing-panel bg-contact_menu_card_bg border border-sm border-custom-blue skiptracing-panel-shadow"
        >
          <v-row align="center">
            <v-col cols="12" md="4">
              <SelectField
                label="TRW Bureau Status"
                :options="[{value:'reported', label:'Reported'},{value:'not reported', label:'Not Reported'}]"
                default-value="reported"
                :theme="theme"
              />
            </v-col>

            <v-col cols="12" md="4">
              <div class="d-flex flex-column ga-2">
                <label
                  class="text-body-2 text-dh_label skiptracing-revolving-label"
                >
                  Revolving Credit
                </label>
                <div class="d-flex align-baseline ga-2">
                  <span
                    class="text-h6 font-weight-black text-accounts_summary_value"
                  >
                    $2,130
                  </span>
                  <span class="text-caption font-weight-bold text-alloc_prefix">/ N/A</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>

    </v-row>

    <!-- BOTTOM ROW: Real Estate & Equity Assets -->
    <div
      class="pa-8 skiptracing-panel bg-newlegaldetails_bg border border-sm border-custom-blue skiptracing-panel-shadow"
    >
      <div class="d-flex align-center ga-2 mb-8">
        <div class="rounded-pill bg-contact_menu_icon_violet skiptracing-header-indicator" />
        <h4
          class="text-caption font-weight-black text-uppercase text-exp_mortgage_head skiptracing-header-label"
        >
          Property & Asset Valuation
        </h4>
      </div>

      <v-row>
        <v-col cols="12" md="6" lg="auto" class="flex-grow-1">
          <SelectField
            label="Property Ownership"
            :options="[{value:'none',label:'None'},{value:'own',label:'Own'},{value:'rent',label:'Rent'}]"
            default-value="none"
            :theme="theme"
          />
        </v-col>
        <v-col cols="12" md="6" lg="auto" class="flex-grow-1">
          <AssetStat label="Mortgage Amount" :value="null" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="auto" class="flex-grow-1">
          <AssetStat label="Available Equity" value="$0.00" :theme="theme" :highlight="true" />
        </v-col>
        <v-col cols="12" md="6" lg="auto" class="flex-grow-1">
          <AssetStat label="Zillow Valuation" :value="null" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="auto" class="flex-grow-1">
          <AssetStat label="Est. Monthly Rent" value="$6,380" :theme="theme" />
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script setup>
import { Activity } from 'lucide-vue-next'
import SelectField from './shared/SelectField.vue'
import AssetStat from './shared/AssetStat.vue'
</script>

<style scoped>

.skiptracing-panel.border-custom-blue {
  border-color: rgba(59, 130, 246, 0.5);
}

.skiptracing-panel {
  border-radius: 30px;
}

.skiptracing-panel-shadow {
  box-shadow: var(--v-accounts_summary_shadow);
}

.skiptracing-corner-icon {
  top: 0;
  right: 0;
  opacity: 0.1;
}

.skiptracing-hero-label {
  font-size: 10px;
  letter-spacing: 0.2em;
}

.skiptracing-hero-score {
  font-size: 3rem;
  line-height: 1;
}

.skiptracing-status-dot {
  width: 8px;
  height: 8px;
}

.skiptracing-status-label {
  font-size: 10px;
  letter-spacing: 0.1em;
}

.skiptracing-revolving-label {
  font-size: 16px;
  letter-spacing: 0.1em;
}

.skiptracing-header-indicator {
  height: 20px;
  width: 4px;
}

.skiptracing-header-label {
  letter-spacing: 0.2em;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
.pulse-dot {
  animation: pulse 1.5s ease-in-out infinite;
}


</style>
