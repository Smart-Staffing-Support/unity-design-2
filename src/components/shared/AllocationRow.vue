<!-- AllocationRow.vue -->
<template>
  <div
    class="allocation-row pa-4"
    style="border-bottom: 1px solid; transition: background 0.15s;"
    :style="isDark
      ? 'border-color: rgba(255,255,255,0.1);'
      : 'border-color: #d1d5db;'"
  >
    <v-row align="center">

      <!-- Label -->
      <v-col cols="12" md="3">
        <span
          class="text-sm"
          :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'"
        >
          {{ label }}
        </span>
      </v-col>

      <!-- Inputs -->
      <v-col cols="12" md="9">
        <v-row>
          <v-col
            v-for="field in fields"
            :key="field.prefix"
            cols="4"
          >
            <div class="position-relative">
              <input
                type="text"
                placeholder="0.00"
                class="allocation-input w-100"
                :class="isDark ? 'allocation-input-dark' : 'allocation-input-light'"
              />
              <span
                class="position-absolute font-weight-medium"
                style="left: 12px; top: 50%; transform: translateY(-50%); font-size: 10px; color: #94a3b8; pointer-events: none;"
              >
                {{ field.prefix }}
              </span>
            </div>
          </v-col>
        </v-row>
      </v-col>

    </v-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'

//export default {
  //name: 'AllocationRow',

  const props = defineProps ({
    label: { type: String, required: true },
    theme: { type: String, default: 'light' },
  })

  //setup(props) {
    const isDark = computed(() => props.theme === 'dark')

    const fields = [
      { prefix: 'adv %' },
      { prefix: 'atty %' },
      { prefix: 'age %' },
    ]

    //return { isDark, fields }
  //},
//}
</script>

<style scoped>
.allocation-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.allocation-input {
  padding: 8px 12px 8px 44px;
  border-radius: 12px;
  border-width: 1px;
  border-style: solid;
  font-size: 0.75rem;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}

.allocation-input-dark {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}
.allocation-input-dark:focus {
  border-color: rgba(59, 130, 246, 0.5);
}

.allocation-input-light {
  background: #ffffff;
  border-color: #94a3b8;
  color: #334155;
}
.allocation-input-light:focus {
  border-color: #60a5fa;
}
</style>