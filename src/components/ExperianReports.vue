<template>
  <div class="d-flex flex-column ga-8">

    <!-- Top Row: Legal & Risk Indicators -->
    <v-row>
      <v-col cols="12" md="4">
        <div
          class="pa-6 h-100"
          style="border-radius: 25px; border: 1px solid;"
          :style="isDark
            ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1);'
            : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
        >
          <SelectField
            label="Bankruptcy Filing"
            :options="[{value:'other',label:'Other / General'},{value:'7',label:'Chapter 7'},{value:'11',label:'Chapter 11'},{value:'13',label:'Chapter 13'}]"
            default-value="other"
            :theme="theme"
          />
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <div
          class="pa-6 h-100"
          style="border-radius: 25px; border: 1px solid;"
          :style="isDark
            ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1);'
            : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
        >
          <SelectField
            label="Judgments / Liens (12M)"
            :options="[{value:'yes',label:'Yes - Active'},{value:'no',label:'No - None'}]"
            default-value="no"
            :theme="theme"
          />
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <div
          class="pa-6 h-100 d-flex flex-column justify-center"
          style="border-radius: 25px; border: 1px solid rgba(239,68,68,0.2);"
          :style="isDark
            ? 'background: rgba(239,68,68,0.05);'
            : 'background: rgba(254,242,242,0.5);'"
        >
          <span
            class="text-body-2 font-weight-medium text-red mb-1"
            style="letter-spacing: 0.2em;"
          >
            Total Derogatory Accounts
          </span>
          <span
            class="font-weight-black"
            style="font-size: 1.875rem; line-height: 1;"
            :class="isDark ? 'text-white' : 'text-grey-darken-4'"
          >
            695
          </span>
        </div>
      </v-col>
    </v-row>

    <!-- Middle Section: Delinquency Timeline -->
    <div
      class="pa-8"
      style="border-radius: 30px; border: 1px solid;"
      :style="isDark
        ? 'background: rgba(15,23,42,0.4); border-color: rgba(255,255,255,0.05);'
        : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 4px 24px rgba(148,163,184,0.2);'"
    >
      <div class="d-flex align-center ga-2 mb-6">
        <div class="rounded-pill bg-amber-darken-1" style="height: 20px; width: 4px;" />
        <h4
          class="text-caption font-weight-black text-uppercase"
          style="letter-spacing: 0.2em;"
          :class="isDark ? 'text-amber-lighten-2' : 'text-amber-darken-2'"
        >
          Delinquency Chronology (24 Months)
        </h4>
      </div>

      <v-row>
        <v-col
          v-for="(item, i) in delinquencyItems"
          :key="i"
          cols="6"
          md="3"
        >
          <div class="d-flex flex-column">
            <span
              class="font-weight-black text-uppercase mb-2"
              style="font-size: 12px; letter-spacing: 0.1em; opacity: 0.8;"
              :class="isDark ? 'text-white' : 'text-grey-darken-2'"
            >
              {{ item.label }}
            </span>
            <span
              class="text-h5 font-weight-black"
              :style="item.value === '0'
                ? (isDark ? 'color: rgba(255,255,255,0.2);' : 'color: #cbd5e1;')
                : ''"
              :class="item.value !== '0' ? item.colorClass : ''"
            >
              {{ item.value === '0' ? '—' : item.value }}
            </span>
          </div>
        </v-col>
      </v-row>

      <v-row
        class="mt-8 pt-8"
        style="border-top: 1px solid;"
        :style="isDark ? 'border-color: rgba(255,255,255,0.05);' : 'border-color: #f1f5f9;'"
      >
        <v-col cols="12" md="6">
          <InfoBox label="Accounts in Collections" value="2,130" sub-value="N/A" :theme="theme" />
        </v-col>
        <v-col cols="12" md="6">
          <InfoBox label="Paid Collections (6 Months)" value="0" :theme="theme" />
        </v-col>
      </v-row>
    </div>

    <!-- Bottom Section: Credit & Debt Balances -->
    <v-row>

      <!-- Revolving & Installments -->
      <v-col cols="12" lg="6">
        <div
          class="pa-8 h-100"
          style="border-radius: 30px; border: 1px solid;"
          :style="isDark
            ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1);'
            : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
        >
          <h4
            class="text-caption font-weight-black text-uppercase mb-6"
            style="letter-spacing: 0.2em;"
            :class="isDark ? 'text-blue-lighten-2' : 'text-blue-darken-1'"
          >
            Revolving & Installments
          </h4>
          <div class="d-flex flex-column ga-6">
            <BalanceRow label="Monthly Payments (12M)"       value="$6,380" :theme="theme" />
            <BalanceRow label="Installment Loans"            value="$6,380" :theme="theme" />
            <BalanceRow label="Revolving Trades (Credit)"    value="$6,380" :theme="theme" />
            <BalanceRow label="Revolving Trades (Balance)"   value="$6,380" :theme="theme" />
          </div>
        </div>
      </v-col>

      <!-- Mortgage & Equity -->
      <v-col cols="12" lg="6">
        <div
          class="pa-8 h-100"
          style="border-radius: 30px; border: 1px solid;"
          :style="isDark
            ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1);'
            : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);'"
        >
          <h4
            class="text-caption font-weight-black text-uppercase mb-6"
            style="letter-spacing: 0.2em;"
            :class="isDark ? 'text-purple-lighten-2' : 'text-purple-darken-1'"
          >
            Mortgage & Equity
          </h4>
          <div class="d-flex flex-column ga-6">
            <BalanceRow label="Total Mortgage Credit"        value="$6,380" :theme="theme" />
            <BalanceRow label="Home Equity / 2nd Mortgage"   value="$6,380" :theme="theme" />
            <BalanceRow label="1st Mortgage Balance"         value="$6,380" :theme="theme" />
          </div>
        </div>
      </v-col>

    </v-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SelectField from './shared/SelectField.vue'
import InfoBox from './shared/InfoBox.vue'
import BalanceRow from './shared/BalanceRow.vue'

const props = defineProps({
  theme: { type: String, default: 'light' },
})

const isDark = computed(() => props.theme === 'dark')

const delinquencyItems = [
  { label: '30 Days',      value: '0',     colorClass: 'text-blue'          },
  { label: '60 Days',      value: '0',     colorClass: 'text-orange'        },
  { label: '90 Days',      value: '6,380', colorClass: 'text-red'           },
  { label: '120-180 Days', value: '6,380', colorClass: 'text-red-darken-3'  },
]
</script>