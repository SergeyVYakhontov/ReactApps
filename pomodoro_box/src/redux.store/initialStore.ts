import { generateComponentId } from "@/utils/js/generateComponentId";
import {
  FlowStepKind,
  emptyTasksFlowData
} from "@/types/TasksFlowData";
import { AsyncStoreStatus } from "./asyncStoreStatus";
import { defaultAppSettings } from "@/store/defaultAppSettings";
import { IAppSettingsStore } from "./appSettingsSlice";
import { ITasksFlowStore } from "@/store/tasksFlowSlice";
import { WSelectOptionEnum } from "@/types/TasksDateTime";
import { ICountdownData, ITasksFlowItem } from "@/store/tasksFlowSlice";

const initialAppSettingsStore = (): IAppSettingsStore => ({
  appSettings: defaultAppSettings(),
  storeStatus: AsyncStoreStatus.idle,
  errorMessage: "",
  modalIsOpened: false
});

const initialCountdown = (): ICountdownData => ({
  isPlaying: false,
  isStarted: false,
  isPaused: false,
  isStopped: false,
  duration: 0,
  timestamp: 0,
  elapsedTime: 0,
  remainingTime: 0
});

const initialTasksFlowItem = (): ITasksFlowItem => ({
  id: generateComponentId(),
  pomodoroNumber: 0,
  flowStepKind: FlowStepKind.pomodoro,
  tasksFlowData: emptyTasksFlowData(),
  countdownData: initialCountdown(),
  timerKey: 0,
});

const initialTasksFlowStore = (): ITasksFlowStore => ({
  loadKey: 0,
  id: generateComponentId(),
  currTaskId: "",
  tasksFlowMap: {},
  tasksFlowItem: initialTasksFlowItem(),
  notifIsOpened: false,
  weekToFilter: WSelectOptionEnum.currWeek,
  storeStatus: AsyncStoreStatus.idle,
});

export {
  initialAppSettingsStore,
  initialCountdown,
  initialTasksFlowItem,
  initialTasksFlowStore
};