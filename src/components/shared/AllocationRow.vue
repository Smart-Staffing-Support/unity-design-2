<!-- AllocationRow.vue — colors aligned with collections-design/TransactionAllocations.tsx -->
<template>
  <div
    class="allocation-row pa-4 border-0 border-b-sm border-alloc_row_border"
  >
    <v-row align="center">

      <!-- Label -->
      <v-col cols="12" md="3">
        <span
          class="text-sm text-alloc_label"
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
                class="allocation-input w-100 bg-alloc_input_bg border-alloc_input_border text-alloc_input_text"
              />
              <span
                class="position-absolute font-weight-medium text-alloc_prefix"
                style="left: 12px; top: 50%; transform: translateY(-50%); font-size: 10px; pointer-events: none;"
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
  defineProps ({
    label: { type: String, required: true },
  })

    const fields = [
      { prefix: 'adv %' },
      { prefix: 'atty %' },
      { prefix: 'age %' },
    ]

</script>

<style scoped>
.allocation-row {
  transition: background-color 0.15s;
}

.allocation-row:hover {
  background-color: rgb(var(--v-theme-alloc_row_hover));
}

.allocation-input {
  padding: 8px 12px 8px 44px;
  border-radius: 12px;
  border-width: 1px;
  border-style: solid;
  font-size: 0.75rem;
  outline: none;
  transition: border-color 0.2s, background-color 0.2s;
}

.allocation-input:focus {
  border-color: rgb(var(--v-theme-alloc_input_focus));
  outline: none;
}
</style>
