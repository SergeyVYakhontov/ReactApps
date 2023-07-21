import { ICollectionItem } from "@/types/ICollectionItem";
import { Seconds } from "@/types/TasksDateTime";

interface ITaskData extends ICollectionItem {
  rowNumber?: number;
  category?: string;
  name: string;
  pomodoroCount?: number;
  lastUpdateTime?: Seconds;
}

type TasksCollection = Readonly<ITaskData>[];

const emptyTaskData = (): ITaskData => ({
  id: "",
  rowNumber: 0,
  category: "",
  name: "",
  pomodoroCount: 3,
});

const emptyTasksCollection = () => [];

const enumTaskDataList = (tasksCollection: TasksCollection): TasksCollection => {
  let rowNumber = 1;

  return tasksCollection.map(t =>
  ({
    ...t,
    rowNumber: rowNumber++
  }));
};

export {
  ITaskData,
  TasksCollection,
  emptyTaskData,
  emptyTasksCollection,
  enumTaskDataList
};
