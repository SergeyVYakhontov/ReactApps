import {
  ActionReducerMapBuilder
} from "@reduxjs/toolkit";
import { AsyncStoreStatus } from "./asyncStoreStatus";
import { loadTaskData, saveTaskData } from "./localStorageFuncs";
import { ITasksDataStore } from "./taskDataSlice";

function loadTasksDataReducer(builder: ActionReducerMapBuilder<ITasksDataStore>): void {
  builder.addCase(
    loadTaskData.pending,
    (state) => {

      return {
        ...state,
        storeStatus: AsyncStoreStatus.loading
      }
    });

  builder.addCase(
    loadTaskData.fulfilled,
    (state, { payload }) => {

      return {
        ...state,
        loadKey: 0,
        tasksCollection: payload.itemsCollection,
        storeStatus: AsyncStoreStatus.success
      }
    });

  builder.addCase(
    loadTaskData.rejected,
    (state, { payload }) => {

      return {
        ...state,
        storeStatus: AsyncStoreStatus.error,
        errorMessage: payload?.toString()
      }
    });
}

function saveTasksDataReducer(builder: ActionReducerMapBuilder<ITasksDataStore>): void {
  builder.addCase(
    saveTaskData.pending,
    (state) => {

      return {
        ...state,
        storeStatus: AsyncStoreStatus.loading
      }
    });

  builder.addCase(
    saveTaskData.fulfilled,
    (state, { payload }) => {

      return {
        ...state,
        savedItemsCount: payload.count,
        storeStatus: AsyncStoreStatus.success
      }
    });

  builder.addCase(
    saveTaskData.rejected,
    (state, { payload }) => {

      return {
        ...state,
        storeStatus: AsyncStoreStatus.error,
        errorMessage: payload?.toString()
      }
    });
}

export { loadTasksDataReducer, saveTasksDataReducer };
