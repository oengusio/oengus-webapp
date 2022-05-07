/**
 * Change the state of a given item.
 * Returns the state that the item ends up in
 * `true` for expanded, `false` for closed, `undefined` if no entry was passed
 * If `openOnly` is passed and truthy, the entry will never become closed
 * !! In order for Vue change detection to work, you may need to reassign the Set to itself in the component !!
 *    i.e. expanded = new Set(expanded)
 */
 export function toggleTableExpand<T>(expanded: Set<T>, entry?: T, openOnly = false): boolean|undefined {
  if (entry === undefined) {
    return;
  }
  if (expanded.has(entry) && !openOnly) {
    expanded.delete(entry);
  } else {
    expanded.add(entry);
  }
  return expanded.has(entry);
}
