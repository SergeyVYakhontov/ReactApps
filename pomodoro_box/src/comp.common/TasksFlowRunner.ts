import lodash from "lodash";
import { IdType } from "@/types/commonTypes";
import { generateComponentId } from "@/utils/js/generateComponentId";
import { Seconds } from "@/types/TasksDateTime";
import { IDateTimeInfo, getDateTimeInfo } from "@/utils/js/dateTimeFuncs";
import {
  ActionKind,
  FlowStepKind,
  ITasksFlowData,
  newStartIntrv,
  newEndIntrv,
  emptyTasksFlowData
}
  from "@/types/TasksFlowData";
import {
  ICountdownData,
  ITasksFlowStore,
  TasksFlowMapType,
  ITasksFlowItem
} from "@/store/tasksFlowSlice";
import { IAppSettings } from "@/types/appSettings";
import { initialTasksFlowItem } from "@/store/initialStore";

class TasksFlowRunner {
  public constructor(
    appSettings: IAppSettings,
    tasksFlowStore: ITasksFlowStore
  ) {
    this.#taskId = tasksFlowStore.currTaskId;
    this.#appSettings = appSettings;

    this.#tasksFlowMap = lodash.cloneDeep(tasksFlowStore.tasksFlowMap);
    this.#dateTimeInfo = getDateTimeInfo();

    this.AddTasksFlowItemIfNeeded();

    this.#tasksFlowItem = this.#tasksFlowMap[this.#taskId];
    this.#pomodoroNumber = this.#tasksFlowItem.pomodoroNumber;
    this.#flowStepKind = this.#tasksFlowItem.flowStepKind;
    this.#countdownData = this.#tasksFlowItem.countdownData;
    this.#tasksFlowData = this.#tasksFlowItem.tasksFlowData;
  }

  public get tasksFlowMap() {
    const tasksFlowItem = {
      ...this.#tasksFlowItem,
      id: generateComponentId(),
      pomodoroNumber: this.#pomodoroNumber,
      flowStepKind: this.#flowStepKind,
      countdownData: this.#countdownData,
      tasksFlowData: this.#tasksFlowData,
      timerKey: this.#tasksFlowItem.timerKey + 1
    };

    this.#tasksFlowMap[this.#taskId] = tasksFlowItem;

    return this.#tasksFlowMap;
  }

  public get tasksFlowItem(): Readonly<ITasksFlowItem> {
    const tasksFlowItem = {
      ...this.#tasksFlowItem,
      id: generateComponentId(),
      pomodoroNumber: this.#pomodoroNumber,
      flowStepKind: this.#flowStepKind,
      countdownData: this.#countdownData,
      tasksFlowData: this.#tasksFlowData,
      timerKey: this.#tasksFlowItem.timerKey + 1
    };

    return tasksFlowItem;
  }

  public setCurrentTask() {
    this.#countdownData = {
      ...this.#countdownData,
    };
  }

  public startCountdown(): void {
    this.#tasksFlowData.tasksFlowStepList.push(newStartIntrv(
      this.#taskId,
      this.#flowStepKind,
      this.#dateTimeInfo.weekDayNumber,
      ActionKind.start,
      this.#pomodoroNumber,
      this.#dateTimeInfo.timestamp));

    this.#countdownData = {
      ...this.#countdownData,
      isPlaying: true,
      isPaused: false,
      isStarted: true,
      timestamp: this.timestamp,
    }

    this.#tasksFlowData = {
      ...this.#tasksFlowData,
      lastUpdateTime: this.#dateTimeInfo.timestamp,
    }
  }

  public pauseCountdown(): void {
    this.#tasksFlowData.tasksFlowStepList.push(newEndIntrv(
      this.#taskId,
      this.#flowStepKind,
      this.#dateTimeInfo.weekDayNumber,
      ActionKind.stop,
      this.#pomodoroNumber,
      this.#dateTimeInfo.timestamp));

    this.#countdownData = {
      ...this.#countdownData,
      isPlaying: false,
      isPaused: true,
      timestamp: this.timestamp,
      duration: this.duration,
      elapsedTime: this.elapsedTime,
      remainingTime: this.remaningTime
    }

    this.#tasksFlowData = {
      ...this.#tasksFlowData,
      lastUpdateTime: this.#dateTimeInfo.timestamp,
    }
  }

  public continueCountdown(): void {
    this.#tasksFlowData.tasksFlowStepList.push(newStartIntrv(
      this.#taskId,
      this.#flowStepKind,
      this.#dateTimeInfo.weekDayNumber,
      ActionKind.continue,
      this.#pomodoroNumber,
      this.#dateTimeInfo.timestamp));

    this.#countdownData = {
      ...this.#countdownData,
      isPlaying: true,
      isPaused: false,
      timestamp: this.timestamp,
    }

    this.#tasksFlowData = {
      ...this.#tasksFlowData,
      lastUpdateTime: this.#dateTimeInfo.timestamp,
    }
  }

  public nextFlowStep(): void {
    const newData: ITasksFlowData = {
      id: this.#taskId,
      taskId: this.#taskId,
      lastUpdateTime: this.#dateTimeInfo.timestamp,
      tasksFlowStepList: this.#tasksFlowData.tasksFlowStepList
    };

    switch (this.#flowStepKind) {
      case FlowStepKind.pomodoro: {
        this.#flowStepKind = FlowStepKind.smallBreak;
        break;
      }
      case FlowStepKind.smallBreak: {
        this.#flowStepKind = FlowStepKind.bigBreak;
        break;
      }
      case FlowStepKind.bigBreak: {
        this.#flowStepKind = FlowStepKind.pomodoro;
        this.#pomodoroNumber = this.#pomodoroNumber + 1;
        break;
      }
    }

    this.#countdownData = {
      ...this.#countdownData,
      isPlaying: false,
      isPaused: false,
      isStarted: false,
      timestamp: this.timestamp,
      duration: this.duration,
      elapsedTime: 0,
      remainingTime: this.duration * 1000
    };

    this.#tasksFlowData = newData;

    this.#tasksFlowItem = {
      ...this.#tasksFlowItem,
      tasksFlowData: newData
    };
  }

  public stopCountdown(): void {
    this.#tasksFlowData.tasksFlowStepList.push(newEndIntrv(
      this.#taskId,
      this.#flowStepKind,
      this.#dateTimeInfo.weekDayNumber,
      ActionKind.stop,
      this.#pomodoroNumber,
      this.#dateTimeInfo.timestamp));

    this.nextFlowStep();
  }

  public flowStepDone() {
    this.#tasksFlowData.tasksFlowStepList.push(newEndIntrv(
      this.#taskId,
      this.#flowStepKind,
      this.#dateTimeInfo.weekDayNumber,
      ActionKind.done,
      this.#pomodoroNumber,
      this.#dateTimeInfo.timestamp));

    this.nextFlowStep();
  }

  public setFlowKind(flowStepKind: FlowStepKind) {
    this.#flowStepKind = flowStepKind;

    this.#countdownData = {
      ...this.#countdownData,
      isPlaying: false,
      isPaused: false,
      isStarted: false,
    };

    this.#tasksFlowData = {
      ...this.#tasksFlowData,
      lastUpdateTime: this.#dateTimeInfo.timestamp,
    }
  }

  private AddTasksFlowItemIfNeeded(): void {
    const tasksFlowItem = this.#tasksFlowMap[this.#taskId];

    if (lodash.isUndefined(tasksFlowItem)) {
      let newData: ITasksFlowItem = initialTasksFlowItem();

      newData = {
        ...newData,
        countdownData: {
          ...newData.countdownData,
          timestamp: this.timestamp,
          duration: this.duration,
          elapsedTime: 0,
          remainingTime: this.duration * 1000
        }
      };

      this.#tasksFlowMap[this.#taskId] = newData;
    }
  }

  private get duration(): Seconds {
    switch (this.#flowStepKind) {
      case FlowStepKind.pomodoro: {
        return this.#appSettings.pomodoroDuration;
      }
      case FlowStepKind.smallBreak: {
        return this.#appSettings.smallBreakDuration;
      }
      case FlowStepKind.bigBreak: {
        return this.#appSettings.bigBreakDuration;
      }
      default: throw new Error();
    }
  }

  private get timestamp(): Seconds {
    return this.#dateTimeInfo.timestamp;
  }

  private get elapsedTime(): Seconds {
    return this.#countdownData.elapsedTime +
      (this.#dateTimeInfo.timestamp -
        this.#countdownData.timestamp);
  }

  private get remaningTime(): Seconds {
    return this.duration * 1000 - this.elapsedTime;
  }

  #taskId: IdType;
  #appSettings: IAppSettings;
  #tasksFlowMap: TasksFlowMapType;
  #tasksFlowItem: Readonly<ITasksFlowItem>;
  #pomodoroNumber: number;
  #flowStepKind: FlowStepKind = FlowStepKind.pomodoro;
  #tasksFlowData: ITasksFlowData = emptyTasksFlowData();
  #dateTimeInfo: IDateTimeInfo;
  #countdownData: Readonly<ICountdownData>;
}

export { TasksFlowRunner };
