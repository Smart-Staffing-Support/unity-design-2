<template>
  <div class="d-flex flex-column overflow-hidden"
    style="min-height: 100vh; font-family: sans-serif; transition: background 0.5s ease, color 0.5s ease;" :style="theme === 'dark'
      ? 'background: #020617; color: #f1f5f9;'
      : 'background: white; color: #0f172a;'">
    <!-- Sidebar -->
    <Sidebar :active-tab="activeNav" :theme="theme" @update:active-tab="activeNav = $event"
      @toggle-theme="toggleTheme" />

    <!-- Main Content -->
    <main class="d-flex flex-column" style="padding-left: 80px; height: 100vh; position: relative; z-index: 10;">

      <!-- Top Header -->
      <header class="d-flex align-center justify-space-between px-8 flex-shrink-0"
        style="height: 64px; background: transparent;">
        <div class="d-flex align-center ga-4">
          <h1 class="text-h6 font-weight-bold"
            style="background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;" :style="theme === 'dark'
              ? 'background-image: linear-gradient(to right, #60a5fa, white);'
              : 'background-image: linear-gradient(to right, #2563eb, #1e3a8a);'">
            Add New Account
          </h1>
        </div>

        <div class="d-flex align-center ga-4">
          <!-- Live Queue badge -->
          <div class="px-4 py-1 rounded-pill text-caption font-weight-bold"
            style="backdrop-filter: blur(12px); transition: all 0.3s ease;" :style="theme === 'dark'
              ? 'background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.10); color: #93c5fd;'
              : 'background: rgba(37,99,235,0.10); border: 1px solid rgba(37,99,235,0.20); color: #1d4ed8;'">
            Live Queue: 14 Pending
          </div>

          <!-- Avatar -->
          <div class="d-flex align-center justify-center rounded-circle text-caption font-weight-bold text-white"
            style="width: 32px; height: 32px; background: #2563eb; box-shadow: 0 4px 12px rgba(37,99,235,0.4); flex-shrink: 0;">
            SJ
          </div>
        </div>
      </header>

      <!-- Scrollable Dashboard Content -->
      <div class="flex-grow-1 pa-8 pt-4 custom-scrollbar" style="overflow-y: auto;">
        <div class="mx-auto pb-12" style="max-width: 1800px;">

          <!-- Dashboard Header -->
          <NewDashboardHeader :theme="theme" />

          <!-- Tab Content + Action Panel -->
          <div class="d-flex flex-column flex-lg-row ga-8 align-start mt-8">

            <!-- Central Tab View -->
            <NewTabsContent :theme="theme" :active-creditor="activeCreditor" />

            <!-- Right Side Action Panel -->
            <NewActionCodes :theme="theme" style="width: 320px; flex-shrink: 0;" />
          </div>
        </div>
      </div>
    </main>

    <!-- Toast notifications (Vuetify snackbar as Toaster replacement) -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" location="bottom right" :timeout="3000" rounded="xl">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from '../components/shared/Sidebar.vue';
import NewDashboardHeader from '../components/NewDashboardHeader.vue';
import NewTabsContent from '../components/NewTabsContent.vue';
import NewActionCodes from '../components/NewActionCodes.vue';

const props = defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
});

const theme = ref(props.theme);
const activeNav = ref('crm');
const activeCreditor = ref('creditor 1');

const snackbar = ref({
  show: false,
  message: '',
  color: 'blue-darken-1',
});

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
}
</script>

<style>
/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.20);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.30);
}

/* Hide scrollbar utility */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Slide animations (kept for any child components that use them) */
@keyframes slideDown {
  from {
    height: 0;
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 1;
  }

  to {
    height: 0;
    opacity: 0;
  }
}

.animate-slideDown {
  animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
}

.animate-slideUp {
  animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
}
</style>