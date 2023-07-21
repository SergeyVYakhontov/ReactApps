import lodash from "lodash";
import * as dateTimeFuncs from "@/utils/js/dateTimeFuncs";
import { tiskIntervals } from "@/utils/js/tiskIntervals";
import { DayStatList } from "@/types/TasksFlowStatistics";

function computeTicks(dayStatList: DayStatList) {
  const maxValue = lodash.max(
    dayStatList.map(
      t => Math.max(t.workTime, t.pauseTime))
  );

  if (lodash.isUndefined(maxValue)) {
    return [];
  }

  if (maxValue <= dateTimeFuncs.secondsInMinute) {
    return tiskIntervals(maxValue, (maxValue <= 10 ? 1 : 10));

  } else if (maxValue <= dateTimeFuncs.secondsInHour) {
    return tiskIntervals(maxValue,
      (maxValue <= 10 * dateTimeFuncs.secondsInMinute ?
        dateTimeFuncs.secondsInMinute :
        10 * dateTimeFuncs.secondsInMinute));
  }
  else {
    return tiskIntervals(maxValue, dateTimeFuncs.secondsInHour);
  }
}

export { computeTicks };
