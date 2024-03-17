/**
 * Store item in local storage
 * @param {*} key key of item
 * @param {*} value value will store
 */
export function setDataInLS(key, value) {
  localStorage.setItem(key, value);
}

/**
 * get item from local storage
 * @param {*} key key of item
 */
export function getItemFromLS(key) {
  return localStorage.getItem(key);
}
