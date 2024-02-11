/**
 * Removes all keys with `undefined` values from the object.
 */
export function dropUndefinedKeys<T extends Record<string, unknown>>(obj: T): NonNullable<T> {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined)) as NonNullable<T>;
}
