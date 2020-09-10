/**
 * localstorage
 * set
 * get
 * del
 * need a key and a value
 */
export const setItem = (key, value) => {
  // is value a object?
  if (typeof value === 'object' && value !== null) {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const getItem = key => {
  const value = window.localStorage.getItem(key)
  try {
    const parseValue = JSON.parse(value)
    return parseValue
  } catch (error) {
    return value
  }
}

export const removeItem = key => {
  window.localStorage.removeItem(key)
}
