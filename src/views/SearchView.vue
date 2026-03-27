<template>
  <v-app :theme="theme">
  <v-sheet class="pa-8 animate-fade" :color="theme === 'dark' ? 'grey-darken-4' : 'white'"
    :style="theme === 'dark' ? 'background: #020617 !important;' : 'background: rgba(255,255,255,0.7) !important;'"
    height="100%">
        <!-- HEADER SECTION -->
        <div class="d-flex flex-column flex-md-row justify-space-between align-end mb-8 gap-4">
          <div>
        <h1 class="text-h4 font-weight-black text-uppercase tracking-tight"
          :style="theme === 'dark' ? 'color: white; letter-spacing: -0.5px;' : 'color: #0f172a; letter-spacing: -0.5px;'">
              Account Search
            </h1>
          </div>

          <!-- Results per page + Filter Trigger -->
          <div class="d-flex align-center ga-4">
        <v-sheet class="d-flex align-center px-4 py-2 rounded-xl" :style="theme === 'dark'
                  ? 'background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);'
          : 'background: rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.08);'" color="transparent">
          <span class="text-body-2 font-weight-black text-uppercase mr-3" style="letter-spacing: 0.15em;"
            :style="theme === 'dark' ? 'color: white;' : 'color: #334155;'">Show</span>
          <v-select v-model="perPage" :items="['25', '50', '100']" variant="plain" density="compact" hide-details
                :style="theme === 'dark' ? 'color: white; max-width: 60px;' : 'color: #334155; max-width: 60px;'"
            :bg-color="'transparent'" />
            </v-sheet>

        <v-btn color="blue-darken-1" class="font-weight-black text-uppercase rounded-xl px-6 py-3"
          style="letter-spacing: 0.15em; box-shadow: 0 20px 40px rgba(37,99,235,0.25);" elevation="0"
          @click="isFiltersModalOpen = true" prepend-icon="mdi-tune">
              Advanced Filters
            </v-btn>
          </div>
        </div>

        <!-- PRIMARY SEARCH BARS -->
    <v-sheet class="pa-8 rounded-xl mb-8"
      :style="theme === 'dark'
              ? 'background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: 35px !important;'
        : 'background: white; border: 1px solid #e2e8f0; border-radius: 35px !important; box-shadow: 0 20px 60px rgba(148,163,184,0.2);'"
      color="transparent">
          <v-row>
            <!-- First Name -->
            <v-col cols="12" md="4">
          <label class="text-caption font-weight-bold d-block mb-2 ml-1"
                style="letter-spacing: 0.2em; text-transform: uppercase;"
            :style="theme === 'dark' ? 'color: rgba(255,255,255,0.7);' : 'color: #64748b;'">First Name</label>
          <v-text-field v-model="firstName" placeholder="Search first name..." variant="outlined" density="comfortable"
            prepend-inner-icon="mdi-magnify" hide-details rounded="xl"
                :class="theme === 'dark' ? 'dark-input' : 'light-input'"
            :bg-color="theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc'" :style="theme === 'dark'
                    ? '--v-field-border-color: rgba(255,255,255,0.06); color: white;'
              : '--v-field-border-color: #e2e8f0;'" />
            </v-col>

            <!-- Last Name -->
            <v-col cols="12" md="4">
          <label class="text-caption font-weight-bold d-block mb-2 ml-1"
                style="letter-spacing: 0.2em; text-transform: uppercase;"
            :style="theme === 'dark' ? 'color: rgba(255,255,255,0.7);' : 'color: #64748b;'">Last Name</label>
          <v-text-field v-model="lastName" placeholder="Search last name..." variant="outlined" density="comfortable"
            prepend-inner-icon="mdi-magnify" hide-details rounded="xl"
            :bg-color="theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc'" :style="theme === 'dark'
                    ? '--v-field-border-color: rgba(255,255,255,0.06); color: white;'
              : '--v-field-border-color: #e2e8f0;'" />
            </v-col>

            <!-- Account Number -->
            <v-col cols="12" md="4">
          <label class="text-caption font-weight-bold d-block mb-2 ml-1"
                style="letter-spacing: 0.2em; text-transform: uppercase;"
            :style="theme === 'dark' ? 'color: rgba(255,255,255,0.7);' : 'color: #64748b;'">Account Number</label>
          <v-text-field v-model="accountNumber" placeholder="Search ACCT#..." variant="outlined" density="comfortable"
            prepend-inner-icon="mdi-magnify" hide-details rounded="xl"
            :bg-color="theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc'" :style="theme === 'dark'
                    ? '--v-field-border-color: rgba(255,255,255,0.06); color: white;'
              : '--v-field-border-color: #e2e8f0;'" />
            </v-col>
          </v-row>
        </v-sheet>

        <!-- ADVANCED FILTERS DIALOG -->
        <v-dialog v-model="isFiltersModalOpen" max-width="1600" :scrim-opacity="0.6" :style="'backdrop-filter: blur(8px);'">

          <FilterComponent :theme="theme" />

        </v-dialog>
      </v-sheet>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import FilterComponent from '../components/shared/FilterComponent.vue';

const props = defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
});

const isFiltersModalOpen = ref(false);
const perPage = ref('25');
const firstName = ref('');
const lastName = ref('');
const accountNumber = ref('');

</script>

<style scoped>
.animate-fade {
  animation: fadeIn 0.7s ease both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus border color override for dark inputs */
.dark-input :deep(.v-field--focused .v-field__outline) {
  --v-field-border-color: rgba(59, 130, 246, 0.5) !important;
}

/* Focus border color override for light inputs */
.light-input :deep(.v-field--focused .v-field__outline) {
  --v-field-border-color: rgba(37, 99, 235, 0.5) !important;
}
</style>