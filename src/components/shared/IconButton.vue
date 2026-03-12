<template>
  <button
    class="icon-btn pa-2"
    :class="theme === 'dark' ? 'icon-btn--dark' : 'icon-btn--light'"
  >
    <v-icon :icon="icon" size="20" />
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val),
  },
});
</script>

<style scoped>
.icon-btn {
  border-radius: 12px;
  border: 1px solid;
  cursor: pointer;
  transition: transform 0.15s ease, color 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
}

.icon-btn:hover {
  transform: scale(1.10);
}

/* Dark variant */
.icon-btn--dark {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.60);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.icon-btn--dark:hover {
  color: white;
}

/* Light variant */
.icon-btn--light {
  background: white;
  border-color: #e2e8f0;
  color: #64748b;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.icon-btn--light:hover {
  color: #2563eb;
}
</style>