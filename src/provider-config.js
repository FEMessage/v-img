const png = /\.png(\?.*)?$/
const jpg = /\.jpe?g(\?.*)?$/
const webp = /\.webp(\?.*)?$/
const svg = /\.svg(\?.*)?$/
/**
 * https://helpx.adobe.com/hk_en/experience-manager/6-3/assets/using/best-practices-for-optimizing-the-quality-of-your-images.html
 * https://sirv.com/help/articles/jpeg-quality-comparison/#use-sirv-to-find-the-perfect-quality
 */
const quality = 80

function is(types, src) {
  return Array.isArray(types) ? types.some(t => t.test(src)) : types.test(src)
}

const srcProcess = {
  CONVERT_WEBP: 'convertWebp',
  CROP_IMAGE: 'cropImage',
  APPEND_QUERY: 'appendQuery',
}

const pipe = function(fns) {
  return function(item) {
    return fns.reduce(function(prev, fn) {
      if (typeof fn !== 'function') {
        fn = v => v
      }
      return fn(prev)
    }, item)
  }
}

/**
 * //img-url => https://img-url
 * origin 参数纯粹是为了警告
 * @param url
 */
function preferHttps(url, origin) {
  if (url.startsWith('//')) {
    return 'https:' + url
  } else if (!url.startsWith('https')) {
    console.warn(
      'preferHttps is true, but this img is using http protocol: ' +
        (origin || url)
    )
  }
  return url
}

export const providerConfig = {
  alibaba: {
    [srcProcess.CONVERT_WEBP](vm) {
      const {src, isSupportWebp} = vm
      if (!src) return vm

      let query = ''
      if (isSupportWebp && is([png, jpg], src)) query += '/format,webp'
      /**
       * 质量变换仅对jpg、webp有效。（png已被转为webp）
       * @see https://help.aliyun.com/document_detail/44705.html?spm=a2c4g.11186623.6.1256.347d69cb9tB4ZR
       */
      if (is([png, jpg, webp], src)) query += `/quality,Q_${quality}`

      vm.$src = query
      return vm
    },
    // https://help.aliyun.com/document_detail/183902.html?spm=a2c4g.11186623.2.12.738828fbVGaPAf#section-tx1-qtj-ar8
    [srcProcess.CROP_IMAGE](vm) {
      const {$src = '', width, height, autocrop, src} = vm

      if (!autocrop || is(svg, src) || !src) return vm
      if (isNaN(width) && isNaN(height)) return vm

      const DPR = 2
      let dpr =
        (typeof window !== 'undefined' && window.devicePixelRatio) || DPR
      if (dpr === 1) {
        dpr = DPR
      }
      const actions = ['/resize']
      const WIDTH = `w_${parseInt(width * dpr)}`
      const HEIGHT = `h_${parseInt(height * dpr)}`
      const AUTOCROP = `m_fill`

      if (!isNaN(width) && !isNaN(height)) {
        actions.push(AUTOCROP)
      }

      if (!isNaN(height)) {
        actions.push(HEIGHT)
      }

      if (!isNaN(width)) {
        actions.push(WIDTH)
      }

      const resizeQuery = actions.join(',')

      vm.$src = resizeQuery + $src
      vm.$resizeQuery = resizeQuery

      return vm
    },

    [srcProcess.APPEND_QUERY](vm) {
      const {src, extraQuery} = vm
      // null 无法通过解构设置默认值的方式改变值，依然会是 null，不如直接返回
      if (!src) return vm

      let query = vm.$src || ''
      if (extraQuery) query += '/' + extraQuery
      if (query) {
        query =
          src +
          (src.indexOf('?') > -1 ? '&' : '?') +
          'x-oss-process=image' +
          query
      }

      vm.$src = query || src
      return vm
    },
  },
  qiniu: {
    [srcProcess.CONVERT_WEBP](vm) {
      const {src, isSupportWebp} = vm
      if (!src) return vm

      let query = vm.$src || ''
      // imageMogr2 接口可支持处理的原图片格式有 psd、jpeg、png、gif、webp、tiff、bmp
      if (is(svg, src)) {
        return vm
      }
      if (isSupportWebp && is([png, jpg], src)) query += '/format/webp'
      query += `/quality/${quality}`

      vm.$src = query
      return vm
    },

    [srcProcess.APPEND_QUERY](vm) {
      const {src, extraQuery} = vm
      if (!src) return vm

      let query = vm.$src || ''
      if (extraQuery) query += '/' + extraQuery
      if (query) {
        query = src + (src.indexOf('?') > -1 ? '&' : '?') + 'imageMogr2' + query
      }

      vm.$src = query || src
      return vm
    },
  },
  self: {
    [srcProcess.CONVERT_WEBP](vm) {
      const {src, isSupportWebp} = vm
      if (!src) return vm

      if (isSupportWebp && is([png, jpg], src)) {
        vm.$src =
          src.indexOf('?') > -1 ? src.replace('?', '.webp?') : src + '.webp'
      } else {
        vm.$src = src
      }
      return vm
    },
  },
  none: {
    [srcProcess.CONVERT_WEBP](vm) {
      vm.$src = vm.src || ''
      return vm
    },
  },
}

/**
 * 传入配置，根据 src 注入 $src，在 v-img 组件中使用的是 $src
 * 但在 APPEND_QUERY 步骤之前，其实 $src 代表的是 query
 * @param vm
 * @returns 注入了 $src 的 vm
 */
export default vm => {
  vm.$src = ''
  const providerPipe = providerConfig[vm.provider]
  const output = pipe([
    providerPipe[srcProcess.CONVERT_WEBP],
    providerPipe[srcProcess.CROP_IMAGE],
    providerPipe[srcProcess.APPEND_QUERY],
  ])(vm)
  vm.$uncroppedSrc = vm.$src.replace(vm.$resizeQuery, '')

  if (vm.preferHttps && ['self', 'none'].indexOf(vm.provider) == -1) {
    vm.$src = preferHttps(vm.$src, vm.src)
  }

  return output
}
