<template>
  <label class="d-flex align-center ga-3 cursor-pointer select-none checkbox-label position-relative">
    <!-- Covers the full row so clicks always hit the native control (expansion panels / stacking-safe). -->
    <input
      type="checkbox"
      :checked="checked"
      class="checkbox-hit ma-0 border-0"
      @change="$emit('update:checked', $event.target.checked)"
    />

    <div class="checkbox-control-wrap flex-shrink-0">
      <div
        class="rounded-circle checkbox-box"
        :class="[
          checked
            ? 'bg-checkbox_field_box_checked checkbox-box--checked'
            : 'bg-checkbox_field_box_bg border-checkbox_field_box_border_unchecked',
        ]"
        style="width: 20px; height: 20px; border-radius: 50%; transition: background 0.15s, border-color 0.15s, border-width 0.15s;"
        aria-hidden="true"
      />
    </div>

    <span
      class="checkbox-text"
      style="font-size: 14px; letter-spacing: 0.1em; transition: color 0.15s;"
      :class="checked ? 'text-checkbox_field_label_checked' : 'text-checkbox_field_label'"
    >
      {{ label }}
    </span>
  </label>
</template>

<script setup>
  const props = defineProps ({
    label:   { type: String,  required: true  },
    checked: { type: Boolean, default: false  },
  })

  const emits = defineEmits (['update:checked'])

</script>

<style scoped>
.checkbox-hit {
  position: absolute;
  inset: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.checkbox-control-wrap,
.checkbox-text {
  position: relative;
  z-index: 0;
  pointer-events: none;
}

.checkbox-control-wrap {
  width: 20px;
  height: 20px;
}

/* Unchecked: ring uses theme border; checked: solid blue fill (theme). */
.checkbox-box:not(.checkbox-box--checked) {
  border: 2px solid;
}

.checkbox-box--checked {
  border: none;
  outline: none;
  box-shadow: none;
}

/* Unchecked: blue border on hover only (no extra ring on click — see .checkbox-hit below). */
.checkbox-label:hover .checkbox-box:not(.checkbox-box--checked) {
  border-color: #60a5fa;
}

.checkbox-label:hover .checkbox-text {
  color: rgb(var(--v-theme-checkbox_field_label_hover));
}

/* Remove focus ring after click / keyboard; hover styling stays on .checkbox-label:hover above. */
.checkbox-hit:focus,
.checkbox-hit:focus-visible,
.checkbox-hit:active {
  outline: none !important;
  box-shadow: none !important;
}

.checkbox-box,
.checkbox-box:focus,
.checkbox-box:focus-within {
  outline: none;
  box-shadow: none;
}
</style>
