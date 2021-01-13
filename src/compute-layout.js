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

  if (!isNaN(width) && !isNaN(height)) return {width, height}

  if (isNaN(width) && vm.$el) {
    let styleWidth = window.getComputedStyle(vm.$el).width

    if (styleWidth.indexOf('px') > -1) width = parseInt(styleWidth)
    else {
      width = (height * vm.$el.naturalWidth) / vm.$el.naturalHeight
    }
  }
  if (isNaN(height) && vm.$el) {
    let styleHeight = window.getComputedStyle(vm.$el).height

    if (styleHeight.indexOf('px') > -1) height = parseInt(styleHeight)
    else {
      height = (width * vm.$el.naturalHeight) / vm.$el.naturalWidth
    }
  }

  let result = {}
  if (width > 0) result.width = width
  if (height > 0) result.height = height

  return result
}
