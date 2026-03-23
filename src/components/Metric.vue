<template>
  <div class="d-flex flex-column align-center pa-4" style="overflow: hidden;">
    <div class="position-relative flex-shrink-0" :style="{ width: width + 'px', height: height + 'px' }">
      <canvas ref="chartCanvas" :width="width" :height="height"></canvas>
      <div
        class="position-absolute text-center"
        style="left: 50%; transform: translateX(-50%); bottom: -40px; line-height: 1; white-space: nowrap; pointer-events: none;"
        
      >
        <span class="font-weight-bold mt-10" :style="{ fontSize: valueFontSize + 'px', color: currentRating.color }">{{ Math.round(displayedValue) }}</span>
        <!-- <span class="text-medium-emphasis" :style="{ fontSize: labelFontSize + 'px' }">/1000</span> -->
      </div>
    </div>

    <div
      class="font-weight-semibold mt-12"
      style="line-height: 22px;"
      :style="{ color: currentRating.color, fontSize: ratingFontSize + 'px' }"
    >
      {{ currentRating.label }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 500
  },
  width: {
    type: Number,
    default: 200
  },
  height: {
    type: Number,
    default: 120
  }
})

const chartCanvas = ref(null)
let ctx = null
let animFrameId = null
const displayedValue = ref(props.value)

// Derived sizing — everything scales relative to width/height
const scale = computed(() => props.width / 200)
const bottomOffset = computed(() => Math.round(18 * scale.value))
const valueFontSize = computed(() => Math.round(24 * scale.value))
const labelFontSize = computed(() => Math.round(11 * scale.value))
const ratingFontSize = computed(() => Math.round(15 * scale.value))

const ratings = [
  { max: 200,  label: 'Poor',      color: '#e24b4a' },
  { max: 400,  label: 'Fair',      color: '#ef9f27' },
  { max: 600,  label: 'Good',      color: '#f0c040' },
  { max: 800,  label: 'Very Good', color: '#97c459' },
  { max: 1000, label: 'Excellent', color: '#1d9e75' },
]

const arcSegments = [
  { from: 0,   to: 0.2,  color: '#e24b4a' },
  { from: 0.2, to: 0.4,  color: '#ef9f27' },
  { from: 0.4, to: 0.6,  color: '#f0c040' },
  { from: 0.6, to: 0.8,  color: '#97c459' },
  { from: 0.8, to: 1.0,  color: '#1d9e75' },
]

const currentRating = computed(() => {
  const v = Math.round(displayedValue.value)
  return ratings.find(r => v <= r.max) || ratings[ratings.length - 1]
})

function drawGauge(value) {
  if (!ctx) return

  const W = props.width
  const H = props.height
  ctx.clearRect(0, 0, W, H)

  const cx = W / 2
  const cy = H * 0.92
  const R = W * 0.39        // scales with width (78 / 200 = 0.39)
  const arcWidth = W * 0.07 // scales with width (14 / 200 = 0.07)

  arcSegments.forEach(seg => {
    const a1 = Math.PI + seg.from * Math.PI
    const a2 = Math.PI + seg.to * Math.PI
    ctx.beginPath()
    ctx.arc(cx, cy, R, a1, a2)
    ctx.lineWidth = arcWidth
    ctx.strokeStyle = seg.color
    ctx.lineCap = 'butt'
    ctx.stroke()
  })

  const isDark = document.documentElement.classList.contains('v-theme--dark')
  for (let i = 0; i <= 10; i++) {
    const t = i / 10
    const angle = Math.PI + t * Math.PI
    ctx.beginPath()
    ctx.moveTo(cx + (R - arcWidth * 0.57) * Math.cos(angle), cy + (R - arcWidth * 0.57) * Math.sin(angle))
    ctx.lineTo(cx + (R + arcWidth * 0.14) * Math.cos(angle), cy + (R + arcWidth * 0.14) * Math.sin(angle))
    ctx.lineWidth = i % 5 === 0 ? 2 : 1
    ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'
    ctx.stroke()
  }

  const norm = Math.max(0, Math.min(value, 1000)) / 1000
  const needleAngle = Math.PI + norm * Math.PI
  const rating = ratings.find(r => Math.round(value) <= r.max) || ratings[ratings.length - 1]
  const needleLen = R - arcWidth * 0.28
  const nx = cx + needleLen * Math.cos(needleAngle)
  const ny = cy + needleLen * Math.sin(needleAngle)
  const nw = W * 0.025

  ctx.save()
  ctx.beginPath()
  ctx.moveTo(cx - nw * Math.sin(needleAngle), cy + nw * Math.cos(needleAngle))
  ctx.lineTo(nx, ny)
  ctx.lineTo(cx + nw * Math.sin(needleAngle), cy - nw * Math.cos(needleAngle))
  ctx.closePath()
  ctx.fillStyle = rating.color
  ctx.fill()
  ctx.restore()

  const pivotR = W * 0.04
  ctx.beginPath()
  ctx.arc(cx, cy, pivotR, 0, 2 * Math.PI)
  ctx.fillStyle = rating.color
  ctx.fill()

  ctx.beginPath()
  ctx.arc(cx, cy, pivotR * 0.44, 0, 2 * Math.PI)
  ctx.fillStyle = isDark ? '#1a1a1a' : '#ffffff'
  ctx.fill()
}

function animate(target) {
  cancelAnimationFrame(animFrameId)
  const start = displayedValue.value
  const duration = 600
  const t0 = performance.now()

  function step(now) {
    const p = Math.min((now - t0) / duration, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    displayedValue.value = start + (target - start) * ease
    drawGauge(displayedValue.value)
    if (p < 1) animFrameId = requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

watch(() => props.value, (newVal) => animate(newVal))
watch(() => [props.width, props.height], () => drawGauge(displayedValue.value))

let darkObserver = null

onMounted(() => {
  ctx = chartCanvas.value.getContext('2d')
  animate(props.value)

  darkObserver = new MutationObserver(() => drawGauge(displayedValue.value))
  darkObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => {
  cancelAnimationFrame(animFrameId)
  if (darkObserver) darkObserver.disconnect()
})
</script>