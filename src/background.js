import 'lazysizes/plugins/bgset/ls.bgset'
import providerConf from './provider-config'

const isBg = arg => arg === 'background'
const isSupportWebp = JSON.parse(localStorage.getItem('isSupportWebp')) || false

export default {
  init(el, {arg, value = {}}) {
    if (!isBg(arg)) {
      return
    }
    const {provider = 'alibaba', extraQuery, ...other} = value
    const backgroundArgs = Object.keys(other).filter(
      item => `background${item[0].toUpperCase() + item.slice(1)}` in el.style
    )
    const src = providerConf[provider].getSrc({
      src: el.getAttribute('src'),
      isSupportWebp,
      extraQuery
    })

    el.style.backgroundSize = 'cover'
    if (backgroundArgs.length) {
      backgroundArgs.forEach(arg => {
        const key = arg[0].toUpperCase() + arg.slice(1)
        el.style[`background${key}`] = other[arg]
      })
    }

    el.classList.add('lazyload')
    el.setAttribute('data-bgset', src)
  },

  update(el, {arg, value = {}}) {
    if (!isBg(arg)) {
      return
    }
    const {provider = 'alibaba', extraQuery} = value
    const src = providerConf[provider].getSrc({
      src: el.getAttribute('src'),
      isSupportWebp,
      extraQuery
    })

    el.style.backgroundImage = `url(${src})`
  }
}
