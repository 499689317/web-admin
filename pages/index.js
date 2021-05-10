import React from 'react'
import Head from 'next/head'
import { TeamOutlined, GiftFilled, ShoppingFilled, SketchCircleFilled } from '@ant-design/icons';

import dynamic from 'next/dynamic'
const LayoutBasic = dynamic(() => import('../components/layout/basic'), {
  ssr: false
})
import PlayerComponent from '../modules/player'
import ActivityComponent from '../modules/activity'
import ShopComponent from '../modules/shop'
import { TaskPanelComponent, DailyTaskComponent } from '../modules/dailytask'


const menuData = {
  route: {
    path: '/',
    routes: [
      {
        path: '/dailytask',
        name: '任务管理',
        icon: <SketchCircleFilled />,
        routes: [
          {
            path: '/dailytask/list',
            name: '面板列表',
          },
          {
            path: '/dailytask/task',
            name: '任务列表',
          }
        ],
      },
      {
        path: '/player',
        name: '用户管理',
        icon: <TeamOutlined />,
        access: 'canAdmin',
        routes: [
          {
            path: '/player/list',
            name: '玩家数据详情',
          },
          {
            path: '/player/behavior',
            name: '玩家打点行为',
          }
        ],
      },
      {
        path: '/activity',
        name: '活动管理',
        icon: <GiftFilled />,
        routes: [
          {
            path: '/activity/list',
            name: '活动列表',
          }
        ],
      },
      {
        path: '/shop',
        name: '商店管理',
        icon: <ShoppingFilled />,
        routes: [
          {
            path: '/shop/list',
            name: '商品列表',
          }
        ],
      },
    ],
  },
};

class IndexPage extends React.Component {
  state = {
    pathname: ''
  }

  constructor(props) {
    super(props)
    Object.assign(this.state, { pathname: '/dailytask/list' })
  }

  render() {
    // console.log(this.state)
    // console.log(this.props)
    return (
      <div>
        <Head>
          <title key="title">管理主页</title>
        </Head>

        <LayoutBasic
          menuData={menuData}
          pathname={this.state.pathname}
          onClick={(item, dom) => {
            this.setState({ pathname: item.path })
          }}>
          {
            (() => {
              // TODO 想个办法把这个控制器抽出来
              switch (this.state.pathname) {
                case '/player/list':
                  return <PlayerComponent />
                case '/activity/list':
                  return <ActivityComponent />
                case '/shop/list':
                  return <ShopComponent />
                case '/dailytask/list':
                  return <TaskPanelComponent />
                case '/dailytask/task':
                  return <DailyTaskComponent />
                default:
                  return <></>
              }
            })()
          }
        </LayoutBasic>
      </div>
    )
  }
}

export default IndexPage
