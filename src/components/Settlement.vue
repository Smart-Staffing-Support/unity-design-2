<template>
  <div class="d-flex flex-column ga-8">
    <v-row>
      <v-col cols="12" md="6" lg="3">
        <DateField label="First Payment Date Expiration" :theme="theme" />
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <InputField label="First Payment Amount" placeholder="$0.00" type="text" :theme="theme" />
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <DateField label="Second Payment Date Expiration" :theme="theme" />
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <InputField label="Second Payment Amount" placeholder="$0.00" type="text" :theme="theme" />
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <DateField label="Third Payment Date Expiration" :theme="theme" />
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <InputField label="Third Payment Amount" placeholder="$0.00" type="text" :theme="theme" />
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <DateField label="Date of Settlement Expiration" :theme="theme" />
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <InputField label="Settlement Amount" placeholder="$0.00" type="text" :theme="theme" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import DateField from './shared/DateField.vue'
import InputField from './shared/InputField.vue';

defineOptions({ name: 'Settlement' });

const props = defineProps({
  theme: { type: String, default: 'light' },
});
</script>
