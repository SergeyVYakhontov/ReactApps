import { IAppSettings } from "@/types/appSettings";
import { minutesToSeconds } from "@/utils/js/dateTimeFuncs";

const defaultAppSettings = (): IAppSettings => ({
  id: "appSettings",
  pomodoroDuration: minutesToSeconds(15),
  smallBreakDuration: minutesToSeconds(5),
  bigBreakDuration: minutesToSeconds(10),
  notifications: false
});

export { defaultAppSettings };