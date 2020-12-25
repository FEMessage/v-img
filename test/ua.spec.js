/**
 * Created by levy on 2020/12/25.
 */
import ua from '../src/ua'
import {minChromeVersion, minFirefoxVersion, Chrome, Firefox} from '../src/ua'

describe('user-agent detection', () => {
  const Chrome87 =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
  const Edge =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.74 Safari/537.36 Edg/79.0.309.43'
  const Opera =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36 OPR/70.0.3728.178 (Edition Baidu)'
  const Firefox51 =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:51.0) Gecko/20100101 Firefox/51.0'
  const Android =
    'Mozilla/5.0 (Linux; Android 4.4.4; HUAWEI H891L Build/HuaweiH891L) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36'
  const iPhone =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
  const Safari =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8'

  test('unknown user agent so assumes it do not support webp', () => {
    expect(ua.isSupportWebp(iPhone)).toBe(false)
    expect(ua.isSupportWebp(Safari)).toBe(false)
  })

  test('isChrome but not support webp', () => {
    expect(ua.getBrowser(Android).browser).toBe(Chrome)
    expect(ua.getBrowser(Android).version).toBeLessThan(minChromeVersion)
    expect(ua.isSupportWebp(Android)).toBe(false)
  })

  test('isChrome and support webp', () => {
    expect(ua.getBrowser(Chrome87).browser).toBe(Chrome)
    expect(ua.getBrowser(Chrome87).version).toBeGreaterThanOrEqual(
      minChromeVersion
    )
    expect(ua.isSupportWebp(Chrome87)).toBe(true)
    expect(ua.isSupportWebp(Edge)).toBe(true)
    expect(ua.isSupportWebp(Opera)).toBe(true)
  })

  test('isFirefox but not support webp', () => {
    expect(ua.getBrowser(Firefox51).browser).toBe(Firefox)
    expect(ua.getBrowser(Firefox51).version).toBeLessThan(minFirefoxVersion)
    expect(ua.isSupportWebp(Firefox51)).toBe(false)
  })
})
