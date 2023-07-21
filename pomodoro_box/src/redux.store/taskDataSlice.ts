import {
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import { ActionNames } from "./actionNames";
import { IdType } from "@/types/commonTypes";
import {
  TasksCollection,
  emptyTasksCollection
} from "@/types/TaskData";
import { AsyncStoreStatus } from "./asyncStoreStatus";
import { ITaskData } from "@/types/TaskData";
import { TasksDataRunner } from "@/components/TasksDataRunner";
import { loadTasksDataReducer, saveTasksDataReducer } from "./taskDataReducers";

interface ITasksDataStore {
  loadKey: number;
  currTaskId: IdType;
  deletedTaskId: IdType;
  tasksCollection: TasksCollection;
  processedTaskId?: IdType;
  savedItemsCount: number;
  storeStatus: AsyncStoreStatus;
  errorMessage?: string;
}

interface ActionPayloadData {
  taskData: ITaskData;
}

type ActionType = PayloadAction<Readonly<ActionPayloadData>, string>;
type DispatchType = ThunkDispatch<ITasksDataStore, void, ActionType>;

const initialState: ITasksDataStore = {
  loadKey: 0,
  currTaskId: "",
  deletedTaskId: "",
  tasksCollection: emptyTasksCollection(),
  savedItemsCount: 0,
  storeStatus: AsyncStoreStatus.idle
};

const tasksDataSlice = createSlice({
  name: ActionNames.TASKS_DATA,
  initialState,
  reducers: {
    setCurrentTask: (state: ITasksDataStore, action: ActionType): ITasksDataStore => {
      const tasksDataRunner: TasksDataRunner = new TasksDataRunner(
        state.currTaskId,
        state.tasksCollection
      );

      tasksDataRunner.setCurrentTask(action.payload.taskData);

      return {
        ...state,
        currTaskId: tasksDataRunner.taskData.id
      }
    },
    createTask: (state: ITasksDataStore, action: ActionType): ITasksDataStore => {
      const tasksDataRunner: TasksDataRunner = new TasksDataRunner(
        state.currTaskId,
        state.tasksCollection
      );

      tasksDataRunner.createTask(action.payload.taskData);

      return {
        ...state,
        loadKey: state.loadKey + 1,
        currTaskId: action.payload.taskData.id,
        tasksCollection: tasksDataRunner.tasksDataList,
      }
    },
    updateTask: (state: ITasksDataStore, action: ActionType): ITasksDataStore => {
      const tasksDataRunner: TasksDataRunner = new TasksDataRunner(
        state.currTaskId,
        state.tasksCollection
      );

      tasksDataRunner.updateTask(action.payload.taskData);

      return {
        ...state,
        loadKey: state.loadKey + 1,
        currTaskId: action.payload.taskData.id,
        tasksCollection: tasksDataRunner.tasksDataList,
      }
    },
    deleteTask: (state: ITasksDataStore, action: ActionType): ITasksDataStore => {
      const taskToDelId = action.payload.taskData.id;

      const tasksDataRunner: TasksDataRunner = new TasksDataRunner(
        state.currTaskId,
        state.tasksCollection
      );

      tasksDataRunner.deleteTask(action.payload.taskData);

      return {
        ...state,
        loadKey: state.loadKey + 1,
        currTaskId: "",
        deletedTaskId: taskToDelId,
        tasksCollection: tasksDataRunner.tasksDataList,
      }
    },
  },
  extraReducers: (builder) => {
    loadTasksDataReducer(builder);
    saveTasksDataReducer(builder);
  },
});

export const {
  setCurrentTask,
  createTask,
  updateTask,
  deleteTask
}
  = tasksDataSlice.actions;

export {
  ITasksDataStore,
  DispatchType,
  tasksDataSlice
};
