window.addEventListener('load', () => {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('Service Worker successfully registered!', registration)
      })
      .catch(error => {
        console.log('Service Worker failed(((', error)
      })
  }
})