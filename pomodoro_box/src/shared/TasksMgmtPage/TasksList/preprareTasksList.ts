import { useSelector } from "react-redux";
import lodash from "lodash";
import { dateTimeCaption } from "@/utils/js/dayjs.js";
import { IRootStoreData } from "@/store/rootStore";
import { ITaskData } from "@/types/TaskData";
import { TasksCollection, enumTaskDataList } from "@/types/TaskData";
import * as tasksFlowSlice from "@/store/tasksFlowSlice";

const preprareTasksList = (tasksCollection: TasksCollection): TasksCollection => {
  const tasksFlowStore = useSelector<IRootStoreData, tasksFlowSlice.ITasksFlowStore>(
    (state) => state.tasksFlowStore);

  let newTasksCollection = tasksCollection;
  newTasksCollection = enumTaskDataList(newTasksCollection);

  newTasksCollection = newTasksCollection.map(t => {
    const newItem: ITaskData = { ...t };

    const lastUpdateTime =
      (
        tasksFlowStore.tasksFlowMap[t.id] ?
          tasksFlowStore.tasksFlowMap[t.id].tasksFlowData.lastUpdateTime : undefined
      );

    const lastUpdateTimeRepr =
      (!lodash.isUndefined(lastUpdateTime) ?
        dateTimeCaption(lastUpdateTime) :
        "");

    return {
      ...newItem,
      lastUpdateTimeRepr: lastUpdateTimeRepr
    };
  });

  newTasksCollection.sort(t => (lodash.isUndefined(t.lastUpdateTime) ? -1 : t.lastUpdateTime));
  newTasksCollection.reverse();

  return newTasksCollection
};

export { preprareTasksList };