/**
 * this method if for implenting clone
 */

export const deepClone = date => {
  // date is typeof undefined or null or empty
  if (!date) {
    return date
  }

  // date is number or string
  if (typeof date === 'number' || typeof date === 'string') {
    return date
  }

  // date is array or object
  const instance = date.constructor
  for (const key in date) {
    if (date.hasOwnProperty(key)) {
      instance[key] = deepClone(date[key])
    }
  }

  return instance
}

/**for test */
// const a = { a: 'jslkdf', b: 'klsjdflk', c: undefined }
// console.log(deepClone(a))
