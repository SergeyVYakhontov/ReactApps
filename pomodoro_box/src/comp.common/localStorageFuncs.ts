import { createAsyncThunk } from "@reduxjs/toolkit";
import { IdType } from "@/types/commonTypes";
import { ICollectionItem } from "@/types/ICollectionItem";
import * as asyncLocalStorage from "@/components/asyncLocalStorage";

interface ICreateItemAPI<CollectionData extends ICollectionItem> {
  readonly itemData: CollectionData;
}

interface IUpdateItemAPI<CollectionData extends ICollectionItem> {
  readonly itemData: CollectionData;
}

interface IDeleteItemAPI {
  readonly itemId: IdType;
}

interface IProcessItemRetType {
  readonly itemId: IdType;
}

interface IItemCollectionRetType<CollectionData extends ICollectionItem> {
  readonly itemsCollection: CollectionData[];
}

interface ISaveCollectionAPI<CollectionData extends ICollectionItem> {
  readonly itemsCollection: CollectionData[];
}

interface IProcessCollectionRetType {
  readonly count: number;
}

interface ILoadItemRetType<ItemType> {
  readonly item: ItemType;
}

interface ISaveItemRetType {
  readonly itemId: IdType;
}
function loadItemsList<ItemType extends ICollectionItem>(
  storeName: string
) {
  return createAsyncThunk<IItemCollectionRetType<ItemType>, object>(
    `localStorage/loadItemsList_${storeName}`,
    async (): Promise<IItemCollectionRetType<ItemType>> => {
      try {
        const itemsArray = await asyncLocalStorage.getItem<ItemType[]>(
          storeName, []);

        return {
          itemsCollection: itemsArray
        };
      }
      catch (error) {
        throw new Error();
      }
    });
}

function saveItemsList<ItemType extends ICollectionItem>(
  storeName: string
) {
  return createAsyncThunk<IProcessCollectionRetType, ISaveCollectionAPI<ItemType>>(
    `localStorage/saveItemsList_${storeName}`,
    async ({ itemsCollection }: ISaveCollectionAPI<ItemType>): Promise<IProcessCollectionRetType> => {
      try {
        asyncLocalStorage.setItem<ICollectionItem[]>(
          storeName,
          itemsCollection);

        return { count: itemsCollection.length };
      }
      catch (error) {
        throw new Error();
      }
    });
}

function loadItem<ItemType extends ICollectionItem>(
  storeName: string,
  itemDefault: ItemType
) {
  return createAsyncThunk<ILoadItemRetType<ItemType>, ItemType>(
    `localStorage/loadItem_${storeName}`,
    async (): Promise<ILoadItemRetType<ItemType>> => {
      try {
        const item = await asyncLocalStorage.getItem<ItemType>(
          storeName, itemDefault);

        return {
          item: item
        };
      }
      catch (error) {
        throw new Error();
      }
    });
}

function saveItem<ItemType extends ICollectionItem>(
  storeName: string
) {
  return createAsyncThunk<ISaveItemRetType, ItemType>(
    `localStorage/saveItem_${storeName}`,
    async (item: ItemType): Promise<ISaveItemRetType> => {
      try {
        asyncLocalStorage.setItem<ItemType>(
          storeName,
          item);

        return { itemId: item.id };
      }
      catch (error) {
        throw new Error();
      }
    });
}

export {
  ICreateItemAPI,
  IUpdateItemAPI,
  IDeleteItemAPI,
  IProcessItemRetType,
  loadItemsList,
  saveItemsList,
  loadItem,
  saveItem
};