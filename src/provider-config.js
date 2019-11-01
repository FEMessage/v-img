const png = /\.png(\?.*)?$/
const jpg = /\.jpe?g(\?.*)?$/
const webp = /\.webp(\?.*)?$/
const svg = /\.svg(\?.*)?$/
function is(types, src) {
  return Array.isArray(types) ? types.some(t => t.test(src)) : types.test(src)
}

export default {
  alibaba: {
    getSrc({src, isSupportWebp, extraQuery}) {
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
    getSrc({src, isSupportWebp, extraQuery}) {
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
    getSrc({src, isSupportWebp}) {
      if (isSupportWebp && is([png, jpg], src)) {
        src = src.indexOf('?') > -1 ? src.replace('?', '.webp?') : src + '.webp'
      }
      return src
    }
  },
  none: {
    getSrc({src}) {
      return src
    }
  }
}
