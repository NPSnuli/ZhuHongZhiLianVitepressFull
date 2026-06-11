---
title: "右下角引流框配置"
---

# 右下角引流框配置

引流框组件位于：

```text
docs/.vitepress/theme/LeadBox.vue
```

推荐站点配置位于：

```text
docs/.vitepress/theme/lead-sites.ts
```

常用配置：

```ts
export const leadBoxConfig = {
  enabled: true,
  title: '更多朱红之恋资料',
  subtitle: '配置你的论坛、QQ群、资源站、视频号或补丁发布页。',
  actionText: '去看看',
  closeForDays: 7,
  autoOpenDelay: 900,
  sites: [
    {
      name: '攻略总站',
      desc: '完整流程、补丁说明、常见问题',
      url: 'https://example.com/wiki',
      badge: '推荐'
    }
  ]
}
```

说明：

- `enabled`：总开关。
- `closeForDays`：用户点关闭后，多少天内不再自动弹出。
- `autoOpenDelay`：页面加载后延迟多少毫秒滑入。
- `sites`：建议放 2～5 个，避免遮挡正文。

组件已经做了移动端适配；小屏幕下会自动缩小宽度。
