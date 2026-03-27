<template>
  <div
    class="overflow-hidden border bg-table_container_bg text-table_container_border"
    style="border-radius: 35px; border: 1px solid; box-shadow: 0 4px 24px rgba(15,23,42,0.15);"
  >

    <!-- Header -->
    <div class="px-10 py-1 d-flex align-center justify-space-between border-b bg-table_header_bg text-table_header_border">
      <div class="d-flex align-center ga-4">
        <div class="pt-3 pl-3 pr-3 pb-1 rounded-xl" :style="`background: ${iconBg};`">
          <component :is="icon" v-if="icon" :style="`color: ${iconColor};`" :size="22" />
        </div>
        <div>
          <h3 class="text-h6 font-weight-bold text-table_title text-uppercase">{{ title }}</h3>
          <p class="font-weight-bold text-uppercase text-body-medium text-grey mt-1">
            {{ subtitle ?? `${data.length} results` }}
          </p>
        </div>
      </div>
      <div v-if="actions.length" class="d-flex ga-3">
        <v-btn
          v-for="action in actions"
          :key="action.id"
          :disabled="!!action.disabled"
          :variant="action.variant ?? 'tonal'"
          :color="action.color"
          class="rounded-xl text-label-medium table_btn_bg text-table_title font-weight-bold text-uppercase"
          style="border-radius: 16px;"
          @click="$emit('action', action.id)"
        >
          <component v-if="action.icon" :is="action.icon" :size="16" class="mr-2" />
          {{ action.label }}
        </v-btn>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto custom-scrollbar" style="max-width: 90vw;">
      <table class="w-100" style="border-collapse: collapse; ">
        <colgroup>
          <col style="width: 56px;" />
          <col v-for="col in columns" :key="col.key" />
          <col v-if="showDialogButton" style="width: 100px;" />
          <col v-if="showActionsDropDown" style="width: 80px;" />
          <col v-if="isExpandable" style="width: 48px;" />
        </colgroup>

        <thead>
          <tr class="border-b bg-table_header_row_bg text-table_header_row_border">
            <th class="px-6 py-4 text-center">
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
              class="px-6 py-4 text-caption font-weight-bold text-body-medium text-table_cols_title text-uppercase"
              style="white-space: nowrap; letter-spacing: 0.1em;"
              :style="{ textAlign: col.align ?? 'center' }"
            >
              {{ col.title }}
            </th>
            <th v-if="showDialogButton" class="px-6 py-4 text-center text-caption font-weight-bold text-body-medium text-table_cols_title text-uppercase" style="letter-spacing: 0.1em;">
              Details
            </th>
            <th v-if="showActionsDropDown" class="px-6 py-4 text-right text-caption font-weight-bold text-body-medium text-table_cols_title text-uppercase" style="letter-spacing: 0.1em;">
              Actions
            </th>
            <th v-if="isExpandable" />
          </tr>
        </thead>

        <tbody>
          <!-- Empty State -->
          <tr v-if="data.length === 0">
            <td
              :colspan="totalColumns"
              class="px-6 py-16 text-center text-sm font-weight-bold text-uppercase"
              style="letter-spacing: 0.1em;"
              :class="isDark ? 'text-grey-darken-1' : 'text-grey-lighten-1'"
            >
              No records found
            </td>
          </tr>

          <!-- Data Rows -->
          <template v-else v-for="(row, idx) in paginatedData" :key="String(getRowId(row))">

            <!-- Main Row -->
            <tr
              style="transition: background 0.15s;"
              :style="[
                isDark ? 'border-color: rgba(255,255,255,0.05);' : 'border-color: #e2e8f0;',
                isSelected(row)
                  ? (isDark ? 'background: rgba(59,130,246,0.1);' : 'background: rgba(219,234,254,0.3);')
                  : idx % 2 === 0
                    ? (isDark ? 'background: rgba(0,94,163,0.12);' : 'background: #ffffff;')
                    : (isDark ? 'background: rgba(255,255,255,0.01);' : 'background: #f1f5f9;')
              ]"
              class="fixed-height-row border-b"
              :class="isExpandable ? 'expandable-row' : 'hoverable-row'"
              @click="toggleExpand(getRowId(row))"
            >
              <td class="px-6 py-4 text-center">
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
                class="px-6 py-4 text-sm text-table_cell_text font-weight-bold text-truncate-custom"
                :style="{ textAlign: col.align ?? 'center' }"
                v-html="col.render
                  ? col.render(getNestedValue(row, col.key), row, theme)
                  : renderCell(getNestedValue(row, col.key))"
              />
              <td v-if="showDialogButton" class="px-6 py-4 text-center" @click.stop>
                <v-btn size="x-small" variant="flat" color="primary" class="rounded-lg font-weight-bold" @click="$emit('open-dialog', row)">
                  {{ dialogButtonLabel }}
                </v-btn>
              </td>
              <td v-if="showActionsDropDown" class="px-6 py-4 text-right" @click.stop>
                <v-menu location="bottom end" transition="scale-transition">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" :icon="EllipsisVertical" variant="text" density="comfortable" color="grey-darken-1" />
                  </template>
                  <v-list class="rounded-lg border bg-main_background" elevation="4" density="compact">
                    <v-list-item :prepend-icon="Pencil" title="Edit" value="edit" @click="$emit('edit', row)" />
                    <v-list-item :prepend-icon="TrashIcon" title="Delete" value="delete" class="text-error" @click="$emit('delete', row)" />
                  </v-list>
                </v-menu>
              </td>
              <td v-if="isExpandable" class="px-4 text-center">
                <span
                  class="text-grey"
                  style="display: inline-block; transition: transform 0.3s;"
                  :style="isExpanded(getRowId(row)) ? 'transform: rotate(180deg);' : ''"
                >▾</span>
              </td>
            </tr>

            <!--
              Transaction row — always in the DOM so the max-height CSS transition
              can animate both open and close. Content scrolls horizontally inside
              its own overflow-x: auto div, independent of the outer table scroll.
            -->
            <tr
              v-if="isExpandable"
              :style="isDark ? 'background:rgba(255,255,255,0.03);' : 'background:rgba(237,244,255,0.6);'"
            >
              <td
                :colspan="totalColumns"
                class="pa-0"
                style="transition: border-color 0.3s;"
                :style="isExpanded(getRowId(row)) ? 'border-left: 3px solid #2563eb;' : 'border-left: 3px solid transparent;'"
              >
                <!-- Slide wrapper: max-height 0 → open drives the animation -->
                <div class="txn-slide" :class="{ 'txn-slide--open': isExpanded(getRowId(row)) }">

                  <!-- No transactions -->
                  <div
                    v-if="!getTransactions(row).length"
                    class="px-10 py-4 text-center text-caption text-grey font-weight-bold text-uppercase"
                    style="letter-spacing:0.1em;"
                  >
                    No transactions found
                  </div>

                  <!-- Scrollable transaction sub-table -->
                  <div v-else style="overflow-x: auto;">
                    <table style="border-collapse: collapse; min-width: max-content; width: 100%;">
                      <thead>
                        <tr :style="isDark ? 'background:rgba(255,255,255,0.06);' : 'background:rgba(59,130,246,0.10);'">
                          <th
                            v-for="field in expandedFields"
                            :key="field.key"
                            class="px-6 py-2 text-caption font-weight-bold text-uppercase text-table_cols_title"
                            style="white-space: nowrap; letter-spacing: 0.1em; text-align: center;"
                          >
                            {{ field.label }}
                          </th>
                          <th v-if="showExpandableDialog" style="width: 100px;" />
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(txn, txnIdx) in getTransactions(row)"
                          :key="txnIdx"
                          class="border-b"
                          :style="[
                            isDark
                              ? txnIdx % 2 === 0 ? 'background:rgba(255,255,255,0.04);' : 'background:rgba(255,255,255,0.02);'
                              : txnIdx % 2 === 0 ? 'background:rgba(59,130,246,0.05);' : 'background:rgba(59,130,246,0.02);',
                            isDark ? 'border-color:rgba(255,255,255,0.04);' : 'border-color:#e2e8f0;'
                          ]"
                        >
                          <td
                            v-for="field in expandedFields"
                            :key="field.key"
                            class="px-6 py-3 text-sm text-table_cell_text font-weight-bold"
                            style="text-align: center; white-space: nowrap;"
                            v-html="field.render
                              ? field.render(getNestedValue(txn, field.key), txn, theme)
                              : renderCell(getNestedValue(txn, field.key))"
                          />
                          <td v-if="showExpandableDialog" class="px-4 py-3 text-center" @click.stop>
                            <v-btn
                              size="x-small" variant="flat" color="primary" class="rounded-lg font-weight-bold"
                              @click="$emit('open-expandable-dialog', { row, transaction: txn })"
                            >
                              {{ expandableDialogBtn }}
                            </v-btn>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              </td>
            </tr>

          </template>
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div class="px-10 py-4 d-flex align-center justify-space-between border-t bg-table_footer_bg">
      <div class="d-flex align-center ga-4">
        <span class="text-caption font-weight-bold text-grey-darken-1 text-uppercase">
          {{ selectedIds.size }} of {{ data.length }} selected
        </span>
        <v-btn v-if="selectedIds.size > 0" size="x-small" color="blue-darken-1" class="rounded-pill" @click="handleBulkAction">
          {{ bulkActionLabel }}
        </v-btn>
      </div>

      <div v-if="data.length > rowsPerPage" class="d-flex align-center ga-2">
        <v-btn :icon="ChevronLeft" variant="text" density="comfortable" :disabled="currentPage === 1" @click="currentPage--" />
        <span class="text-caption font-weight-black text-table_cell_text">PAGE {{ currentPage }} OF {{ totalPages }}</span>
        <v-btn :icon="ChevronRight" variant="text" density="comfortable" :disabled="currentPage === totalPages" @click="currentPage++" />
      </div>

      <span class="text-caption font-weight-bold text-grey-darken-1">
        SHOWING {{ data.length > 0 ? startRange : 0 }}-{{ endRange }} OF {{ data.length }}
      </span>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { EllipsisVertical, Pencil, TrashIcon, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useTheme } from 'vuetify'

const props = defineProps({
  theme: { type: String, default: 'light' },
  data: { type: Array, required: true },
  columns: { type: Array, required: true },
  rowKey: { type: String, default: 'id' },
  transactionsKey: { type: String, default: 'transactions' },
  title: { type: String, default: null },
  subtitle: { type: String, default: null },
  icon: { type: Object, default: null },
  iconBg: { type: String, default: null },
  iconColor: { type: String, default: null },
  expandedFields: { type: Array, default: () => [] },
  bulkActionLabel: { type: String, default: 'Apply Bulk Actions' },
  actions: { type: Array, default: () => [] },
  showActionsDropDown: { type: Boolean, default: false },
  showDialogButton: { type: Boolean, default: false },
  dialogButtonLabel: { type: String, default: 'View' },
  showExpandableDialog: { type: Boolean, default: false },
  expandableDialogBtn: { type: String, default: 'Show' },
})

const currentPage = ref(1)
const rowsPerPage = ref(25)

watch(() => props.data, () => { currentPage.value = 1 })

const totalPages = computed(() => Math.ceil(props.data.length / rowsPerPage.value))
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  return props.data.slice(start, start + rowsPerPage.value)
})
const startRange = computed(() => (currentPage.value - 1) * rowsPerPage.value + 1)
const endRange = computed(() => Math.min(currentPage.value * rowsPerPage.value, props.data.length))

const emit = defineEmits(['action', 'bulk-action', 'edit', 'delete', 'open-dialog', 'open-expandable-dialog'])
const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

const selectedIds = ref(new Set())
const expandedRows = ref(new Set())

const isExpandable = computed(() => Array.isArray(props.expandedFields) && props.expandedFields.length > 0)

const totalColumns = computed(() => {
  let count = props.columns.length + 1
  if (isExpandable.value) count += 1
  if (props.showActionsDropDown) count += 1
  if (props.showDialogButton) count += 1
  return count
})

const getRowId = (row) => row[props.rowKey]
const isSelected = (row) => selectedIds.value.has(getRowId(row))
const isExpanded = (id) => expandedRows.value.has(id)

const getTransactions = (row) => {
  const txns = row[props.transactionsKey]
  return Array.isArray(txns) ? txns : []
}

const toggleSelectAll = () => {
  selectedIds.value = selectedIds.value.size === props.data.length
    ? new Set()
    : new Set(props.data.map(getRowId))
}

const toggleRow = (id) => {
  const next = new Set(selectedIds.value)
  next.has(id) ? next.delete(id) : next.add(id)
  selectedIds.value = next
}

const toggleExpand = (id) => {
  if (!isExpandable.value) return
  const next = new Set(expandedRows.value)
  next.has(id) ? next.delete(id) : next.add(id)
  expandedRows.value = next
}

const handleBulkAction = () => {
  emit('bulk-action', props.data.filter((row) => selectedIds.value.has(getRowId(row))))
}

const getNestedValue = (obj, key) => {
  if (!key) return undefined
  return key.split('.').reduce((acc, k) => (acc && typeof acc === 'object' ? acc[k] : undefined), obj)
}

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
.text-truncate-custom {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}

.fixed-height-row td {
  height: 64px;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  vertical-align: middle;
}

.expandable-row { cursor: pointer; }
.expandable-row:hover { background: rgba(255,255,255,0.05) !important; }
.hoverable-row:hover  { background: rgba(107,107,107,0.2) !important; }

/* Slide open/close — max-height drives the animation */
.txn-slide {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.txn-slide--open {
  max-height: 600px; /* tall enough for many transactions */
}
</style>