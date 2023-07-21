import { OrderedMap } from "immutable";
import * as dayjs from "@/utils/js/dayjs.js";
import { IntrvPointKind } from "@/types/TasksDateTime";
import * as tasksFlowData from "@/types/TasksFlowData";
import { ITasksFlowFilter } from "@/types/TasksFlowFilter";

class TimeIntrvsAppender {
  constructor(
    tasksFlowSteps: tasksFlowData.TasksFlowStepList,
    tasksFlowFilter: ITasksFlowFilter
  ) {
    this.#tasksFlowSteps = tasksFlowSteps;
    this.#tasksFlowFilter = tasksFlowFilter;
  }

  public ProcessedIntrvs(): tasksFlowData.TasksFlowStepList {
    this.CreateIntrvsSet();
    this.AppendIntrvs();

    return this.#intrvlsMap.toIndexedSeq().toArray();
  }

  private FlowStepKey(t: tasksFlowData.TasksFlowStep) {
    const kindNumber = (tasksFlowData.isEndIntrv(t) ? 0 : 1);

    return `${t.eventTime}_${kindNumber}`;
  }

  private CreateIntrvsSet() {
    this.#tasksFlowSteps.forEach(t => {
      this.#intrvlsMap = this.#intrvlsMap.set(this.FlowStepKey(t), t);
    });
  }

  private AppendIntrvs() {
    this.#tasksFlowFilter.timeMarks.forEach(t => {
      const startStep: tasksFlowData.TasksFlowStep = {
        currTaskId: "",
        flowStepKind: 0,
        weekDay: dayjs.weekDay(t.from),
        actionKind: tasksFlowData.ActionKind.start,
        pomodoroNumber: 0,
        intrvPointKind: IntrvPointKind.start,
        eventTime: t.from,
        timeMark: true
      };

      const endStep: tasksFlowData.TasksFlowStep = {
        currTaskId: "",
        flowStepKind: 0,
        weekDay: dayjs.weekDay(t.to),
        actionKind: tasksFlowData.ActionKind.stop,
        pomodoroNumber: 0,
        intrvPointKind: IntrvPointKind.end,
        eventTime: t.to,
        timeMark: true
      };

      this.#intrvlsMap = this.#intrvlsMap.set(this.FlowStepKey(startStep), startStep);
      this.#intrvlsMap = this.#intrvlsMap.set(this.FlowStepKey(endStep), endStep);

      this.#intrvlsMap = this.#intrvlsMap.sortBy(t => this.FlowStepKey(t));
    });
  }

  #tasksFlowSteps: tasksFlowData.TasksFlowStepList;
  #tasksFlowFilter: ITasksFlowFilter;
  #intrvlsMap = OrderedMap<string, tasksFlowData.TasksFlowStep>();
}

export { TimeIntrvsAppender };