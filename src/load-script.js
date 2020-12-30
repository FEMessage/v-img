export default function({name, url}) {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error('to load script, url cannot be null'))
    }
    if (document.getElementById(name)) {
      resolve(true)
    } else {
      const node = document.getElementsByTagName('script')[0],
        script = document.createElement('script')
      script.setAttribute('id', name)
      script.setAttribute('src', url)

      script.onload = function() {
        resolve(true)
      }
      script.onerror = function(err) {
        script.remove()
        reject(err)
      }
      node.parentNode.insertBefore(script, null)
    }
  })
}
