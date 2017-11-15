export default function isPromise(value) {
  return typeof value === 'object' && typeof value.then === 'function';
}
