<template>
  <div class="d-flex flex-column ga-6 animate-fade">

    <!-- Tab Navigation + Balance Badges -->
    <div class="d-flex flex-column flex-md-row justify-space-between align-start align-md-center ga-4 mt-8">

      <!-- Tabs -->
      <div class="d-flex ga-6">
        <button
          class="tab-btn pb-4 text-body-1 font-weight-medium"
          :class="activeTab === 'account' ? 'tab-btn--active' : 'tab-btn--inactive'"
          :style="activeTab === 'account'
            ? 'color: #38bdf8; border-bottom: 2px solid #38bdf8;'
            : theme === 'dark' ? 'color: white; border-bottom: 2px solid transparent;' : 'color: #475569; border-bottom: 2px solid transparent;'"
          @click="activeTab = 'account'"
        >Account Billing</button>
        <button
          class="tab-btn pb-4 text-body-1 font-weight-medium"
          :style="activeTab === 'legal'
            ? 'color: #38bdf8; border-bottom: 2px solid #38bdf8;'
            : theme === 'dark' ? 'color: white; border-bottom: 2px solid transparent;' : 'color: #475569; border-bottom: 2px solid transparent;'"
          @click="activeTab = 'legal'"
        >Legal Billing</button>
      </div>

      <!-- Balance Badges -->
      <div class="d-flex ga-4">
        <div
          class="pa-3 px-8 rounded-lg d-flex flex-column justify-center align-center ga-2"
          style="background: #0f766e;"
        >
          <span class="text-body-2 font-weight-bold text-white">Client Owes: $382,660</span>
        </div>
        <div
          class="pa-3 px-8 rounded-lg d-flex flex-column justify-center align-center ga-2"
          style="background: #1e40af;"
        >
          <span class="text-body-2 font-weight-bold text-white">Company Owes: $382,660</span>
        </div>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="d-flex flex-column ga-6">

      <!-- ═══ ACCOUNT BILLING TAB ═══ -->
      <template v-if="activeTab === 'account'">

        <!-- Ledger Table -->
        <div
          style="border-radius: 30px; overflow: hidden;"
          :style="theme === 'dark'
            ? 'background: rgba(15,23,42,0.4); border: 1px solid rgba(255,255,255,0.05);'
            : 'background: white; border: 1px solid #e2e8f0;'"
        >
          <!-- Table Header Bar -->
          <div
            class="pa-4 d-flex justify-space-between align-center"
            :style="theme === 'dark' ? 'background: #1e3a8a;' : 'background: #60a5fa;'"
          >
            <span class="text-body-2 text-white">Account Billing Ledger</span>
            <span
              class="text-caption font-weight-bold text-white px-4 py-1 rounded-pill"
              style="background: #16a34a; cursor: pointer;"
            >Offset Selected Accounts</span>
          </div>

          <!-- Table -->
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: center;">
              <thead>
                <tr :style="theme === 'dark' ? 'background: rgba(255,255,255,0.05);' : 'background: #e0f2fe;'">
                  <th v-for="col in accountColumns" :key="col"
                    class="pa-4 text-caption font-weight-bold"
                    style="min-width: 140px; letter-spacing: 0.12em; white-space: nowrap;"
                    :style="[
                      theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;',
                      theme === 'dark' ? 'border-bottom: 1px solid rgba(255,255,255,0.05);' : 'border-bottom: 1px solid #e2e8f0;'
                    ]"
                  >
                    <input v-if="col === 'cb'" type="checkbox" />
                    <span v-else>{{ col }}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="i in 2" :key="i"
                  class="cursor-pointer"
                  style="transition: background 0.15s ease;"
                  :style="theme === 'dark' ? 'background: #0f172a;' : 'background: white;'"
                  @mouseover="$event.currentTarget.style.background = theme === 'dark' ? '#1e293b' : '#f1f5f9'"
                  @mouseleave="$event.currentTarget.style.background = theme === 'dark' ? '#0f172a' : 'white'"
                >
                  <td class="pa-4"><input type="checkbox" @click.stop /></td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">#882019</td>
                  <td class="pa-4">
                    <span class="text-caption font-weight-bold" style="color: #22c55e;">Active</span>
                  </td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">Ck-4402</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">Monthly pmt</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">$0.00</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">$25.00</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">$75.00</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">$5.00</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">$0.00</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">$25.00</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">$450.00</td>
                  <td class="pa-4">
                    <select
                      class="rounded-lg pa-1 text-caption"
                      :style="theme === 'dark'
                        ? 'background: #1e293b; color: #cbd5e1; border: 1px solid rgba(255,255,255,0.1);'
                        : 'background: white; color: #334155; border: 1px solid #e2e8f0;'"
                      @click.stop
                    >
                      <option value="edit">Edit</option>
                      <option value="delete">Delete</option>
                    </select>
                  </td>
                  <td class="pa-4">
                    <button
                      class="px-4 py-1 rounded-pill text-caption font-weight-bold text-white"
                      style="background: #2563eb; border: none; cursor: pointer; transition: background 0.15s;"
                      @click.stop="isPaymentModalOpen = true"
                      @mouseover="$event.currentTarget.style.background = '#1d4ed8'"
                      @mouseleave="$event.currentTarget.style.background = '#2563eb'"
                    >Add Payment</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Footer: Icon Buttons + Totals -->
        <div class="d-flex flex-column flex-md-row justify-space-between align-start ga-6">
          <!-- Icon Buttons -->
          <div class="d-flex ga-3">
            <IconButton :icon="FileDown" :theme="theme" />
            <IconButton :icon="Mail" :theme="theme" />
            <IconButton :icon="Printer" :theme="theme" />
            <IconButton :icon="MessageCircle" :theme="theme" />
            <IconButton :icon="Link2" :theme="theme" />
          </div>
          <!-- Totals -->
          <div
            class="pa-6 rounded-xl d-flex ga-8 flex-wrap"
            :style="theme === 'dark'
              ? 'background: #0f172a; border: 1px solid #2563eb;'
              : 'background: #f0f9ff; border: 1px solid #e2e8f0; box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
          >
            <FooterStat label="Total Attorney:" value="$0.00" :theme="theme" />
            <FooterStat label="Total Agency:" value="$50.00" :theme="theme" />
            <FooterStat label="Total Client:" value="$900.00" :theme="theme" />
            <FooterStat label="Total:" value="$1,850.00" :theme="theme" :highlight="true" />
          </div>
        </div>
      </template>

      <!-- ═══ LEGAL BILLING TAB ═══ -->
      <template v-else>

        <!-- Legal Table -->
        <div style="border-radius: 30px; overflow: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: center;">
            <thead>
              <tr :style="theme === 'dark' ? 'background: rgba(255,255,255,0.05);' : 'background: #e0f2fe;'">
                <th v-for="col in legalColumns" :key="col"
                  class="pa-4 text-caption font-weight-bold"
                  style="min-width: 140px; letter-spacing: 0.12em; white-space: nowrap;"
                  :style="[
                    theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;',
                    theme === 'dark' ? 'border-bottom: 1px solid rgba(255,255,255,0.05);' : 'border-bottom: 1px solid #e2e8f0;'
                  ]"
                >{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="i in 2" :key="i">
                <!-- Main Row -->
                <tr
                  class="cursor-pointer"
                  style="transition: background 0.15s ease;"
                  :style="theme === 'dark' ? 'background: #0f172a;' : 'background: white;'"
                  @click="expandedRow = expandedRow === i ? null : i"
                  @mouseover="$event.currentTarget.style.background = theme === 'dark' ? '#1e293b' : '#f1f5f9'"
                  @mouseleave="$event.currentTarget.style.background = theme === 'dark' ? '#0f172a' : 'white'"
                >
                  <td class="pa-4"><input type="checkbox" @click.stop /></td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">65487-9201</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">David and Fisher</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">Law Suit Pending</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">$85.00</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">2-25-2023</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">$500.00</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">$400.00</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">$270.00</td>
                  <td class="pa-4 text-body-2" :style="theme === 'dark' ? 'color: white;' : 'color: #475569;'">$370.00</td>
                  <td class="pa-4">
                    <select
                      class="rounded-lg pa-1 text-caption"
                      :style="theme === 'dark'
                        ? 'background: #1e293b; color: #cbd5e1; border: 1px solid rgba(255,255,255,0.1);'
                        : 'background: white; color: #334155; border: 1px solid #e2e8f0;'"
                      @click.stop
                    >
                      <option value="edit">Edit</option>
                      <option value="delete">Delete</option>
                    </select>
                  </td>
                  <td class="pa-4">
                    <button
                      class="px-4 py-1 rounded-pill text-caption font-weight-bold text-white"
                      style="background: #2563eb; border: none; cursor: pointer; transition: background 0.15s;"
                      @click.stop="isPaymentModalOpen = true"
                      @mouseover="$event.currentTarget.style.background = '#1d4ed8'"
                      @mouseleave="$event.currentTarget.style.background = '#2563eb'"
                    >Add Payment</button>
                  </td>
                </tr>

                <!-- Expanded Row -->
                <tr
                  v-if="expandedRow === i"
                  :style="theme === 'dark'
                    ? 'background: rgba(255,255,255,0.08);'
                    : 'background: rgba(37,99,235,0.55);'"
                >
                  <td colspan="12" class="pa-6">
                    <div class="d-flex justify-space-around flex-wrap ga-4 text-body-2">
                      <div v-for="detail in legalExpandedDetails" :key="detail.label" class="d-flex flex-column align-center">
                        <span :style="theme === 'dark' ? `color: ${detail.color};` : `color: ${detail.colorLight}; font-weight: bold;`">
                          {{ detail.label }}
                        </span>
                        <span style="color: white;" class="text-center">{{ detail.value }}</span>
                      </div>
                      <div class="d-flex flex-column align-center" style="border-left: 1px solid white; padding-left: 24px;">
                        <span :style="theme === 'dark' ? 'color: #22c55e;' : 'color: #86efac; font-weight: bold;'">Agency</span>
                        <span style="color: white;">$150.00</span>
                      </div>
                      <div class="d-flex flex-column align-center">
                        <span :style="theme === 'dark' ? 'color: #eab308;' : 'color: #fde047; font-weight: bold;'">Client</span>
                        <span style="color: white;">$100.00</span>
                      </div>
                      <div class="d-flex flex-column align-center">
                        <span :style="theme === 'dark' ? 'color: #f87171;' : 'color: #fca5a5; font-weight: bold;'">Total</span>
                        <span style="color: white;">$200.00</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <!-- Footer: Icon Buttons + Totals -->
        <div class="d-flex flex-column flex-md-row justify-space-between align-start ga-6">
          <div class="d-flex ga-3">
            <IconButton :icon="FileDown" :theme="theme" />
            <IconButton :icon="Mail" :theme="theme" />
            <IconButton :icon="Printer" :theme="theme" />
            <IconButton :icon="MessageCircle" :theme="theme" />
            <IconButton :icon="Link2" :theme="theme" />
          </div>
          <div
            class="pa-6 rounded-xl d-flex ga-8 flex-wrap"
            :style="theme === 'dark'
              ? 'background: #0f172a; border: 1px solid #2563eb;'
              : 'background: #f0f9ff; border: 1px solid #e2e8f0; box-shadow: 0 1px 4px rgba(0,0,0,0.06);'"
          >
            <FooterStat label="Agency Spent:" value="$0.00" :theme="theme" />
            <FooterStat label="Client Spent:" value="$50.00" :theme="theme" />
            <FooterStat label="Pending:" value="$900.00" :theme="theme" />
            <FooterStat label="Client Trust Balance:" value="$850.00" :theme="theme" :highlight="true" />
          </div>
        </div>
      </template>
    </div>

    <!-- ═══ PAYMENT MODAL ═══ -->
    <v-dialog
      v-model="isPaymentModalOpen"
      max-width="680"
      :scrim-opacity="0.6"
      style="backdrop-filter: blur(8px);"
      scrollable
    >
      <v-sheet
        style="border-radius: 30px; overflow: hidden;"
        color="transparent"
        :style="theme === 'dark'
          ? 'background: #0f172a !important; border: 1px solid rgba(255,255,255,0.10);'
          : 'background: white !important; border: 1px solid #e2e8f0;'"
      >
        <!-- Modal Header -->
        <div
          class="pa-6 d-flex justify-space-between align-center"
          style="position: sticky; top: 0; z-index: 10;"
          :style="theme === 'dark'
            ? 'background: #0f172a; border-bottom: 1px solid rgba(255,255,255,0.05);'
            : 'background: white; border-bottom: 1px solid #e2e8f0;'"
        >
          <div class="d-flex align-center ga-3">
            <div class="pa-2 rounded-lg" style="background: rgba(59,130,246,0.10);">
              <CircleDollarSign :size="24" color="#3b82f6" />
            </div>
            <div>
              <div
                class="text-h6 font-weight-black text-uppercase"
                style="letter-spacing: -0.3px;"
                :style="theme === 'dark' ? 'color: white;' : 'color: #0f172a;'"
              >New Transaction</div>
              <div
                class="text-caption font-weight-bold text-uppercase"
                style="letter-spacing: 0.12em;"
                :style="theme === 'dark' ? 'color: rgba(255,255,255,0.5);' : 'color: #94a3b8;'"
              >Account: #882019 - David and Fisher</div>
            </div>
          </div>
          <button
            class="d-flex align-center justify-center rounded-circle"
            style="width: 32px; height: 32px; border: none; cursor: pointer; background: transparent; transition: background 0.15s;"
            :style="theme === 'dark' ? 'color: rgba(255,255,255,0.4);' : 'color: #94a3b8;'"
            @click="isPaymentModalOpen = false"
            @mouseover="$event.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f1f5f9'"
            @mouseleave="$event.currentTarget.style.background = 'transparent'"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="pa-6" style="max-height: 70vh; overflow-y: auto;">
          <v-row>
            <v-col cols="12" sm="6"><DateField label="Date" :theme="theme" /></v-col>
            <v-col cols="12" sm="6">
              <SelectField
                label="Payment Type"
                :options="[
                  {value:'credit_card', label:'Credit Card'},
                  {value:'ach',         label:'ACH'},
                  {value:'check',       label:'Check'},
                ]"
                :theme="theme"
                @update:modelValue="paymentType = $event"
              />
            </v-col>
            <v-col cols="12" sm="6"><InputField label="ID/Check Number" :theme="theme" /></v-col>
            <v-col cols="12" sm="6"><InputField label="Description" :theme="theme" /></v-col>
            <v-col cols="12" sm="6"><InputField label="Amount" :theme="theme" /></v-col>
            <v-col cols="12" sm="6"><SelectField label="From" :options="[]" :theme="theme" /></v-col>
            <v-col cols="12" sm="6"><SelectField label="To" :options="[]" :theme="theme" /></v-col>
            <v-col cols="12" sm="6"><CheckboxField label="Add Conv. Fee" :theme="theme" /></v-col>
          </v-row>

          <!-- Credit Card Fields -->
          <v-sheet
            v-if="paymentType === 'credit_card'"
            class="pa-4 rounded-xl mt-6"
            color="transparent"
            style="border-radius: 16px !important; border: 1px solid;"
            :style="theme === 'dark'
              ? 'background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.10);'
              : 'background: #f8fafc !important; border-color: #e2e8f0;'"
          >
            <div
              class="text-caption font-weight-black text-uppercase mb-4"
              style="letter-spacing: 0.15em;"
              :style="theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;'"
            >Credit Card Information</div>
            <v-row>
              <v-col cols="12" sm="6"><InputField label="First Name" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Last Name" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Email" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Phone Number" :theme="theme" /></v-col>
              <v-col cols="12"><InputField label="Address" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="City" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="State" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Zip Code" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Credit Card Number" placeholder="1234 5678 9012 3456" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Expiration Date" placeholder="MM/YY" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="CVV" placeholder="123" :theme="theme" /></v-col>
            </v-row>
          </v-sheet>

          <!-- ACH Fields -->
          <v-sheet
            v-if="paymentType === 'ach'"
            class="pa-4 rounded-xl mt-6"
            color="transparent"
            style="border-radius: 16px !important; border: 1px solid;"
            :style="theme === 'dark'
              ? 'background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.10);'
              : 'background: #f8fafc !important; border-color: #e2e8f0;'"
          >
            <div
              class="text-caption font-weight-black text-uppercase mb-4"
              style="letter-spacing: 0.15em;"
              :style="theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;'"
            >ACH Information</div>
            <v-row>
              <v-col cols="12" sm="6">
                <SelectField
                  label="Account Type"
                  :options="[{value:'checking',label:'Checking'},{value:'savings',label:'Savings'}]"
                  :theme="theme"
                />
              </v-col>
              <v-col cols="12" sm="6"><InputField label="Account Name" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Account Number" :theme="theme" /></v-col>
              <v-col cols="12" sm="6"><InputField label="Routing Number" :theme="theme" /></v-col>
            </v-row>
          </v-sheet>

          <!-- Check Upload Fields -->
          <v-sheet
            v-if="paymentType === 'check'"
            class="pa-4 rounded-xl mt-6"
            color="transparent"
            style="border-radius: 16px !important; border: 1px solid;"
            :style="theme === 'dark'
              ? 'background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.10);'
              : 'background: #f8fafc !important; border-color: #e2e8f0;'"
          >
            <div
              class="text-caption font-weight-black text-uppercase mb-4"
              style="letter-spacing: 0.15em;"
              :style="theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;'"
            >Check Upload</div>
            <label
              class="text-caption font-weight-bold text-uppercase"
              :style="theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;'"
            >Upload Check Image</label>
            <div
              class="mt-2 pa-6 rounded-xl text-center cursor-pointer"
              style="border: 2px dashed; transition: background 0.15s ease;"
              :style="theme === 'dark'
                ? 'border-color: rgba(255,255,255,0.10);'
                : 'border-color: #cbd5e1; background: #f8fafc;'"
              @mouseover="$event.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f1f5f9'"
              @mouseleave="$event.currentTarget.style.background = theme === 'dark' ? 'transparent' : '#f8fafc'"
            >
              <input type="file" accept="image/*,.pdf" style="display: none;" id="check-upload" />
              <label for="check-upload" class="cursor-pointer d-block">
                <p class="text-body-2 font-weight-bold" :style="theme === 'dark' ? 'color: white;' : 'color: #334155;'">
                  Click to upload or drag and drop
                </p>
                <p class="text-caption mt-1" :style="theme === 'dark' ? 'color: #64748b;' : 'color: #94a3b8;'">
                  PNG, JPG, PDF up to 10MB
                </p>
              </label>
            </div>
          </v-sheet>

          <!-- Action Buttons -->
          <div class="d-flex ga-4 mt-6">
            <button
              class="flex-grow-1 d-flex align-center justify-center ga-2 py-4 rounded-xl text-caption font-weight-black text-uppercase text-white"
              style="background: #2563eb; border: none; cursor: pointer; letter-spacing: 0.15em; box-shadow: 0 8px 24px rgba(37,99,235,0.25); transition: background 0.15s, transform 0.1s; width: 100%;"
              @mouseover="$event.currentTarget.style.background = '#1d4ed8'"
              @mouseleave="$event.currentTarget.style.background = '#2563eb'"
              @mousedown="$event.currentTarget.style.transform = 'scale(0.97)'"
              @mouseup="$event.currentTarget.style.transform = 'scale(1)'"
            >
              <Plus :size="18" class="mr-2" /> Process Payment
            </button>
            <button
              class="flex-grow-1 d-flex align-center justify-center ga-2 py-4 rounded-xl text-caption font-weight-black text-uppercase text-white"
              style="background: #0f766e; border: none; cursor: pointer; letter-spacing: 0.15em; box-shadow: 0 8px 24px rgba(13,148,136,0.25); transition: background 0.15s, transform 0.1s; width: 100%;"
              @mouseover="$event.currentTarget.style.background = '#0d6b63'"
              @mouseleave="$event.currentTarget.style.background = '#0f766e'"
              @mousedown="$event.currentTarget.style.transform = 'scale(0.97)'"
              @mouseup="$event.currentTarget.style.transform = 'scale(1)'"
            >
              <Minus :size="18" class="mr-2" /> Skip Payment Processing
            </button>
          </div>
        </div>
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  FileDown, Mail, Printer, MessageCircle, Link2,
  CircleDollarSign, X, Plus, Minus,
} from 'lucide-vue-next';
import IconButton    from './shared/IconButton.vue';
import SelectField   from './shared/SelectField.vue';
import InputField    from './shared/InputField.vue';
import DateField     from './shared/DateField.vue';
import CheckboxField from './shared/CheckboxField.vue';

defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
});

const activeTab          = ref('account');
const expandedRow        = ref(null);
const isPaymentModalOpen = ref(false);
const paymentType        = ref('');

// ── Table column headers ───────────────────────────────────────────────────────
const accountColumns = [
  'cb', 'Account Number', 'Status', 'ID/Check Number', 'Description',
  'Attorney Fees', 'Agency Fee', 'Client Fee', 'Conv. Fee',
  'Attorney Owes', 'Agency Owes', 'Client Owes', 'Actions', 'Payments',
];

const legalColumns = [
  '', 'Account Number', 'Full Name/Company', 'Status', 'Current Balance Due',
  'Statute of Limitation', 'Client Sent', 'Agency Spent',
  'Total Pending', 'Trust Balance', 'Actions', 'Payments',
];

// ── Legal expanded row detail cells ───────────────────────────────────────────
const legalExpandedDetails = [
  { label: 'Date',             value: '02/18/26',  color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'Description',      value: 'Payment',   color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'ID/Check Number',  value: '#9902',     color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'Note',             value: 'payment',   color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'Agent',            value: 'John Doe',  color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'Amount',           value: '$50.00',    color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'Agency',           value: '$50.00',    color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'Client',           value: '$450.00',   color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'Client Sent',      value: '$350.00',   color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'Agency Spent',     value: '$50.00',    color: '#7dd3fc', colorLight: '#1e293b' },
  { label: 'Convenience Fees', value: '$250.00',   color: '#7dd3fc', colorLight: '#1e293b' },
];
</script>

<!-- ── Inline FooterStat sub-component ──────────────────────────────────────── -->
<script>
const FooterStat = {
  props: {
    label:     { type: String, required: true },
    value:     { type: String, required: true },
    theme:     { type: String, default: 'dark' },
    highlight: { type: Boolean, default: false },
  },
  template: `
    <div class="d-flex flex-column">
      <span class="text-body-2" style="color: #3b82f6;">{{ label }}</span>
      <span
        class="text-body-2 font-weight-bold"
        :style="highlight
          ? 'color: #22c55e;'
          : theme === 'dark' ? 'color: white;' : 'color: #1e293b;'"
      >{{ value }}</span>
    </div>
  `,
};
export default { components: { FooterStat } };
</script>

<style scoped>
.animate-fade {
  animation: fadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.tab-btn {
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
  padding-left: 0;
  padding-right: 0;
}

.cursor-pointer { cursor: pointer; }
</style>