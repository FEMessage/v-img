const loaded = new Set()

export default function(script) {
  return new Promise((resolve, reject) => {
    if (!script) {
      reject(new Error('Script is not found'))
    }
    if (loaded.has(script)) {
      resolve('loaded')
    }
    const loadScript = document.createElement('script')
    loadScript.onload = function() {
      loaded.add(script)
      resolve(true)
    }
    loadScript.onerror = function(err) {
      reject(err)
    }
    loadScript.src = script
    document.body.appendChild(loadScript)
  })
}
