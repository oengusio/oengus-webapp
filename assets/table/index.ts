/**
 * Change the state of a given item.
 * Returns the state that the item ends up in
 * !! In order for Vue change detection to work, you may need to reassign the Set to itself in the component !!
 *    i.e. expanded = new Set(expanded)
 * @param {Set<T>} expanded The current set of expanded identifiers.
 * @param {T|undefined} entry The identifier for the entry to be expanded. Can be undefined as a shortcut for easier programming.
 * @param {boolean} [openOnly=false] If `openOnly` is passed and truthy, the entry will never become closed
 * @returns {boolean} `true` for expanded, `false` for closed, `undefined` if no entry was passed
 */
export function toggleTableExpand<T>(expanded: Set<T>, entry: T|undefined, openOnly = false): boolean|undefined {
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

/**
 * Gets the correct class for a table row that is colored alternatingly.
 * @param {number} index The simple integer index of the row. Any arbritrary start index can be used, but the rows should have sequential index values or corrected to be sequential.
 * @param {boolean} [invert=false] Effectively start with the opposite of whatever was given by default.
 * @returns {Object} An object containing keys 'is-even' and 'is-odd' with at most one `true` providing a table class.
 */
export function getRowParity(index: number, invert = false): { 'is-even': boolean, 'is-odd': boolean } {
  if (invert) {
    // Methematically, this is all that's really necessary.
    index++;
  }
  return {
    'is-even': index % 2 === 0,
    'is-odd': index % 2 === 1,
  };
}
