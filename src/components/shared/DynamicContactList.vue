<template>
  <div class="d-flex flex-column ga-1">
    <!-- Label Row -->
    <div class="d-flex justify-space-between align-center">
      <label
        class="text-body-2 text-fields_label"
        style="letter-spacing: 0.1em;"
      >{{ label }}</label>
      <button
        class="d-flex align-center justify-center pa-1 rounded-md text-primary"
        style="background: transparent; border: none; cursor: pointer;"
        @click="addItem"
      >
        <Plus :size="16" />
      </button>
    </div>

    <!-- Input Rows -->
    <div class="d-flex flex-column ga-2">
      <div
        class="position-relative contact-row"
        v-for="(item, index) in items"
        :key="index"
      >
        <!-- Leading icon -->
        <div
          class="position-absolute d-flex align-center text-primary"
          style="left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; z-index: 1;"
        >
          <component :is="icon" :size="16" />
        </div>

        <!-- Input -->
        <input
          :type="type"
          :value="item"
          @input="items[index] = $event.target.value"
          class="w-100 font-weight-bold text-caption pa-2 rounded-xl bg-fields_bg border-fields_border text-fields_text"
          style="padding-left: 36px; padding-right: 40px; border-width: 1px; border-style: solid; outline: none;"
        />

        <!-- Trailing delete button (visible on hover) -->
        <div
          class="position-absolute d-flex align-center delete-btn"
          style="right: 10px; top: 50%; transform: translateY(-50%);"
        >
          <button
            class="d-flex align-center justify-center pa-1 rounded-md text-red-accent-4"
            style="background: transparent; border: none; cursor: pointer;"
            @click="removeItem(index)"
          >
            <Trash2 :size="14" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Plus, Trash2, Mail } from 'lucide-vue-next';

const props = defineProps({
  label: { type: String, required: true },
  icon: { default: Mail },
  type: { type: String, default: 'text' },
  theme: { type: String, default: 'dark' },
});

const items = ref(['contact@firm.com']);

function addItem() { items.value.push(''); }
function removeItem(i) { items.value.splice(i, 1); }
</script>

<style scoped>
.delete-btn {
  opacity: 0;
  transition: opacity 0.2s ease;
}
.contact-row:hover .delete-btn {
  opacity: 1;
}
</style>