<template>
  <div class="d-flex flex-column ga-6">

    <!-- Header & Breadcrumb -->
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center ga-4">
        <v-btn
          v-if="activeFolder"
          :icon="true"
          variant="text"
          :color="isDark ? 'white' : 'grey-darken-1'"
          class="rounded-circle"
          @click="activeFolder = null"
        >
          <ChevronLeft :size="20" />
        </v-btn>
        <div>
          <h2
            class="text-h5 font-weight-regular"
            :class="isDark ? 'text-white' : 'text-grey-darken-3'"
          >
            {{ activeFolder ? activeFolder.name : 'Documents' }}
          </h2>
          <p class="d-flex align-center ga-1 text-caption text-blue">
            <HardDrive :size="12" />
            {{ activeFolder ? `Internal storage / ${activeFolder.name}` : 'Root directory' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Grid Container -->
    <div
      class="pa-8"
      style="border-radius: 35px; border: 1px solid; min-height: 400px; transition: all 0.2s;"
      :style="isDark
        ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.1);'
        : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
    >
      <v-row>

        <!-- Root View: Folders -->
        <template v-if="!activeFolder">
          <v-col
            v-for="folder in directory"
            :key="folder.id"
            cols="6" md="3" lg="2"
            class="d-flex justify-center"
          >
            <div
              class="d-flex flex-column align-center ga-3 folder-item"
              style="cursor: pointer; user-select: none; width: max-content;"
              @dblclick="activeFolder = folder"
            >
              <div
                class="d-flex align-center justify-center rounded-xl folder-icon"
                style="width: 80px; height: 80px; transition: background 0.2s;"
                :style="isDark
                  ? 'background: rgba(255,255,255,0.05);'
                  : 'background: #ffffff; border: 2px solid rgba(37,99,235,0.5);'"
              >
                <Folder :size="40" class="text-blue" />
              </div>
              <span
                class="text-caption text-center folder-label"
                style="transition: color 0.2s;"
                :class="isDark ? 'text-grey-lighten-1' : 'text-grey-darken-1'"
              >
                {{ folder.name }}
              </span>
            </div>
          </v-col>
        </template>

        <!-- Folder View: Files -->
        <template v-else-if="activeFolder.files.length > 0">
          <v-col
            v-for="file in activeFolder.files"
            :key="file.id"
            cols="6" md="3" lg="2"
            class="d-flex justify-center"
          >
            <div
              class="d-flex flex-column align-center ga-3 file-item"
              style="cursor: pointer; user-select: none;"
            >
              <div
                class="d-flex align-center justify-center rounded-xl file-icon"
                style="width: 80px; height: 80px; transition: background 0.2s;"
                :style="isDark
                  ? 'background: rgba(255,255,255,0.05);'
                  : 'background: #f8fafc;'"
              >
                <FileText :size="40" class="text-grey file-icon-svg" style="transition: color 0.2s;" />
              </div>
              <div class="text-center">
                <p
                  class="text-caption"
                  style="max-width: 96px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                  :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-2'"
                >
                  {{ file.name }}
                </p>
                <p class="text-grey" style="font-size: 10px;">{{ file.size }}</p>
              </div>
            </div>
          </v-col>
        </template>

        <!-- Empty Folder -->
        <template v-else>
          <v-col cols="12" class="d-flex flex-column align-center justify-center py-20" style="opacity: 0.3;">
            <Folder :size="48" class="mb-2" />
            <p class="text-body-2">This folder is empty</p>
          </v-col>
        </template>

      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Folder, FileText, ChevronLeft, HardDrive } from 'lucide-vue-next'

const props = defineProps({
  theme: { type: String, default: 'light' },
})

const isDark = computed(() => props.theme === 'dark')

const directory = ref([
  {
    id: '1',
    name: 'Client agreements',
    type: 'folder',
    files: [
      { id: 'f1', name: 'Standard_contract.pdf',        type: 'file', size: '1.2mb' },
      { id: 'f2', name: 'Service_level_agreement.docx', type: 'file', size: '850kb' },
    ],
  },
  {
    id: '2',
    name: 'Financial reports',
    type: 'folder',
    files: [
      { id: 'f3', name: 'Q1_earnings.csv', type: 'file', size: '2.4mb' },
    ],
  },
  {
    id: '3',
    name: 'Legal notices',
    type: 'folder',
    files: [],
  },
])

const activeFolder = ref(null)
</script>

<style scoped>
.folder-item:hover .folder-icon {
  background: rgba(59, 130, 246, 0.1) !important;
}
.folder-item:hover .folder-label {
  color: #1e293b;
}
.file-item:hover .file-icon {
  background: #f1f5f9 !important;
}
.file-item:hover .file-icon-svg {
  color: #3b82f6 !important;
}
</style>