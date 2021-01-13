/**
 * Created by levy on 2021/1/13.
 */
import computeLayout from '../src/compute-layout'
describe('compute img layout', () => {
  let vm
  let expected

  beforeEach(() => {
    vm = {
      width: '', // 理想值是数字
      height: '', // 理想值是数字
      $el: {
        naturalWidth: '', // 数字
        naturalHeight: '', // 数字
        style: {
          width: '', // 可能是 auto, 可能是 100%，可能是 300px 或其他单位。。。
          height: '',
        },
      },
    }
    expected = {width: 100, height: 100}
  })

  // 此时优先使用 width
  test('width/height 有数值, style.width/style.height 有px值', () => {
    vm.width = 100
    vm.height = 100
    vm.$el.style.width = '50px'
    vm.$el.style.height = '50px'
    expect(computeLayout(vm)).toStrictEqual(expected)
  })

  test('width/height 有数值', () => {
    vm.width = 100
    vm.height = 100
    expect(computeLayout(vm)).toStrictEqual(expected)

    // 兼容处理不正确的输入值
    vm.width = '100px'
    expect(computeLayout(vm)).toStrictEqual(expected)
  })

  test('width/height 无数值，style.width/style.height 有px值', () => {
    vm.$el.style.width = '100px'
    vm.$el.style.height = '100px'
    expect(computeLayout(vm)).toStrictEqual(expected)
  })

  test('width 有数值，height/style.height 无值, height 自动计算', () => {
    vm.width = 100
    vm.$el.naturalWidth = 200
    vm.$el.naturalHeight = 200
    expect(computeLayout(vm)).toStrictEqual(expected)
  })

  test('style.width 有px值，height/style.height 无值, height 自动计算', () => {
    vm.$el.style.width = '100px'
    vm.$el.naturalWidth = 200
    vm.$el.naturalHeight = 200
    expect(computeLayout(vm)).toStrictEqual(expected)
  })

  test('只有 naturalWidth/naturalHeight', () => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: jest.fn(el => ({
        width: el.naturalWidth + 'px',
        height: el.naturalHeight + 'px',
      })),
    })

    vm.$el.naturalWidth = 100
    vm.$el.naturalHeight = 100
    expect(computeLayout(vm)).toStrictEqual(expected)
  })

  test('width/height 不是纯数字, 暂不支持', () => {
    vm.width = '100%'
    vm.height = 'auto'
    expect(computeLayout(vm)).toStrictEqual({})
  })

  test('style.width/style.height 不是px，暂不支持', () => {
    vm.$el.style.width = 'auto'
    vm.$el.style.height = '100%'
    expect(computeLayout(vm)).toStrictEqual({})

    vm.$el.style.width = '10em'
    expect(computeLayout(vm)).toStrictEqual({})
  })
})
