<template>
  <div class="d-flex flex-column ga-6">

    <!-- SECTION HEADER: Stats & Global Actions -->
    <div
      class="d-flex flex-column flex-md-row justify-space-between align-center pa-6 border bg-dispute_panel_bg text-dispute_panel_border shadow"
      style="border-radius: 30px;  border: 1px solid;"
    >
      <div class="d-flex align-center ga-4">
        <div class="pt-3 pl-3 pr-3 pb-1 rounded-xl" style="background: rgba(239,68,68,0.1);">
          <AlertCircle class="text-red" :size="24" />
        </div>
        <div>
          <h3
            class="text-h6 font-weight-black text-uppercase text-checkbox_field_label_checked"
            style="letter-spacing: -0.01em;"
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
            
            size="small"
            class="rounded-xl bg-dispute_util_btn_bg text-dispute_util_btn_text utility-btn"
            style="border-radius: 12px;"
          >
            <component :is="btn.icon" :size="18" />
          </v-btn>
        </div>

        <!-- Dispute Counter -->
        <div class="text-right">
          <span class="d-block font-weight-bold text-uppercase text-red" style="font-size:0.8rem; letter-spacing:0.1em;">Total Disputes</span>
          <span
            class="text-red"
            style="font-size: 1.5rem; line-height:1;"
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
        class="position-relative pa-8 bg-summary_stat_card_bg text-financial_header_border dispute-card shadow"
        style="border-radius: 30px; border: 1px solid; transition: border-color 0.2s, box-shadow 0.2s;"
        
      >

        <!-- Row 1: Primary Controls -->
        <v-row class="mb-8">
          <v-col cols="12" md="3">
            <DateField label="Dispute Date" />
          </v-col>
          <v-col cols="12" md="3">
            <SelectField
              label="Dispute Method"
              :options="[{value:'certified',label:'Certified Mail'},{value:'online',label:'Online Portal'},{value:'fax',label:'Fax'}]"
              default-value="certified"
            
            />
          </v-col>
          <v-col cols="12" md="3">
            <SelectField
              label="Client Response"
              :options="[{value:'pending',label:'Waiting...'},{value:'accepted',label:'Accepted'},{value:'rejected',label:'Rejected'}]"
              default-value="pending"
            
            />
          </v-col>
          <v-col cols="12" md="3">
            <!-- Attachment Input -->
            <div class="d-flex flex-column ga-2">
              <label
                class="text-body-2 text-select_field_label"
                style="letter-spacing: 0.1em;"
              >
                Proof / Attachment
              </label>
              <label
                class="d-flex align-center justify-center ga-2 rounded-xl cursor-pointer text-modal_upload attachment-label"
                style="padding: 9px 16px; border: 2px dashed; transition: background 0.2s;"
                
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
        >
          <v-col cols="12" md="4">
            <SelectField label="Action Step 1" :options="[{value:'1',label:'Initial Inquiry'}]" default-value="1" />
          </v-col>
          <v-col cols="12" md="4">
            <SelectField label="Action Step 2" :options="[{value:'1',label:'Evidence Submission'}]" default-value="1" />
          </v-col>
          <v-col cols="12" md="4">
            <SelectField label="Action Step 3" :options="[{value:'1',label:'Final Escalation'}]" default-value="1" />
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
      class="w-100 d-flex flex-column align-center ga-2 text-modal_upload bg-modal_bg add-dispute-btn"
      style="padding: 24px; border-radius: 25px; border: 2px dashed; background: transparent; cursor: pointer; transition: background 0.2s, color 0.2s;"
    >
      <div class="pt-3 pl-3 pr-3 pb-1 rounded-circle" style="background: rgba(59,130,246,0.1);">
        <Plus :size="24" class="text-blue" />
      </div>
      <span class="text-sm font-weight-black text-uppercase" style="letter-spacing: 0.15em;">Add New Dispute Record</span>
    </button>

  </div>
</template>

<script setup>
import { AlertCircle, Download, Mail, Paperclip, Plus, Printer, Trash2 } from 'lucide-vue-next'
import DateField from './shared/DateField.vue'
import SelectField from './shared/SelectField.vue'

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

.shadow {
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
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
