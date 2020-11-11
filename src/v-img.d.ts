import Vue from 'vue'

declare module '@femessage/v-img' {
  class FemessageComponent extends Vue {
    static install(vue: typeof Vue): void
  }

  type CombinedVueInstance<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = Data & Methods & Computed & Props & Instance

  type ExtendedVue<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = VueConstructor<
    CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue
  >

  type Combined<Data, Methods, Computed, Props> = Data &
    Methods &
    Computed &
    Props

  type VImgData = {
    isSupportWebp: boolean | null
    status: number
    transparentImg: string
  }

  type VImgMethods = {
    checkLayout: () => void

    checkSupportWebp: () => Promise<void>

    forceUpdateSrc: () => void

    onLoad: () => void

    onError: () => void

    onClick: () => void
  }

  type VImgComputed = {
    classname: string

    style: {[key: string]: any}

    imageSrc: any

    loadingImage: string

    reloadImage: string
  }

  type VImgProps = {
    src: string

    width: string | number

    height: string | number

    hasLoading: boolean

    provider: string

    extraQuery: string

    placeholder: string

    error: string

    autocrop: string
  }

  type VImg = Combined<VImgData, VImgMethods, VImgComputed, VImgProps>

  export interface VImgType extends FemessageComponent, VImg {}

  const VImgConstruction: ExtendedVue<
    Vue,
    VImgData,
    VImgMethods,
    VImgComputed,
    VImgProps
  >

  export default VImgConstruction
}
