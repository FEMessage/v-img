const png = /\.png(\?.*)?$/
const jpg = /\.jpe?g(\?.*)?$/
const webp = /\.webp(\?.*)?$/
const svg = /\.svg(\?.*)?$/
function is(types, src) {
  return Array.isArray(types) ? types.some(t => t.test(src)) : types.test(src)
}

const process = {
  GET_SRC: 'getSrc',
  CROP_IMAGE: 'autocrop',
  APPEND_QUERY: 'appendQuery'
}

export const providerConfig = {
  alibaba: {
    [process.GET_SRC]({src, isSupportWebp, extraQuery}) {
      let query = ''
      if (isSupportWebp && is([png, jpg], src)) query += '/format,webp'
      /**
       * 质量变换仅对jpg、webp有效。（png已被转为webp）
       * @see https://help.aliyun.com/document_detail/44705.html?spm=a2c4g.11186623.6.1256.347d69cb9tB4ZR
       */
      if (is([png, jpg, webp], src)) query += '/quality,Q_75'
      if (extraQuery) query += '/' + extraQuery
      if (query) {
        src +=
          (src.indexOf('?') > -1 ? '&' : '?') + 'x-oss-process=image' + query
      }
      return src
    }
  },
  qiniu: {
    [process.GET_SRC]({src, isSupportWebp, extraQuery}) {
      // imageMogr2 接口可支持处理的原图片格式有 psd、jpeg、png、gif、webp、tiff、bmp
      if (is(svg, src)) return src
      src += src.indexOf('?') > -1 ? '&' : '?'
      src += 'imageMogr2'
      if (isSupportWebp && is([png, jpg], src)) src += '/format/webp'
      src += '/quality/75'
      if (extraQuery) src += '/' + extraQuery
      return src
    }
  },
  self: {
    [process.GET_SRC]({src, isSupportWebp}) {
      if (isSupportWebp && is([png, jpg], src)) {
        src = src.indexOf('?') > -1 ? src.replace('?', '.webp?') : src + '.webp'
      }
      return src
    }
  },
  none: {
    [process.GET_SRC]({src}) {
      return src
    }
  }
}

export default vm => {
  let imageSrc = vm.src
  const providerPipe = providerConfig[vm.provider]
  // convert webp
  if (providerPipe[process.GET_SRC]) {
    imageSrc = providerPipe[process.GET_SRC](vm)
  }
  // append crop query
  if (vm.autocrop && providerPipe[process.CROP_IMAGE]) {
    imageSrc = providerPipe[process.CROP_IMAGE](vm)
  }
  // append extra query
  if (vm.extraQuery && providerPipe[process.APPEND_QUERY]) {
    imageSrc = providerPipe[process.APPEND_QUERY](vm)
  }
  return imageSrc
}
