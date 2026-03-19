
<template>
  <ContactInfoMenu v-if="category === 'Contact Info'" :theme="theme" />
  <SkipTracing     v-else-if="category === 'Skip Tracing'" :theme="theme" />
  <Dispute         v-else-if="category === 'dispute'" :theme="theme" />
  <ExperianReports v-else-if="category === 'experian reports'" :theme="theme" />
  <Settlement      v-else-if="category === 'settlement'" :theme="theme" />

  <div v-else class="d-flex flex-column align-center justify-center py-20" style="opacity: 0.4;">
    <div
      class="rounded-circle d-flex align-center justify-center mb-4"
      style="width: 64px; height: 64px; background: rgba(255,255,255,0.1);"
    >
      <Activity :size="32" />
    </div>
    <p class="font-weight-black text-uppercase" style="font-size: 10px; letter-spacing: 0.15em;">
      Developing specialized workflow for {{ category }}...
    </p>
  </div>
</template>

<script setup>
import { Activity } from 'lucide-vue-next'
import ContactInfoMenu from '../ContactInfoMenu.vue'
import SkipTracing from '../SkipTracing.vue'
import Dispute from '../Dispute.vue'
import ExperianReports from '../ExperianReports.vue'
import Settlement from '../Settlement.vue'

//export default {
  //name: 'CategoryView',
  //components: { Activity, ContactInfoMenu, SkipTracing, Dispute, ExperianReports, Settlement },
  const props = defineProps({
    category: { type: String, required: true },
    theme: { type: String, default: 'light' },
    activeCreditor: { type: String, default: 'creditor 1' },
  })
//}
</script>