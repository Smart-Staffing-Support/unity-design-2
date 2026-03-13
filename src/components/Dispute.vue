<template>
  <div class="d-flex flex-column ga-6">

    <!-- SECTION HEADER: Stats & Global Actions -->
    <div
      class="d-flex flex-column flex-md-row justify-space-between align-center pa-6"
      style="border-radius: 30px; border: 1px solid;"
      :style="isDark
        ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.1);'
        : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
    >
      <div class="d-flex align-center ga-4">
        <div class="pa-3 rounded-xl" style="background: rgba(239,68,68,0.1);">
          <AlertCircle class="text-red" :size="24" />
        </div>
        <div>
          <h3
            class="text-h6 font-weight-black text-uppercase"
            style="letter-spacing: -0.01em;"
            :class="isDark ? 'text-white' : 'text-grey-darken-4'"
          >
            Active Account Disputes
          </h3>
          <p class="font-weight-black text-uppercase text-grey" style="font-size:10px; letter-spacing:0.2em;">
            Legal Correspondence Track
          </p>
        </div>
      </div>

      <div class="d-flex align-center ga-6 mt-4 mt-md-0">

        <!-- Utility Buttons -->
        <div class="d-flex align-center ga-2 pr-6" style="border-right: 1px solid rgba(148,163,184,0.2);">
          <v-btn
            v-for="(btn, i) in utilityButtons"
            :key="i"
            :icon="true"
            variant="tonal"
            :color="isDark ? 'white' : 'blue'"
            size="small"
            class="rounded-xl utility-btn"
            style="border-radius: 12px;"
          >
            <component :is="btn.icon" :size="18" />
          </v-btn>
        </div>

        <!-- Dispute Counter -->
        <div class="text-right">
          <span class="d-block font-weight-black text-uppercase text-red" style="font-size:10px; letter-spacing:0.1em;">Total Disputes</span>
          <span
            class="font-weight-black"
            style="font-size: 1.875rem; line-height:1;"
            :class="isDark ? 'text-white' : 'text-grey-darken-4'"
          >
            04
          </span>
        </div>
      </div>
    </div>

    <!-- DISPUTE LIST -->
    <div class="d-flex flex-column ga-4">
      <div
        v-for="id in [1, 2]"
        :key="id"
        class="position-relative pa-8 dispute-card"
        style="border-radius: 30px; border: 1px solid; transition: border-color 0.2s, box-shadow 0.2s;"
        :style="isDark
          ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1);'
          : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
      >

        <!-- Row 1: Primary Controls -->
        <v-row class="mb-8">
          <v-col cols="12" md="3">
            <DateField label="Dispute Date" :theme="theme" />
          </v-col>
          <v-col cols="12" md="3">
            <SelectField
              label="Dispute Method"
              :options="[{value:'certified',label:'Certified Mail'},{value:'online',label:'Online Portal'},{value:'fax',label:'Fax'}]"
              default-value="certified"
              :theme="theme"
            />
          </v-col>
          <v-col cols="12" md="3">
            <SelectField
              label="Client Response"
              :options="[{value:'pending',label:'Waiting...'},{value:'accepted',label:'Accepted'},{value:'rejected',label:'Rejected'}]"
              default-value="pending"
              :theme="theme"
            />
          </v-col>
          <v-col cols="12" md="3">
            <!-- Attachment Input -->
            <div class="d-flex flex-column ga-2">
              <label
                class="text-body-2"
                style="letter-spacing: 0.1em;"
                :class="isDark ? 'text-cyan-lighten-2' : 'text-blue-darken-1'"
              >
                Proof / Attachment
              </label>
              <label
                class="d-flex align-center justify-center ga-2 rounded-xl cursor-pointer attachment-label"
                style="padding: 9px 16px; border: 2px dashed; transition: background 0.2s;"
                :style="isDark
                  ? 'border-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.4);'
                  : 'border-color: #94a3b8; color: #94a3b8;'"
              >
                <Paperclip :size="14" />
                <span class="text-caption font-weight-bold">Upload PDF</span>
                <input type="file" style="display:none;" />
              </label>
            </div>
          </v-col>
        </v-row>

        <!-- Row 2: Action Tracks -->
        <v-row
          class="pt-6"
          style="border-top: 1px solid;"
          :style="isDark ? 'border-color: rgba(255,255,255,0.05);' : 'border-color: #f1f5f9;'"
        >
          <v-col cols="12" md="4">
            <SelectField label="Action Step 1" :options="[{value:'1',label:'Initial Inquiry'}]" default-value="1" :theme="theme" />
          </v-col>
          <v-col cols="12" md="4">
            <SelectField label="Action Step 2" :options="[{value:'1',label:'Evidence Submission'}]" default-value="1" :theme="theme" />
          </v-col>
          <v-col cols="12" md="4">
            <SelectField label="Action Step 3" :options="[{value:'1',label:'Final Escalation'}]" default-value="1" :theme="theme" />
          </v-col>
        </v-row>

        <!-- Floating Delete Button -->
        <v-btn
          :icon="true"
          color="red"
          size="small"
          class="delete-btn position-absolute"
          style="top: -12px; right: -12px; border-radius: 50%;"
        >
          <Trash2 :size="14" />
        </v-btn>

      </div>
    </div>

    <!-- ADD NEW DISPUTE BUTTON -->
    <button
      class="w-100 d-flex flex-column align-center ga-2 add-dispute-btn"
      style="padding: 24px; border-radius: 25px; border: 2px dashed; background: transparent; cursor: pointer; transition: background 0.2s, color 0.2s;"
      :style="isDark
        ? 'border-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.4);'
        : 'border-color: #94a3b8; background: rgba(248,250,252,0.5); color: #94a3b8;'"
    >
      <div class="pa-2 rounded-circle" style="background: rgba(59,130,246,0.1);">
        <Plus :size="24" class="text-blue" />
      </div>
      <span class="text-sm font-weight-black text-uppercase" style="letter-spacing: 0.15em;">Add New Dispute Record</span>
    </button>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { AlertCircle, Download, Mail, Paperclip, Plus, Printer, Trash2 } from 'lucide-vue-next'
import DateField from './shared/DateField.vue'
import SelectField from './shared/SelectField.vue'

const props = defineProps({
  theme: { type: String, default: 'light' },
})

const isDark = computed(() => props.theme === 'dark')

const utilityButtons = [
  { icon: Mail },
  { icon: Printer },
  { icon: Download },
]
</script>

<style scoped>
.utility-btn {
  transition: transform 0.15s;
}
.utility-btn:hover {
  transform: scale(1.1);
}

.dispute-card:hover {
  border-color: rgba(59, 130, 246, 0.3) !important;
}

.delete-btn {
  opacity: 0;
  transition: opacity 0.2s;
}
.dispute-card:hover .delete-btn {
  opacity: 1;
}

.attachment-label:hover {
  background: rgba(255, 255, 255, 0.05);
}

.add-dispute-btn:hover {
  color: #3b82f6 !important;
}
</style>
