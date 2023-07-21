import {
  ActionReducerMapBuilder
} from "@reduxjs/toolkit";
import { AsyncStoreStatus } from "./asyncStoreStatus";
import {
  loadTasksFlow,
  saveTasksFlow
} from "./localStorageFuncs";
import { ITasksFlowStore } from "@/store/tasksFlowSlice";

function loadTasksFlowReducer(builder: ActionReducerMapBuilder<Readonly<ITasksFlowStore>>): void {
  builder.addCase(
    loadTasksFlow.pending,
    (state) => {

      return {
        ...state,
        storeStatus: AsyncStoreStatus.loading
      }
    });

  builder.addCase(
    loadTasksFlow.fulfilled,
    (state, { payload }) => {

      return {
        ...payload.item,
        loadKey: 0,
        storeStatus: AsyncStoreStatus.success
      }
    });

  builder.addCase(
    loadTasksFlow.rejected,
    (state, { payload }) => {

      return {
        ...state,
        storeStatus: AsyncStoreStatus.error,
        errorMessage: payload?.toString()
      }
    });
}

function saveTasksFlowReducer(builder: ActionReducerMapBuilder<Readonly<ITasksFlowStore>>): void {
  builder.addCase(
    saveTasksFlow.pending,
    (state) => {

      return {
        ...state,
        storeStatus: AsyncStoreStatus.loading
      }
    });

  builder.addCase(
    saveTasksFlow.fulfilled,
    (state) => {

      return {
        ...state,
        storeStatus: AsyncStoreStatus.success
      }
    });

  builder.addCase(
    saveTasksFlow.rejected,
    (state, { payload }) => {

      return {
        ...state,
        storeStatus: AsyncStoreStatus.error,
        errorMessage: payload?.toString()
      }
    });
}

export { loadTasksFlowReducer, saveTasksFlowReducer };