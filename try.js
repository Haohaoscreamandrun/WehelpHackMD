let resolvePromise = new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve('resolve')
  }, 1000)
})

let rejectPromise = new Promise((resolve, reject) => {
  setTimeout(function() {
    reject('reject')
  }, 1000)
})


// This will reject, because not all Pormise being resolved
Promise.all([resolvePromise, rejectPromise])
  .then((success) => {
    console.log('In Promise.all', success)
  })
  .catch((reject) => {
    console.log('In Promise.all', reject)
  })

// This will resolve, because the first Promise is resolve
Promise.race([resolvePromise, rejectPromise])
  .then((success) => {
    console.log('In Promise.race', success)
  })
  .catch((reject) => {
    console.log('In Promise.race', reject)
  })
