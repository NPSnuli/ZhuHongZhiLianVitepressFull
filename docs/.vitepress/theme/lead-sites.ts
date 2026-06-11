export type LeadSite = {
  name: string
  desc?: string
  url: string
  badge?: string
}

export const leadBoxConfig: {
  enabled: boolean
  title: string
  subtitle: string
  actionText: string
  closeForDays: number
  autoOpenDelay: number
  sites: LeadSite[]
} = {
  // 总开关：false 后右下角引流框不会显示
  enabled: true,

  // 引流框文案
  title: '更多朱红之恋资料',
  subtitle: '配置你的论坛、QQ群、资源站、视频号或补丁发布页。',
  actionText: '去看看',

  // 用户点关闭后，多少天内不再自动弹出；设为 0 表示刷新后仍会弹
  closeForDays: 7,

  // 页面加载后延迟多少毫秒滑入
  autoOpenDelay: 900,

  // 这里改成你自己的站点。建议最多放 3～5 个。
  sites: [
    {
      name: '攻略总站',
      desc: '完整流程、补丁说明、常见问题',
      url: 'https://example.com/wiki',
      badge: '推荐'
    },
    {
      name: '玩家交流群',
      desc: 'QQ群 / Discord / 论坛帖入口',
      url: 'https://example.com/group',
      badge: '交流'
    },
    {
      name: '视频攻略',
      desc: '流程演示、支线触发、隐藏内容',
      url: 'https://example.com/video',
      badge: '视频'
    }
  ]
}
