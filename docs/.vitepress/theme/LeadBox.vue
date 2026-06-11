<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { leadBoxConfig } from './lead-sites'

const visible = ref(false)
const dismissed = ref(false)
const storageKey = 'zhu-hong-lead-box-dismissed-until'

const enabled = computed(() => leadBoxConfig.enabled && leadBoxConfig.sites.length > 0)

function closeBox() {
  visible.value = false
  dismissed.value = true

  if (leadBoxConfig.closeForDays > 0 && typeof window !== 'undefined') {
    const until = Date.now() + leadBoxConfig.closeForDays * 24 * 60 * 60 * 1000
    window.localStorage.setItem(storageKey, String(until))
  }
}

function reopenBox() {
  dismissed.value = false
  visible.value = true

  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(storageKey)
  }
}

onMounted(() => {
  if (!enabled.value) return

  const dismissedUntil = Number(window.localStorage.getItem(storageKey) || 0)
  if (dismissedUntil > Date.now()) {
    dismissed.value = true
    return
  }

  window.setTimeout(() => {
    visible.value = true
  }, leadBoxConfig.autoOpenDelay)
})
</script>

<template>
  <div v-if="enabled" class="lead-shell" aria-live="polite">
    <button
      v-if="dismissed && !visible"
      class="lead-mini"
      type="button"
      aria-label="展开推荐站点"
      @click="reopenBox"
    >
      攻略入口
    </button>

    <aside :class="['lead-box', { 'is-visible': visible }]" aria-label="推荐站点">
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
    </aside>
  </div>
</template>

<style scoped>
.lead-shell {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 50;
  pointer-events: none;
}

.lead-box,
.lead-mini {
  pointer-events: auto;
}

.lead-box {
  position: relative;
  width: min(380px, calc(100vw - 36px));
  padding: 16px;
  border: 1px solid rgba(180, 35, 24, 0.22);
  border-radius: 18px;
  background: color-mix(in srgb, var(--vp-c-bg) 94%, transparent);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(16px);
  opacity: 0;
  transform: translateX(calc(100% + 28px)) translateY(10px);
  transition: opacity 0.42s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.lead-box.is-visible {
  opacity: 1;
  transform: translateX(0) translateY(0);
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

.lead-mini {
  border: 0;
  border-radius: 999px;
  padding: 10px 14px;
  background: var(--vp-c-brand-1);
  color: #fff;
  box-shadow: 0 10px 28px rgba(180, 35, 24, 0.26);
  cursor: pointer;
  font-weight: 700;
}

@media (max-width: 560px) {
  .lead-shell {
    right: 12px;
    bottom: 12px;
  }

  .lead-box {
    width: min(340px, calc(100vw - 24px));
  }
}
</style>
