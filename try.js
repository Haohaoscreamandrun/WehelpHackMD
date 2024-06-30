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

  let Array1 = [1, 3, 6]
  let Array2 = [1, 3, 6]
  let Array3 = [1, 3, 6]

  let newArray1 = Array1.map( (number) => number * 2)

  console.log(Array1, newArray1)

  
  let newArray2 = [] 
  Array2.forEach( (number) => newArray2.push(number * 2))

  console.log(Array2, newArray2)

  let newArray3 = []
  for (let i = 0 ; i < 3; i++){
    newArray3[i] = Array3[i] * 2
  }

  console.log(Array3, newArray3)