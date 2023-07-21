import { IdType } from "@/types/commonTypes";
import { generateComponentId } from "@/utils/js/generateComponentId";
import { ICollectionItem } from "@/types/ICollectionItem";
import { IntrvPointKind, Seconds, TimeInterval } from "@/types/TasksDateTime";

enum FlowStepKind {
  pomodoro,
  smallBreak,
  bigBreak
}

enum ActionKind {
  start,
  stop,
  continue,
  skip,
  done
}

interface TasksFlowStep {
  currTaskId: IdType;
  flowStepKind: FlowStepKind;
  weekDay: number;
  actionKind: ActionKind;
  pomodoroNumber: number,
  intrvPointKind: IntrvPointKind;
  eventTime: Seconds;
  timeMark: boolean;
}

type TasksFlowStepList = TasksFlowStep[];

const prevFlowStepKind = (flowStepKind: FlowStepKind) => {
  switch (flowStepKind) {
    case FlowStepKind.pomodoro: {
      return FlowStepKind.bigBreak;
    }
    case FlowStepKind.smallBreak: {
      return FlowStepKind.pomodoro;
    }
    case FlowStepKind.bigBreak: {
      return FlowStepKind.smallBreak;
    }
  }

  throw new Error();
}

interface TasksFlowIntrv {
  flowStepKind: FlowStepKind;
  weekDay: number;
  actionKind: ActionKind;
  pomodoroNumber: number,
  timeInterval: TimeInterval;
  eventTime: Seconds;
  stopcount: number;
}

type TasksFlowIntrvList = TasksFlowIntrv[];

const isStartIntrv = (t: TasksFlowStep) =>
  (t.actionKind === ActionKind.start ||
    t.actionKind === ActionKind.continue) &&
  t.intrvPointKind === IntrvPointKind.start;

const isEndIntrv = (t: TasksFlowStep) =>
  (t.actionKind === ActionKind.stop ||
    t.actionKind === ActionKind.done)
  &&
  t.intrvPointKind === IntrvPointKind.end;

const newStartIntrv = (
  currTaskId: IdType,
  flowStepKind: FlowStepKind,
  weekDay: number,
  actionKind: ActionKind,
  pomodoroNumber: number,
  eventTime: Seconds
): TasksFlowStep => ({
  currTaskId: currTaskId,
  flowStepKind: flowStepKind,
  weekDay: weekDay,
  actionKind: actionKind,
  pomodoroNumber: pomodoroNumber,
  intrvPointKind: IntrvPointKind.start,
  eventTime: eventTime,
  timeMark: false
});

const newEndIntrv = (
  currTaskId: IdType,
  flowStepKind: FlowStepKind,
  weekDay: number,
  actionKind: ActionKind,
  pomodoroNumber: number,
  eventTime: Seconds
): TasksFlowStep => ({
  currTaskId: currTaskId,
  flowStepKind: flowStepKind,
  weekDay: weekDay,
  actionKind: actionKind,
  pomodoroNumber: pomodoroNumber,
  intrvPointKind: IntrvPointKind.end,
  eventTime: eventTime,
  timeMark: false
});

interface ITasksFlowData extends ICollectionItem {
  taskId: IdType;
  lastUpdateTime?: Seconds;
  tasksFlowStepList: TasksFlowStepList;
}

type TasksFlowDataList = ITasksFlowData[];

const emptyTasksFlowData = (): ITasksFlowData => ({
  id: generateComponentId(),
  taskId: "",
  tasksFlowStepList: []
});

const emptyTasksFlowStepList = (): TasksFlowStep[] => [];

export {
  ActionKind,
  FlowStepKind,
  prevFlowStepKind,
  isStartIntrv,
  isEndIntrv,
  newStartIntrv,
  newEndIntrv,
  TasksFlowStep,
  TasksFlowStepList,
  ITasksFlowData,
  TasksFlowDataList,
  TasksFlowIntrv,
  TasksFlowIntrvList,
  emptyTasksFlowData,
  emptyTasksFlowStepList
};
