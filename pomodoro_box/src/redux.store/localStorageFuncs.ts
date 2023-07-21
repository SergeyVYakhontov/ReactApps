import { ITaskData } from "@/types/TaskData";
import { LocalStorageApi } from "@/constants/LocalStorageApi";
import { IAppSettings } from "@/types/appSettings";
import { loadItemsList, saveItemsList, loadItem, saveItem } from "@/components/localStorageFuncs";
import { ITasksFlowStore } from "@/store/tasksFlowSlice";
import { defaultAppSettings } from "@/store/defaultAppSettings";
import { initialTasksFlowStore } from "@/store/initialStore";

const loadAppSettings = loadItem<IAppSettings>(
  LocalStorageApi.appSettings,
  defaultAppSettings());

const saveAppSettings = saveItem<IAppSettings>(LocalStorageApi.appSettings);

const loadTaskData = loadItemsList<ITaskData>(LocalStorageApi.tasksData);
const saveTaskData = saveItemsList<ITaskData>(LocalStorageApi.tasksData);

const loadTasksFlow = loadItem<ITasksFlowStore>(
  LocalStorageApi.tasksFlow,
  initialTasksFlowStore()
);

const saveTasksFlow = saveItem<ITasksFlowStore>(LocalStorageApi.tasksFlow);

export { loadAppSettings, saveAppSettings };
export { loadTaskData, saveTaskData };
export { loadTasksFlow, saveTasksFlow };
