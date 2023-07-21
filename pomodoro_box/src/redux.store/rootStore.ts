import { configureStore } from "@reduxjs/toolkit";
import { ITasksDataStore, tasksDataSlice } from "./taskDataSlice";
import { IAppSettingsStore, appSettingsSlice } from "./appSettingsSlice";
import { ITaskInputStore, taskInputSlice } from "./taskInputSlice";
import { ITasksFlowStore, tasksFlowSlice } from "./tasksFlowSlice";

interface IRootStoreData {
  appSettingsStore: IAppSettingsStore;
  tasksCollectionStore: ITasksDataStore;
  taskInputStore: ITaskInputStore;
  tasksFlowStore: ITasksFlowStore;
}

const rootStore = configureStore<IRootStoreData>({
  reducer: {
    appSettingsStore: appSettingsSlice.reducer,
    tasksCollectionStore: tasksDataSlice.reducer,
    taskInputStore: taskInputSlice.reducer,
    tasksFlowStore: tasksFlowSlice.reducer
  }
});

export { IRootStoreData, rootStore };
