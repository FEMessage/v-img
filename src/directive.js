import getImageSrc from './provider-config'
import ua from './ua'

function getSrc(config) {
  const {
    provider = 'alibaba',
    extraQuery,
    src,
    width,
    height,
    autocrop = true,
    preferHttps = true,
    webp = true,
  } = config
  if (!src) return

  let isSupportWebp = false
  if (webp) {
    // TODO only simply check in sync way
    isSupportWebp =
      ua.isSupportWebp(navigator.userAgent) ||
      JSON.parse(localStorage.getItem('isSupportWebp')) ||
      false
  }

  return getImageSrc({
    autocrop,
    provider,
    src,
    isSupportWebp,
    extraQuery,
    width,
    height,
    preferHttps,
  }).$src
}

export default {
  init(el, {value = {}}) {
    const size = {
      width: el.offsetWidth,
      height: el.offsetHeight,
    }
    const src = getSrc({...size, ...value})
    el.classList.add('lazyload')
    el.setAttribute('data-bgset', src)
  },

  update(el, {value = {}}) {
    const src = getSrc(value)
    el.style.backgroundImage = `url(${src})`
  },
}
