import { ThunkAction, ThunkDispatch } from "redux-thunk";
import lodash from "lodash";
import voca from "voca";
import {
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { IdType } from "@/types/commonTypes";
import { Seconds } from "@/types/TasksDateTime";
import { ActionNames } from "./actionNames";
import { AsyncStoreStatus } from "./asyncStoreStatus";
import { IAppSettings } from "@/types/appSettings";
import {
  FlowStepKind,
  ITasksFlowData
} from "@/types/TasksFlowData";
import { WSelectOptionEnum } from "@/types/TasksDateTime";
import { defaultAppSettings } from "@/store/defaultAppSettings";
import { TasksFlowRunner } from "@/components/TasksFlowRunner";
import { ICollectionItem } from "@/types/ICollectionItem";
import { initialTasksFlowStore } from "@/store/initialStore";
import { loadTasksFlowReducer, saveTasksFlowReducer } from "./tasksFlowReducers";

interface ICountdownData {
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isStarted: boolean;
  duration: Seconds;
  timestamp: Seconds;
  elapsedTime: Seconds
  remainingTime: Seconds;
}

interface ITasksFlowItem extends ICollectionItem {
  pomodoroNumber: number,
  flowStepKind: FlowStepKind;
  tasksFlowData: ITasksFlowData;
  countdownData: Readonly<ICountdownData>;
  timerKey: number;
}

type TasksFlowMapType = { [key: IdType]: Readonly<ITasksFlowItem> };

interface ITasksFlowStore extends ICollectionItem {
  loadKey: number,
  currTaskId: IdType;
  deletedTaskId?: IdType;
  tasksFlowMap: TasksFlowMapType;
  tasksFlowItem: Readonly<ITasksFlowItem>;
  notifIsOpened: boolean;
  weekToFilter: WSelectOptionEnum;
  storeStatus: AsyncStoreStatus;
  errorMessage?: string;
}

interface ActionPayloadData {
  appSettings: IAppSettings;
  flowStepKind: FlowStepKind;
  weekToFilter: WSelectOptionEnum;
  taskId: IdType;
  deletedTaskId: IdType;
}

type ActionType = PayloadAction<Readonly<ActionPayloadData>, string>;

type ThunkActionType = ThunkAction<
  void,
  ITasksFlowStore,
  void,
  ActionType
>;

type DispatchType = ThunkDispatch<ITasksFlowStore, void, ActionType>;

type DispatchTypeVoid = ThunkDispatch<ITasksFlowStore, void, PayloadAction<void, string>>;

const emptyPayloadData = (): ActionPayloadData => ({
  appSettings: defaultAppSettings(),
  flowStepKind: FlowStepKind.pomodoro,
  weekToFilter: WSelectOptionEnum.currWeek,
  taskId: "",
  deletedTaskId: ""
});

const tasksFlowSlice = createSlice({
  name: ActionNames.TASKS_FLOW,
  initialState: initialTasksFlowStore(),

  reducers: {
    setCurrentTask: (state: ITasksFlowStore, action: ActionType): ITasksFlowStore => {
      const currTaskId = action.payload.taskId;

      if (voca.isEmpty(currTaskId)) {
        return {
          ...state,
          currTaskId: currTaskId
        };
      }

      const tasksFlowRunner: TasksFlowRunner = new TasksFlowRunner(
        action.payload.appSettings,
        {
          ...state,
          currTaskId: currTaskId
        });

      tasksFlowRunner.setCurrentTask();

      return {
        ...state,
        currTaskId: currTaskId,
        tasksFlowMap: tasksFlowRunner.tasksFlowMap,
        tasksFlowItem: tasksFlowRunner.tasksFlowItem
      };
    },
    deleteTaskFlow: (state: ITasksFlowStore, action: ActionType): ITasksFlowStore => {
      const currTaskId = action.payload.taskId;
      const deletedTaskId = action.payload.deletedTaskId;

      const tasksFlowMap = lodash.cloneDeep(state.tasksFlowMap);
      delete tasksFlowMap[deletedTaskId];

      return {
        ...state,
        loadKey: state.loadKey + 1,
        currTaskId: currTaskId,
        tasksFlowMap: tasksFlowMap
      };
    },
    startCountdown: (state: ITasksFlowStore, action: ActionType): ITasksFlowStore => {
      const tasksFlowRunner: TasksFlowRunner = new TasksFlowRunner(
        action.payload.appSettings,
        state);

      tasksFlowRunner.startCountdown();

      return {
        ...state,
        loadKey: state.loadKey + 1,
        tasksFlowMap: tasksFlowRunner.tasksFlowMap,
        tasksFlowItem: tasksFlowRunner.tasksFlowItem
      };
    },
    stopCountdown: (state: ITasksFlowStore, action: ActionType): ITasksFlowStore => {
      const tasksFlowRunner: TasksFlowRunner = new TasksFlowRunner(
        action.payload.appSettings,
        state);

      tasksFlowRunner.stopCountdown();

      return {
        ...state,
        loadKey: state.loadKey + 1,
        tasksFlowMap: tasksFlowRunner.tasksFlowMap,
        tasksFlowItem: tasksFlowRunner.tasksFlowItem
      };
    },
    pauseCountdown: (state: ITasksFlowStore, action: ActionType): ITasksFlowStore => {
      const tasksFlowRunner: TasksFlowRunner = new TasksFlowRunner(
        action.payload.appSettings,
        state);

      tasksFlowRunner.pauseCountdown();

      return {
        ...state,
        loadKey: state.loadKey + 1,
        tasksFlowMap: tasksFlowRunner.tasksFlowMap,
        tasksFlowItem: tasksFlowRunner.tasksFlowItem
      };
    },
    continueCountdown: (state: ITasksFlowStore, action: ActionType): ITasksFlowStore => {
      const tasksFlowRunner: TasksFlowRunner = new TasksFlowRunner(
        action.payload.appSettings,
        state);

      tasksFlowRunner.continueCountdown();

      return {
        ...state,
        loadKey: state.loadKey + 1,
        tasksFlowMap: tasksFlowRunner.tasksFlowMap,
        tasksFlowItem: tasksFlowRunner.tasksFlowItem
      };
    },
    nextFlowStep: (state: ITasksFlowStore, action: ActionType): ITasksFlowStore => {
      const tasksFlowRunner: TasksFlowRunner = new TasksFlowRunner(
        action.payload.appSettings,
        state);

      tasksFlowRunner.nextFlowStep();

      return {
        ...state,
        loadKey: state.loadKey + 1,
        tasksFlowMap: tasksFlowRunner.tasksFlowMap,
        tasksFlowItem: tasksFlowRunner.tasksFlowItem
      };
    },
    flowStepDone: (state: ITasksFlowStore, action: ActionType): ITasksFlowStore => {
      const tasksFlowRunner: TasksFlowRunner = new TasksFlowRunner(
        action.payload.appSettings,
        state);

      tasksFlowRunner.flowStepDone();

      return {
        ...state,
        loadKey: state.loadKey + 1,
        tasksFlowMap: tasksFlowRunner.tasksFlowMap,
        tasksFlowItem: tasksFlowRunner.tasksFlowItem
      };
    },
    setFlowKind: (state: ITasksFlowStore, action: ActionType): ITasksFlowStore => {
      const tasksFlowRunner: TasksFlowRunner = new TasksFlowRunner(
        action.payload.appSettings,
        {
          ...state,
        });

      tasksFlowRunner.setFlowKind(action.payload.flowStepKind);

      return {
        ...state,
        loadKey: state.loadKey + 1,
        tasksFlowMap: tasksFlowRunner.tasksFlowMap,
        tasksFlowItem: tasksFlowRunner.tasksFlowItem
      }
    },
    setWeekToFilter: (state: ITasksFlowStore, action: ActionType) => {
      return {
        ...state,
        loadKey: state.loadKey + 1,
        weekToFilter: action.payload.weekToFilter
      }
    },
    openNotification: (state: ITasksFlowStore) => {
      return {
        ...state,
        notifIsOpened: true
      }
    },
    closeNotification: (state: ITasksFlowStore) => {
      return {
        ...state,
        notifIsOpened: false
      }
    },
  },
  extraReducers: (builder) => {
    loadTasksFlowReducer(builder);
    saveTasksFlowReducer(builder);
  },
});

export const {
  setCurrentTask,
  deleteTaskFlow,
  startCountdown,
  stopCountdown,
  pauseCountdown,
  continueCountdown,
  nextFlowStep,
  flowStepDone,
  setFlowKind,
  setWeekToFilter,
  openNotification,
  closeNotification
}
  = tasksFlowSlice.actions;

export {
  ITasksFlowItem,
  TasksFlowMapType,
  ICountdownData,
  ITasksFlowStore,
  ThunkActionType,
  DispatchType,
  DispatchTypeVoid,
  emptyPayloadData,
  tasksFlowSlice
};
