<template>
  <div
    class="d-flex flex-column overflow-hidden border bg-modal_bg border text-modal_bg"
    style="width: 100%; max-width: 896px; height: 90vh; border: 1px solid; border-radius: 25px;"
  >

    <!-- TOP BAR -->
    <div
      class="px-8 py-4 border-b text-modal_border bg-modal_bg"
    >
      <h2
        class="text-h6 font-weight-black text-uppercase text-checkbox_field_label_checked"
      >
        Add New Reminder
      </h2>
    </div>

    <!-- SCROLLABLE CONTENT -->
    <div class="overflow-y-auto pa-10 d-flex flex-column ga-12" style="flex: 1;">

      <!-- GROUP 1: Entity & Status -->
      <section class="d-flex flex-column ga-6">
        <v-row>
          <v-col cols="12" md="6">
            <SelectField label="Description" :options="[]" />
          </v-col>
          <v-col cols="12" md="6">
            <MultiSearchSelect :is-filter="false" label="Department" />
          </v-col>
          <v-col cols="12" md="6">
            <MultiSearchSelect :is-filter="false" label="Created For" />
          </v-col>
          <v-col cols="12" md="6">
            <SelectField label="Priority" :options="[]" />
          </v-col>
          <v-col cols="12" md="6">
            <SelectField label="Repetition" :options="[]" />
          </v-col>
          <v-col cols="12" md="6">
            <DateField label="Due Date" />
          </v-col>
          <v-col cols="12" md="6">
            <DateField label="Days" />
          </v-col>
          <v-col cols="12" md="6">
            <SelectField label="Time" :options="[]" />
          </v-col>
          <v-col cols="12" md="6">
            <DateField label="End Date" />
          </v-col>
          <v-col cols="12">
            <textarea
              placeholder="Add a Note"
              class="note-textarea w-100"
              :class="isDark ? 'note-dark' : 'note-light'"
              style="border-radius: 24px; border: 1px solid; padding: 24px; font-size: 0.875rem; resize: none; outline: none; transition: border-color 0.2s; width: 100%;"
            />
          </v-col>
        </v-row>

        <div
          class="d-flex align-end ga-4 mt-6 pt-6"
          style="border-top: 1px solid #475569;"
        >
          <div class="w-100">
            <MultiSearchSelect :is-filter="false" label="Custom Group" />
          </div>
          <div class="w-100">
            <InputField label="Group Name" type="text" />
          </div>
          <v-btn
            color="blue-darken-1"
            variant="elevated"
            class="font-weight-black text-uppercase rounded-xl py-5"
            style="letter-spacing: 0.1em; font-size: 0.75rem; border-radius: 16px; box-shadow: 0 4px 16px rgba(37,99,235,0.2); white-space: nowrap;"
          >
            Save as Custom Group
          </v-btn>
        </div>
      </section>

    </div>

    <!-- STICKY FOOTER -->
    <div
      class="pa-6 d-flex justify-end ga-4"
      style="border-top: 1px solid; flex-shrink: 0;"
      :style="isDark
        ? 'background: rgba(15,23,42,0.5); border-color: rgba(59,130,246,0.5);'
        : 'background: #ffffff; border-color: #e2e8f0;'"
    >
      <v-btn
        variant="text"
        :color="isDark ? 'grey-lighten-1' : 'grey-darken-1'"
        class="rounded-xl font-weight-black text-uppercase ga-2"
        style="letter-spacing: 0.1em; font-size: 0.7rem; border-radius: 16px;"
      >
        <RotateCcw :size="16" class="mr-2" />
        Cancel
      </v-btn>
      <v-btn
        color="blue-darken-1"
        variant="elevated"
        class="rounded-xl font-weight-black text-uppercase px-8"
        style="letter-spacing: 0.1em; font-size: 0.7rem; border-radius: 16px; box-shadow: 0 4px 16px rgba(37,99,235,0.2);"
      >
        Save Reminder
      </v-btn>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { RotateCcw } from 'lucide-vue-next'
import SelectField from './shared/SelectField.vue'
import InputField from './shared/InputField.vue'
import MultiSearchSelect from './shared/MultiSearchSelect.vue'
import DateField from './shared/DateField.vue'

const theme = useTheme()

const isDark = computed(() => theme.global.current.value.dark)
</script>

<style scoped>
.note-textarea {
  display: block;
}

.note-dark {
  background: #0f172a;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #ffffff;
}
.note-dark::placeholder {
  color: rgba(255, 255, 255, 0.2);
}
.note-dark:focus {
  border-color: rgba(59, 130, 246, 0.5) !important;
}

.note-light {
  background: #ffffff;
  border-color: rgba(37, 99, 235, 0.5) !important;
  color: #1e293b;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}
.note-light::placeholder {
  color: #94a3b8;
}
.note-light:focus {
  border-color: rgba(37, 99, 235, 0.8) !important;
}
</style>
