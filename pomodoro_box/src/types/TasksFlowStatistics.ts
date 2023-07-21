import { Seconds } from "@/types/TasksDateTime";

interface IDayStatistics {
  weekDay: number;
  dayLabel: string;
  pomodoroCount: number;
  workTime: Seconds;
  pauseTime: Seconds;
  stopCount: Seconds;
  focusRatio: number;
}

interface ITasksStatistics {
  pomodoroCount: number;
  workTime: Seconds;
  pauseTime: Seconds;
  stopCount: Seconds;
  focusRatio: number;
}

type DayStatList = IDayStatistics[];

const emptyDayStatistics = (): IDayStatistics => ({
  weekDay: 0,
  dayLabel: "",
  pomodoroCount: 0,
  workTime: 0,
  pauseTime: 0,
  stopCount: 0,
  focusRatio: 0,
});

const emptyTasksStatistics = (): ITasksStatistics => ({
  pomodoroCount: 0,
  workTime: 0,
  pauseTime: 0,
  stopCount: 0,
  focusRatio: 0,
});

export {
  IDayStatistics,
  ITasksStatistics,
  DayStatList,
  emptyDayStatistics,
  emptyTasksStatistics
};
