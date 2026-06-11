<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { leadBoxConfig } from './lead-sites'

const visible = ref(false)
const dismissed = ref(false)
const mounted = ref(false)
const dragging = ref(false)
const ignoreNextClick = ref(false)
const buttonRef = ref<HTMLElement | null>(null)

const storageKey = 'zhu-hong-lead-box-dismissed-until'
const positionStorageKey = 'zhu-hong-lead-entry-position'

const position = reactive({ x: 24, y: 120 })
const viewport = reactive({ width: 1280, height: 720 })
const buttonSize = reactive({ width: 132, height: 46 })

const enabled = computed(() => leadBoxConfig.enabled && leadBoxConfig.sites.length > 0)
const panelWidth = computed(() => Math.min(380, Math.max(280, viewport.width - 36)))

let dragState = {
  active: false,
  pointerId: -1,
  startX: 0,
  startY: 0,
  originX: 0,
  originY: 0,
  moved: false
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function updateViewport() {
  if (typeof window === 'undefined') return
  viewport.width = window.innerWidth
  viewport.height = window.innerHeight
}

function measureButton() {
  if (!buttonRef.value) return
  const rect = buttonRef.value.getBoundingClientRect()
  buttonSize.width = rect.width || buttonSize.width
  buttonSize.height = rect.height || buttonSize.height
}

function clampButtonPosition(x = position.x, y = position.y) {
  const minX = 12
  const minY = 76
  const maxX = Math.max(minX, viewport.width - buttonSize.width - 12)
  const maxY = Math.max(minY, viewport.height - buttonSize.height - 12)

  return {
    x: clamp(x, minX, maxX),
    y: clamp(y, minY, maxY)
  }
}

function setButtonPosition(x: number, y: number) {
  const next = clampButtonPosition(x, y)
  position.x = next.x
  position.y = next.y
}

function randomButtonPosition() {
  const minX = 18
  const minY = 92
  const maxX = Math.max(minX, viewport.width - buttonSize.width - 18)
  const maxY = Math.max(minY, viewport.height - buttonSize.height - 26)

  position.x = Math.round(minX + Math.random() * (maxX - minX))
  position.y = Math.round(minY + Math.random() * (maxY - minY))
}

function bottomRightPosition() {
  setButtonPosition(viewport.width - buttonSize.width - 18, viewport.height - buttonSize.height - 18)
}

function readSavedPosition() {
  if (typeof window === 'undefined' || !leadBoxConfig.rememberButtonPosition) return false

  try {
    const raw = window.localStorage.getItem(positionStorageKey)
    if (!raw) return false

    const saved = JSON.parse(raw) as { x?: number; y?: number }
    if (typeof saved.x !== 'number' || typeof saved.y !== 'number') return false

    setButtonPosition(saved.x, saved.y)
    return true
  } catch {
    return false
  }
}

function savePosition() {
  if (typeof window === 'undefined' || !leadBoxConfig.rememberButtonPosition) return

  window.localStorage.setItem(
    positionStorageKey,
    JSON.stringify({ x: Math.round(position.x), y: Math.round(position.y) })
  )
}

function initPosition() {
  updateViewport()
  measureButton()

  if (readSavedPosition()) return

  if (leadBoxConfig.randomButtonPosition) {
    randomButtonPosition()
  } else {
    bottomRightPosition()
  }

  savePosition()
}

function closeBox() {
  visible.value = false
  dismissed.value = true

  if (leadBoxConfig.closeForDays > 0 && typeof window !== 'undefined') {
    const until = Date.now() + leadBoxConfig.closeForDays * 24 * 60 * 60 * 1000
    window.localStorage.setItem(storageKey, String(until))
  }
}

function toggleBox() {
  if (ignoreNextClick.value) {
    ignoreNextClick.value = false
    return
  }

  visible.value = !visible.value

  if (visible.value) {
    dismissed.value = false
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKey)
    }
  }
}

function onPointerMove(event: PointerEvent) {
  if (!dragState.active) return

  const dx = event.clientX - dragState.startX
  const dy = event.clientY - dragState.startY

  if (Math.abs(dx) + Math.abs(dy) > 4) {
    dragState.moved = true
  }

  setButtonPosition(dragState.originX + dx, dragState.originY + dy)
}

function onPointerUp() {
  if (!dragState.active) return

  if (dragState.moved) {
    savePosition()
    ignoreNextClick.value = true
    window.setTimeout(() => {
      ignoreNextClick.value = false
    }, 80)
  }

  dragState.active = false
  dragging.value = false
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
}

function startDrag(event: PointerEvent) {
  if (event.button !== 0) return

  dragState = {
    active: true,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    originX: position.x,
    originY: position.y,
    moved: false
  }

  dragging.value = true
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
}

function handleResize() {
  updateViewport()
  measureButton()
  setButtonPosition(position.x, position.y)
  savePosition()
}

const buttonStyle = computed(() => ({
  left: `${position.x}px`,
  top: `${position.y}px`
}))

const panelStyle = computed(() => {
  const gap = 12
  const width = panelWidth.value
  const left = clamp(position.x, 12, Math.max(12, viewport.width - width - 12))
  const estimatedHeight = Math.min(420, Math.max(280, viewport.height - 112))
  const preferAbove = position.y > viewport.height * 0.58
  const topCandidate = preferAbove
    ? position.y - estimatedHeight - gap
    : position.y + buttonSize.height + gap
  const top = clamp(topCandidate, 72, Math.max(72, viewport.height - estimatedHeight - 12))

  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`
  }
})

onMounted(async () => {
  if (!enabled.value) return

  mounted.value = true
  await nextTick()
  initPosition()

  const dismissedUntil = Number(window.localStorage.getItem(storageKey) || 0)
  if (dismissedUntil > Date.now()) {
    dismissed.value = true
  } else if (leadBoxConfig.autoOpenDelay >= 0) {
    window.setTimeout(() => {
      if (!dismissed.value) visible.value = true
    }, leadBoxConfig.autoOpenDelay)
  }

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
})
</script>

<template>
  <div v-if="enabled" class="lead-root" aria-live="polite">
    <button
      ref="buttonRef"
      :class="['lead-fab', { 'is-ready': mounted, 'is-dragging': dragging, 'is-open': visible }]"
      :style="buttonStyle"
      type="button"
      aria-label="攻略入口，按住可拖拽，点击可展开推荐站点"
      :aria-expanded="visible"
      @pointerdown="startDrag"
      @click="toggleBox"
    >
      <span class="lead-fab-mark">朱</span>
      <span class="lead-fab-main">
        <span class="lead-fab-title">{{ leadBoxConfig.buttonText }}</span>
        <span class="lead-fab-hint">{{ dragging ? '松开固定' : leadBoxConfig.buttonHint }}</span>
      </span>
      <span class="lead-fab-grip" aria-hidden="true">⋮⋮</span>
    </button>

    <aside
      v-if="visible"
      class="lead-box is-visible"
      :style="panelStyle"
      aria-label="推荐站点"
    >
      <button class="lead-close" type="button" aria-label="关闭推荐站点" @click="closeBox">×</button>

      <div class="lead-head">
        <div class="lead-mark">朱</div>
        <div>
          <p class="lead-title">{{ leadBoxConfig.title }}</p>
          <p class="lead-subtitle">{{ leadBoxConfig.subtitle }}</p>
        </div>
      </div>

      <div class="lead-list">
        <a
          v-for="site in leadBoxConfig.sites"
          :key="site.url"
          class="lead-item"
          :href="site.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="lead-item-main">
            <span class="lead-item-title">{{ site.name }}</span>
            <span v-if="site.desc" class="lead-item-desc">{{ site.desc }}</span>
          </span>
          <span class="lead-item-side">
            <span v-if="site.badge" class="lead-badge">{{ site.badge }}</span>
            <span class="lead-action">{{ leadBoxConfig.actionText }}</span>
          </span>
        </a>
      </div>

      <p class="lead-drag-tip">入口按钮位置会随机生成；拖拽按钮可调整位置。</p>
    </aside>
  </div>
</template>

<style scoped>
.lead-root {
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
}

.lead-fab,
.lead-box {
  pointer-events: auto;
}

.lead-fab {
  position: fixed;
  z-index: 52;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 132px;
  padding: 7px 10px 7px 7px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: linear-gradient(135deg, #b42318, #f97316);
  color: #fff;
  box-shadow: 0 14px 34px rgba(180, 35, 24, 0.32);
  cursor: grab;
  user-select: none;
  touch-action: none;
  opacity: 0;
  transform: translateY(8px) scale(0.96);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;
}

.lead-fab.is-ready {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.lead-fab:hover,
.lead-fab.is-open {
  filter: brightness(1.04);
  box-shadow: 0 18px 44px rgba(180, 35, 24, 0.4);
}

.lead-fab.is-dragging {
  cursor: grabbing;
  transform: translateY(0) scale(1.03);
}

.lead-fab-mark {
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  font-weight: 900;
}

.lead-fab-main {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.1;
}

.lead-fab-title {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.lead-fab-hint {
  margin-top: 2px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 11px;
  font-weight: 600;
}

.lead-fab-grip {
  color: rgba(255, 255, 255, 0.72);
  font-size: 14px;
  letter-spacing: -4px;
  transform: rotate(90deg);
}

.lead-box {
  position: fixed;
  z-index: 51;
  max-height: min(70vh, 420px);
  overflow: auto;
  padding: 16px;
  border: 1px solid rgba(180, 35, 24, 0.22);
  border-radius: 18px;
  background: color-mix(in srgb, var(--vp-c-bg) 94%, transparent);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(16px);
  animation: lead-panel-in 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes lead-panel-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.lead-close {
  position: absolute;
  top: 10px;
  right: 10px;
  display: inline-flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
}

.lead-close:hover {
  color: var(--vp-c-brand-1);
}

.lead-head {
  display: flex;
  gap: 12px;
  padding-right: 26px;
  align-items: center;
}

.lead-mark {
  flex: 0 0 auto;
  display: inline-flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: linear-gradient(135deg, #b42318, #f97316);
  color: white;
  font-weight: 800;
  box-shadow: 0 10px 28px rgba(180, 35, 24, 0.28);
}

.lead-title {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 15px;
  font-weight: 800;
}

.lead-subtitle {
  margin: 4px 0 0;
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.5;
}

.lead-list {
  display: grid;
  gap: 8px;
  margin-top: 14px;
}

.lead-item {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 11px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
}

.lead-item:hover {
  border-color: rgba(180, 35, 24, 0.45);
  background: var(--vp-c-bg-alt);
  transform: translateY(-1px);
}

.lead-item-main {
  min-width: 0;
}

.lead-item-title,
.lead-item-desc {
  display: block;
}

.lead-item-title {
  font-size: 14px;
  font-weight: 700;
}

.lead-item-desc {
  margin-top: 2px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.4;
}

.lead-item-side {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex: 0 0 auto;
}

.lead-badge {
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(180, 35, 24, 0.12);
  color: var(--vp-c-brand-1);
  font-size: 11px;
  font-weight: 700;
}

.lead-action {
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 700;
}

.lead-drag-tip {
  margin: 12px 2px 0;
  color: var(--vp-c-text-3);
  font-size: 11px;
  line-height: 1.45;
}

@media (max-width: 640px) {
  .lead-fab {
    min-width: 118px;
    padding-right: 9px;
  }

  .lead-fab-mark {
    width: 30px;
    height: 30px;
  }

  .lead-fab-title {
    font-size: 12px;
  }

  .lead-fab-hint,
  .lead-drag-tip {
    font-size: 10px;
  }
}
</style>
