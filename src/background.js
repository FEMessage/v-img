import 'lazysizes/plugins/bgset/ls.bgset'
import providerConf from './provider-config'

function getSrc(config) {
  const isSupportWebp =
    JSON.parse(localStorage.getItem('isSupportWebp')) || false
  const {provider = 'alibaba', extraQuery, src} = config
  if (!src) {
    return
  }

  return providerConf[provider].getSrc({
    src,
    isSupportWebp,
    extraQuery
  })
}

export default {
  init(el, {value = {}}) {
    const src = getSrc(value)
    el.classList.add('lazyload')
    el.setAttribute('data-bgset', src)
  },

  update(el, {value = {}}) {
    const src = getSrc(value)
    el.style.backgroundImage = `url(${src})`
  }
}
