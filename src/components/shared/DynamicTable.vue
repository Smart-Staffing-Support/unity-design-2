<template>
  <div
    class="overflow-hidden"
    style="border-radius: 35px; border: 1px solid;"
    :style="isDark
      ? 'background: rgba(15,23,42,0.4); border-color: rgba(255,255,255,0.05);'
      : 'background: transparent; border-color: #cbd5e1; box-shadow: 0 4px 24px rgba(15,23,42,0.15);'"
  >

    <!-- Header -->
    <div
      class="px-10 py-6 d-flex align-center justify-space-between"
      style="border-bottom: 1px solid;"
      :style="isDark
        ? 'border-color: rgba(255,255,255,0.05); background: rgba(30,41,59,0.5);'
        : 'border-color: #e2e8f0; background: rgba(240,249,255,0.5);'"
    >
      <div class="d-flex align-center ga-4">
        <div class="pa-3 rounded-xl" style="background: rgba(34,197,94,0.1);">
          <component :is="icon" v-if="icon" class="text-green" :size="22" />
        </div>
        <div>
          <h3
            class="text-h6 font-weight-black text-uppercase"
            style="letter-spacing: -0.01em;"
            :class="isDark ? 'text-white' : 'text-grey-darken-4'"
          >
            {{ title }}
          </h3>
          <p class="font-weight-bold text-uppercase text-grey mt-1" style="font-size: 10px; letter-spacing: 0.05em;">
            {{ subtitle ?? `${data.length} accounts match your criteria` }}
          </p>
        </div>
      </div>
      <div class="d-flex ga-3">
        <v-btn
          variant="tonal"
          :color="isDark ? 'white' : 'grey-darken-1'"
          class="rounded-xl font-weight-black text-uppercase"
          style="font-size: 0.7rem; letter-spacing: 0.1em; border-radius: 16px;"
          @click="$emit('export')"
        >
          <Download :size="16" class="mr-2" /> Export
        </v-btn>
        <v-btn
          variant="tonal"
          :color="isDark ? 'white' : 'grey-darken-1'"
          class="rounded-xl font-weight-black text-uppercase"
          style="font-size: 0.7rem; letter-spacing: 0.1em; border-radius: 16px;"
          @click="$emit('email-results')"
        >
          <Mail :size="16" class="mr-2" /> Email Results
        </v-btn>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-100" style="border-collapse: collapse;">
        <thead>
          <tr
            style="border-bottom: 1px solid;"
            :style="isDark
              ? 'border-color: rgba(255,255,255,0.05); background: rgba(255,255,255,0.02);'
              : 'border-color: #e2e8f0; background: rgba(255,255,255,0.5);'"
          >
            <th class="px-6 py-4 text-left" style="width: 40px;">
              <input
                type="checkbox"
                :checked="data.length > 0 && selectedIds.size === data.length"
                @change="toggleSelectAll"
                style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;"
              />
            </th>
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-6 py-4 text-caption font-weight-black text-uppercase"
              style="white-space: nowrap; letter-spacing: 0.1em;"
              :style="{ textAlign: col.align ?? 'left' }"
              :class="isDark ? 'text-cyan-lighten-2' : 'text-blue-darken-1'"
            >
              {{ col.title }}
            </th>
            <th v-if="isExpandable" style="width: 40px;" />
          </tr>
        </thead>
        <tbody>

          <!-- Empty State -->
          <tr v-if="data.length === 0">
            <td
              :colspan="columns.length + (isExpandable ? 2 : 1)"
              class="px-6 py-16 text-center text-sm font-weight-bold text-uppercase"
              style="letter-spacing: 0.1em;"
              :class="isDark ? 'text-grey-darken-1' : 'text-grey-lighten-1'"
            >
              No records found
            </td>
          </tr>

          <!-- Data Rows -->
          <template v-else v-for="(row, idx) in data" :key="String(getRowId(row))">

            <!-- Main Row -->
            <tr
              style="border-bottom: 1px solid; transition: background 0.15s;"
              :style="[
                isDark ? 'border-color: rgba(255,255,255,0.05);' : 'border-color: #e2e8f0;',
                isSelected(row)
                  ? (isDark ? 'background: rgba(59,130,246,0.1);' : 'background: rgba(219,234,254,0.3);')
                  : idx % 2 === 0
                    ? (isDark ? 'background: rgba(255,255,255,0.02);' : 'background: #e5e7eb;')
                    : ''
              ]"
              :class="isExpandable ? 'expandable-row' : 'hoverable-row'"
              @click="toggleExpand(getRowId(row))"
            >
              <td class="px-6 py-4">
                <input
                  type="checkbox"
                  :checked="isSelected(row)"
                  @change.stop="toggleRow(getRowId(row))"
                  @click.stop
                  style="width:16px; height:16px; accent-color: #2563eb; cursor:pointer;"
                />
              </td>
              <td
                v-for="col in columns"
                :key="col.key"
                class="px-6 py-4 text-sm font-weight-bold"
                :style="{ textAlign: col.align ?? 'left' }"
                :class="isDark ? 'text-white' : 'text-grey-darken-4'"
                v-html="col.render
                  ? col.render(getNestedValue(row, col.key), row, theme)
                  : renderCell(getNestedValue(row, col.key))"
              />
              <td v-if="isExpandable" class="px-4 py-4 text-right">
                <span
                  class="text-grey"
                  style="display: inline-block; transition: transform 0.3s;"
                  :style="expandedRow === getRowId(row) ? 'transform: rotate(180deg);' : ''"
                >▾</span>
              </td>
            </tr>

            <!-- Expanded Panel -->
            <tr
              v-if="isExpandable"
              :style="expandedRow === getRowId(row)
                ? (isDark ? 'background: rgba(255,255,255,0.1);' : 'background: rgba(59,130,246,0.6);')
                : 'pointer-events: none; opacity: 0;'"
            >
              <td :colspan="columns.length + 2" class="pa-0">
                <div
                  style="overflow: hidden; transition: max-height 0.3s;"
                  :style="expandedRow === getRowId(row) ? 'max-height: 500px;' : 'max-height: 0;'"
                >
                  <div class="px-6 py-5">
                    <div
                      class="d-flex ga-4 text-sm"
                      style="display: grid;"
                      :style="`grid-template-columns: repeat(${expandedFields.length}, minmax(0, 1fr));`"
                    >
                      <div
                        v-for="field in expandedFields"
                        :key="field.key"
                        class="d-flex flex-column align-center ga-1"
                        :style="field.separator ? 'border-left: 1px solid rgba(255,255,255,0.3); padding-left: 16px;' : ''"
                      >
                        <p
                          class="text-caption font-weight-bold text-uppercase"
                          style="white-space: nowrap; letter-spacing: 0.05em;"
                          :style="field.color ? `color: ${field.color}` : ''"
                          :class="!field.color ? (isDark ? 'text-cyan-lighten-2' : 'text-grey-darken-3') : ''"
                        >
                          {{ field.label }}
                        </p>
                        <p
                          class="text-white text-center text-sm font-weight-semi-bold"
                          v-html="field.render
                            ? field.render(getNestedValue(row, field.key), row, theme)
                            : renderCell(getNestedValue(row, field.key))"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

          </template>
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div
      class="px-10 py-6 d-flex align-center justify-space-between"
      style="border-top: 1px solid;"
      :style="isDark
        ? 'border-color: rgba(255,255,255,0.05); background: rgba(255,255,255,0.02);'
        : 'border-color: #e2e8f0; background: rgba(255,255,255,0.3);'"
    >
      <span
        class="text-caption font-weight-bold text-uppercase"
        style="letter-spacing: 0.05em;"
        :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'"
      >
        {{ selectedIds.size }} of {{ data.length }} selected
      </span>
      <v-btn
        :disabled="selectedIds.size === 0"
        :color="selectedIds.size > 0 ? 'blue-darken-1' : (isDark ? 'grey-darken-2' : 'grey-lighten-2')"
        variant="elevated"
        class="rounded-xl font-weight-black text-uppercase"
        style="font-size: 0.7rem; letter-spacing: 0.1em; border-radius: 16px;"
        :style="selectedIds.size > 0 ? 'box-shadow: 0 4px 16px rgba(37,99,235,0.2);' : ''"
        @click="handleBulkAction"
      >
        {{ bulkActionLabel }}
      </v-btn>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Download, Mail } from 'lucide-vue-next'

const props = defineProps({
  theme:           { type: String,  default: 'light'              },
  data:            { type: Array,   required: true                },
  columns:         { type: Array,   required: true                },
  rowKey:          { type: String,  default: 'id'                 },
  title:           { type: String,  default: 'Filter Results'     },
  subtitle:        { type: String,  default: null                 },
  icon:            { type: Object,  default: null                 },
  expandedFields:  { type: Array,   default: () => []             },
  bulkActionLabel: { type: String,  default: 'Apply Bulk Actions' },
})

const emit = defineEmits(['export', 'email-results', 'bulk-action'])

const isDark = computed(() => props.theme === 'dark')

const selectedIds = ref(new Set())
const expandedRow = ref(null)

const isExpandable = computed(() =>
  Array.isArray(props.expandedFields) && props.expandedFields.length > 0
)

const getRowId = (row) => row[props.rowKey]

const isSelected = (row) => selectedIds.value.has(getRowId(row))

const toggleSelectAll = () => {
  if (selectedIds.value.size === props.data.length) {
    selectedIds.value = new Set()
  } else {
    selectedIds.value = new Set(props.data.map(getRowId))
  }
}

const toggleRow = (id) => {
  const next = new Set(selectedIds.value)
  next.has(id) ? next.delete(id) : next.add(id)
  selectedIds.value = next
}

const toggleExpand = (id) => {
  if (!isExpandable.value) return
  expandedRow.value = expandedRow.value === id ? null : id
}

const handleBulkAction = () => {
  const selectedRows = props.data.filter((row) => selectedIds.value.has(getRowId(row)))
  emit('bulk-action', selectedRows)
}

const getNestedValue = (obj, key) =>
  key.split('.').reduce((acc, k) => (acc && typeof acc === 'object' ? acc[k] : undefined), obj)

const renderCell = (value) => {
  if (value === null || value === undefined)
    return '<span style="color:#64748b;">—</span>'
  if (typeof value === 'boolean')
    return `<span style="display:inline-flex;align-items:center;gap:6px;font-size:0.75rem;font-weight:700;text-transform:uppercase;color:${value ? '#4ade80' : '#f87171'}">
              <span style="width:6px;height:6px;border-radius:50%;background:${value ? '#4ade80' : '#f87171'};"></span>
              ${value ? 'Yes' : 'No'}
            </span>`
  if (typeof value === 'object')
    return `<code style="font-size:11px;background:rgba(30,41,59,0.8);color:#4ade80;padding:2px 6px;border-radius:4px;font-family:monospace;">${JSON.stringify(value)}</code>`
  return String(value)
}
</script>

<style scoped>
.expandable-row { cursor: pointer; }
.expandable-row:hover { background: rgba(255,255,255,0.05) !important; }
.hoverable-row:hover  { background: rgba(255,255,255,0.05) !important; }
</style>
