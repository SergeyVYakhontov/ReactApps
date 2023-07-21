type Seconds = number;

interface TimeInterval {
  from: Seconds;
  to: Seconds;
}

interface IDateTimeInfo {
  timestamp: Seconds,
  weekDayNumber: number;
  weekDayName: string;
  todayCaption: string;
  currDayIntrvl: TimeInterval;
  weekIntrvl: TimeInterval[];
  currDayMarks: TimeInterval[];
  weekMarks: TimeInterval[][];
}

export { Seconds, TimeInterval, IDateTimeInfo };
