export default function emptyValue(obj) {

  if (!obj) {
    throw new Error('emptyValue method requires a valid object');
  }
  if (obj instanceof Array) {
    return obj.length === 0;
  }
  if (typeof obj === 'object') {
    return (Object.keys(obj).length === 0) && (obj.constructor === Object);
  }

}
