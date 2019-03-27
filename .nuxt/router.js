import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _4a81edbf = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _40e9b86d = () => interopDefault(import('..\\pages\\device\\manager.vue' /* webpackChunkName: "pages_device_manager" */))
const _60f31ac8 = () => interopDefault(import('..\\pages\\device\\map.vue' /* webpackChunkName: "pages_device_map" */))
const _1cc7f1f0 = () => interopDefault(import('..\\pages\\device\\preview.vue' /* webpackChunkName: "pages_device_preview" */))
const _a6ccba4e = () => interopDefault(import('..\\pages\\error-page\\403.vue' /* webpackChunkName: "pages_error-page_403" */))
const _a6b08b4c = () => interopDefault(import('..\\pages\\error-page\\404.vue' /* webpackChunkName: "pages_error-page_404" */))
const _3d54d0d2 = () => interopDefault(import('..\\pages\\error-page\\500.vue' /* webpackChunkName: "pages_error-page_500" */))
const _507d0602 = () => interopDefault(import('..\\pages\\error-page\\error-page.vue' /* webpackChunkName: "pages_error-page_error-page" */))
const _d5796c64 = () => interopDefault(import('..\\pages\\tables\\dragable-table.vue' /* webpackChunkName: "pages_tables_dragable-table" */))
const _e58347b8 = () => interopDefault(import('..\\pages\\tables\\editable-table.vue' /* webpackChunkName: "pages_tables_editable-table" */))
const _fe4b6ab0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/login",
      component: _4a81edbf,
      name: "login"
    }, {
      path: "/device/manager",
      component: _40e9b86d,
      name: "device-manager"
    }, {
      path: "/device/map",
      component: _60f31ac8,
      name: "device-map"
    }, {
      path: "/device/preview",
      component: _1cc7f1f0,
      name: "device-preview"
    }, {
      path: "/error-page/403",
      component: _a6ccba4e,
      name: "error-page-403"
    }, {
      path: "/error-page/404",
      component: _a6b08b4c,
      name: "error-page-404"
    }, {
      path: "/error-page/500",
      component: _3d54d0d2,
      name: "error-page-500"
    }, {
      path: "/error-page/error-page",
      component: _507d0602,
      name: "error-page-error-page"
    }, {
      path: "/tables/dragable-table",
      component: _d5796c64,
      name: "tables-dragable-table"
    }, {
      path: "/tables/editable-table",
      component: _e58347b8,
      name: "tables-editable-table"
    }, {
      path: "/",
      component: _fe4b6ab0,
      name: "index"
    }],

    fallback: false
  })
}
