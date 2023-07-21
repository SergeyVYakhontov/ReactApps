import { Seconds, TimeInterval } from "@/types/TasksDateTime";
import * as dayjs from "@/utils/js/dayjs.js";
import { daysInWeek } from "@/utils/js/dateTimeFuncs";

interface ITasksFlowFilter {
  mainIntrl: TimeInterval;
  timeMarks: TimeInterval[];
}

const dayIntrvl = (date: Date): TimeInterval => {
  return {
    from: dayjs.dayStart(date, 0).valueOf(),
    to: dayjs.dayEnd(date, 0).valueOf()
  }
};

const weekIntrv = (date: Date, delta: number): TimeInterval => ({
  from: dayjs.weekStart(date, delta).valueOf(),
  to: dayjs.weekEnd(date, delta).valueOf()
});

const dayTimeMarks = (date: Date): TimeInterval[] => {
  const intrvl = dayIntrvl(date);

  return [
    {
      from: intrvl.from,
      to: intrvl.to
    }
  ];
};

const weekTimeMarks = (date: Date, delta: number): TimeInterval[] => {
  const timeMarks: TimeInterval[] = [];

  const weekEnd = dayjs.weekEnd(date, delta).toDate();

  for (let i = daysInWeek-1; i >= 0; i--) {
    const from = dayjs.dayStart(weekEnd, i).valueOf();
    const to = dayjs.dayEnd(weekEnd, i).valueOf();

    timeMarks.push({ from: from, to: to });
  }

  return timeMarks;
};

const eventInIntrv = (tasksFlowFilter: ITasksFlowFilter, eventTime: Seconds) => {
  return (
    tasksFlowFilter.mainIntrl.from <= eventTime &&
    eventTime <= tasksFlowFilter.mainIntrl.to
  );
};

export {
  ITasksFlowFilter,
  dayIntrvl,
  weekIntrv,
  dayTimeMarks,
  weekTimeMarks,
  eventInIntrv
};
