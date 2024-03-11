import {
  Film,
  Home,
  Layout,
  Music,
  PlayCircle,
  Thermometer,
  Trello,
} from 'react-feather'

// 根据路由表生成对应的路由规则
export const items = [
  {
    // title: 'Apps',
    children: [
      { path: '/home', title: '发现', icon: <Home className='text-2xl' /> },
      {
        path: '/ml',
        title: '音乐库',
        icon: <Music className='text-2xl' />,
      },
      { path: '/movie', title: '视频', icon: <Film className='text-2xl' /> },
      {
        path: '/mini',
        title: '播放',
        icon: <Trello className='text-2xl' />,
      },
      { path: '/theme', title: '主题', icon: <Layout className='text-2xl' /> },
      {
        path: '/test',
        title: 'Test',
        icon: <Thermometer className='text-2xl' />,
      },
    ],
  },
]
