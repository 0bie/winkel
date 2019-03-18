/**
 * Sort a collection of objects
 * @param {array} objArr - The initial array
 * @param {string} property - The object property to sort by
 * @returns {array} The mutated objArr
 */

export default function sortObjects(objArr, property) {
  if (!objArr.length > 0) {
    throw new Error('sortObjects requires a valid array of objects');
  }
  return objArr.sort((a, b) => {
    if (a[property] < b[property]) return -1;
    if (a[property] > b[property]) return 1;
    return 0;
  });
}
