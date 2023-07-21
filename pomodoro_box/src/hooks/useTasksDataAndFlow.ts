import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import lodash from "lodash";
import voca from "voca";
import { useEffectWithKey } from "./useEffectWithKey";
import { IRootStoreData } from "@/store/rootStore";
import { loadTaskData, saveTaskData } from "@/store/localStorageFuncs";
import { ITaskData } from "@/types/TaskData";
import * as appSettingsSlice from "@/store/appSettingsSlice";
import * as taskDataSlice from "@/store/taskDataSlice";
import * as tasksFlowSlice from "@/store/tasksFlowSlice";

const useTasksDataAndFlow = () => {
  const tasksListDispatch = useDispatch<taskDataSlice.DispatchType>();
  const tasksFlowDispatch = useDispatch<tasksFlowSlice.DispatchType>();

  const appSettingsStore = useSelector<IRootStoreData, appSettingsSlice.IAppSettingsStore>(
    (state) => state.appSettingsStore);

  const tasksCollectionStore = useSelector<IRootStoreData, taskDataSlice.ITasksDataStore>(
    (state) => state.tasksCollectionStore);

  const tasksCollection = tasksCollectionStore.tasksCollection;

  useEffect(() => {
    tasksListDispatch(loadTaskData({})).then(() => {
      const taskData: ITaskData = {
        id: "",
        name: ""
      };

      tasksListDispatch(taskDataSlice.setCurrentTask({ taskData: taskData }));
    });
  }, []);

  useEffectWithKey(() => {
    tasksListDispatch(saveTaskData(
      { itemsCollection: tasksCollection }));

    const taskData: ITaskData = {
      id: tasksCollectionStore.currTaskId,
      name: ""
    };

    tasksListDispatch(taskDataSlice.setCurrentTask({ taskData: taskData }));
  },
    [String(tasksCollectionStore.loadKey)]
  );

  useEffectWithKey(() => {
    tasksFlowDispatch(tasksFlowSlice.setCurrentTask({
      ...tasksFlowSlice.emptyPayloadData(),
      appSettings: appSettingsStore.appSettings,
      taskId: tasksCollectionStore.currTaskId
    }));
  }, [tasksCollectionStore.currTaskId]);

  useEffectWithKey(() => {
    const currTaskId = tasksCollectionStore.currTaskId;
    const deletedTaskId = tasksCollectionStore.deletedTaskId;

    if (
      !lodash.isUndefined(deletedTaskId) &&
      !voca.isEmpty(deletedTaskId)
    ) {
      tasksFlowDispatch(tasksFlowSlice.deleteTaskFlow({
        ...tasksFlowSlice.emptyPayloadData(),
        taskId: currTaskId,
        deletedTaskId: deletedTaskId
      }));
    }
  }, [tasksCollectionStore.deletedTaskId]);
}

export { useTasksDataAndFlow };