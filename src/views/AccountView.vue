<script setup>
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';
// import 'globals.css'
import Sidebar from '../components/shared/Sidebar.vue';
import DashboardHeader from '../components/DashboardHeader.vue';
import PrimaryActionCodes from '../components/shared/PrimaryActionCodes.vue';
import TabsContent from '../components/TabsContent.vue';
import ActionPanel from '../components/shared/ActionPanel.vue';
import GlobalNotes from '../components/GlobalNotes.vue';

const activeTab = ref('home');

const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
</script>

<template>
  <v-app class="d-flex flex-column overflow-hidden bg-main_background"
    style="min-height: 100vh; transition: background-color 0.5s, color 0.5s;">
    <Sidebar v-model:activeTab="activeTab" />

    <v-main class="h-screen position-relative d-flex flex-column" style="padding-left: 80px; z-index: 10;">
      <!-- Top Header -->
      <v-app-bar height="64" color="transparent" flat class="flex-shrink-0 px-8">
        <div class="d-flex align-center ga-4">
          <h1 class="text-h6 font-weight-bold bg-clip-text"
            style="background-clip: text; -webkit-background-clip: text; color: transparent;" :style="isDark
              ? 'background-image: linear-gradient(to right, #60a5fa, #ffffff)'
              : 'background-image: linear-gradient(to right, #2563eb, #1e3a8a)'">
            Debt Collection Dashboard
          </h1>
        </div>

        <template #append>
          <div class="d-flex align-center ga-4">
            <div class="px-4 text-caption font-weight-bold rounded-pill"
              style="padding-top: 6px; padding-bottom: 6px; backdrop-filter: blur(12px); border: 1px solid; transition: all 0.2s;"
              :style="isDark
                ? 'background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.1); color: #93c5fd;'
                : 'background: rgba(37,99,235,0.1); border-color: rgba(37,99,235,0.2); color: #1d4ed8;'">
              Live Queue: 14 Pending
            </div>

            <v-avatar color="blue-darken-1" size="32" class="text-caption font-weight-bold text-white"
              style="box-shadow: 0 4px 12px rgba(37,99,235,0.4);">
              SJ
            </v-avatar>
          </div>
        </template>
      </v-app-bar>
      <PrimaryActionCodes :theme="theme" className="mt-4" />
      <div class="flex-1 overflow-y-auto pa-8 pt-4 custom-scrollbar">
        <div class="mx-auto pb-12 d-flex flex-column ga-8" style="max-width: 1800px;">
          <DashboardHeader :activeTab="activeTab" />

          <div class="d-flex flex-column flex-lg-row ga-8 align-start">
            <!-- Central Detailed View -->
            <TabsContent :theme="theme" :active-creditor="activeCreditor" />

            <!-- Right Side Action Panel -->
            <ActionPanel :theme="theme" class-name="action-panel-width" />
          </div>
          <GlobalNotes :theme="theme" />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.action-panel-width {
  width: 320px;
}
</style>
