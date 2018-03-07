export default function isPromise(value: any): boolean {
  return typeof value === 'object' && typeof value.then === 'function';
}
