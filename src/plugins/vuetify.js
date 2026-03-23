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

{/*
  dark
    main container bg rgba(15,23,43,0.6) 
    main container border rgba(255,255,255,0.1)
    secondary container bg rgba(255,255,255,0.05)
    secondary container border rgba(255,255,255,0.1)
    secondary container border hover rgba(43, 127, 255, 0.5)
    main labels color #b8e6fe
  
  light
    main container bg #fff
    main container border #e2e8f0
    secondary container bg #f0f9ff
    secondary container border rgba(43, 127, 255, 0.5)
    secondary container border hover rgba(43, 127, 255, 0.5)
    main labels color #005ea3
*/} 


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
          secondary_container_bg: '#f0f9ff',
          secondary_container_border: 'rgba(43, 127, 255, 0.5)',
          secondary_container_border_hover: 'rgba(43, 127, 255, 0.5)',
          toggle_theme_icon: '#005ea3',
          fields_label: '#005ea3',
          fields_bg: '#f8fafc',
          fields_border: '#cad5e2',
          fields_text: '#1d293d',

          // Sidebar-specific colors (used by Sidebar.vue)
          sidebar: '#005ea3',
          sidebarIcons: 'rgba(255, 255, 255, 0.8)',
          sidebarActive: '#e0e0e0',
          sidebarActiveText: '#005ea3',
          toggleThemeIcon: '#005ea3',

          // Checkbox
          checkbox_border_unchecked: '#cbd5e1',
          checkbox_hover_border: '#60a5fa',

          // CheckboxField
          checkbox_field_box_bg: '#f1f5f9',
          checkbox_field_box_border_unchecked: '#cbd5e1',
          checkbox_field_box_checked: '#2563eb',
          checkbox_field_label: '#334155',
          checkbox_field_label_checked: '#0f172a',
          checkbox_field_label_hover: '#0f172a',

          // DateField
          date_field_label: '#2563eb',
          date_field_bg: '#f1f5f9',
          date_field_border: '#94a3b8',
          date_field_text: '#1e293b',
          date_field_hover_bg: '#e2e8f0',
          date_field_focus_border: 'rgba(37, 99, 235, 0.5)',

          // Dynamic Contact List
          contact_border: '#94a3b8',
          contact_focus_border: 'rgba(37, 99, 235, 0.5)',


          // Dynamic Table
          table_container_bg: 'transparent',
          table_header_bg: '#ffffff',
          table_btn_bg: '#2563eb',
          table_header_row_bg: 'rgba(255, 255, 255, 0.5)',
          table_header_row_border: '#eceef1',
          table_row_even_bg: '#f1f5f9',
          table_row_hover: 'rgba(37, 99, 235, 0.1)',
          table_row_selected: 'rgba(3, 24, 52, 0.3)',
          table_cell_text: '#30333a',
          table_expanded_bg: 'rgba(59, 130, 246, 0.6)',
          table_expanded_text: '#ffffff',
          table_footer_bg: 'rgba(255, 255, 255, 0.3)',
          table_code_bg: 'rgba(30, 41, 59, 0.8)',
          table_btn_disabled_text: '#1a1b1b',


          // Filter Component
          filter_topbar_bg: '#ffffff',
          filter_section_dot_green: '#22c55e',
          filter_section_dot_amber: '#f59e0b',
          filter_card_shadow: 'rgba(0, 0, 0, 0.08)',


          // FromToDate


          // Settlement
          settlement_placeholder: '#94a3b8',


          // Stat Field


          // Summary Stat


          // Accounting Module
          billing_tab_active: '#0ea5e9',
          billing_tab_inactive: '#475569',
          billing_badge_blue: '#1e40af',
          billing_header_bar: '#60a5fa',
          billing_offset_bg: '#16a34a',
          billing_row_hover: '#e2e8f0',
          billing_select_text: '#334155',
          billing_button_hover: '#1d4ed8',
          billing_footer_bg: '#e0f2fe',
          billing_footer_border: '#f1f5f9',
          billing_footer_label: '#3b82f6',
          billing_shadow: 'rgba(0, 0, 0, 0.06)',
          billing_checkbox_bg: '#f3f4f6',
          billing_modal_subtitle: '#94a3b8',
          billing_modal_icon_bg: 'rgba(59, 130, 246, 0.1)',
          billing_payment_section_bg: '#f8fafc',
          billing_upload_bg: '#f8fafc',
          billing_upload_hover: '#f1f5f9',
          billing_upload_hint: '#64748b',
          billing_skip_hover: '#115e59',
          billing_skip_shadow: 'rgba(20, 184, 166, 0.2)',
          billing_expanded_bg: 'rgba(59, 130, 246, 0.6)',
          billing_expanded_agency: '#4ade80',
          billing_expanded_client: '#fde047',
          billing_expanded_total: '#fca5a5',
          
          uni_yellow: "#fde047",

          // Accounts Module
          accounts_export_bg: '#0f766e',
          accounts_cancel_bg: '#dc2626',
          accounts_cancel_text: '#ffffff',
          accounts_summary_bg: '#f0f9ff',
          accounts_summary_border: 'rgba(37, 99, 235, 0.5)',
          accounts_summary_shadow: '0 1px 3px rgba(0,0,0,0.08)',
          accounts_summary_value: '#0f172a',
          accounts_header_bg: '#e0f2fe',
          accounts_header_text: '#2563eb',
          accounts_header_border: 'rgba(255,255,255,0.05)',
          accounts_row_bg: 'transparent',
          accounts_row_hover: '#f1f5f9',
          accounts_row_divider: '#f1f5f9',
          accounts_row_text: '#334155',
          accounts_status_bg: '#6ee7b7',
          accounts_status_text: '#047857',
          accounts_goto_bg: '#2563eb',
          accounts_goto_hover: '#1d4ed8',
          accounts_expanded_bg: 'rgba(37, 99, 235, 0.6)',
          accounts_detail_label: '#1e293b',
          accounts_detail_agency: '#22c55e',
          accounts_detail_agency_light: '#86efac',
          accounts_detail_client: '#eab308',
          accounts_detail_client_light: '#fde047',
          accounts_detail_attorney: '#60a5fa',
          accounts_detail_attorney_light: '#93c5fd',
          accounts_detail_view_check: '#c084fc',
          accounts_checkbox_bg: '#ffffff',
          accounts_checkbox_border: '#d1d5db',
          accounts_checkbox_checked: '#2563eb',


          // Add Reminder
          add_reminder_container_bg: '#ffffff',
          add_reminder_container_border: '#e2e8f0',
          add_reminder_textarea_border: 'rgba(37, 99, 235, 0.5)',
          add_reminder_textarea_placeholder: '#94a3b8',
          add_reminder_textarea_shadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
          add_reminder_divider: '#475569',
          add_reminder_save_group_shadow: 'rgba(37, 99, 235, 0.2)',
          add_reminder_footer_bg: '#ffffff',
          add_reminder_footer_border: '#e2e8f0',
          add_reminder_cancel_text: '#374151',
          add_reminder_cancel_hover: 'rgba(0,0,0,0.05)',


          // Audit Logs
          audit_logs_table_bg: '#ffffff',
          audit_logs_header_bg: '#e0f2fe',
          audit_logs_header_border: '#e2e8f0',
          audit_logs_row_bg: '#ffffff',
          audit_logs_status_overdue: '#ef4444',
          audit_logs_legal_nolegal: '#64748b',
          audit_logs_legal_litigation: '#8b5cf6',
          audit_logs_legal_judgment: '#3b82f6',


          // Client Info
          client_drawer_bg: '#e0f2fe',
          client_drawer_handle_hover: '#1d4ed8',
          client_drawer_header_bg: 'rgba(37, 99, 235, 0.05)',
          client_drawer_item_hover: 'rgba(0, 0, 0, 0.02)',
          client_drawer_item_selected_bg: 'rgba(37, 99, 235, 0.1)',
          client_section_bg: '#f0f9ff',
          client_section_border: 'rgba(37, 99, 235, 0.5)',
          client_section_shadow: '0 1px 4px rgba(0,0,0,0.06)',
          client_icon_green_bg: 'rgba(34, 197, 94, 0.1)',
          client_icon_green: '#16a34a',
          client_icon_purple_bg: 'rgba(168, 85, 247, 0.1)',
          client_icon_purple: '#9333ea',
          client_icon_amber_bg: 'rgba(245, 158, 11, 0.1)',
          client_icon_amber: '#d97706',
          client_icon_indigo_bg: 'rgba(99, 102, 241, 0.1)',
          client_icon_indigo: '#4f46e5',
          client_header_icon_bg: 'rgba(37, 99, 235, 0.1)',
          client_header_title: '#1f2937',
          client_header_subtitle: '#475569',
          client_add_contact_bg: '#dbeafe',
          client_add_contact_hover: '#bfdbfe',
          client_add_portal_bg: '#4f46e5',
          client_add_portal_shadow: 'rgba(79, 70, 229, 0.2)',
          client_notes_area_focus_border: '#93c5fd',
          client_notes_placeholder: '#64748b',
          client_notes_history_bg: '#f8fafc',
          client_notes_history_title: '#475569',
          client_note_item_border: '#94a3b8',
          client_note_item_hover_shadow: '0 1px 3px rgba(0,0,0,0.1)',
          client_note_date: '#94a3b8',
          client_accordion_bg: '#f8fafc',
          client_scrollbar: 'rgba(148, 163, 184, 0.3)',
          client_scrollbar_hover: 'rgba(148, 163, 184, 0.6)',


          // Contact Menu
          contact_menu_header_orange_text: '#ea580c',
          contact_menu_header_teal_bar: '#14b8a6',
          contact_menu_header_teal_text: '#0d9488',
          contact_menu_card_bg: '#f0f9ff',
          contact_menu_card_hover_border: 'rgba(59, 130, 246, 0.5)',
          contact_menu_text_muted: '#94a3b8',
          contact_menu_badge_bad_bg: 'rgba(239, 68, 68, 0.1)',
          contact_menu_badge_unknown_bg: 'rgba(100, 116, 139, 0.1)',
          contact_menu_icon_violet: '#8b5cf6',
          contact_menu_footer_bg: 'rgba(248, 250, 252, 0.5)',
          contact_menu_footer_label: '#64748b',


          // Judgment
          judgment_icon_bg_violet: 'rgba(139, 92, 246, 0.1)',
          judgment_checkbox_border: '#cbd5e1',
          judgment_composition_bg: 'rgba(59, 130, 246, 0.05)',
          judgment_composition_border: '#93c5fd',


          // Legal Details
          legal_judgement_title: '#7c3aed',
          legal_garnish_title: '#d97706',


          // New Action Codes
          action_panel_bg: 'transparent',
          action_panel_border: '#cbd5e1',
          action_panel_shadow: 'rgba(30, 41, 59, 0.4)',


          // New Contact Menu
          contact_menu_header_orange_text: '#ea580c',
          contact_menu_header_teal_bar: '#14b8a6',
          contact_menu_header_teal_text: '#0d9488',
          contact_menu_card_bg: '#f0f9ff',
          contact_menu_card_hover_border: 'rgba(59, 130, 246, 0.5)',
          contact_menu_footer_bg: 'rgba(248, 250, 252, 0.5)',
          contact_menu_footer_icon_bg_blue: '#eff6ff',
          contact_menu_footer_icon_bg_violet: '#f5f3ff',
          contact_menu_footer_icon_violet: '#8b5cf6',


          // New Dashboard
          debtor_header_bg: 'transparent',
          debtor_remove_btn_bg: '#fee2e2',
          debtor_remove_btn_hover: '#fecaca',
          debtor_linked_balance_label: '#475569',
          debtor_tabs_bg: '#f1f5f9',
          debtor_tab_inactive_text: '#64748b',
          debtor_tab_inactive_hover: '#e2e8f0',
          debtor_modal_teal_bg: '#0d9488',
          debtor_modal_teal_shadow: 'rgba(13, 148, 136, 0.2)',

          // Utility greys for text
          text_strong_light: '#1e293b',

          // IconButton colors (Light)
          iconbtn_border: '#e2e8f0',
          iconbtn_icon_hover: '#2563eb', 

          // ImportancePill colors (Light)
          importance_urgent_bg: '#000000',
          importance_super_high_bg: 'rgba(194,65,12,0.2)',
          importance_high_bg: 'rgba(249,115,22,0.2)',
          importance_medium_bg: 'rgba(245,158,11,0.1)',
          importance_low_bg: 'rgba(59,130,246,0.1)',
          importance_none_bg: 'rgba(100,116,139,0.1)',

          // InfoBox colors (Light)
          infobox_label: '#334155',    

          // InputField colors (Light)
          inputfield_border: '#94a3b8', 
          inputfield_focus_border: 'rgba(37,99,235,0.5)',

          // MultiSearchSelect colors (Light)

          // SelectField colors (Light)


          // NewExperianReports colors (Light)
          newexperianreports_bg: '#f0f9ff',
          newexperianreports_border: 'rgba(59,130,246,0.5)',
          newexperianreports_shadow: '0 1px 4px rgba(0,0,0,0.06)',
          newexperianreports_derogatory_bg: 'rgba(254,242,242,0.50)',
          newexperianreports_button: '#2563eb',
          newexperianreports_button_hover: '#3b82f6',
          newexperianreports_button_shadow: 'rgba(37,99,235,0.2)',
          newexperianreports_timeline_bg: 'rgba(15,23,42,0.40)',
          newexperianreports_indicator: '#f59e0b',

          // NewJudgement colors (Light)
          newjudgment_bg: '#f0f9ff',
          newjudgment_border: 'rgba(59,130,246,0.5)',
          newjudgment_iconbg: 'rgba(139,92,246,0.10)',
          newjudgment_card_bg: '#f8fafc',
          newjudgment_composition_bg: 'rgba(239,246,255,0.30)',
          newjudgment_composition_border: '#93c5fd',

          // NewLegalDetails colors (Light)
          newlegaldetails_bg: '#f0f9ff',
          newlegaldetails_complaint_iconbg: 'rgba(59,130,246,0.10)',
          newlegaldetails_judgment_iconbg: 'rgba(139,92,246,0.10)',
          newlegaldetails_garnishment_iconbg: 'rgba(245,158,11,0.10)',

          // NewSkipTracing colors (Light)
          newskiptracing_bg: '#eff6ff',
          newskiptracing_border: 'rgba(59,130,246,0.5)',
          newskiptracing_iconbg: 'rgba(59,130,246,0.10)',
          newskiptracing_config_border: '#bfdbfe',

          // NewTabsContent colors (Light)
          newtabscontent_tabbar_bg: 'transparent',
          newtabscontent_tabbar_border: '#cbd5e1',
          newtabscontent_active_tab_shadow: '0 8px 24px rgba(37,99,235,0.3)',
          newtabscontent_inactive_tab_color: '#475569',
          newtabscontent_dropdown_bg: 'rgba(255,255,255,0.98)',
          newtabscontent_dropdown_border: '#cbd5e1',
          newtabscontent_dropdown_shadow: '0 24px 48px rgba(0,0,0,0.12)',
          newtabscontent_dropdown_divider: '#e2e8f0',
          newtabscontent_dropdown_color: '#334155',
          newtabscontent_content_bg: 'transparent',
          newtabscontent_content_border: '#cbd5e1',
          newtabscontent_content_shadow: '0 10px 30px rgba(30,41,59,0.15)',
          newtabscontent_header_icon_bg: 'rgba(37,99,235,0.20)',
          newtabscontent_fallback_icon_bg: 'rgba(255,255,255,0.10)',

          // Plan colors (Light)
          plan_bg: '#e0f2fe',
          plan_icon_bg: 'rgba(59, 130, 246, 0.10)',
          plan_compliance_bg: 'rgba(37,99,235,0.05)',
          plan_border: 'rgba(37, 99, 235, 0.50)',
          plan_card_border: '#e5e7eb',
          plan_dashed_border: 'rgba(37, 99, 235, 0.30)',
          plan_text: '#374151',
          plan_helper_text: '#6b7280',
          plan_placeholder: '#6b7280',
          plan_btn_shadow_green: '0 4px 12px rgba(5,150,105,0.2)',

          // RemindersFeed colors (Light)
          remindersfeed_border_default: 'rgba(37,99,235,0.50)',
          remindersfeed_border_hover: 'rgba(37,99,235,0.70)',
          remindersfeed_heading_secondary: '#2563eb',
          remindersfeed_body: '#374151',
          remindersfeed_meta: '#6b7280',
          remindersfeed_green_text: '#15803d',  
          remindersfeed_hover_bg: '#bfdbfe',
          remindersfeed_dialog_overlay: 'rgba(0,0,0,0.60)',

          // Settingsmodule colors (Light)
          settingsmodule_divider: '#e5e7eb',
          settingsmodule_button_shadow: '0 1px 4px rgba(37,99,235,0.20)',

          // Settlement colors (Light)
          settlement_input_focus_border: 'rgba(37, 99, 235, 0.50)',
          
          // ActionPanel
          action_panel_bg: '#bbdcfd',
          action_panel_border: '#e2e8f0',
          action_panel_heading: '#1e293b',
          ac_green_bg: '#f0fdf4',
          ac_green_text: '#16a34a',
          ac_green_border: '#bbf7d0',
          ac_blue_bg: '#eff6ff',
          ac_blue_text: '#2563eb',
          ac_blue_border: '#bfdbfe',
          ac_red_bg: '#fef2f2',
          ac_red_text: '#dc2626',
          ac_red_border: '#fecaca',
          ac_amber_bg: '#fffbeb',
          ac_amber_text: '#d97706',
          ac_amber_border: '#fde68a',
          ac_purple_bg: '#faf5ff',
          ac_purple_text: '#9333ea',
          ac_purple_border: '#e9d5ff',
          ac_pink_bg: '#fdf2f8',
          ac_pink_text: '#db2777',
          ac_pink_border: '#fbcfe8',

          // AllocationTag
          alloc_tag_bg: '#f1f5f9',
          alloc_tag_hover_bg: '#e2e8f0',
          alloc_tag_focus_border: 'rgba(37, 99, 235, 0.5)',
          alloc_tag_surface_text: '#1e293b',
          alloc_tag_drag: '#94a3b8',
          alloc_tag_order_text: '#94a3b8',
          alloc_tag_label: '#64748b',

          // AllocationRow
          alloc_row_hover: '#bfdbfe',
          alloc_row_border: '#d1d5db',
          alloc_label: '#475569',
          alloc_input_bg: '#ffffff',
          alloc_input_border: '#94a3b8',
          alloc_input_focus: '#60a5fa',
          alloc_input_text: '#334155',
          alloc_prefix: '#94a3b8',

          // AssetStat
          asset_stat_label: '#2563eb',
          asset_stat_value_empty: '#94a3b8',
          asset_stat_value: '#0f172a',
          asset_stat_value_highlight: '#22c55e',

          // BalanceRow
          balance_row_border: '#e2e8f0',
          balance_row_label: '#334155',
          balance_row_value: '#0f172a',

          // PrimaryActionCodes
          pac_bg: 'transparent',
          pac_btn_lime: '#84cc16',
          pac_btn_green: '#059669',

          // RadioField

          // DashboardHeader
          dh_tabs_bg: '#f1f5f9',
          dh_tabs_border: '#cbd5e1',
          dh_label: '#2563eb',
          dh_status_bg: '#fbbf24',
          dh_status_text: '#0f172a',
          dh_age_text: '#0284c7',
          dh_bal_total_bg: '#eff6ff',
          dh_bal_total_border: '#dbeafe',
          dh_bal_total_label: '#1d4ed8',
          dh_bal_total_value: '#1e3a8a',
          dh_bal_interest_bg: '#fef2f2',
          dh_bal_interest_border: '#fecaca',
          dh_bal_interest_label: '#b91c1c',
          dh_bal_interest_value: '#7f1d1d',
          dh_bal_costs_bg: '#f0fdfa',
          dh_bal_costs_border: '#ccfbf1',
          dh_bal_costs_label: '#0f766e',
          dh_bal_costs_value: '#134e4a',
          dh_bal_payments_bg: '#fff7ed',
          dh_bal_payments_label: '#c2410c',
          dh_bal_payments_value: '#7c2d12',
          dh_make_payments_text: '#092b9c',
          dh_linked_border: '#ef4444',
          dh_linked_row_hover: '#f8fafc',
          dh_ext_icon: '#d1d5db',

          // Dispute
          dispute_panel_bg: '#f0f9ff',
          dispute_panel_border: 'rgba(59, 130, 246, 0.5)',
          dispute_util_btn_bg: '#dbeafe',
          dispute_util_btn_text: '#3b82f6',

          // Documents
          docs_file_hover_bg: '#f1f5f9',

          // ExperianReports
          exp_derog_bg: '#fef2f2',
          exp_derog_border: 'rgba(239, 68, 68, 0.2)',
          exp_days_120: '#b91c1c',
          exp_zero_value: '#cbd5e1',
          exp_mortgage_head: '#7c3aed',

          // Financials
          fin_table_header_text: '#334155',
          fin_table_header_bar_bg: 'rgba(100, 116, 139, 0.05)',

          // GlobalNotes
          gn_header_border: 'rgba(59, 130, 246, 0.5)',
          gn_entries_bg: '#eff6ff',
          gn_note_card_hover_bg: '#ffffff',
          gn_note_text: '#475569',
          gn_input_area_bg: '#f0f9ff',

          // SkipTracing
          st_hero_bg: '#f0f9ff',
          st_hero_border: 'rgba(59, 130, 246, 0.5)',

          // TabsContent
          tc_tabbar_bg: 'transparent',
          tc_inactive_tab_text: '#475569',
          tc_inactive_tab_hover: 'rgba(255, 255, 255, 0.5)',
          tc_dropdown_bg: 'rgba(255, 255, 255, 0.98)',
          tc_dropdown_item_text: '#334155',
          tc_dropdown_hover_bg: '#eff6ff',

          // TransactionAllocations
        },
      },
      dark: {
        dark: true,
        colors: {
          // Core app colors (dark)
          main_background: '#020618',
          container: 'rgba(15,23,43,0.6)',
          container_border: 'rgba(255,255,255,0.1)',
          secondary_container_bg: 'rgba(255,255,255,0.05)',
          secondary_container_border: 'rgba(255,255,255,0.1)',
          secondary_container_border_hover: 'rgba(43, 127, 255, 0.5)',
          toggle_theme_icon: '#e17100',
          fields_label: '#b8e6fe',
          fields_bg: 'rgba(255,255,255,0.05)',
          fields_border: 'rgba(255,255,255,0.1)',
          fields_text: '#fff',

          // Sidebar-specific colors (used by Sidebar.vue)
          sidebar: 'rgba(255, 255, 255, 0.05)',
          sidebarIcons: '#93c5fd',
          sidebarActive: 'rgba(255, 255, 255, 0.1)',
          sidebarActiveText: '#ffffff',
          toggleThemeIcon: '#e17100',


          // DateField
          date_field_label: '#7dd3fc',
          date_field_bg: 'rgba(255, 255, 255, 0.05)',
          date_field_border: 'rgba(255, 255, 255, 0.1)',
          date_field_text: '#ffffff',
          date_field_hover_bg: 'rgba(255, 255, 255, 0.1)',
          date_field_focus_border: 'rgba(59, 130, 246, 0.5)',

          // Dynamic Contact List
          contact_border: 'rgba(255, 255, 255, 0.01)',
          contact_focus_border: 'rgba(59, 130, 246, 0.5)',


          // Dynamic Table
          table_container_bg: 'rgba(15, 23, 42, 0.4)',
          table_header_bg: 'rgba(30, 41, 59, 0.5)',
          table_btn_bg: 'rgba(255, 255, 255, 0.05)',
          table_header_row_bg: 'rgba(255, 255, 255, 0.02)',
          table_header_row_border: 'rgba(255, 255, 255, 0.05)',
          table_row_even_bg: 'rgba(255, 255, 255, 0.02)',
          table_row_hover: 'rgba(255, 255, 255, 0.05)',
          table_row_selected: 'rgba(59, 130, 246, 0.1)',
          table_cell_text: '#ffffff',
          table_expanded_bg: 'rgba(255, 255, 255, 0.02)',
          table_expanded_text: '#94a3b8',
          table_footer_bg: 'rgba(255, 255, 255, 0.02)',
          table_code_bg: 'rgba(30, 41, 59, 0.8)',
          table_btn_disabled_text: '#64748b',


          // Filter Component
          filter_topbar_bg: 'rgba(100, 116, 139, 0.05)',
          filter_section_dot_green: '#4ade80',
          filter_section_dot_amber: '#fbbf24',
          filter_card_shadow: 'none',


          // FromToDate


          // Checkbox
          checkbox_border_unchecked: 'rgba(255,255,255,0.1)',
          checkbox_hover_border: 'rgba(59,130,246,0.5)',

          // CheckboxField
          checkbox_field_box_bg: 'rgba(255, 255, 255, 0.05)',
          checkbox_field_box_border_unchecked: 'rgba(255, 255, 255, 0.1)',
          checkbox_field_box_checked: '#2563eb',
          checkbox_field_label: '#ffffff',
          checkbox_field_label_checked: '#ffffff',
          checkbox_field_label_hover: '#ffffff',


          // Settlement
          settlement_placeholder: 'rgba(255, 255, 255, 0.5)',


          // Stat Field


          // Summary Stat


          // Accounting Module
          billing_tab_active: '#0ea5e9',
          billing_tab_inactive: '#ffffff',
          billing_badge_blue: '#1e40af',
          billing_header_bar: '#1e3a8a',
          billing_offset_bg: '#16a34a',
          billing_row_hover: '#334155',
          billing_select_text: '#cbd5e1',
          billing_button_hover: '#1d4ed8',
          billing_footer_bg: '#0f172a',
          billing_footer_border: '#2563eb',
          billing_footer_label: '#3b82f6',
          billing_shadow: 'none',
          billing_checkbox_bg: '#374151',
          billing_modal_subtitle: 'rgba(255, 255, 255, 0.8)',
          billing_modal_icon_bg: 'rgba(59, 130, 246, 0.1)',
          billing_payment_section_bg: 'rgba(255, 255, 255, 0.05)',
          billing_upload_bg: 'rgba(255, 255, 255, 0.02)',
          billing_upload_hover: 'rgba(255, 255, 255, 0.04)',
          billing_upload_hint: '#64748b',
          billing_skip_hover: '#115e59',
          billing_skip_shadow: 'rgba(20, 184, 166, 0.2)',
          billing_expanded_bg: 'rgba(255, 255, 255, 0.08)',
          billing_expanded_agency: '#22c55e',
          billing_expanded_client: '#eab308',
          billing_expanded_total: '#f87171',


          // Accounts Module
          accounts_export_bg: '#0f766e',
          accounts_cancel_bg: '#dc2626',
          accounts_cancel_text: '#ffffff',
          accounts_summary_bg: '#0f172a',
          accounts_summary_border: 'rgba(255,255,255,0.1)',
          accounts_summary_shadow: 'none',
          accounts_summary_value: '#ffffff',
          accounts_header_bg: 'rgba(255,255,255,0.05)',
          accounts_header_text: '#7dd3fc',
          accounts_header_border: 'rgba(255,255,255,0.05)',
          accounts_row_bg: 'transparent',
          accounts_row_hover: '#0f172a',
          accounts_row_divider: 'rgba(255,255,255,0.05)',
          accounts_row_text: '#ffffff',
          accounts_status_bg: '#6ee7b7',
          accounts_status_text: '#047857',
          accounts_goto_bg: '#3b82f6',
          accounts_goto_hover: '#2563eb',
          accounts_expanded_bg: 'rgba(255,255,255,0.1)',
          accounts_detail_label: '#7dd3fc',
          accounts_detail_agency: '#22c55e',
          accounts_detail_agency_light: '#86efac',
          accounts_detail_client: '#eab308',
          accounts_detail_client_light: '#fde047',
          accounts_detail_attorney: '#60a5fa',
          accounts_detail_attorney_light: '#93c5fd',
          accounts_detail_view_check: '#f87171',
          accounts_checkbox_bg: '#1e293b',
          accounts_checkbox_border: '#4b5563',
          accounts_checkbox_checked: '#2563eb',


          // Add Reminder
          add_reminder_container_bg: '#0f172a',
          add_reminder_container_border: 'rgba(255, 255, 255, 0.1)',
          add_reminder_textarea_border: 'rgba(255, 255, 255, 0.1)',
          add_reminder_textarea_placeholder: 'rgba(255, 255, 255, 0.2)',
          add_reminder_textarea_shadow: 'none',
          add_reminder_divider: '#475569',
          add_reminder_save_group_shadow: 'rgba(37, 99, 235, 0.2)',
          add_reminder_footer_bg: 'rgba(15, 23, 42, 0.5)',
          add_reminder_footer_border: 'rgba(37, 99, 235, 0.5)',
          add_reminder_cancel_text: '#94a3b8',
          add_reminder_cancel_hover: 'rgba(255, 255, 255, 0.05)',


          // Audit Logs
          audit_logs_table_bg: 'rgba(15, 23, 42, 0.4)',
          audit_logs_header_bg: 'rgba(255, 255, 255, 0.05)',
          audit_logs_header_border: 'rgba(255, 255, 255, 0.05)',
          audit_logs_row_bg: 'transparent',
          audit_logs_status_overdue: '#ef4444',
          audit_logs_legal_nolegal: '#94a3b8',
          audit_logs_legal_litigation: '#c084fc',
          audit_logs_legal_judgment: '#60a5fa',


          // Client Info
          client_drawer_bg: 'rgba(15, 23, 42, 0.4)',
          client_drawer_handle_hover: '#3b82f6',
          client_drawer_header_bg: 'rgba(59, 130, 246, 0.05)',
          client_drawer_item_hover: 'rgba(255, 255, 255, 0.05)',
          client_drawer_item_selected_bg: 'rgba(59, 130, 246, 0.1)',
          client_section_bg: 'rgba(15, 23, 42, 0.4)',
          client_section_border: 'rgba(255, 255, 255, 0.05)',
          client_section_shadow: 'none',
          client_icon_green_bg: 'rgba(34, 197, 94, 0.1)',
          client_icon_green: '#22c55e',
          client_icon_purple_bg: 'rgba(168, 85, 247, 0.1)',
          client_icon_purple: '#a855f7',
          client_icon_amber_bg: 'rgba(245, 158, 11, 0.1)',
          client_icon_amber: '#f59e0b',
          client_icon_indigo_bg: 'rgba(99, 102, 241, 0.1)',
          client_icon_indigo: '#818cf8',
          client_header_icon_bg: 'rgba(37, 99, 235, 0.1)',
          client_header_title: '#ffffff',
          client_header_subtitle: '#94a3b8',
          client_add_contact_bg: 'rgba(37, 99, 235, 0.2)',
          client_add_contact_hover: 'rgba(37, 99, 235, 0.3)',
          client_add_portal_bg: '#4f46e5',
          client_add_portal_shadow: 'rgba(79, 70, 229, 0.2)',
          client_notes_area_focus_border: 'rgba(59, 130, 246, 0.3)',
          client_notes_placeholder: '#475569',
          client_notes_history_bg: 'rgba(15, 23, 42, 0.4)',
          client_notes_history_title: '#64748b',
          client_note_item_border: 'rgba(255, 255, 255, 0.05)',
          client_note_item_hover_shadow: 'none',
          client_note_date: '#475569',
          client_accordion_bg: 'rgba(15, 23, 42, 0.6)',
          client_scrollbar: 'rgba(148, 163, 184, 0.3)',
          client_scrollbar_hover: 'rgba(148, 163, 184, 0.6)',


          // Contact Menu
          contact_menu_header_orange_text: '#fb923c',
          contact_menu_header_teal_bar: '#14b8a6',
          contact_menu_header_teal_text: '#2dd4bf',
          contact_menu_card_bg: 'rgba(255, 255, 255, 0.05)',
          contact_menu_card_hover_border: 'rgba(59, 130, 246, 0.5)',
          contact_menu_text_muted: '#64748b',
          contact_menu_badge_bad_bg: 'rgba(239, 68, 68, 0.1)',
          contact_menu_badge_unknown_bg: 'rgba(100, 116, 139, 0.1)',
          contact_menu_icon_violet: '#8b5cf6',
          contact_menu_footer_bg: 'rgba(255, 255, 255, 0.02)',
          contact_menu_footer_label: 'rgba(255, 255, 255, 0.4)',


          // Judgment
          judgment_icon_bg_violet: 'rgba(139, 92, 246, 0.1)',
          judgment_checkbox_border: '#4b5563',
          judgment_composition_bg: 'rgba(59, 130, 246, 0.05)',
          judgment_composition_border: 'rgba(59, 130, 246, 0.2)',


          // Legal Details
          legal_judgement_title: '#c084fc',
          legal_garnish_title: '#fcd34d',

          // Action Codes
          action_panel_bg: 'rgba(255, 255, 255, 0.1)',
          action_panel_border: 'rgba(255, 255, 255, 0.2)',
          action_panel_shadow: 'none',

          // New Contact Menu
          contact_menu_header_orange_text: '#fb923c',
          contact_menu_header_teal_bar: '#14b8a6',
          contact_menu_header_teal_text: '#2dd4bf',
          contact_menu_card_bg: 'rgba(255, 255, 255, 0.05)',
          contact_menu_card_hover_border: 'rgba(59, 130, 246, 0.5)',
          contact_menu_footer_bg: 'rgba(255, 255, 255, 0.02)',
          contact_menu_footer_icon_bg_blue: 'rgba(59, 130, 246, 0.1)',
          contact_menu_footer_icon_bg_violet: 'rgba(139, 92, 246, 0.1)',
          contact_menu_footer_icon_violet: '#a78bfa',

          // New Dashboard
          debtor_header_bg: 'rgba(15, 23, 42, 0.6)',
          debtor_remove_btn_bg: 'rgba(239, 68, 68, 0.1)',
          debtor_remove_btn_hover: 'rgba(239, 68, 68, 0.2)',
          debtor_linked_balance_label: 'rgba(255, 255, 255, 0.3)',
          debtor_tabs_bg: 'rgba(255, 255, 255, 0.1)',
          debtor_tab_inactive_text: '#cbd5e1',
          debtor_tab_inactive_hover: 'rgba(255, 255, 255, 0.5)',
          debtor_modal_teal_bg: '#0d9488',
          debtor_modal_teal_shadow: 'rgba(13, 148, 136, 0.2)',

          

          // Utility greys for text
          text_strong_light: '#f9fafb',

          // IconButton colors (Dark)
          iconbtn_border: '#1e293b',  
          iconbtn_icon_hover: '#ffffff',  

          // ImportancePill colors (Dark)
          importance_urgent_bg: '#000000',
          importance_super_high_bg: 'rgba(194,65,12,0.2)',
          importance_high_bg: 'rgba(249,115,22,0.2)',
          importance_medium_bg: 'rgba(245,158,11,0.1)',
          importance_low_bg: 'rgba(59,130,246,0.1)',
          importance_none_bg: 'rgba(100,116,139,0.1)',

          // InfoBox colors (Dark)
          infobox_label: '#94a3b8',  

          // InputField colors (Dark)
          inputfield_border: '#1e293b',  
          inputfield_focus_border: 'rgba(59,130,246,0.5)',

          // MultiSearchSelect colors (Dark)
 
            // SelectField colors (Dark)


          // NewExperianReports colors (Dark)
          newexperianreports_bg: '#1e293b', 
          newexperianreports_border: '#1e293b',  
          newexperianreports_shadow: '',
          newexperianreports_derogatory_bg: 'rgba(239,68,68,0.05)',
          newexperianreports_button: '#2563eb',
          newexperianreports_button_hover: '#3b82f6',
          newexperianreports_indicator: '#f59e0b',
          newexperianreports_timeline_bg: 'rgba(15,23,42,0.40)',
          newexperianreports_button_shadow: 'rgba(37,99,235,0.2)',

          // NewJudgment colors (Dark)
          newjudgment_bg: 'rgba(15,23,42,0.60)',
          newjudgment_border: 'rgba(255,255,255,0.10)',
          newjudgment_iconbg: 'rgba(139,92,246,0.10)',
          newjudgment_card_bg: '#1e293b',
          newjudgment_composition_bg: 'rgba(59,130,246,0.05)',
          newjudgment_composition_border: 'rgba(59,130,246,0.20)',

          // NewLegalDetails colors (Dark)
          newlegaldetails_bg: 'rgba(15,23,42,0.40)',
          newlegaldetails_complaint_iconbg: 'rgba(59,130,246,0.15)',
          newlegaldetails_judgment_iconbg: 'rgba(139,92,246,0.15)',
          newlegaldetails_garnishment_iconbg: 'rgba(245,158,11,0.15)',

          // NewSkipTracing colors (Dark)
          newskiptracing_bg: 'rgba(37,99,236,0.10)',
          newskiptracing_border: 'rgba(59,130,246,0.20)',
          newskiptracing_iconbg: 'rgba(59,130,246,0.10)',
          newskiptracing_config_border: '#1e293b',  

          // NewTabsContent colors (Dark)
          newtabscontent_tabbar_bg: '#1e293b',  
          newtabscontent_tabbar_border: '#1e293b', 
          newtabscontent_active_tab_shadow: '0 8px 24px rgba(37,99,235,0.3)',
          newtabscontent_inactive_tab_color: '#bfdbfe',
          newtabscontent_dropdown_bg: 'rgba(15,23,42,0.98)',
          newtabscontent_dropdown_border: 'rgba(255,255,255,0.20)',
          newtabscontent_dropdown_shadow: '0 24px 48px rgba(0,0,0,0.4)',
          newtabscontent_dropdown_divider: 'rgba(255,255,255,0.05)',
          newtabscontent_dropdown_color: 'rgba(255,255,255,0.80)',
          newtabscontent_content_bg: 'rgba(15,23,42,0.60)',
          newtabscontent_content_border: 'rgba(255,255,255,0.10)',
          newtabscontent_content_shadow: '',
          newtabscontent_header_icon_bg: 'rgba(37,99,235,0.20)',
          newtabscontent_fallback_icon_bg: 'rgba(255,255,255,0.10)',

          // Plan colors (Dark)
          plan_bg: 'rgba(15,23,42,0.60)',
          plan_icon_bg: 'rgba(37,99,235,0.10)',
          plan_compliance_bg: 'rgba(37,99,235,0.05)',
          plan_border: 'rgba(255,255,255,0.10)',
          plan_card_border: 'rgba(255,255,255,0.05)',
          plan_dashed_border: 'rgba(255,255,255,0.20)',
          plan_text: 'rgba(255,255,255,0.80)',
          plan_placeholder: 'rgba(255,255,255,0.60)',
          plan_helper_text: '#94a3b8',
          plan_btn_shadow_green: '0 4px 12px rgba(5,150,105,0.2)',

          // RemindersFeed colors (Dark)
          remindersfeed_border_default: 'rgba(255,255,255,0.10)',
          remindersfeed_border_hover: 'rgba(255,255,255,0.20)',
          remindersfeed_heading_secondary: '#f1f5f9',
          remindersfeed_body: '#d1d5db',
          remindersfeed_meta: '#9ca3af',
          remindersfeed_green_text: '#22c55e',      
          remindersfeed_hover_bg: 'rgba(255,255,255,0.10)',
          remindersfeed_dialog_overlay: 'rgba(0,0,0,0.60)',

          // Settingsmodule colors (Dark)
          settingsmodule_divider: '#1e293b',  
          settingsmodule_button_shadow: '0 1px 4px rgba(37,99,235,0.20)',

          // Settlement colors (Dark)
          settlement_input_focus_border: 'rgba(37, 99, 235, 0.50)',


          // ActionPanel
          action_panel_bg: 'rgba(255, 255, 255, 0.1)',
          action_panel_border: 'rgba(255, 255, 255, 0.2)',
          action_panel_heading: '#ffffff',
          ac_green_bg: 'rgba(34, 197, 94, 0.4)',
          ac_green_text: '#4ade80',
          ac_green_border: 'rgba(34, 197, 94, 0.3)',
          ac_blue_bg: 'rgba(59, 130, 246, 0.4)',
          ac_blue_text: '#60a5fa',
          ac_blue_border: 'rgba(59, 130, 246, 0.3)',
          ac_red_bg: 'rgba(239, 68, 68, 0.4)',
          ac_red_text: '#f87171',
          ac_red_border: 'rgba(239, 68, 68, 0.3)',
          ac_amber_bg: 'rgba(245, 158, 11, 0.4)',
          ac_amber_text: '#fbbf24',
          ac_amber_border: 'rgba(245, 158, 11, 0.3)',
          ac_purple_bg: 'rgba(168, 85, 247, 0.4)',
          ac_purple_text: '#c084fc',
          ac_purple_border: 'rgba(168, 85, 247, 0.3)',
          ac_pink_bg: 'rgba(236, 72, 153, 0.4)',
          ac_pink_text: '#f472b6',
          ac_pink_border: 'rgba(236, 72, 153, 0.3)',

          // AllocationTag
          alloc_tag_bg: 'rgba(255, 255, 255, 0.05)',
          alloc_tag_hover_bg: 'rgba(255, 255, 255, 0.1)',
          alloc_tag_focus_border: 'rgba(59, 130, 246, 0.5)',
          alloc_tag_surface_text: '#ffffff',
          alloc_tag_drag: 'rgba(255, 255, 255, 0.3)',
          alloc_tag_order_text: 'rgba(255, 255, 255, 0.4)',
          alloc_tag_label: '#ffffff',

          // AllocationRow
          alloc_row_hover: 'rgba(255, 255, 255, 0.05)',
          alloc_row_border: '#d1d5db',
          alloc_label: '#cbd5e1',
          alloc_input_bg: 'rgba(255, 255, 255, 0.05)',
          alloc_input_border: 'rgba(255, 255, 255, 0.1)',
          alloc_input_focus: 'rgba(59, 130, 246, 0.5)',
          alloc_input_text: '#ffffff',
          alloc_prefix: '#94a3b8',

          // AssetStat
          asset_stat_label: '#7dd3fc',
          asset_stat_value_empty: 'rgba(255, 255, 255, 0.1)',
          asset_stat_value: '#ffffff',
          asset_stat_value_highlight: '#22c55e',

          // BalanceRow
          balance_row_border: '#e2e8f0',
          balance_row_label: '#ffffff',
          balance_row_value: '#ffffff',
          // PrimaryActionCodes
          pac_bg: 'rgba(255, 255, 255, 0.05)',
          pac_btn_lime: '#84cc16',
          pac_btn_green: '#059669',

          // RadioField

          // DashboardHeader
          dh_tabs_bg: 'rgba(0, 0, 0, 0.2)',
          dh_tabs_border: 'rgba(255, 255, 255, 0.05)',
          dh_label: '#93c5fd',
          dh_status_bg: '#f59e0b',
          dh_status_text: '#000000',
          dh_age_text: '#0ea5e9',
          dh_bal_total_bg: 'rgba(37, 99, 235, 0.4)',
          dh_bal_total_border: 'rgba(59, 130, 246, 0.2)',
          dh_bal_total_label: '#93c5fd',
          dh_bal_total_value: '#ffffff',
          dh_bal_interest_bg: 'rgba(100, 116, 139, 0.6)',
          dh_bal_interest_border: 'rgba(59, 130, 246, 0.2)',
          dh_bal_interest_label: '#93c5fd',
          dh_bal_interest_value: '#ffffff',
          dh_bal_costs_bg: 'rgba(100, 116, 139, 0.6)',
          dh_bal_costs_border: 'rgba(59, 130, 246, 0.2)',
          dh_bal_costs_label: '#93c5fd',
          dh_bal_costs_value: '#ffffff',
          dh_bal_payments_bg: 'rgba(100, 116, 139, 0.6)',
          dh_bal_payments_label: '#93c5fd',
          dh_bal_payments_value: '#ffffff',
          dh_make_payments_text: '#092b9c',
          dh_linked_border: 'rgba(239, 68, 68, 0.6)',
          dh_linked_row_hover: 'rgba(255, 255, 255, 0.1)',
          dh_ext_icon: '#d1d5db',

          // Dispute
          dispute_panel_bg: 'rgba(15, 23, 42, 0.6)',
          dispute_panel_border: 'rgba(255, 255, 255, 0.1)',
          dispute_util_btn_bg: 'rgba(255, 255, 255, 0.05)',
          dispute_util_btn_text: 'rgba(255, 255, 255, 0.6)',

          // Documents
          docs_file_hover_bg: '#1e293b',

          // ExperianReports
          exp_derog_bg: 'rgba(239, 68, 68, 0.05)',
          exp_derog_border: 'rgba(239, 68, 68, 0.2)',
          exp_days_120: '#b91c1c',
          exp_zero_value: 'rgba(255, 255, 255, 0.2)',
          exp_mortgage_head: '#a78bfa',

          // Financials
          fin_table_header_text: '#7dd3fc',
          fin_table_header_bar_bg: 'rgba(100, 116, 139, 0.05)',

          // GlobalNotes
          gn_header_border: 'rgba(255, 255, 255, 0.05)',
          gn_entries_bg: 'rgba(255, 255, 255, 0.05)',
          gn_note_card_hover_bg: 'rgba(255, 255, 255, 0.07)',
          gn_note_text: 'rgba(255, 255, 255, 0.8)',
          gn_input_area_bg: 'rgba(0, 0, 0, 0.2)',

          // SkipTracing
          st_hero_bg: 'rgba(37, 99, 235, 0.1)',
          st_hero_border: 'rgba(59, 130, 246, 0.2)',

          // TabsContent
          tc_tabbar_bg: 'rgba(255, 255, 255, 0.1)',
          tc_inactive_tab_text: '#dbeafe',
          tc_inactive_tab_hover: 'rgba(255, 255, 255, 0.05)',
          tc_dropdown_bg: 'rgba(15, 23, 42, 0.98)',
          tc_dropdown_item_text: 'rgba(255, 255, 255, 0.8)',
          tc_dropdown_hover_bg: 'rgba(255, 255, 255, 0.1)',

          // TransactionAllocations
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