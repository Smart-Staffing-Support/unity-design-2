<script setup>
import { computed, ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import {
  Home,
  Search,
  Calendar,
  Users,
  BarChart2,
  Briefcase,
  Wrench,
  Settings,
  Clock,
  Filter,
  Star,
  Target,
  Handshake,
  DollarSign,
  TrendingUp,
  UserCheck,
  CreditCard,
  FileText,
  Cpu,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
  ChevronDown,
} from 'lucide-vue-next';

const props = defineProps({
  activeTab: String,
});

const emit = defineEmits(['update:activeTab']);

const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark';
};

// Sidebar hover / expansion (used to show labels vs icons-only)
const isHovered = ref(false);

// Open submenu groups (Vuetify expects an array; we enforce max 1 open)
const opened = ref([]);
const onOpenedUpdate = (val) => {
  if (!Array.isArray(val) || val.length === 0) {
    opened.value = [];
    return;
  }
  opened.value = [val[val.length - 1]];
};

watch(isHovered, (hovered) => {
  if (!hovered) opened.value = [];
});

// Navigation Data
const navItems = [
  { id: 'home', icon: Home, label: 'Home', hasSubmenu: false },
  {
    id: 'search', icon: Search, label: 'Search', hasSubmenu: true,
    sublinks: [{ text: 'Recent', icon: Clock }, { text: 'Advanced', icon: Filter }]
  },
  {
    id: 'calendar', icon: Calendar, label: 'Calendar', hasSubmenu: true,
    sublinks: [{ text: 'Events', icon: Star }, { text: 'Schedule', icon: Clock }]
  },
  {
    id: 'crm', icon: Users, label: 'CRM', hasSubmenu: true,
    sublinks: [{ text: 'Leads', icon: Target }, { text: 'Clients', icon: Handshake }]
  },
  {
    id: 'reports', icon: BarChart2, label: 'Reports', hasSubmenu: true,
    sublinks: [{ text: 'Sales', icon: DollarSign }, { text: 'Traffic', icon: TrendingUp }]
  },
  {
    id: 'hr', icon: Briefcase, label: 'HR', hasSubmenu: true,
    sublinks: [{ text: 'Staff', icon: UserCheck }, { text: 'Payroll', icon: CreditCard }]
  },
  {
    id: 'tools', icon: Wrench, label: 'Tools', hasSubmenu: true,
    sublinks: [{ text: 'Logs', icon: FileText }, { text: 'API', icon: Cpu }]
  },
  { id: 'settings', icon: Settings, label: 'Settings', hasSubmenu: false },
];
</script>

<template>
  <v-navigation-drawer
    class="custom-sidebar d-flex flex-column justify-space-between bg-sidebar"
    :rail="!isHovered"
    permanent
    expand-on-hover
    rail-width="80"
    width="280"
    :elevation="isDark ? 0 : 12"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="flex-1-1-auto overflow-y-auto px-2">
      <v-list
        v-model:opened="opened"
        nav
        density="comfortable"
        class="py-0"
        @update:opened="onOpenedUpdate"
      >
        <template v-for="item in navItems" :key="item.id">
          <!-- Simple item -->
          <v-list-item
            v-if="!item.hasSubmenu"
            :value="item.id"
            :active="activeTab === item.id"
            base-color="sidebarItem"
            active-class="bg-sidebarActive text-sidebarActiveText"
            class="my-7 rounded-xl d-flex align-center"
            @click="emit('update:activeTab', item.id)"
          >
            <template #prepend>
              <span
                class="d-inline-flex align-center justify-center text-sidebarIcons"
                :class="isHovered ? 'me-4' : 'ml-1'"
              >
                <component :is="item.icon" size="24" />
              </span>
            </template>
            <span v-if="isHovered">
              {{ item.label }}
            </span>
          </v-list-item>

          <!-- Group with submenu -->
          <v-list-group
            v-else
            :value="item.id"
            :disabled="!isHovered"
          >
            <template #activator="{ props, isOpen }">
              <v-list-item
                v-bind="props"
                base-color="sidebarItem"
                class="my-7 rounded-xl d-flex align-center"
              >
                <template #prepend>
                  <span
                    class="d-inline-flex align-center justify-center text-sidebarIcons"
                    :class="isHovered ? 'me-4' : ''"
                  >
                    <component :is="item.icon" size="24" />
                  </span>
                </template>
                <span v-if="isHovered">
                  {{ item.label }}
                </span>
                <template #append>
                  <span class="ms-auto d-inline-flex align-center" v-if="isHovered">
                    <component :is="isOpen ? ChevronDown : ChevronRight" size="20" />
                  </span>
                </template>
              </v-list-item>
            </template>

            <v-list-item
              v-for="sub in item.sublinks"
              :key="sub.text"
              v-if="isHovered"
              base-color="sidebarItem"
              class="my-1 rounded-lg d-flex align-center"
            >
              <template #prepend>
                <span class="d-inline-flex align-center justify-center me-3 text-sidebarIcons">
                  <component :is="sub.icon" size="24" />
                </span>
              </template>
              <span>
                {{ sub.text }}
              </span>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </div>

    <template #append>
      <div class="pa-3 d-flex flex-column align-center ga-4">
        <v-btn
          icon
          variant="text"
          rounded="xl"
          color="toggleThemeIcon"
          @click="toggleTheme"
        >
          <component :is="isDark ? Sun : Moon" size="24" />
        </v-btn>

        <v-btn
          icon
          variant="text"
          rounded="xl"
          color="error"
        >
          <LogOut size="24" />
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.custom-sidebar {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
}
</style>