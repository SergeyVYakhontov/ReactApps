import dayjs from "dayjs";

const localeData = require("dayjs/plugin/localeData")
dayjs.extend(localeData)

require("dayjs/locale/ru")
dayjs.locale("ru");

let weekdays = dayjs.weekdays();

let weekdaysShort = dayjs.weekdaysShort();

const dateCaption = (date) =>
  dayjs(date).format("DD.MM.YYYY");

const dateTimeCaption = (date) =>
  dayjs(date).format("DD.MM.YYYY HH:mm:ss");

const dayStart = (date, delta) =>
  dayjs(date).subtract(delta, "day").startOf("day");

const dayEnd = (date, delta) =>
  dayjs(date).subtract(delta, "day").endOf("day");

const weekStart = (date, delta) =>
  dayjs(date).subtract(delta, "week").startOf("week");

const weekEnd = (date, delta) =>
  dayjs(date).subtract(delta, "week").endOf("week");

const weekDay = (time) => dayjs(time).day();

export {
  weekdays,
  weekdaysShort,
  dateCaption,
  dateTimeCaption,
  dayStart,
  dayEnd,
  weekStart,
  weekEnd,
  weekDay
};
