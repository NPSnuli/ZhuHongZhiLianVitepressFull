---
title: "攻略入口与引流框配置"
---

# 攻略入口与引流框配置

当前版本把原来的右下角引流框改成了 **随机位置 + 可拖拽的攻略入口按钮**：

- 首次进入页面时，按钮会在可视区域内随机出现。
- 按住按钮拖拽，可以移动到任意不遮挡正文的位置。
- 拖拽后的坐标会保存到浏览器 `localStorage`，下次访问会沿用。
- 点击按钮会展开推荐站点卡片。
- 点击卡片右上角关闭后，指定天数内不再自动弹出，但按钮仍可手动打开。

组件位于：

```text
docs/.vitepress/theme/LeadBox.vue
```

推荐站点配置位于：

```text
docs/.vitepress/theme/lead-sites.ts
```

## 常用配置

```ts
export const leadBoxConfig = {
  enabled: true,

  buttonText: '攻略入口',
  buttonHint: '拖拽 / 点击',

  title: '更多朱红之恋资料',
  subtitle: '配置你的论坛、QQ群、资源站、视频号或补丁发布页。',
  actionText: '去看看',

  closeForDays: 7,
  autoOpenDelay: 900,

  randomButtonPosition: true,
  rememberButtonPosition: true,

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

## 字段说明

| 字段 | 作用 |
| --- | --- |
| `enabled` | 总开关，设为 `false` 后按钮和引流框都不显示。 |
| `buttonText` | 浮动按钮主文案，例如“攻略入口”。 |
| `buttonHint` | 浮动按钮下方提示，例如“拖拽 / 点击”。 |
| `title` | 展开卡片标题。 |
| `subtitle` | 展开卡片副标题。 |
| `actionText` | 每个站点右侧的行动按钮文案。 |
| `closeForDays` | 用户点关闭后，多少天内不再自动弹出。按钮仍然可以手动点击展开。 |
| `autoOpenDelay` | 页面加载后延迟多少毫秒自动展开卡片；设为 `-1` 表示不自动展开。 |
| `randomButtonPosition` | 没有保存坐标时，是否随机生成按钮位置。 |
| `rememberButtonPosition` | 拖拽后是否记住按钮位置。 |
| `sites` | 你的论坛、群聊、资源站、视频站等入口。建议放 2～5 个。 |

## 站点配置示例

```ts
sites: [
  {
    name: 'QQ群交流',
    desc: '点击链接加入群聊【官方4群 朱红之恋】',
    url: 'https://qm.qq.com/q/qahzgfkJqM',
    badge: '推荐'
  },
  {
    name: '朱红之恋频道',
    desc: '点击链接加入腾讯频道【骑马与砍杀MOD社区】',
    url: 'https://pd.qq.com/s/eesf1o934',
    badge: '交流'
  }
]
```

## 重置按钮位置

如果想测试随机位置，可以在浏览器控制台执行：

```js
localStorage.removeItem('zhu-hong-lead-entry-position')
location.reload()
```

如果想重置“关闭后不自动弹出”的记录：

```js
localStorage.removeItem('zhu-hong-lead-box-dismissed-until')
location.reload()
```
