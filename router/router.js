// router.js
// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  children: [
    {
      path: '/index',
      title: '主页',
      name: 'index',
      icon: 'ios-home'
    }
  ]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/device',
    icon: 'android-checkbox',
    name: 'device',
    title: '裝置',
    children: [
      {
        path: '/device/map',
        title: '類型',
        name: 'device-map',
        icon: 'ios-book'
      },
      {
        path: '/device/manager',
        title: '管理',
        name: 'device-manager',
        icon: 'ios-home'
      }
    ]
  },
  {
    path: '/tables',
    icon: 'ios-grid-view',
    title: '歷史紀錄',
    name: 'tables',
    children: [
      {
        path: '/tables/dragable-table',
        title: '查詢',
        icon: 'ios-search',
        name: 'tables-dragable-table'
      },
      {
        path: '/tables/editable-table',
        title: '可编辑表格',
        icon: 'edit',
        name: 'tables-editable-table'
      }
    ]
  },
  {
    path: '/error-page',
    icon: 'android-sad',
    title: '错误页面',
    name: 'errorpage',
    children: [
      {
        path: '/error-page/403',
        title: '403错误',
        name: 'error-page-403',
        icon: 'close-circled'
      },
      {
        path: '/error-page/404',
        title: '404错误',
        name: 'error-page-404',
        icon: 'alert-circled'
      },
      {
        path: '/error-page/500',
        title: '500错误',
        name: 'error-page-500',
        icon: 'settings'
      }
    ]
  }
]
