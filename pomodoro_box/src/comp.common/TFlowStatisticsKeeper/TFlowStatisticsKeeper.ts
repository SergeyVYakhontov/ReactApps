import lodash from "lodash";
import {
  IDayStatistics,
  ITasksStatistics,
  DayStatList,
  emptyDayStatistics,
  emptyTasksStatistics
} from "@/types/TasksFlowStatistics";
import { arrayRotateLeft } from "@/utils/js/arrayRotateLeft";
import { TasksFlowMapType } from "@/store/tasksFlowSlice";
import * as dayjs from "@/utils/js/dayjs.js";
import {
  IDateTimeInfo,
  getDateTimeInfo,
  millisecsToSecs
} from "@/utils/js/dateTimeFuncs";
import { WSelectOptionEnum, IntrvPointKind } from "@/types/TasksDateTime";
import * as tasksFlowData from "@/types/TasksFlowData";
import { ITasksFlowFilter, eventInIntrv } from "@/types/TasksFlowFilter";
import { TimeIntrvsAppender } from "./TimeIntrvsAppender";

class TFlowStatisticsKeeper {
  public constructor(
    tasksFlowMap: TasksFlowMapType = {},
    weekToFilter: WSelectOptionEnum
  ) {
    this.#weekToFilter = weekToFilter;
    this.#tasksFlowMap = lodash.clone(tasksFlowMap);

    this.#dateTimeInfo = getDateTimeInfo();
  }

  public get dayStatData(): IDayStatistics {
    const statData = emptyDayStatistics();
    this.selectTasksFlowStepsAll();

    const tasksFlowFilter: ITasksFlowFilter = {
      mainIntrl: this.#dateTimeInfo.currDayIntrvl,
      timeMarks: this.#dateTimeInfo.currDayMarks
    }

    const timeIntrvsAppender = new TimeIntrvsAppender(
      this.#tasksFlowStepsAll,
      tasksFlowFilter
    );

    this.#tasksFlowStepsAll = timeIntrvsAppender.ProcessedIntrvs();
    this.selectByFilter(tasksFlowFilter);

    this.countPomidoros();

    const workStepList = this.selectWorkSteps();
    const wtIntrvList = this.stepListToWTIntrvList(workStepList);
    const workTime = this.computeIntrvListTime(wtIntrvList);

    statData.pomodoroCount = this.#pomodoros.size;
    statData.workTime = workTime;
    statData.pauseTime = 0;
    statData.stopCount = 0;
    statData.focusRatio = 0;

    return statData;
  }

  public get totalStatData(): ITasksStatistics {
    const statData = emptyTasksStatistics();

    this.selectTasksFlowStepsAll();
    this.#flowStepsFiltered = this.#tasksFlowStepsAll;

    this.countPomidoros();

    const workStepList = this.selectWorkSteps();
    const fpStepList = this.selectFPStepList(workStepList);

    const wtIntrvList = this.stepListToWTIntrvList(workStepList);
    const ptIntrvList = this.stepListToPTIntrvList(workStepList);
    const fpIntrvList = this.stepListToWTIntrvList(fpStepList);

    const workTime = this.computeIntrvListTime(wtIntrvList);
    const fpTime = this.computeIntrvListTime(fpIntrvList);

    const focusRation = (workTime === 0 ? 0 : Math.round((fpTime * 100) / workTime));

    const pauseTime = this.computeIntrvListTime(ptIntrvList);
    const stopCount = this.computeStopCount(workStepList);

    statData.pomodoroCount = 0;
    statData.workTime = 0;
    statData.pauseTime = pauseTime;
    statData.stopCount = stopCount;
    statData.focusRatio = focusRation;

    return statData;
  }

  public get weekStatList() {
    this.selectTasksFlowStepsAll();

    const tasksFlowFilter: ITasksFlowFilter = {
      mainIntrl: this.#dateTimeInfo.weekIntrvl[this.#weekToFilter],
      timeMarks: this.#dateTimeInfo.weekMarks[this.#weekToFilter]
    }

    const timeIntrvsAppender = new TimeIntrvsAppender(
      this.#tasksFlowStepsAll,
      tasksFlowFilter
    );

    this.#tasksFlowStepsAll = timeIntrvsAppender.ProcessedIntrvs();
    this.selectByFilter(tasksFlowFilter);

    this.countPomidoros();

    const workStepList = this.selectWorkSteps();
    const wtIntrvList = this.stepListToWTIntrvList(workStepList);
    const ptIntrvList = this.stepListToPTIntrvList(workStepList);

    this.initWeekStatList();
    this.FillStatList(wtIntrvList, ptIntrvList);

    this.#dayStatList = this.statListGroupBy(this.#dayStatList);
    this.#dayStatList = arrayRotateLeft(this.#dayStatList);

    return this.#dayStatList;
  }

  private pomodoroId(t: tasksFlowData.TasksFlowStep) {
    return `${t.currTaskId}_${t.pomodoroNumber}`;
  }

  private selectTasksFlowStepsAll() {
    this.#tasksFlowStepsAll = [];

    for (const [key, value] of Object.entries(this.#tasksFlowMap)) {
      this.#tasksFlowStepsAll = this.#tasksFlowStepsAll.concat(
        value.tasksFlowData.tasksFlowStepList.map(t =>
          ({ ...t, currTaskId: key })));
    }
  }

  private selectByFilter(tasksFlowFilter: ITasksFlowFilter) {
    this.#flowStepsFiltered = [];

    this.#tasksFlowStepsAll.forEach(t => {
      if (eventInIntrv(tasksFlowFilter, t.eventTime)) {
        this.#flowStepsFiltered.push(t);
      }
    });
  }

  private countPomidoros() {
    this.#pomodoros = new Set();
    this.#pomFinished = new Set();

    this.#flowStepsFiltered.forEach(t => {

      if (!t.timeMark) {
        this.#pomodoros.add(this.pomodoroId(t));
      }

      if (
        !t.timeMark &&
        t.actionKind === tasksFlowData.ActionKind.done
      ) {
        this.#pomFinished.add(this.pomodoroId(t));
      }
    });
  }

  private selectWorkSteps(): tasksFlowData.TasksFlowStepList {
    return this.#flowStepsFiltered.filter(t =>
      t.flowStepKind === tasksFlowData.FlowStepKind.pomodoro &&
      (tasksFlowData.isStartIntrv(t) ||
        tasksFlowData.isEndIntrv(t))
    );
  }

  private selectFPStepList(stepList: tasksFlowData.TasksFlowStepList):
    tasksFlowData.TasksFlowStepList {

    const newStepList: tasksFlowData.TasksFlowStepList =
      stepList.filter(t =>
        this.#pomFinished.has(this.pomodoroId(t))
      );

    return newStepList;
  }

  private stepListToWTIntrvList(stepList: tasksFlowData.TasksFlowStepList):
    tasksFlowData.TasksFlowIntrvList {

    if (lodash.isEmpty(stepList)) {
      return [];
    }

    const intrvList: tasksFlowData.TasksFlowIntrvList = [];
    let prevStep = stepList[0];

    stepList.forEach(t => {
      if (
        tasksFlowData.isStartIntrv(prevStep) &&
        tasksFlowData.isEndIntrv(t) &&
        !(prevStep.timeMark && t.timeMark)
       ) {
        const toCopy = (t.timeMark ? t : prevStep);

        const intrv: tasksFlowData.TasksFlowIntrv = {
          flowStepKind: toCopy.flowStepKind,
          weekDay: toCopy.weekDay,
          actionKind: toCopy.actionKind,
          pomodoroNumber: toCopy.pomodoroNumber,
          timeInterval: { from: prevStep.eventTime, to: t.eventTime },
          eventTime: t.eventTime,
          stopcount: Number(tasksFlowData.isEndIntrv(t) && !t.timeMark)
        };

        intrvList.push(intrv);
      }

      prevStep = t;
    });

    return intrvList;
  }

  private stepListToPTIntrvList(stepList: tasksFlowData.TasksFlowStepList):
    tasksFlowData.TasksFlowIntrvList {

    if (lodash.isEmpty(stepList)) {
      return [];
    }

    const stepListToProcess = lodash.clone(stepList);
    stepListToProcess.shift();

    const intrvList: tasksFlowData.TasksFlowIntrvList = [];
    let prevStep = stepListToProcess[0];

    stepListToProcess.forEach(t => {
      if (
        tasksFlowData.isEndIntrv(prevStep) &&
        tasksFlowData.isStartIntrv(t) &&
        !(prevStep.timeMark && t.timeMark) &&
        (prevStep.pomodoroNumber === t.pomodoroNumber)
      ) {
        const toCopy = (t.timeMark ? prevStep : t);

        const intrv: tasksFlowData.TasksFlowIntrv = {
          flowStepKind: toCopy.flowStepKind,
          weekDay: toCopy.weekDay,
          actionKind: toCopy.actionKind,
          pomodoroNumber: toCopy.pomodoroNumber,
          timeInterval: { from: prevStep.eventTime, to: t.eventTime },
          eventTime: t.eventTime,
          stopcount: Number(tasksFlowData.isEndIntrv(t) && !t.timeMark)
        };

        intrvList.push(intrv);
      }

      prevStep = t;
    });

    return intrvList;
  }

  private computeIntrvListTime(intrvList: tasksFlowData.TasksFlowIntrvList): number {
    let intrvsTime = 0;

    intrvList.forEach(t => {
      intrvsTime += millisecsToSecs(t.timeInterval.to - t.timeInterval.from);
    });

    return intrvsTime;
  }

  private computeStopCount(workStepList: tasksFlowData.TasksFlowStepList): number {
    return workStepList.filter(t =>
      t.actionKind === tasksFlowData.ActionKind.stop &&
      t.intrvPointKind === IntrvPointKind.end
    ).length;
  }

  private initWeekStatList() {
    const weekDaysCount = dayjs.weekdaysShort.length;

    const tasksFlowFilter: ITasksFlowFilter = {
      mainIntrl: this.#dateTimeInfo.weekIntrvl[this.#weekToFilter],
      timeMarks: []
    }

    this.selectByFilter(tasksFlowFilter);
    this.#dayStatList = Array(weekDaysCount);

    for (let i = 0; i < weekDaysCount; i++) {
      this.#dayStatList[i] = emptyDayStatistics();
      this.#dayStatList[i].dayLabel = dayjs.weekdaysShort[i];
      this.#dayStatList[i].weekDay = i;

      this.#dayStatList[i].pomodoroCount = 0;
      this.#dayStatList[i].workTime = 0;
      this.#dayStatList[i].pauseTime = 0;
      this.#dayStatList[i].stopCount = 0;
      this.#dayStatList[i].focusRatio = 0;
    }
  }

  private FillStatList(
    wtIntrvList: tasksFlowData.TasksFlowIntrvList,
    ptIntrvList: tasksFlowData.TasksFlowIntrvList
  ) {

    wtIntrvList.forEach(t => {
      const dayStat: IDayStatistics = {
        dayLabel: dayjs.weekdaysShort[t.weekDay],
        weekDay: t.weekDay,
        pomodoroCount: 0,
        workTime: millisecsToSecs(t.timeInterval.to - t.timeInterval.from),
        pauseTime: 0,
        stopCount: t.stopcount,
        focusRatio: 0
      };

      this.#dayStatList.push(dayStat);
    });

    ptIntrvList.forEach(t => {
      const dayStat: IDayStatistics = {
        dayLabel: dayjs.weekdaysShort[t.weekDay],
        weekDay: t.weekDay,
        pomodoroCount: 0,
        workTime: 0,
        pauseTime: millisecsToSecs(t.timeInterval.to - t.timeInterval.from),
        stopCount: 0,
        focusRatio: 0
      };

      this.#dayStatList.push(dayStat);
    });
  }

  private statListGroupBy(dayStatList: DayStatList): DayStatList {
    const statListGroupped = lodash.groupBy(dayStatList, (t) => t.weekDay);
    const weekStatList: IDayStatistics[] = [];

    lodash.forOwn(statListGroupped, (value: DayStatList) => {
      const dayStat: IDayStatistics = emptyDayStatistics();

      dayStat.workTime = lodash.sum(value.map(t => t.workTime));
      dayStat.pauseTime = lodash.sum(value.map(t => t.pauseTime));
      dayStat.stopCount = lodash.sum(value.map(t => t.stopCount));

      dayStat.dayLabel = value[0].dayLabel;

      weekStatList.push(dayStat);
    });

    return weekStatList;
  }

  #tasksFlowMap: TasksFlowMapType;
  #weekToFilter: WSelectOptionEnum;
  #dayStatList: DayStatList = [];
  #dateTimeInfo: IDateTimeInfo;

  #tasksFlowStepsAll: tasksFlowData.TasksFlowStepList = [];
  #flowStepsFiltered: tasksFlowData.TasksFlowStepList = [];
  #pomodoros: Set<string> = new Set();
  #pomFinished: Set<string> = new Set();
}

export { TFlowStatisticsKeeper };