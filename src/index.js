// Import vue component
import Component from './v-img.vue'
import background from './directive'
import placeholder from './spinner.svg'
import reload from './reload.png'
import loadScript from './load-script'

const defaultOptions = {
  placeholder,
  error: reload,
}

const lazysizes = 'https://unpkg.com/lazysizes/lazysizes.min.js'
const bgset =
  'https://unpkg.com/lazysizes/plugins/bgset/ls.bgset.min.js'

// `Vue.use` automatically prevents you from using
// the same plugin more than once,
// so calling it multiple times on the same plugin
// will install the plugin only once
Component.install = (Vue, options = {}) => {
  Vue.prototype.$vImg = {...defaultOptions, ...options}

  if (typeof window !== 'undefined' && !window.lazySizes) {
    // https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/bgset
    Promise.all([
      loadScript({name: 'bgset', url: bgset}),
      loadScript({name: 'lazysizes', url: lazysizes}),
    ]).catch(console.error)
  }

  Vue.component(Component.name, Component)

  Vue.directive('img', {
    inserted: background.init,
    update: background.update,
  })
}

// To auto-install when vue is found
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(Component)
}

// To allow use as module (npm/webpack/etc.) export component
export default Component

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
