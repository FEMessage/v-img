<template>
  <img
    class="v-img lazyload"
    :class="classname"
    :style="style"
    :height="height"
    :width="width"
    :data-src="imageSrc.$src"
    :data-uncropped-src="imageSrc.$uncroppedSrc"
    :src="transparentImg"
    v-bind="$attrs"
    referrerpolicy="no-referrer"
    v-on="$listeners"
    @load="onLoad"
    @error="onError"
    @click="onClick"
  />
</template>

<script>
import {providerConfig, default as getSrc} from './provider-config'

/**
 * TODO:
 * [ ] 可以考虑在check完isSupportWebp后再动态引入lazySizes
 * [x] 只watch src的改动
 * WHY: 现有一个竞态条件：
 * 1. 组件beforeMount时，会异步去获取浏览器是否支持webp，如果支持则按规则转换data-src属性
 * 2. lazySizes检测到图片出现在屏幕时，会将data-src的值更新到src属性
 * 如果顺序是1 => 2，则是理想的
 * 如果顺序是2 => 1，则图片会被请求两次：一是原始src；二是转换为webp的src
 */
import 'lazysizes'

const STATUS_IDLE = 0
// 目前没有必要区分 idle 和 loading，暂且保留标识符
// const STATUS_LOADING = 1
const STATUS_LOADED = 2
const STATUS_ERROR = 3

export default {
  name: 'VImg',

  props: {
    /** 图片地址 */
    src: {
      type: String,
      default: ''
    },
    /** 图片宽度, 值为数字, 该属性会与懒加载有关(宽度、高度设置一个即可) */
    width: {
      type: [String, Number],
      default: 'auto'
    },
    /** 图片高度, 值为数字, 该属性会与懒加载有关(宽度、高度设置一个即可) */
    height: {
      type: [String, Number],
      default: 'auto'
    },
    /** 是否需要 loading 效果 */
    hasLoading: {
      type: Boolean,
      default: true
    },
    /** 服务提供商 */
    provider: {
      default: 'alibaba',
      validator(v) {
        return Object.keys(providerConfig).indexOf(v) > -1
      }
    },
    /**
     * 当provider=alibaba时，v-img默认开启oss图片处理服务
     * 具体使用方式可参考组件示例和alibaba文档
     * @see https://help.aliyun.com/document_detail/44686.html?spm=a2c4g.11186623.6.1236.5aa3e849edfZdj
     */
    extraQuery: {
      type: String,
      default: ''
    },

    /**
     * loading 时的占位图
     */
    placeholder: {
      type: String,
      default: ''
    },

    /**
     * 图片加载失败时的占位图
     */
    error: {
      type: String,
      default: ''
    },

    /**
     * 是否开启自动裁剪
     */
    autocrop: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      isSupportWebp: null,
      status: STATUS_IDLE,
      transparentImg:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
    }
  },
  computed: {
    classname() {
      switch (this.status) {
        case STATUS_IDLE:
          return `on-loading`
        case STATUS_ERROR:
          return `on-error`
        default:
          return ``
      }
    },

    style() {
      const baseStyle = {
        backgroundSize: 'auto 22px',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f0f2f5'
      }
      switch (this.status) {
        case STATUS_IDLE:
          if (!this.hasLoading) return {}
          return {
            ...baseStyle,
            backgroundImage: `url(${this.loadingImage})`
          }
        case STATUS_ERROR:
          if (!this.hasLoading) return {}
          return {
            ...baseStyle,
            backgroundImage: `url(${this.reloadImage})`,
            backgroundSize: 'auto 40px',
            cursor: 'pointer'
          }
        default:
          return {}
      }
    },
    imageSrc() {
      return getSrc(this)
    },
    loadingImage() {
      return this.placeholder || this.$vImg.placeholder
    },
    reloadImage() {
      return this.error || this.$vImg.error
    }
  },

  watch: {
    src() {
      /**
       * 当元素的classList已经不包含lazyload，说明lazySizes已经开始更新当前元素
       * 更新之后，lazySizes就不会检查data-src属性的变更；此时要手动更新
       */
      if (!this.$el.classList.contains('lazyload')) this.forceUpdateSrc()
    }
  },

  beforeMount() {
    this.checkLayout()
    this.checkSupportWebp()
  },

  methods: {
    checkLayout() {
      if (!this.width && !this.height) {
        console.warn(
          'You better set image width or height attribute, otherwise v-img lazyload may not work correctly'
        )
      }
    },
    async checkSupportWebp() {
      this.isSupportWebp = JSON.parse(localStorage.getItem('isSupportWebp'))
      if (this.isSupportWebp !== null) return

      this.isSupportWebp = await new Promise(resolve => {
        const emptyWebp =
          'data:image/webp;base64,UklGRloAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAIAAAAAf1ZQOCAyAAAA0AEAnQEqAQABAAEAHCWgAnS6AfgAA7AA/vQ1H/6TZ4mzxNnySP/3UV+6iv3UV/7kqAA='
        const image = new Image()
        image.onload = () => resolve(!!(image.width && image.height))
        image.onerror = () => resolve(false)
        image.src = emptyWebp
      })
      localStorage.setItem('isSupportWebp', this.isSupportWebp)
    },
    forceUpdateSrc() {
      this.$el.setAttribute('src', this.imageSrc)
    },
    onLoad() {
      if (this.$el.getAttribute('src') === this.imageSrc)
        this.status = STATUS_LOADED
    },
    onError() {
      this.status = STATUS_ERROR
      this.$el.setAttribute('src', this.transparentImg)
    },
    onClick() {
      if (this.status === STATUS_ERROR) this.forceUpdateSrc()
    }
  }
}
</script>
