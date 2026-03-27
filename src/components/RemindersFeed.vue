<template>
  <!-- Add Reminder Modal -->
  <v-dialog v-model="isFiltersModalOpen" max-width="896">
    <AddReminder :theme="effectiveTheme" />
  </v-dialog>

  <div class="d-flex flex-column ga-8">

    <!-- Header -->
    <div class="d-flex justify-space-between align-end">
      <div>
        <h2 class="reminders-feed__title">
          Reminders
        </h2>
        <p class="reminders-feed__subtitle">
          Daily task queue and follow-ups
        </p>
      </div>

      <div class="d-flex align-center ga-5">
        <v-btn
          variant="outlined"
          color="blue"
          class="rounded-xl text-sm"
          @click="isFiltersModalOpen = true"
        >
          <Plus :size="16" class="mr-1" />
          Add New Reminder
        </v-btn>
        <v-btn
          variant="outlined"
          color="blue"
          class="rounded-xl text-sm"
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
        <div class="position-relative pa-5 reminder-card h-100">

          <!-- Importance + Menu -->
          <div class="d-flex justify-space-between align-start mb-3">
            <ImportancePill :level="item.importance" />
            <v-btn
              icon
              variant="text"
              size="x-small"
              class="text-grey-lighten-2 text-grey-darken-1"
            >
              <MoreHorizontal :size="16" />
            </v-btn>
          </div>

          <!-- Main Content -->
          <div class="d-flex flex-column ga-3">

            <div>
              <p class="text-body-2 font-weight-bold text-blue mb-1">{{ item.accountRef }}</p>
              <h3 class="text-body-1 font-weight-regular reminder-task-title">
                {{ item.description }}
              </h3>
            </div>

            <!-- Notes Box -->
            <div class="pa-3 rounded-xl text-body-2 notes-box">
              <div class="notes-box__grid">
                <span class="notes-box__icon-cell" aria-hidden="true">
                  <StickyNote :size="13" class="notes-box__icon text-grey" />
                </span>
                <p class="notes-box__text mb-0">{{ item.notes }}</p>
              </div>
            </div>

            <!-- Metadata Row -->
            <div
              class="d-flex flex-wrap ga-2 pt-1 reminder-meta"
              :class="{
                'reminder-meta--completed': !!item.dateCompleted,
                'reminder-meta--urgent': item.importance === 'urgent'
              }"
            >
              <div class="d-flex align-center ga-2">
                <Calendar :size="13" class="text-grey-lighten-1 text-grey-darken-1" />
                <span class="text-body-2 text-grey-lighten-2 text-grey-darken-2">{{ item.dueDate }}</span>
              </div>
              <div class="d-flex align-center ga-2">
                <Clock :size="13" class="text-grey-lighten-1 text-grey-darken-1" />
                <span class="text-body-2 text-grey-lighten-2 text-grey-darken-2">{{ item.timeOfDay }}</span>
              </div>
              <div class="d-flex align-center ga-2">
                <User :size="13" class="text-grey-lighten-1 text-grey-darken-1" />
                <span class="text-body-2 text-grey-lighten-2 text-grey-darken-2">{{ item.collector }}</span>
              </div>
            </div>

            <!-- Action / Completion Footer -->
            <div class="footer-divider pt-3 mt-1">
              <div
                v-if="item.dateCompleted"
                class="d-flex align-center ga-2 text-caption reminder-completed-text text-green-lighten-1 text-green-darken-2"
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
                size="small"
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
import { useTheme } from 'vuetify'
import { Calendar, Clock, CheckCircle2, MoreHorizontal, StickyNote, User, Plus } from 'lucide-vue-next'
import ImportancePill from './shared/ImportancePill.vue'
import AddReminder from './AddReminder.vue'

defineProps({
  theme: { type: String, default: 'light' },
})

const vuetifyTheme = useTheme()

const isDark = computed(() => vuetifyTheme.global.current.value.dark)
const effectiveTheme = computed(() => (isDark.value ? 'dark' : 'light'))
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
.reminders-feed__title {
  letter-spacing: -0.02em;
  margin: 0;
}

.v-theme--light .reminders-feed__title {
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.15;
  color: #334155;
}

.v-theme--dark .reminders-feed__title {
  font-size: 1.625rem;
  font-weight: 600;
  line-height: 1.2;
  color: #f1f5f9;
}

.reminders-feed__subtitle {
  font-weight: 400;
  margin: 0;
  margin-top: 6px;
  line-height: 1.35;
}

.v-theme--light .reminders-feed__subtitle {
  font-size: 0.8125rem;
  color: #3b82f6;
}

.v-theme--dark .reminders-feed__subtitle {
  font-size: 0.875rem;
  color: #38bdf8;
}

.reminder-card {
  border-radius: 24px;
  border: 1px solid;
  transition: box-shadow 0.3s, border-color 0.3s;
}

.reminder-card:hover {
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
}

.v-theme--light .reminder-card {
  background: #f0f9ff;
  border-color: rgba(37,99,235,0.5);
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.v-theme--dark .reminder-card {
  background: rgba(15,23,42,0.6);
  border-color: rgba(255,255,255,0.1);
}

.notes-box {
  line-height: 1.6;
}

/* Grid keeps the note icon in column 1 beside line 1; flex was stacking icon above text in some layouts */
.notes-box__grid {
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 8px;
  align-items: start;
}

.notes-box__icon-cell {
  display: flex;
  line-height: 0;
  padding-top: 0.2em;
}

.notes-box__icon {
  flex-shrink: 0;
  display: block;
  opacity: 0.5;
}

.notes-box__text {
  margin: 0;
  min-width: 0;
}

.v-theme--light .notes-box {
  background: #f8fafc;
  color: #475569;
}

.v-theme--dark .notes-box {
  background: rgba(255,255,255,0.05);
  color: #ffffff;
}

.footer-divider {
  border-top: 1px solid;
}

.v-theme--light .footer-divider {
  border-color: #f1f5f9;
}

.v-theme--dark .footer-divider {
  border-color: #ffffff;
}

.reminder-completed-text {
  font-size: 0.7rem;
}

.reminder-meta--completed,
.reminder-meta--urgent {
  width: 100%;
  justify-content: space-between;
}

.reminder-meta--completed.ga-2,
.reminder-meta--urgent.ga-2 {
  gap: 0;
}

.reminder-task-title {
  font-size: 0.95rem;
  line-height: 1.4;
}

.v-theme--dark .v-btn--variant-outlined {
  border-color: rgba(59,130,246,0.3);
}

.text-blue {
  color: #2563eb;
}

.text-grey-lighten-2 {
  color: #6b7280;
}

.v-theme--dark .text-grey-lighten-2 {
  color: #94a3b8;
}

.text-grey-darken-1 {
  color: #374151;
}

.v-theme--dark .text-grey-darken-1 {
  color: #475569;
}

.text-grey-lighten-1 {
  color: #9ca3af;
}

.v-theme--dark .text-grey-lighten-1 {
  color: #cbd5e1;
}

.text-grey-darken-2 {
  color: #475569;
}

.v-theme--dark .text-grey-darken-2 {
  color: #94a3b8;
}

.text-green-lighten-1 {
  color: #86efac;
}

.v-theme--dark .text-green-lighten-1 {
  color: #4ade80;
}

.text-green-darken-2 {
  color: #16a34a;
}

.v-theme--dark .text-green-darken-2 {
  color: #22c55e;
}
</style>

