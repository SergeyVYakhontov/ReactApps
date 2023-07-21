import { Seconds } from "@/types/TasksDateTime";
import { ICollectionItem } from "@/types/ICollectionItem";

interface IAppSettings  extends ICollectionItem {
  pomodoroDuration: Seconds;
  smallBreakDuration: Seconds;
  bigBreakDuration: Seconds;
  notifications: boolean;
}

export { IAppSettings };