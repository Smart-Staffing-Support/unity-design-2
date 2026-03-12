<template>
  <div class="d-flex flex-column ga-1">
    <!-- Label Row -->
    <div class="d-flex justify-space-between align-center">
      <label
        class="text-body-2"
        style="letter-spacing: 0.1em;"
        :style="theme === 'dark' ? 'color: #7dd3fc;' : 'color: #2563eb;'"
      >{{ label }}</label>
      <button
        class="d-flex align-center justify-center"
        style="background: transparent; border: none; cursor: pointer; color: #3b82f6; padding: 4px; border-radius: 6px;"
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
          class="position-absolute d-flex align-center"
          style="left: 12px; top: 50%; transform: translateY(-50%); color: #64748b; pointer-events: none; z-index: 1;"
        >
          <component :is="icon" :size="16" color="#64748b" />
        </div>

        <!-- Input -->
        <input
          :type="type"
          :value="item"
          @input="items[index] = $event.target.value"
          class="contact-input font-weight-bold text-caption"
          :class="theme === 'dark' ? 'contact-input--dark' : 'contact-input--light'"
        />

        <!-- Trailing delete button (visible on hover) -->
        <div
          class="position-absolute d-flex align-center delete-btn"
          style="right: 10px; top: 50%; transform: translateY(-50%);"
        >
          <button
            class="d-flex align-center justify-center"
            style="background: transparent; border: none; cursor: pointer; color: #ef4444; padding: 4px; border-radius: 6px;"
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
  label: { type: String,   required: true },
  icon:  { default: Mail },
  type:  { type: String,   default: 'text' },
  theme: { type: String,   default: 'dark' },
});

const items = ref(['contact@firm.com']);

function addItem()        { items.value.push(''); }
function removeItem(i)    { items.value.splice(i, 1); }
</script>

<style scoped>
.contact-input {
  width: 100%;
  padding: 10px 40px 10px 36px;
  border-radius: 12px;
  font-size: 11px;
  outline: none;
  transition: border-color 0.2s ease;
}

.contact-input--dark {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.10);
  color: white;
}

.contact-input--dark:focus {
  border-color: rgba(59, 130, 246, 0.5);
}

.contact-input--light {
  background: #f8fafc;
  border: 1px solid #94a3b8;
  color: #0f172a;
}

.contact-input--light:focus {
  border-color: rgba(37, 99, 235, 0.5);
}

/* Show delete button only on row hover */
.delete-btn {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.contact-row:hover .delete-btn {
  opacity: 1;
}
</style>