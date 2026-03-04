<template>
  <div class="d-flex flex-column ga-2 w-100" :class="props.className">
    <label
      class="text-body-2 text-capitalize text-fields_label"
      style="letter-spacing: 0.15em;"
      
    >
      {{ props.label }}
    </label>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      class="input-field w-100 bg-fields_bg border-fields_border text-fields_text"
      :class="isDark ? 'input-dark' : 'input-light'"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  className: { type: String, default: '' },
})

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)
</script>

<style scoped>
.input-field {
  appearance: none;
  padding: 10px 16px;
  border-radius: 12px;
  border-width: 1px;
  border-style: solid;
  outline: none;
  font-size: 0.75rem;
  font-weight: 700;
  transition: background-color 0.2s, border-color 0.2s;
}

.input-dark::placeholder { 
  color: rgba(255, 255, 255, 0.3); 
}
.input-dark:hover { 
  background-color: rgba(255, 255, 255, 0.1); 
}
.input-dark:focus { 
  border-color: rgba(59, 130, 246, 0.5); 
}

.input-light::placeholder { 
  color: #94a3b8; 
}
.input-light:hover { 
  background-color: #e2e8f0; 
}
.input-light:focus { 
  border-color: rgba(37, 99, 235, 0.5);
}
</style>
