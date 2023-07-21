import lodash from "lodash";
import { List } from "immutable";

type SelectFuncType<ItemType> = (item: ItemType) => boolean;

function findInList<ItemType>(
  itemsCollection: List<ItemType>,
  selectFunc: SelectFuncType<ItemType>
) {
  const itemIndex = itemsCollection.findIndex(selectFunc);

  const item = itemsCollection.get(itemIndex);

  if (lodash.isUndefined(item)) {
    throw new Error();
  }

  return item;
}

function arrayToList<ItemType>(items: ItemType[]): List<ItemType> {
  return List<ItemType>(items);
}

export { findInList, arrayToList };