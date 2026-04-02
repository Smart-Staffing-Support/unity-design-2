<template>
  <div class="animate-fade d-flex flex-column ga-8">
    <!-- 3-Column Grid: Addresses / Phone / Email -->
    <v-row class="mb-8">
      <!-- Primary Locations -->
      <v-col cols="12" md="4">
        <section class="d-flex flex-column ga-4">
          <!-- Section Header -->
          <div class="d-flex align-center ga-2 mb-2">
            <div
              class="rounded-pill bg-summary_stat_total_bg flex-shrink-0"
              style="width: 4px; height: 20px;"
            />
            <span
              class="contact-menu-section-title text-caption font-weight-black text-uppercase text-contact_menu_header_blue_text"
            >Primary Locations</span>
          </div>

          <!-- Card -->
          <v-sheet
            class="contact-menu-card rounded-xl elevation-1 pa-8 d-flex flex-column ga-3 bg-contact_menu_card_bg border border-sm border-custom-blue transition-all"
          >
            <InputField label="Address 1" type="text" variant="select" />
            <SelectField
              label="Address Type"
              :options="[{value:'home',label:'Home'},{value:'work',label:'Work'},{value:'other',label:'Other'}]"
              default-value="home"
            />
            <SelectField
              label="Verification Status"
              :options="[{value:'good',label:'Good'},{value:'unknown',label:'Unknown'},{value:'bad',label:'Bad'}]"
              default-value="good"
            />
            <SelectField
              label="Consent Status"
              :options="[{value:'consented',label:'Consented'},{value:'not consented',label:'Not Consented'}]"
              default-value="consented"
            />
            <v-btn
              variant="flat"
              class="rounded-lg font-weight-black text-uppercase text-caption px-6 py-3 mt-6 bg-summary_stat_total_bg text-accounts_cancel_text hover:bg-billing_button_hover transition-all"
              :style="{
                boxShadow: 'var(--v-contact_menu_btn_shadow)',
                letterSpacing: '0.1em',
              }"
              block
              elevation="0"
            >
              Add Address
            </v-btn>
          </v-sheet>
        </section>
      </v-col>

      <!-- Phone Directory -->
      <v-col cols="12" md="4">
        <section class="d-flex flex-column ga-4">
          <!-- Section Header -->
          <div class="d-flex align-center ga-2 mb-2">
            <div
              class="rounded-pill bg-mss_filter_badge flex-shrink-0"
              style="width: 4px; height: 20px;"
            />
            <span
              class="contact-menu-section-title text-caption font-weight-black text-uppercase text-contact_menu_header_orange_text"
            >Phone Directory</span>
          </div>

          <!-- Card -->
          <v-sheet
            class="contact-menu-card rounded-xl elevation-1 pa-8 d-flex flex-column ga-3 bg-contact_menu_card_bg border border-sm border-custom-blue transition-all"
          >
            <SelectField
              label="Phone Number"
              :options="[{value:'415-310-1981',label:'415-310-1981'},{value:'415-310-4188',label:'415-310-4188'}]"
              default-value="415-310-1981"
            />
            <SelectField
              label="Phone Type"
              :options="[{value:'mobile',label:'Mobile'},{value:'home',label:'Home'},{value:'work',label:'Work'}]"
              default-value="mobile"
            />
            <SelectField
              label="Source"
              :options="[{value:'experian',label:'From Experian'},{value:'idi',label:'From IDI'}]"
              default-value="experian"
            />
            <SelectField
              label="Verification Status"
              :options="[{value:'good',label:'Good'},{value:'unknown',label:'Unknown'},{value:'bad',label:'Bad'}]"
              default-value="good"
            />
            <SelectField
              label="Consent Status"
              :options="[{value:'consented',label:'Consented'},{value:'not consented',label:'Not Consented'}]"
              default-value="consented"
            />
            <v-btn
              variant="flat"
              class="rounded-lg font-weight-black text-uppercase text-caption px-6 py-3 mt-6 bg-summary_stat_total_bg text-accounts_cancel_text hover:bg-billing_button_hover transition-all"
              :style="{
                boxShadow: 'var(--v-contact_menu_btn_shadow)',
                letterSpacing: '0.1em',
              }"
              block
              elevation="0"
            >
              Add Phone Number
            </v-btn>
          </v-sheet>
        </section>
      </v-col>

      <!-- Email Accounts -->
      <v-col cols="12" md="4">
        <section class="d-flex flex-column ga-4">
          <!-- Section Header -->
          <div class="d-flex align-center ga-2 mb-2">
            <div
              class="rounded-pill bg-contact_menu_header_teal_bar flex-shrink-0"
              style="width: 4px; height: 20px;"
            />
            <span
              class="contact-menu-section-title text-caption font-weight-black text-uppercase text-contact_menu_header_teal_text"
            >Email Accounts</span>
          </div>

          <!-- Card -->
          <v-sheet
            class="contact-menu-card rounded-xl elevation-1 pa-8 d-flex flex-column ga-3 bg-contact_menu_card_bg border border-sm border-custom-blue transition-all"
          >
            <InputField label="Email Address" type="email" variant="select" />
            <SelectField
              label="Verification Status"
              :options="[{value:'good',label:'Good'},{value:'unknown',label:'Unknown'},{value:'bad',label:'Bad'}]"
              default-value="good"
            />
            <SelectField
              label="Consent Status"
              :options="[{value:'consented',label:'Consented'},{value:'not consented',label:'Not Consented'}]"
              default-value="consented"
            />
            <v-btn
              variant="flat"
              class="rounded-lg font-weight-black text-uppercase text-caption px-6 py-3 mt-6 bg-summary_stat_total_bg text-accounts_cancel_text hover:bg-billing_button_hover transition-all"
              :style="{
                boxShadow: 'var(--v-contact_menu_btn_shadow)',
                letterSpacing: '0.1em',
              }"
              block
              elevation="0"
            >
              Add Email Address
            </v-btn>
          </v-sheet>
        </section>
      </v-col>
    </v-row>

    <!-- Footer: Legal / Employment -->
    <v-sheet
      class="border-2 rounded-xl pa-6 d-flex flex-row flex-wrap justify-start ga-4 bg-contact_menu_footer_bg border border-dashed border-opacity-100 border-custom-blue"
      elevation="0"
    >
      <div class="d-flex align-start ga-3 flex-1-1-50 min-w-0">
        <div class="rounded-lg pa-3 bg-contact_menu_footer_icon_bg_blue flex-shrink-0">
          <User :size="20" class="text-billing_footer_label" />
        </div>
        <div class="min-w-0" style="width: 250px;">
          <InputField label="Assignee Attorney" type="text" variant="footer" />
        </div>
      </div>

      <div class="d-flex align-start ga-3 ml-auto flex-grow-0">
        <div class="rounded-lg pa-3 bg-contact_menu_footer_icon_bg_violet flex-shrink-0">
          <Briefcase :size="20" class="text-contact_menu_icon_violet" />
        </div>
        <div class="min-w-0" style="width: 250px;">
          <InputField label="Verified Employer" type="text" variant="footer" />
        </div>
      </div>
    </v-sheet>

    <!-- Save Button -->
    <div class="d-flex justify-end pt-8">
      <v-btn
        variant="flat"
        class="rounded-lg font-weight-medium text-body-2 px-8 py-3 d-flex align-center ga-2 bg-summary_stat_total_bg text-accounts_cancel_text hover:bg-newexperianreports_button_hover transition-all"
        :style="{ boxShadow: 'var(--v-contact_menu_btn_shadow)' }"
        elevation="0"
      >
        <template #prepend>
          <Save :size="18" />
        </template>
        Save changes
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { User, Briefcase, Save } from 'lucide-vue-next';
import InputField from './shared/InputField.vue';
import SelectField from './shared/SelectField.vue';
</script>

<style scoped>
.animate-fade {
  animation: fadeSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact-menu-card:hover {
  border-color: rgba(59, 130, 246, 0.5)
}

.contact-menu-section-title {
  letter-spacing: 0.2em;
}

.border-custom-blue {
  border-color: rgba(59, 130, 246, 0.5);
}
</style>
