import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '朱红之恋攻略 Wiki',
  description: '英雄传说—朱红之恋玩家攻略、路线、系统与资料索引',

  // 部署到 GitHub Pages 的项目仓库时需要改成：'/仓库名/'
  base: '/',

  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#b42318' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],

  markdown: {
    lineNumbers: true,
    image: { lazyLoading: true }
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '全部文档', link: '/all-docs' },
      { text: '贡献名单', link: '/contributors' },
      { text: '新手入门', link: '/guide/' },
      { text: '路线攻略', link: '/routes/' },
      { text: '系统资料', link: '/systems/' },
      { text: '整合归档', link: '/archive/' }
    ],

    sidebar: [
      {
        text: "开始维护",
        collapsed: false,
        items: [
          {
            text: "Wiki 首页",
            link: "/"
          },
          {
            text: "全部攻略文档索引",
            link: "/all-docs"
          },
          {
            text: "贡献名单",
            link: "/contributors"
          },
          {
            text: "如何继续添加攻略",
            link: "/guide/how-to-add"
          },
          {
            text: "右下角引流框配置",
            link: "/guide/lead-box"
          }
        ]
      },
      {
        text: "新手入门",
        collapsed: false,
        items: [
          {
            text: "新手入门总览",
            link: "/guide/"
          },
          {
            text: "萌新入门攻略最新简洁版",
            link: "/guide/beginner-short"
          },
          {
            text: "关于朱红的萌新问题",
            link: "/guide/newbie-faq"
          },
          {
            text: "打不开朱红怎么办",
            link: "/guide/cannot-open"
          },
          {
            text: "开场问题与魔兽问题",
            link: "/guide/opening-beasts"
          },
          {
            text: "新攻略补充",
            link: "/guide/supplement"
          }
        ]
      },
      {
        text: "路线攻略",
        collapsed: false,
        items: [
          {
            text: "路线攻略总览",
            link: "/routes/"
          },
          {
            text: "公主攻略",
            link: "/routes/princess"
          },
          {
            text: "萌新攻略：公主篇",
            link: "/routes/princess-newbie"
          },
          {
            text: "亡灵如何开局",
            link: "/routes/undead-opening"
          },
          {
            text: "亡灵攻略",
            link: "/routes/undead"
          },
          {
            text: "萌新攻略：亡灵篇",
            link: "/routes/undead-newbie"
          },
          {
            text: "亡灵懒人打法：利用 Bug",
            link: "/routes/undead-lazy-bug"
          },
          {
            text: "圣女攻略",
            link: "/routes/saint"
          },
          {
            text: "圣女攻略（副本）",
            link: "/routes/saint-copy"
          },
          {
            text: "NPC 系列",
            link: "/routes/npc-series"
          },
          {
            text: "杀马特入门指南",
            link: "/routes/shamate-guide"
          }
        ]
      },
      {
        text: "系统资料",
        collapsed: false,
        items: [
          {
            text: "系统资料总览",
            link: "/systems/"
          },
          {
            text: "宝箱位置",
            link: "/systems/chest-locations"
          },
          {
            text: "开箱子问题",
            link: "/systems/open-chest"
          },
          {
            text: "幸运草寻找方案（包括杀马特和金蛇）",
            link: "/systems/lucky-clover"
          },
          {
            text: "兵种强度问题",
            link: "/systems/troop-strength"
          },
          {
            text: "萌新攻略：称号篇",
            link: "/systems/titles"
          },
          {
            text: "萌新攻略：陨铁武器篇",
            link: "/systems/meteorite-weapons"
          },
          {
            text: "朱红如何卖掉领主（包括 NPC）",
            link: "/systems/sell-lords-npc"
          },
          {
            text: "朱红如何卖掉领主（包括 NPC）（副本）",
            link: "/systems/sell-lords-npc-copy"
          },
          {
            text: "沙漠强盗",
            link: "/systems/desert-bandits"
          },
          {
            text: "镇压村民专用村",
            link: "/systems/village-repression"
          },
          {
            text: "作弊须知",
            link: "/systems/cheat-notes"
          },
          {
            text: "朱红 Bug 与可利用",
            link: "/systems/bugs-exploits"
          }
        ]
      },
      {
        text: "整合与归档",
        collapsed: true,
        items: [
          {
            text: "整合与归档总览",
            link: "/archive/"
          },
          {
            text: "攻略（半更新成品）",
            link: "/archive/half-updated-complete"
          },
          {
            text: "萌新攻略整合版",
            link: "/archive/newbie-compilation"
          },
          {
            text: "萌新攻略整合版（1）",
            link: "/archive/newbie-compilation-1"
          },
          {
            text: "萌新攻略整合版（2）",
            link: "/archive/newbie-compilation-2"
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新',
      formatOptions: { dateStyle: 'short', timeStyle: 'medium' }
    },

    editLink: {
      pattern: 'https://github.com/NPSnuli/ZhuHongZhiLianVitepressFull/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    footer: {
      message: '玩家整理资料，仅作攻略索引用；请以原文档与游戏内文本为准。',
      copyright: 'Copyright © 2026-present 朱红之恋制作组，腾讯频道：点击链接加入腾讯频道【骑马与砍杀MOD社区】：https://pd.qq.com/s/eesf1o934'
    }
  }
})
