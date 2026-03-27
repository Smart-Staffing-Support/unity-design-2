<template>
  <div class="d-flex ga-8 mt-6">
    <div class="flex-grow-1 d-flex flex-column" style="min-height: 600px; max-width: 1500px;">

      <div class="mb-6 position-relative" style="z-index: 40;">
        <!-- Main Tab Bar -->
        <div
          class="d-flex ga-2 pa-1 rounded-xl overflow-auto bg-client_header_bg border-sm text-client_header_border custom-scrollbar"
          style="backdrop-filter: blur(12px); transition: colors 0.3s ease;"
          :style="isDark ? '' : 'box-shadow: 0 10px 30px rgba(30,41,59,0.15);'"
        >
          <div
            v-for="tab in tabs"
            :key="tab.id"
            class="position-relative"
          >
              <button
              class="d-flex align-center ga-2 px-6 py-3 rounded-xl font-weight-medium text-uppercase"
              style="font-size: 11px; letter-spacing: 0.15em; white-space: nowrap; border: none; cursor: pointer; outline: none; transition: all 0.2s ease;"
              :style="
                activeTab === tab.id
                  ? 'background: #2563eb; color: white; box-shadow: 0 8px 24px rgba(37,99,235,0.3);'
                  : isDark
                    ? 'background: transparent; color: #bfdbfe;'
                    : 'background: transparent; color: #475569;'
              "
              @click="setTab(tab.id)"
            >
              <component :is="tab.icon" :size="18" />
              <span>{{ tab.label }}</span>
              <svg
                v-if="tab.submenu?.length"
                :style="`transition: transform 0.2s ease; transform: rotate(${openSubmenu === tab.id ? 180 : 0}deg); margin-left: 2px;`"
                width="12" height="12" viewBox="0 0 12 12" fill="none"
                @click.stop="toggleSubmenu(tab.id)"
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Full-Width Submenu Bar -->
        <transition name="submenu">
          <div
            v-if="visibleSubmenu"
            class="mt-2 pa-1 d-flex ga-1 rounded-xl overflow-auto bg-client_header_bg border-sm text-client_header_border custom-scrollbar"
            style="backdrop-filter: blur(12px); width: 100%;"
            :style="isDark ? '' : 'box-shadow: 0 6px 20px rgba(30,41,59,0.12);'"
          >
            <button
              v-for="(item, idx) in visibleSubmenu"
              :key="item"
              class="d-flex align-center ga-2 px-6 py-3 rounded-xl font-weight-medium text-uppercase"
              style="font-size: 11px; letter-spacing: 0.15em; white-space: nowrap; border: none; cursor: pointer; outline: none; transition: all 0.2s ease;"
              :style="
                activeCategory === item
                  ? 'background: #2563eb; color: white; box-shadow: 0 8px 24px rgba(37,99,235,0.3);'
                  : isDark
                    ? 'background: transparent; color: #bfdbfe;'
                    : 'background: transparent; color: #475569;'
              "
              @click="setCategory(item)"
            >
              <span>{{ item }}</span>
            </button>
          </div>
        </transition>
      </div>

      <!-- Tab Content -->
      <div
        v-for="tab in tabs"
        v-show="activeTab === tab.id"
        :key="tab.id"
        class="flex-grow-1 rounded-xl transition-all bg-client_header_bg border-sm text-client_header_border"
        style="border-radius: 24px !important; overflow-y: auto; backdrop-filter: blur(12px);"
        :style="isDark ? '' : 'box-shadow: 0 10px 30px rgba(30,41,59,0.15);'"
      >
        <div class="pa-8">
          <div class="d-flex justify-start align-start ga-12 mb-6">
            <div class="d-flex align-center ga-2">
              <div
                class="rounded-xl d-flex align-center justify-center"
                style="width: 40px; height: 40px; background: rgba(37,99,235,0.20);"
              >
                <component :is="tab.icon" :size="20" color="#3b82f6" />
              </div>
              <h2
                class="text-h6"
                style="letter-spacing: -0.3px;"
                :style="isDark ? 'color: white;' : 'color: #1e293b;'"
              >
                {{ tab.label }}<template v-if="activeCategory && tab.submenu?.length"> / {{ activeCategory }}</template>
              </h2>
            </div>

            <div v-if="entityTitle || entityId || entityStatus" class="d-flex align-center ga-2">
              <h2
                v-if="entityTitle"
                class="text-h4 mr-10"
                style="letter-spacing: -0.5px;"
                :style="isDark ? 'color: white;' : 'color: #1e293b;'"
              >
                {{ entityTitle }}
              </h2>
              <div class="d-flex align-center ga-6">
                <span
                  v-if="entityId"
                  class="text-title-large text-decoration-underline"
                  :style="isDark ? 'color: white;' : 'color: #1e293b;'"
                >
                  {{ entityId }}
                </span>
                <span
                  v-if="entityStatus"
                  class="text-title-large text-center rounded-pill px-6 py-1 align-self-start"
                  :style="
                    entityStatus.color === 'green'
                      ? isDark
                        ? 'background: rgba(34,197,94,0.20); color: #22c55e;'
                        : 'background: rgba(34,197,94,0.20); color: #16a34a;'
                      : entityStatus.color === 'red'
                        ? isDark
                          ? 'background: rgba(239,68,68,0.20); color: #f87171;'
                          : 'background: rgba(239,68,68,0.20); color: #dc2626;'
                        : entityStatus.color === 'yellow'
                          ? isDark
                            ? 'background: rgba(234,179,8,0.20); color: #facc15;'
                            : 'background: rgba(234,179,8,0.20); color: #ca8a04;'
                          : isDark
                            ? 'background: rgba(148,163,184,0.20); color: #94a3b8;'
                            : 'background: rgba(148,163,184,0.20); color: #475569;'
                  "
                >
                  {{ entityStatus.label }}
                </span>
              </div>
            </div>
          </div>

          <slot
            :name="`tab-${tab.id}`"
            :isDark="isDark"
            :active-category="activeCategory"
          >
            <component
              v-if="tab.component"
              :is="tab.component"
              :isDark="isDark"
              :active-category="activeCategory"
              v-bind="tab.componentProps || {}"
              class="animate-content"
            />
          </slot>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  entityTitle: {
    type: String,
    default: '',
  },
  entityId: {
    type: String,
    default: '',
  },
  entityStatus: {
    type: Object,
    default: null,
  },
  defaultTab: {
    type: String,
    default: null,
  },
})

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

const emit = defineEmits(['tab-change', 'category-change'])
const activeTab = ref(props.defaultTab ?? props.tabs[0]?.id ?? '')
const activeCategory = ref(props.tabs.find(t => t.id === activeTab.value)?.submenu?.[0] ?? '')
const openSubmenu = ref(
  props.tabs.find(t => t.id === activeTab.value)?.submenu?.length ? activeTab.value : null
)

// The submenu items to show — only when the active tab owns that open submenu
const visibleSubmenu = computed(() => {
  if (!openSubmenu.value) return null
  const tab = props.tabs.find(t => t.id === openSubmenu.value)
  // Only show submenu bar when the open submenu belongs to the active tab
  if (!tab?.submenu?.length || activeTab.value !== openSubmenu.value) return null
  return tab.submenu
})

function setTab(tabId) {
  activeTab.value = tabId
  const tab = props.tabs.find(t => t.id === tabId)

  if (tab?.submenu?.length) {
    // Keep submenu open when switching to a tab that has one
    openSubmenu.value = tabId
    if (!tab.submenu.includes(activeCategory.value)) {
      activeCategory.value = tab.submenu[0]
    }
  } else {
    // No submenu — close any open submenu
    openSubmenu.value = null
    activeCategory.value = ''
  }

  emit('tab-change', tabId)
}

function toggleSubmenu(tabId) {
  if (openSubmenu.value === tabId) {
    openSubmenu.value = null
  } else {
    openSubmenu.value = tabId
    // Also switch to that tab
    activeTab.value = tabId
    const tab = props.tabs.find(t => t.id === tabId)
    if (tab?.submenu?.length && !tab.submenu.includes(activeCategory.value)) {
      activeCategory.value = tab.submenu[0]
    }
    emit('tab-change', tabId)
  }
}

function setCategory(item) {
  activeCategory.value = item
  emit('category-change', item)
}

watch(activeCategory, (val) => {
  emit('category-change', val)
})
</script>

<style scoped>
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-content {
  animation: fadeInDown 0.2s ease-out;
}

.submenu-enter-active,
.submenu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>