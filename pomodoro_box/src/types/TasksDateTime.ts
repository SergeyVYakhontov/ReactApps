import { Seconds, TimeInterval } from "@/types/dateTimeTypes";

enum IntrvPointKind {
  start,
  end
}

type TimeIntrvList = TimeInterval[];

const timeIntrvLength = (timeInterval: TimeInterval) => {
  const length = (timeInterval.to - timeInterval.from);

  if (length < 0) {
    throw new Error()
  }

  return length;
}

interface IWeekSelectOption {
  id: number;
  name: string;
}

enum WSelectOptionEnum {
  currWeek = 0,
  prev1Week = 1,
  prev2Week = 2
}

const WSelectOptionList: IWeekSelectOption[] = [
  { id: WSelectOptionEnum.currWeek, name: "Текущая неделя" },
  { id: WSelectOptionEnum.prev1Week, name: "Предыдущая неделя" },
  { id: WSelectOptionEnum.prev2Week, name: "2 недели назад" }
];

export {
  Seconds,
  TimeInterval,
  IntrvPointKind,
  TimeIntrvList,
  timeIntrvLength,
  WSelectOptionEnum,
  WSelectOptionList
};
