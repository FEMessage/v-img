/**
 * Created by levy on 2020/12/25.
 * https://developers.google.com/speed/webp/faq#how_can_i_detect_browser_support_for_webp
 * https://textslashplain.com/2019/05/01/edge-76-vs-edge-18-vs-chrome/
 * https://en.wikipedia.org/wiki/History_of_the_Opera_web_browser#Opera_2013
 * simple logic: if (chrome >= 79 || firefox >= 65) supports webp
 * it is including edge >= 79 && opera >= 66
 *
 * for more powerful user agent detection, please use: https://github.com/faisalman/ua-parser-js
 */
const regex = /(firefox|chrome(?=\/))\/?\s*(\d+)/i
export const minChromeVersion = 79
export const minFirefoxVersion = 65
export const Chrome = 'Chrome'
export const Firefox = 'Firefox'

function getBrowser(ua) {
  const matches = regex.exec(ua) || []
  // eslint-disable-next-line no-unused-vars
  const [str, browser, version] = matches
  return {
    browser,
    version: parseInt(version)
  }
}

function isSupportWebp(ua) {
  const {browser, version} = getBrowser(ua)
  return (
    (browser === Chrome && version >= minChromeVersion) ||
    (browser === Firefox && version >= minFirefoxVersion)
  )
}

export default {
  isSupportWebp,
  getBrowser
}
