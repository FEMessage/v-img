import 'lazysizes/plugins/bgset/ls.bgset'
import providerConf from './provider-config'

const isBg = arg => arg === 'background'

function getSrc(el, config) {
  const isSupportWebp =
    JSON.parse(localStorage.getItem('isSupportWebp')) || false
  const {provider = 'alibaba', extraQuery} = config
  const src = providerConf[provider].getSrc({
    src: el.getAttribute('src'),
    isSupportWebp,
    extraQuery
  })

  return src
}

export default {
  init(el, {arg, value = {}}) {
    if (!isBg(arg)) {
      return
    }

    const src = getSrc(el, value)
    el.classList.add('lazyload')
    el.setAttribute('data-bgset', src)
  },

  update(el, {arg, value = {}}) {
    if (!isBg(arg)) {
      return
    }

    const src = getSrc(el, value)
    el.style.backgroundImage = `url(${src})`
  }
}
