/**
 * 定义sidebar和header中的菜单项
 *
 * 一些约定:
 * 1.菜单最多3层;
 * 2.只有"叶子"节点才能跳转;
 * 3.所有的key都不能重复;
 */

// 其实理论上可以嵌套更多层菜单的, 但是不建议超过三层
// 可用的图标见这里: https://ant.design/components/icon-cn/

// 定义siderbar菜单
const sidebarMenu = [
  {
    key: 'grid',  // route时url中的值
    name: '数据纰漏',  // 在菜单中显示的名称
    icon: 'smile',  // 图标是可选的
    child: [
      {
        key: 'curd',
        name: '业绩调差',
        icon: 'bars'   // 二级三级菜单也可以带图标
      },
      {
        key: 'lazy',
        name: '业绩详情',
        icon: 'play-circle'   // 二级三级菜单也可以带图标
      },
      {
        key: 'thunk',
        name: '业绩概览',
        icon: 'laptop'   // 二级三级菜单也可以带图标
      },
      {
        key: 'route',
        name: '路由模块',
        icon: 'book'   // 二级三级菜单也可以带图标
      }
    ]
  },
  {
    key: 'charts',
    name: '图表展示',
    icon: 'area-chart',
    child: [
      {
        key: 'base',
        name: '基础示例',
        icon: 'bar-chart'
      }
    ]
  }
]

export default sidebarMenu

// 定义header菜单, 格式和sidebar是一样的
// 特殊的地方在于, 我规定header的最右侧必须是用户相关操作的菜单, 所以定义了一个特殊的key
// 另外注意这个菜单定义的顺序是从右向左的, 因为样式是float:right
export const headerMenu = [
  {
    // 一个特殊的key, 定义用户菜单, 在这个submenu下面设置icon/name不会生效
    key: 'userMenu',
    child: [
      {
        key: 'modifyUser',
        name: '修改信息',
        icon: 'bulb',
        // 对于headerMenu的菜单项, 可以让它跳到外部地址, 如果设置了url属性, 就会打开一个新窗口
        // 如果不设置url属性, 行为和sidebarMenu是一样的, 激活特定的组件, 注意在index.js中配置好路由, 否则会404
        url: '/'
      },
      {
        key: 'user222',
        name: '系统设置',
        icon: 'rocket'
      }
    ]
  },
  {
    key: 'headerMenu2',
    name: '站内通知',
    icon: 'bell',
    child: [
      {
        key: 'headerMenu111',
        name: '菜单项1',
        icon: 'windows',
        url: '/'
      },
      {
        key: '菜单项2',
        name: '短信表管理',
        url: '/'
      },
      {
        key: '菜单项3',
        name: '选项3',
        icon: 'chrome',
        url: '/'
      }
    ]
  }
]
