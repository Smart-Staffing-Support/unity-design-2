<template>
  <div class="d-flex flex-column ga-4">

    <!-- Section: Primary Locations -->
    <section class="d-flex flex-column ga-0">
      <div class="d-flex align-center ga-2 mb-2">
        <div class="rounded-pill bg-blue-darken-1" style="height: 20px; width: 4px;" />
        <h4
          class='text-caption font-weight-black text-uppercase text-blue-darken-1'
          style="letter-spacing: 0.2em;"
        >
          Primary Locations
        </h4>
      </div>

      <div
        class="rounded-xl bg-summary_stat_card_bg text-financial_header_border shadow"
        style="border: 1px solid; transition: border-color 0.2s;"
      >
        <div
          v-for="item in addresses"
          :key="item.id"
          class="d-flex align-center justify-space-between pa-4"
        >
          <div class="d-flex align-center ga-4">
            <input
              type="checkbox"
              :id="item.id"
              style="width:20px; height:20px; border-radius:6px; border: 2px solid #2563eb; accent-color: #2563eb; cursor:pointer;"
            />
            <div class="d-flex flex-column text-checkbox_field_label_checked">
              <label
                :for="item.id"
                class='text-body-2 cursor-pointer'
                style="letter-spacing: -0.01em;"
              >
                {{ item.addr }}
              </label>
              <div>
                <span class='text-caption text-grey-darken-1 mr-2'>{{ item.type }} Address</span>
                <span class='text-caption text-grey-darken-1'>Consented</span>
              </div>
            </div>
          </div>
          <div class="d-flex align-center ga-2">
            <span
              class="px-3 py-1 rounded-pill text-caption font-weight-black text-uppercase"
              style="font-size: 12px; letter-spacing: 0.1em;"
              :style="item.status === 'Good'
                ? 'background: rgba(72,199,142,0.1); color: #48c78e; border: 1px solid #48c78e;'
                : 'background: rgba(148,163,184,0.1); color: #94a3b8; border: 1px solid #94a3b8;'"
            >
              {{ item.status }}
            </span>
            <PenLine class='text-checkbox_field_label_checked' :size="20" style="cursor:pointer;" />
          </div>
        </div>
      </div>
    </section>

    <!-- Section: Communications -->
    <v-row>

      <!-- Phone Numbers -->
      <v-col cols="12" lg="6">
        <section class="d-flex flex-column ga-2">
          <div class="d-flex align-center ga-2 mb-2">
            <div class="rounded-pill bg-orange-darken-1" style="height: 20px; width: 4px;" />
            <h4
              class='text-caption font-weight-black text-uppercase text-orange-darken-1'
              style="letter-spacing: 0.2em;"
            >
              Phone Directory
            </h4>
          </div>

          <div
            class="rounded-xl bg-summary_stat_card_bg text-financial_header_border shadow"
            style="border: 1px solid; transition: border-color 0.2s;"
          >
            <div
              v-for="item in phones"
              :key="item.id"
              class="d-flex align-center justify-space-between pa-4"
            >
              <div class="d-flex align-center ga-4">
                <input
                  type="checkbox"
                  :id="item.id"
                  style="width:20px; height:20px; border-radius:6px; accent-color: #2563eb;"
                />
                <div>
                  <div
                    class="d-flex align-center ga-2 text-caption font-weight-semi-bold mb-1"
                    style="letter-spacing: 0.1em;"
                    :style="item.colorStyle"
                  >
                    <component :is="item.icon" :size="14" />
                    {{ item.label }}
                    <span class='text-grey-darken-1'>Consented</span>
                  </div>
                  <div class='text-checkbox_field_label_checked'>{{ item.num }}</div>
                </div>
              </div>
              <div class="d-flex align-center ga-2">
                <span
                  class="px-2 py-1 rounded-pill font-weight-black text-uppercase"
                  style="font-size:12px;"
                  :style="item.status === 'Good'
                    ? 'background: rgba(72,199,142,0.1); color: #48c78e; border: 1px solid #48c78e;'
                    : 'background: rgba(255,82,82,0.1); color: #ff5252; border: 1px solid #ff5252;'"
                >
                  {{ item.status }}
                </span>
                <PenLine class='text-checkbox_field_label_checked' :size="20" style="cursor:pointer;" />
              </div>
            </div>
          </div>
        </section>
      </v-col>

      <!-- Email Addresses -->
      <v-col cols="12" lg="6">
        <section class="d-flex flex-column ga-2">
          <div class="d-flex align-center ga-2 mb-2">
            <div class="rounded-pill bg-teal-darken-1" style="height: 20px; width: 4px;" />
            <h4
              class='text-caption font-weight-black text-uppercase text-teal-lighten-1'
              style="letter-spacing: 0.2em;"
            >
              Email Accounts
            </h4>
          </div>

          <div
            class="rounded-xl bg-summary_stat_card_bg text-financial_header_border shadow"
            style="border: 1px solid; transition: border-color 0.2s;"
          >
            <div
              v-for="item in emails"
              :key="item.id"
              class="d-flex align-center justify-space-between pa-4"
            >
              <div class="d-flex align-center ga-4">
                <input
                  type="checkbox"
                  :id="item.id"
                  style="width:20px; height:20px; border-radius:6px; accent-color: #2563eb;"
                />
                <span class='text-body-2 text-checkbox_field_label_checked'>{{ item.mail }}</span>
                <span class='text-caption text-grey-darken-1'>Consented</span>
              </div>
              <div class="d-flex align-center ga-2">
                <span
                  class="px-2 py-1 rounded-pill font-weight-black text-uppercase"
                  style="font-size:12px;"
                  :style="item.status === 'Good'
                    ? 'background: rgba(72,199,142,0.1); color: #48c78e; border: 1px solid #48c78e;'
                    : 'background: rgba(255,82,82,0.1); color: #ff5252; border: 1px solid #ff5252;'"
                >
                  {{ item.status }}
                </span>
                <PenLine class='text-checkbox_field_label_checked' :size="20" style="cursor:pointer;" />
              </div>
            </div>
          </div>
        </section>
      </v-col>

    </v-row>

    <!-- Footer: Legal / Employment -->
    <div
      class="d-flex flex-column flex-md-row justify-space-between ga-4 pa-6 rounded-xl text-modal_border"
      style="border: 2px dashed; border-radius: 25px; background: transparent;"
    >
      <div class="d-flex align-center ga-3">
        <div
          class="pt-3 pl-3 pr-3 pb-1 rounded-lg" style="background: rgba(59,130,246,0.1);"
        >
          <User :size="20" class="text-blue" />
        </div>
        <div>
          <p
            class="font-weight-bold text-uppercase text-grey-darken-1"
            style="font-size:10px; letter-spacing:0.2em;"
            
          >
            Assignee Attorney
          </p>
          <p class='text-subtitle-1 text-checkbox_field_label_checked'>John Doe</p>
        </div>
      </div>

      <div class="d-flex align-center ga-3">
        <div
          class="pt-3 pl-3 pr-3 pb-1 rounded-lg" style="background: rgba(139,92,246,0.1);"
        >
          <Briefcase :size="20" class="text-purple" />
        </div>
        <div>
          <p
            class="font-weight-bold text-uppercase text-grey-darken-1"
            style="font-size:10px; letter-spacing:0.2em;"
            
          >
            Verified Employer
          </p>
          <p class='text-subtitle-1 text-checkbox_field_label_checked'>John Doe Architecture</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Briefcase, PenLine, Phone, Smartphone, User } from 'lucide-vue-next'


const addresses = [
  { id: 'home1', addr: '498 Elm Ave, San Bruno, CA 94066',              status: 'Good',    type: 'Home' },
  { id: 'home2', addr: '269 EL Camino Real, San Francisco, CA 94080',   status: 'Unknown', type: 'Work' },
]

const phones = computed(() => [
  {
    id: 'ph1', label: 'From Experian', num: '415-310-1981', status: 'Bad',
    icon: Phone,
    colorStyle: 'color: #16a34a;',
  },
  {
    id: 'ph2', label: 'From IDI', num: '415-310-4188', status: 'Good',
    icon: Smartphone,
    colorStyle: 'color: #ea580c;',
  },
])

const emails = [
  { id: 'em1', mail: 'boracaygarden@att.net',  status: 'Good' },
  { id: 'em2', mail: 'hyattgirl55@yahoo.com',  status: 'Bad'  },
]
</script>

<style>
.shadow {
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}
</style>
