/**
 * Created by levy on 2021/1/13.
 */
function isPixel(dimension) {
  return ('' + dimension).indexOf('px') > -1
}

export default function(vm) {
  let width, height
  if (Number.isInteger(vm.width) || isPixel(vm.width))
    width = parseInt(vm.width)
  if (Number.isInteger(vm.height) || isPixel(vm.height))
    height = parseInt(vm.height)

  if (isNaN(width) && vm.$el) {
    let styleWidth = window.getComputedStyle(vm.$el).width
    if (isPixel(styleWidth)) width = parseInt(styleWidth)
  }
  if (isNaN(height) && vm.$el) {
    let styleHeight = window.getComputedStyle(vm.$el).height
    if (isPixel(styleHeight)) height = parseInt(styleHeight)
  }

  // TODO 这里假设 auto 没有返回数值，待验证
  if ((isNaN(width) && isNaN(height)) || (!width && !height)) return {}

  let naturalWidth = vm.$el.naturalWidth,
    naturalHeight = vm.$el.naturalHeight

  if (width > naturalWidth) width = naturalWidth
  if (height > naturalHeight) height = naturalHeight

  // getComputedStyle 有可能会返回 natural[Width/Height]，这使得其返回值不可直接使用，还需要最后 resize 一下。
  let scaleWidth = (height * vm.$el.naturalWidth) / vm.$el.naturalHeight
  let scaleHeight = (width * vm.$el.naturalHeight) / vm.$el.naturalWidth

  if (!scaleWidth || width * scaleHeight <= height * scaleWidth)
    return {width, height: scaleHeight}
  else if (!scaleHeight || scaleWidth * height <= scaleHeight * width)
    return {width: scaleWidth, height}
  return {}
}
