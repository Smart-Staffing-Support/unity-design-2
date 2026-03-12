import 'vuetify/styles'
import { h } from 'vue'
import { createVuetify } from 'vuetify'
import * as LucideIcons from 'lucide-vue-next'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const lucideIconSet = {
  component: (props) => {
    const iconName =
      typeof props.icon === 'string'
        ? props.icon
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join('')
        : props.icon

    const LucideIcon = LucideIcons[iconName]

    return typeof LucideIcon === 'function' ? h(LucideIcon, { ...props }) : null
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          // Core app colors (light)
          main_background: '#ffffff',
          container: '#ffffff',
          container_border: '#e2e8f0',
          toggle_theme_icon: '#005ea3',
          sidebar_icons: 'rgba(255, 255, 255, 0.8)',
          fields_label: '#005ea3',
          fields_bg: '#f8fafc',
          fields_border: '#cad5e2',
          fields_text: '#1d293d',

          // Sidebar-specific colors (used by Sidebar.vue)
          sidebar: '#005ea3',
          sidebarItem: 'rgba(255, 255, 255, 0.8)',
          sidebarIcons: 'rgba(255, 255, 255, 0.8)',
          sidebarActive: '#e0e0e0',
          sidebarActiveText: '#005ea3',
          toggleThemeIcon: '#005ea3',

          // Shared light palette (from components)
          // Blues
          c_2563eb: '#2563eb',
          c_1e3a8a: '#1e3a8a',
          c_60a5fa: '#60a5fa',
          c_1d4ed8: '#1d4ed8',
          c_93c5fd: '#93c5fd',
          c_bfdbfe: '#bfdbfe',
          c_bbdcfd: '#bbdcfd',
          c_e0f2fe: '#e0f2fe',
          c_eff6ff: '#eff6ff',
          c_f0f9ff: '#f0f9ff',
          c_e2e8f0: '#e2e8f0',
          c_cbd5e1: '#cbd5e1',
          c_e5e7eb: '#e5e7eb',
          c_e0e0e0: '#e0e0e0',

          // Neutrals
          c_0f172a: '#0f172a',
          c_1e293b: '#1e293b',
          c_334155: '#334155',
          c_475569: '#475569',
          c_64748b: '#64748b',
          c_94a3b8: '#94a3b8',
          c_f1f5f9: '#f1f5f9',
          c_f8fafc: '#f8fafc',

          // Status / accents
          c_4ade80: '#4ade80',
          c_16a34a: '#16a34a',
          c_f87171: '#f87171',
          c_dc2626: '#dc2626',
          c_fbbf24: '#fbbf24',
          c_f97316: '#f97316',
          c_f59e0b: '#f59e0b',
          c_3b82f6: '#3b82f6',
          c_9333ea: '#9333ea',
          c_c084fc: '#c084fc',
          c_f472b6: '#f472b6',

          // Utility greys for text
          text_muted_light: '#94a3b8',
          text_strong_light: '#1e293b',
        },
      },
      dark: {
        dark: true,
        colors: {
          // Core app colors (dark)
          main_background: '#020618',
          container: 'rgba(15,23,43,0.6)',
          container_border: 'rgba(255,255,255,0.1)',
          toggle_theme_icon: '#e17100',
          sidebar_icons: '#93c5fd',
          fields_label: '#b8e6fe',
          fields_bg: 'rgba(255,255,255,0.05)',
          fields_border: 'rgba(255,255,255,0.1)',
          fields_text: '#fff',

          // Sidebar-specific colors (used by Sidebar.vue)
          sidebar: 'rgba(255, 255, 255, 0.05)',
          sidebarItem: '#93c5fd',
          sidebarIcons: '#93c5fd',
          sidebarActive: 'rgba(255, 255, 255, 0.1)',
          sidebarActiveText: '#ffffff',
          toggleThemeIcon: '#e17100',

          // Shared dark palette (matching light intent)
          // Blues & overlays
          c_2563eb: '#2563eb',
          c_1e3a8a: '#1e3a8a',
          c_60a5fa: '#60a5fa',
          c_1d4ed8: '#1d4ed8',
          c_93c5fd: '#93c5fd',
          c_bfdbfe: '#bfdbfe',
          c_bbdcfd: '#bbdcfd',
          c_e0f2fe: '#e0f2fe',
          c_eff6ff: '#eff6ff',
          c_f0f9ff: '#f0f9ff',
          c_e2e8f0: '#e2e8f0',
          c_cbd5e1: '#cbd5e1',
          c_e5e7eb: '#e5e7eb',
          c_e0e0e0: '#e0e0e0',

          // Neutrals
          c_0f172a: '#0f172a',
          c_1e293b: '#1e293b',
          c_334155: '#334155',
          c_475569: '#475569',
          c_64748b: '#64748b',
          c_94a3b8: '#94a3b8',
          c_f1f5f9: '#f1f5f9',
          c_f8fafc: '#f8fafc',

          // Status / accents
          c_4ade80: '#4ade80',
          c_16a34a: '#16a34a',
          c_f87171: '#f87171',
          c_dc2626: '#dc2626',
          c_fbbf24: '#fbbf24',
          c_f97316: '#f97316',
          c_f59e0b: '#f59e0b',
          c_3b82f6: '#3b82f6',
          c_9333ea: '#9333ea',
          c_c084fc: '#c084fc',
          c_f472b6: '#f472b6',

          // Utility greys for text
          text_muted_light: '#94a3b8',
          text_strong_light: '#f9fafb',
        },
      },
    },
  },
  icons: {
    defaultSet: 'lucide',
    sets: {
      lucide: lucideIconSet,
    },
  },
})
