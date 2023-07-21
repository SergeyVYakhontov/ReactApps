import { Seconds, TimeInterval } from "@/types/TasksDateTime";
import { hoursRepr } from "./itemsRepr";
import { IDateTimeInfo } from "@/types/dateTimeTypes";
import { WSelectOptionEnum } from "@/types/TasksDateTime";
import * as dayjs from "@/utils/js/dayjs.js";
import { dayIntrvl, weekIntrv, dayTimeMarks, weekTimeMarks } from "@/types/TasksFlowFilter";

const millesecsInSec = 1000;
const secondsInMinute = 60;
const secondssInHour = 60 * 60;

const daysInWeek = 7;

const millisecsToSecs = (millesecs: number): Seconds => Math.round(millesecs / millesecsInSec);
const secondsToMinutes = (seconds: number): Seconds => Math.floor(seconds / secondsInMinute);

const secondsToHMS = (seconds: number) =>
  [
    Math.floor(seconds / secondssInHour),
    Math.floor((seconds % secondssInHour) / secondsInMinute),
    seconds % secondsInMinute
  ];

const minutesToSeconds = (seconds: number): Seconds => seconds * secondsInMinute;

const getDateTimeInfo = (): IDateTimeInfo => {
  const currentDateTime = new Date();
  const weekDayNumber = currentDateTime.getDay();

  const currDayIntrvl: TimeInterval = dayIntrvl(currentDateTime);
  const weekIntrvl: TimeInterval[] = [];

  weekIntrvl.push({ from: 0, to: 0 });
  weekIntrvl.push({ from: 0, to: 0 });
  weekIntrvl.push({ from: 0, to: 0 });

  weekIntrvl[WSelectOptionEnum.currWeek] = weekIntrv(currentDateTime, 0);
  weekIntrvl[WSelectOptionEnum.prev1Week] = weekIntrv(currentDateTime, 1);
  weekIntrvl[WSelectOptionEnum.prev2Week] = weekIntrv(currentDateTime, 2);

  const weekMarks: TimeInterval[][] = [];

  weekMarks.push([]);
  weekMarks.push([]);
  weekMarks.push([]);

  weekMarks[WSelectOptionEnum.currWeek] = weekTimeMarks(currentDateTime, 0);
  weekMarks[WSelectOptionEnum.prev1Week] = weekTimeMarks(currentDateTime, 1);
  weekMarks[WSelectOptionEnum.prev2Week] = weekTimeMarks(currentDateTime, 3);

  return {
    timestamp: currentDateTime.getTime(),
    weekDayNumber: weekDayNumber,
    weekDayName: dayjs.weekdays[weekDayNumber],
    todayCaption: dayjs.dateCaption(currentDateTime),
    currDayIntrvl: currDayIntrvl,
    weekIntrvl: weekIntrvl,
    currDayMarks: dayTimeMarks(currentDateTime),
    weekMarks: weekMarks
  }
};

const formatSeconds = (secondsAmount: Seconds): string => {
  if (secondsAmount < secondsInMinute) {
    return `${secondsAmount} сек`;
  }
  else if (secondsAmount < secondssInHour) {
    const minutes = secondsToMinutes(secondsAmount);
    const seconds = secondsAmount % secondsInMinute;

    if (seconds === 0) {
      return `${minutes} мин`;
    }
    else {
      return `${minutes} мин ${seconds} сек`;
    }
  }
  else {
    const hms = secondsToHMS(secondsAmount);

    const hours = hms[0];
    const minutes = hms[1];
    const seconds = hms[2];

    if (seconds === 0) {
      if (minutes === 0) {
        return `${hours} ${hoursRepr(hours)}`;
      }
      else {
        return `${hours} ${hoursRepr(hours)} ${minutes} мин`;
      }
    }
    else {
      return `${hours} ${hoursRepr(hours)} ${minutes} мин ${seconds} сек`;
    }
  }
}

export {
  millesecsInSec,
  secondsInMinute,
  secondssInHour as secondsInHour,
  daysInWeek,
  millisecsToSecs,
  secondsToMinutes,
  minutesToSeconds,
  IDateTimeInfo,
  getDateTimeInfo,
  formatSeconds
};
