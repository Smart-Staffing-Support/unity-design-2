<template>
  <div class="d-flex flex-column ga-8">

    <!-- Top Row: Legal & Risk Indicators -->
    <v-row>
      <v-col cols="12" md="4">
        <div
          class="pa-6 h-100 rounded-xl bg-secondary_container_bg"
          style="border: 1px solid rgba(43,127,255,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);"
        >
          <SelectField
            label="Bankruptcy Filing"
            :options="[{value:'other',label:'Other / General'},{value:'7',label:'Chapter 7'},{value:'11',label:'Chapter 11'},{value:'13',label:'Chapter 13'}]"
            default-value="other"
            
          />
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <div
          class="pa-6 h-100 rounded-xl bg-secondary_container_bg"
          style="border: 1px solid rgba(43,127,255,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);"
        >
          <SelectField
            label="Judgments / Liens (12M)"
            :options="[{value:'yes',label:'Yes - Active'},{value:'no',label:'No - None'}]"
            default-value="no"
            
          />
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <div
          class="pa-6 h-100 d-flex flex-column justify-center rounded-xl border bg-exp_total_bg"
          style="border-color: rgba(239,68,68,1);"
        >
          <span
            class="text-body-2 font-weight-medium text-red mb-1 text-red-darken-4"
            style="letter-spacing: 0.2em; font-size: 1.1rem;"
          >
            Total Derogatory Accounts
          </span>
          <span class="font-weight-black text-fields-text" style="font-size: 1.8rem; line-height: 1;">
            695
          </span>
        </div>
      </v-col>
    </v-row>

    <!-- Middle Section: Delinquency Timeline -->
    <div
      class="pa-8 rounded-xl bg-secondary_container_bg"
      style="border: 1px solid rgba(43,127,255,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);"
    >
      <div class="d-flex align-center ga-2 mb-6">
        <div class="rounded-pill bg-amber-darken-1" style="height: 20px; width: 4px;" />
        <h4
          class="text-caption font-weight-black text-uppercase text-amber-darken-4"
          style="letter-spacing: 0.2em;"
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
              class="font-weight-black text-uppercase mb-2 text-caption text-exp_delinq_titles"
              style="letter-spacing: 0.1em; opacity: 0.8;"
            >
              {{ item.label }}
            </span>
            <span
              class="text-h5 font-weight-black"
              :class="item.value === '0' ? 'text-grey-lighten-2' : item.colorClass"
            >
              {{ item.value === '0' ? '—' : item.value }}
            </span>
          </div>
        </v-col>
      </v-row>

      <v-row class="mt-8 pt-8 border-top border-grey-lighten-3">
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
          class="pa-8 h-100 rounded-xl bg-secondary_container_bg"
          style="border: 1px solid rgba(43,127,255,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);"
        >
          <h4
            class="text-caption font-weight-black text-uppercase mb-6 text-blue-darken-2"
            style="letter-spacing: 0.2em;"
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
          class="pa-8 h-100 rounded-xl bg-secondary_container_bg"
          style="border: 1px solid rgba(43,127,255,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.08);"
        >
          <h4
            class="text-caption font-weight-black text-uppercase mb-6 text-purple-darken-1"
            style="letter-spacing: 0.2em;"
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


const delinquencyItems = [
  { label: '30 Days',      value: '0',     colorClass: 'text-blue'          },
  { label: '60 Days',      value: '0',     colorClass: 'text-orange'        },
  { label: '90 Days',      value: '6,380', colorClass: 'text-red'           },
  { label: '120-180 Days', value: '6,380', colorClass: 'text-red-darken-3'  },
]
</script>