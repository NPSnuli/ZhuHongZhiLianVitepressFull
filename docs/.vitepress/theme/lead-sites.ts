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
  buttonText: string
  buttonHint: string
  actionText: string
  closeForDays: number
  autoOpenDelay: number
  randomButtonPosition: boolean
  rememberButtonPosition: boolean
  sites: LeadSite[]
} = {
  // 总开关：false 后攻略入口按钮不会显示
  enabled: true,

  // 攻略入口按钮文案
  buttonText: '攻略入口',
  buttonHint: '拖拽 / 点击',

  // 引流框文案
  title: '朱红之恋官方入口',
  subtitle: '频道、QQ群、资源站、视频号或补丁发布页。',
  actionText: '去看看',

  // 用户点关闭后，多少天内不再自动弹出；按钮仍可手动点击展开；设为 0 表示刷新后仍会弹
  closeForDays: 7,

  // 页面加载后延迟多少毫秒自动展开；设为 -1 表示不自动展开，只显示可拖拽入口按钮
  autoOpenDelay: 900,

  // 首次进入时随机生成按钮位置；关闭后用户仍能拖拽调整
  randomButtonPosition: true,

  // 拖拽后的按钮位置是否记住到浏览器 localStorage
  rememberButtonPosition: true,

  // 这里改成你自己的站点。建议最多放 3～5 个。
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
    },
    {
      name: '视频攻略',
      desc: 'B站：海王三啸',
      url: 'https://space.bilibili.com/102467969',
      badge: '视频'
    }
  ]
}
