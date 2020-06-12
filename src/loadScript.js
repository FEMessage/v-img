export default function(script) {
  return new Promise((resolve, reject) => {
    if (!script) {
      reject(new Error('Script is not found'))
    }
    const loadScript = document.createElement('script')
    loadScript.onload = function() {
      resolve(true)
    }
    loadScript.onerror = function(err) {
      reject(err)
    }
    loadScript.src = script
    document.body.appendChild(loadScript)
  })
}
