---
title: "如何继续添加攻略"
---

# 如何继续添加攻略

## 1. 新建 Markdown

在对应目录新建 `.md` 文件：

```text
docs/guide/      新手与 FAQ
docs/routes/     路线与角色
docs/systems/    机制、道具、Bug
docs/archive/    原始整合文档或旧版本
docs/tools/      表格、清单、维护工具页
```

页面开头建议写 frontmatter：

```md
---
title: "攻略标题"
---

# 攻略标题

::: tip 推荐写法
先写触发条件，再写步骤，最后补失败排查和版本差异。
:::
```

## 2. 加入侧边栏

打开：

```text
docs/.vitepress/config.mts
```

在 `sidebar` 对应分组的 `items` 里加一行：

```ts
{ text: '攻略标题', link: '/routes/your-page' }
```

## 3. 配置攻略入口与引流框

打开：

```text
docs/.vitepress/theme/lead-sites.ts
```

修改 `sites` 数组即可。支持站点名、描述、链接和标签。当前入口按钮支持随机位置和拖拽固定。

## 4. 更新贡献名单

打开：

```text
docs/contributors.md
```

把新增攻略作者、整理者、校对者或测试者补到表格里。

## 5. 本地预览

推荐使用 pnpm：

```bash
pnpm install
pnpm dev
```

也可以使用 npm：

```bash
npm install
npm run dev
```

## 6. 发布

GitHub Pages：把仓库 `Settings → Pages` 设为 `GitHub Actions`，推送后自动部署。

Cloudflare Pages / Netlify：构建命令填 `pnpm build` 或 `npm run build`，输出目录填 `docs/.vitepress/dist`。
