// Import vue component
import Component from './v-img.vue'
import background from './background'
import placeholder from './spinner.svg'

const defaultOptions = {
  placeholder,
  error:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAMAAADw8nOpAAAArlBMVEUAAAAAAAD///9paWkyMjL////////////29vb////09PTn5+fh4eGvr6/////6+vqZmZm8vLz39/fj4+P8/PyBgYH////////////////Gxsb////////////v7+/MzMzr6+v///+4uLj////o6OhNTU3Y2NjQ0ND9/f35+fn////////////t7e3////////////////z8/Pb29v////y8vLw8PDU1NT////////ym0LiAAAAOXRSTlMaAPooH+3z2LwFtYZ5QvXUNkvDgOAul49vV1RHGRKfWZThSPiMI2pf6szLva2ahHhPQa9wIamkYyJOAjtMAAAD1ElEQVRYw8WZ6XbaMBBGp/K+L4DBxUDZQkjInpB+7/9ipSapQPKGOT69PxNzbY3Go5FMP2rIxqPkPphrjGnz4D4ZjbO6X1QqJ2liQMJI0kk7pfW8YwD0eOrOvFBRVSX0Zu401gGw3bN1sXLyqAEsdiKSiJyYAdrj5CJlNvSBoDegEga9APCHWWOl9eQDZkSVRCbgP1nNlC8GYHtUi2cDxksDpTUEjJ/UiJ8GMLTqlO93YI5KDVEdhrv3auVYR39BF7DoQx9XKVMGW6GLUGywtFw5An7RxfwCRpKSG3vUgh53CsoUeKNWvAFpkXLM+DNe/pxsLCvfdR7HNvHU30WldQebill/Pph9ben3t/b0piwfbNxZgnKIfuHVA9dc4gS2dcLCXOpjeK58AVsUCacMEuyjSLpgeDlVWgacghGvdHDqpA4M60T5BEOVi8ItStE28vtu4IkrMx9y7XEZvvBN5+2nF0Yb94Pf5UGVHgF+9k85lGdb3eMIe/1cE8f79R2MrSLP+vBbOfEhVVwTR2wpaoqjISdeizUZ/uRL+QiTBKbIMaLCxPq6n6lKz/F4VFoaIjGOX78pS2z3mKuv4noEzcqVzwjEQLPjDFAps6PzRvhzgOdcuRPLhToXjTKb/K63ilg+dn+VE8YGYtLmo6ZKboqGPmBsclCmiIUp1QCIr7zMBw6I+RwjPSgT8V184NdWoeThscUBJgelIcy3suTDruQTB4SgRTB+UAa9KEge1dPHgRWdoSOjsRjKVz6eGtx80sVgjmmE6XkG6Tzhaljnl4bCazeiBO55EucRatYfmPLdXSR0jxmdssorQsOFUX4jZrinAJ4UyqZr5SIvckI1CmguBCPAAbfZ1HD07+cKMScNipwZm1plqIFzksYKNGI4r3r5UhBRLTOcMP/3WCpYsXJB9TjcuFzQibLlwPlaIoRegdZmeniDceTjNMaYFyfRiprg+bkxWAtJVJjqduO+EtBCIdWLX0hfbebcS3F3kZSUjU0zpbrFisSyUVLc9tTQuSCpuJWUYH9A7dCRlS0U+3bGCEbpcsa8VkoHSfmiG7dSxkgrWoPpRS7eGlQ1MG6b/c+uss1iFWsaH5fYZtU0g6XrxUzj/xKawbqW1Sx+mhX4dlNoWesba321lvvAIA8Lb5qExrq2/b/thee7vy2O2FTa/tdvUoLVzFMOdwkjvvvjcRY2KRdspZZ6g63UFRu+fc2Gr4NtaQeb5w62+B0cRHR0XHL9oU73R0/XH5B1c4zX/WEj5/f1R6LdH9xef7x8/SF410f1139Q+P+fPa74ONPBJ6Q/+TfzjGYmPq8AAAAASUVORK5CYII='
}

// `Vue.use` automatically prevents you from using
// the same plugin more than once,
// so calling it multiple times on the same plugin
// will install the plugin only once
Component.install = (Vue, options = {}) => {
  Vue.prototype.$vImg = {...defaultOptions, ...options}

  Vue.component(Component.name, Component)

  Vue.directive('img', {
    inserted: background.init,
    update: background.update
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
