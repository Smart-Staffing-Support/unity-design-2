<template>
  <!-- Add Reminder Modal -->
  <v-dialog v-model="isFiltersModalOpen" max-width="896">
    <AddReminder :theme="theme" />
  </v-dialog>

  <div class="d-flex flex-column ga-8">

    <!-- Header -->
    <div class="d-flex justify-space-between align-end">
      <div>
        <h2
          class="text-h5 font-weight-regular"
          :class="isDark ? 'text-white' : 'text-grey-darken-3'"
        >
          Reminders
        </h2>
        <p class="text-caption text-blue mt-1">Daily task queue and follow-ups</p>
      </div>

      <div class="d-flex align-center ga-5">
        <v-btn
          variant="outlined"
          color="blue"
          class="rounded-xl text-sm"
          style="border-radius: 12px;"
          @click="isFiltersModalOpen = true"
        >
          <Plus :size="16" class="mr-1" />
          Add New Reminder
        </v-btn>
        <v-btn
          variant="outlined"
          color="blue"
          class="rounded-xl text-sm"
          style="border-radius: 12px;"
        >
          View completed archive
        </v-btn>
      </div>
    </div>

    <!-- Cards Grid -->
    <v-row>
      <v-col
        v-for="item in reminders"
        :key="item.id"
        cols="12" md="6" lg="4"
      >
        <div
          class="position-relative pa-6 reminder-card h-100"
          style="border-radius: 30px; border: 1px solid; transition: box-shadow 0.3s, border-color 0.3s;"
          :style="isDark
            ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.1);'
            : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
        >

          <!-- Importance + Menu -->
          <div class="d-flex justify-space-between align-start mb-4">
            <ImportancePill :level="item.importance" />
            <v-btn
              :icon="true"
              variant="text"
              size="x-small"
              :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'"
            >
              <MoreHorizontal :size="18" />
            </v-btn>
          </div>

          <!-- Main Content -->
          <div class="d-flex flex-column ga-4">

            <div>
              <p class="text-body-2 font-weight-bold text-blue mb-1">{{ item.accountRef }}</p>
              <h3
                class="text-body-1 font-weight-regular"
                style="line-height: 1.4;"
                :class="isDark ? 'text-grey-lighten-3' : 'text-grey-darken-1'"
              >
                {{ item.description }}
              </h3>
            </div>

            <!-- Notes Box -->
            <div
              class="pa-4 rounded-xl text-body-2"
              style="line-height: 1.6;"
              :style="isDark
                ? 'background: rgba(255,255,255,0.05); color: #ffffff;'
                : 'background: #f8fafc; color: #475569;'"
            >
              <div class="d-flex ga-2">
                <StickyNote :size="14" class="flex-shrink-0 mt-1 text-grey" style="opacity: 0.5;" />
                <p>{{ item.notes }}</p>
              </div>
            </div>

            <!-- Metadata Row -->
            <div class="d-flex flex-wrap ga-3 pt-2">
              <div class="d-flex align-center ga-2">
                <Calendar :size="14" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" />
                <span class="text-body-2" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-2'">{{ item.dueDate }}</span>
              </div>
              <div class="d-flex align-center ga-2">
                <Clock :size="14" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" />
                <span class="text-body-2" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-2'">{{ item.timeOfDay }}</span>
              </div>
              <div class="d-flex align-center ga-2">
                <User :size="14" :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'" />
                <span class="text-body-2" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-2'">{{ item.collector }}</span>
              </div>
            </div>

            <!-- Action / Completion Footer -->
            <div
              class="pt-4 mt-2"
              style="border-top: 1px solid;"
              :style="isDark ? 'border-color: rgba(255,255,255,0.05);' : 'border-color: #f1f5f9;'"
            >
              <div
                v-if="item.dateCompleted"
                class="d-flex align-center ga-2 text-caption"
                :class="isDark ? 'text-green-lighten-1' : 'text-green-darken-2'"
              >
                <CheckCircle2 :size="16" />
                <span>Completed on {{ item.dateCompleted }}</span>
              </div>
              <v-btn
                v-else
                block
                variant="outlined"
                color="blue"
                class="rounded-xl text-caption font-weight-bold"
                style="border-radius: 12px; font-size: 0.7rem; letter-spacing: 0.05em;"
                :style="isDark ? 'border-color: rgba(59,130,246,0.3);' : 'border-color: #93c5fd;'"
              >
                Mark as completed
              </v-btn>
            </div>

          </div>
        </div>
      </v-col>
    </v-row>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Calendar, Clock, CheckCircle2, MoreHorizontal, StickyNote, User, Plus } from 'lucide-vue-next'
import ImportancePill from './shared/ImportancePill.vue'
import AddReminder from './AddReminder.vue'

const props = defineProps({
  theme: { type: String, default: 'light' },
})

const isDark = computed(() => props.theme === 'dark')
const isFiltersModalOpen = ref(false)

const reminders = [
  {
    id: '1',
    dueDate: '02/20/2026',
    timeOfDay: '10:30 am',
    accountRef: '#882019',
    description: 'Follow up on settlement',
    notes: 'Client mentioned they would have funds by friday afternoon.',
    importance: 'urgent',
    collector: 'Jacob King',
  },
  {
    id: '2',
    dueDate: '02/22/2026',
    timeOfDay: '02:00 pm',
    accountRef: '#774012',
    description: 'Verify bank wire',
    notes: 'Check if the $500.00 posted to account via the portal.',
    importance: 'medium',
    collector: 'Jonathan Oswald',
    dateCompleted: '02/18/2026',
  },
]
</script>

<style scoped>
.reminder-card:hover {
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}
</style>
