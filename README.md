# 朱红之恋攻略 Wiki（VitePress）

这是一个基于 VitePress 的攻略 Wiki 框架，已导入上传压缩包中的 31 个攻略文档。

## 本地运行

```bash
npm install
npm run dev
```

## 打包

```bash
npm run build
```

输出目录：

```text
docs/.vitepress/dist
```

## 继续添加攻略

- 新手/FAQ：`docs/guide/`
- 路线/角色：`docs/routes/`
- 系统/道具/Bug：`docs/systems/`
- 整合归档：`docs/archive/`

添加页面后，到 `docs/.vitepress/config.mts` 的 `sidebar` 中补一条链接。

## 配置右下角引流框

编辑：

```text
docs/.vitepress/theme/lead-sites.ts
```

把 `sites` 数组改成你的论坛、QQ群、资源站、视频站等入口。

## 部署

### GitHub Pages

1. 推送到 GitHub 仓库。
2. 打开 `Settings → Pages`。
3. Source 选择 `GitHub Actions`。
4. 如果仓库不是 `用户名.github.io`，把 `docs/.vitepress/config.mts` 里的 `base` 改成 `/{仓库名}/`。

### Cloudflare Pages / Netlify

- Build command：`npm run build`
- Output directory：`docs/.vitepress/dist`

## 注意

这些文档由 Word 自动转换而来，图片和段落已尽量保留，但仍建议人工校对格式、标题层级和版本差异。
