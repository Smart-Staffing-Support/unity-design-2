<template>
  <div class="d-flex flex-column flex-lg-row ga-8 animate-fade">

    <!-- Navigation Sidebar -->
    <div class="d-flex flex-column ga-2" style="width: 100%; max-width: 256px; flex-shrink: 0;">
      <button
        v-for="item in navItems"
        :key="item.id"
        class="d-flex align-center ga-3 px-6 py-4 rounded-xl text-body-2 font-weight-medium w-100"
        style="border: none; cursor: pointer; transition: all 0.2s ease; text-align: left;"
        :style="activeSection === item.id
          ? 'background: #2563eb; color: white; box-shadow: 0 8px 24px rgba(37,99,235,0.25);'
          : theme === 'dark'
            ? 'background: transparent; color: #94a3b8;'
            : 'background: transparent; color: #64748b;'"
        @click="activeSection = item.id"
        @mouseover="activeSection !== item.id && ($event.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8fafc')"
        @mouseleave="activeSection !== item.id && ($event.currentTarget.style.background = 'transparent')"
      >
        <component :is="item.icon" :size="18" />
        {{ item.label }}
      </button>
    </div>

    <!-- Settings Form Content -->
    <v-sheet
      class="flex-grow-1 pa-10"
      color="transparent"
      style="border-radius: 40px !important;"
      :style="theme === 'dark'
        ? 'background: rgba(15,23,42,0.6) !important; border: 1px solid rgba(255,255,255,0.10);'
        : 'background: #f0f9ff !important; border: 1px solid rgba(37,99,235,0.4); box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
    >

      <!-- COMPANY SETTINGS -->
      <div v-if="activeSection === 'company'" class="d-flex flex-column ga-8 animate-slide">
        <h3 class="text-h6 font-weight-regular" :style="theme === 'dark' ? 'color: white;' : 'color: #1e293b;'">
          Company settings
        </h3>
        <v-row>
          <v-col cols="12" md="6"><InputField label="Client ID" placeholder="Enter id..." :theme="theme" /></v-col>
          <v-col cols="12" md="6"><SelectField label="Sales Agent" :options="[]" :theme="theme" /></v-col>
          <v-col cols="12" md="6"><SelectField label="Business Type" :options="[]" :theme="theme" /></v-col>

          <!-- Commercial / Consumer radio group -->
          <v-col cols="12" md="6">
            <div class="d-flex ga-6 flex-wrap">
              <div class="d-flex flex-column ga-3">
                <label
                  class="text-body-2"
                  :style="theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;'"
                >Commercial / Consumer</label>
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
                    <span class="text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #1e293b;'">Commercial</span>
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
                    <span class="text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #1e293b;'">Consumer</span>
                  </label>
                </div>
              </div>

              <!-- Medical radio (conditional) -->
              <div v-if="commercialConsumer === 'consumer'" class="d-flex flex-column ga-3">
                <label
                  class="text-body-2"
                  :style="theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;'"
                >Medical</label>
                <div class="d-flex ga-4">
                  <RadioField label="Yes" name="medical" :theme="theme" />
                  <RadioField label="No"  name="medical" :theme="theme" />
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6"><InputField label="Username" :theme="theme" /></v-col>
          <v-col cols="12" md="6" class="d-flex align-end">
            <v-btn
              color="blue-darken-1"
              class="font-weight-medium rounded-xl"
              style="font-size: 13px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
              elevation="0"
              block
            >Send Temporary Password</v-btn>
          </v-col>
        </v-row>
      </div>

      <!-- GENERAL SETTINGS -->
      <div v-else-if="activeSection === 'general'" class="d-flex flex-column ga-8 animate-slide">
        <h3 class="text-h6 font-weight-regular" :style="theme === 'dark' ? 'color: white;' : 'color: #1e293b;'">
          General settings
        </h3>
        <v-row>
          <v-col cols="12" md="6"><InputField label="Accounts Under 1 Year %" placeholder="0.00" :theme="theme" /></v-col>
          <v-col cols="12" md="6"><InputField label="Accounts Over 1 Year %"  placeholder="0.00" :theme="theme" /></v-col>
          <v-col cols="12" md="6"><InputField label="International Accounts %" placeholder="0.00" :theme="theme" /></v-col>
          <v-col cols="12" md="6"><InputField label="Bounced Checks %" placeholder="0.00" :theme="theme" /></v-col>
          <v-col cols="12" md="6"><InputField label="Second Assignment %" placeholder="0.00" :theme="theme" /></v-col>
          <v-col cols="12" md="6">
            <div class="d-flex align-end ga-4">
              <div class="flex-grow-1"><SelectField label="Under $" :options="[]" :theme="theme" /></div>
              <div style="width: 96px;"><InputField label="Rate %" placeholder="0" :theme="theme" /></div>
            </div>
          </v-col>
          <v-col cols="12" md="6"><InputField label="Legal Rate %" placeholder="0.00" :theme="theme" /></v-col>
        </v-row>
      </div>

      <!-- AUTHORIZATION -->
      <div v-else-if="activeSection === 'authorization'" class="d-flex flex-column ga-8 animate-slide">
        <h3 class="text-h6 font-weight-regular" :style="theme === 'dark' ? 'color: white;' : 'color: #1e293b;'">
          Authorization
        </h3>
        <v-row>
          <v-col cols="12" md="6"><SelectField label="Credit reporting"        :options="[]" :theme="theme" /></v-col>
          <v-col cols="12" md="6"><SelectField label="Legal authorization"      :options="[]" :theme="theme" /></v-col>
          <v-col cols="12" md="6"><InputField  label="Settlement authorization %" :theme="theme" /></v-col>
        </v-row>
      </div>

      <!-- CANCELLATION -->
      <div v-else-if="activeSection === 'cancellation'" class="d-flex flex-column ga-8 animate-slide">
        <h3 class="text-h6 font-weight-regular" :style="theme === 'dark' ? 'color: white;' : 'color: #1e293b;'">
          Cancellation
        </h3>
        <v-row>
          <v-col cols="12" md="6"><InputField label="Hourly rate"       :theme="theme" /></v-col>
          <v-col cols="12" md="6"><InputField label="Legal hourly rate" :theme="theme" /></v-col>
          <v-col cols="12" md="6"><InputField label="Pre Lit"           :theme="theme" /></v-col>
          <v-col cols="12" md="6"><InputField label="Post Lit"          :theme="theme" /></v-col>
        </v-row>
      </div>

      <!-- TRANSACTION ALLOCATIONS -->
      <div v-else-if="activeSection === 'allocations'" class="d-flex flex-column ga-8 animate-slide">
        <TransactionAllocations :theme="theme" />
      </div>

      <!-- Save Button -->
      <div
        class="mt-12 pt-8 d-flex justify-end"
        :style="theme === 'dark' ? 'border-top: 1px solid rgba(255,255,255,0.05);' : 'border-top: 1px solid #e2e8f0;'"
      >
        <v-btn
          color="blue-darken-1"
          class="font-weight-medium rounded-xl"
          style="font-size: 13px; box-shadow: 0 8px 24px rgba(37,99,235,0.2);"
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
import { ref } from 'vue';
import { Building2, Settings, ShieldCheck, XCircle, Calculator, Save } from 'lucide-vue-next';
import RadioField            from './shared/RadioField.vue';
import SelectField           from './shared/SelectField.vue';
import InputField            from './shared/InputField.vue';
import TransactionAllocations from './TransactionAllocations.vue';

defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
});

const activeSection      = ref('company');
const commercialConsumer = ref(null);

const navItems = [
  { id: 'company',      label: 'Company Settings',         icon: Building2   },
  { id: 'general',      label: 'General Settings',         icon: Settings    },
  { id: 'authorization',label: 'Authorization',            icon: ShieldCheck },
  { id: 'cancellation', label: 'Cancellation',             icon: XCircle     },
  { id: 'allocations',  label: 'Transaction Allocations',  icon: Calculator  },
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
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(12px); }
  to   { opacity: 1; transform: translateX(0); }
}

.cursor-pointer { cursor: pointer; }

.radio-input {
  width: 16px;
  height: 16px;
  accent-color: #2563eb;
  cursor: pointer;
  flex-shrink: 0;
}

.radio-input:focus {
  outline: 2px solid rgba(37, 99, 235, 0.4);
  outline-offset: 2px;
}
</style>