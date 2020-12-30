const loaded = new Set()

export default function(url) {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error('Script is not found'))
    }
    if (loaded.has(url)) {
      resolve(true)
    } else {
      const node = document.getElementsByTagName('script')[0],
        script = document.createElement('script')
      script.src = url

      script.onload = function() {
        loaded.add(url)
        resolve(true)
      }
      script.onerror = function(err) {
        script.remove()
        reject(err)
      }
      node.parentNode.insertBefore(script, node)
    }
  })
}
