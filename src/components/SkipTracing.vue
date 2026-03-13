<template>
  <div class="d-flex flex-column ga-6">

    <!-- TOP ROW: Credit Identity -->
    <v-row>

      <!-- Credit Score Hero Card -->
      <v-col cols="12" lg="3">
        <div
          class="pa-6 d-flex flex-column justify-center align-center position-relative overflow-hidden h-100"
          style="border-radius: 30px; border: 1px solid;"
          :style="isDark
            ? 'background: rgba(37,99,235,0.1); border-color: rgba(59,130,246,0.2);'
            : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
        >
          <!-- Background icon -->
          <div class="position-absolute pa-4" style="top:0; right:0; opacity:0.1;">
            <Activity :width="60" :height="60" class="text-blue" />
          </div>

          <span
            class="font-weight-black text-uppercase mb-2"
            style="font-size:10px; letter-spacing:0.2em;"
            :class="isDark ? 'text-blue-lighten-2' : 'text-blue-darken-1'"
          >
            Credit Score
          </span>

          <span
            class="font-weight-black mb-1"
            style="font-size: 3rem; line-height:1;"
            :class="isDark ? 'text-white' : 'text-grey-darken-4'"
          >
            695
          </span>

          <div class="d-flex align-center ga-2">
            <div
              class="rounded-circle bg-green pulse-dot"
              style="width:8px; height:8px;"
            />
            <span
              class="font-weight-black text-uppercase text-green"
              style="font-size:10px; letter-spacing:0.1em;"
            >
              Good Standing
            </span>
          </div>
        </div>
      </v-col>

      <!-- Credit Configuration Fields -->
      <v-col cols="12" lg="9">
        <div
          class="pa-6 h-100"
          style="border-radius: 30px; border: 1px solid;"
          :style="isDark
            ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1);'
            : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
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
                  class="text-body-2"
                  style="letter-spacing: 0.1em;"
                  :class="isDark ? 'text-blue-lighten-2' : 'text-blue-darken-1'"
                >
                  Revolving Credit
                </label>
                <div class="d-flex align-baseline ga-2">
                  <span
                    class="text-h6 font-weight-black"
                    :class="isDark ? 'text-white' : 'text-grey-darken-4'"
                  >
                    $2,130
                  </span>
                  <span class="text-caption font-weight-bold text-grey">/ N/A</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>

    </v-row>

    <!-- BOTTOM ROW: Real Estate & Equity Assets -->
    <div
      class="pa-8"
      style="border-radius: 30px; border: 1px solid;"
      :style="isDark
        ? 'background: rgba(15,23,42,0.4); border-color: rgba(255,255,255,0.05);'
        : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
    >
      <div class="d-flex align-center ga-2 mb-8">
        <div class="rounded-pill bg-purple" style="height:20px; width:4px;" />
        <h4
          class="text-caption font-weight-black text-uppercase"
          style="letter-spacing: 0.2em;"
          :class="isDark ? 'text-purple-lighten-2' : 'text-purple-darken-1'"
        >
          Property & Asset Valuation
        </h4>
      </div>

      <v-row>
        <v-col cols="12" md="6" lg="auto" style="flex: 1;">
          <SelectField
            label="Property Ownership"
            :options="[{value:'none',label:'None'},{value:'own',label:'Own'},{value:'rent',label:'Rent'}]"
            default-value="none"
            :theme="theme"
          />
        </v-col>
        <v-col cols="12" md="6" lg="auto" style="flex: 1;">
          <AssetStat label="Mortgage Amount" :value="null" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="auto" style="flex: 1;">
          <AssetStat label="Available Equity" value="$0.00" :theme="theme" :highlight="true" />
        </v-col>
        <v-col cols="12" md="6" lg="auto" style="flex: 1;">
          <AssetStat label="Zillow Valuation" :value="null" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6" lg="auto" style="flex: 1;">
          <AssetStat label="Est. Monthly Rent" value="$6,380" :theme="theme" />
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Activity } from 'lucide-vue-next'
import SelectField from './shared/SelectField.vue'
import AssetStat from './shared/AssetStat.vue'

const props = defineProps({
  theme: { type: String, default: 'light' },
})

const isDark = computed(() => props.theme === 'dark')
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
.pulse-dot {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>
