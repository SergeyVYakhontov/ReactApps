
function arrayRotateLeft<T>(items: T[]): T[] {
  const newItems = [...items, items[0]];
  newItems.shift();

  return newItems;
}

export { arrayRotateLeft };
