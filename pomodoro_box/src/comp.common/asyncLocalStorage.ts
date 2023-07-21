import { IdType } from "@/types/commonTypes";

function setItem<CollectionType>(key: IdType, value: CollectionType): Promise<void> {
  return Promise.resolve().then(function () {
    localStorage.setItem(key, JSON.stringify(value));
  });
}

function getItem<ValueType>(
  key: IdType,
  emptyValue: ValueType
): Promise<ValueType> {

  return Promise.resolve().then(function () {
    const storageItem = localStorage.getItem(key);

    if (!storageItem) {
      return emptyValue;
    }

    return JSON.parse(storageItem);
  });
}

export { setItem, getItem };