import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffectWithKey } from "./useEffectWithKey";
import { IRootStoreData } from "@/store/rootStore";
import { loadTasksFlow, saveTasksFlow } from "@/store/localStorageFuncs";
import * as tasksFlowSlice from "@/store/tasksFlowSlice";
import { initialTasksFlowStore } from "@/store/initialStore";

const useTasksFlow = () => {
  const tasksFlowDispatch = useDispatch<tasksFlowSlice.DispatchType>();

  const tasksFlowStore = useSelector<IRootStoreData, tasksFlowSlice.ITasksFlowStore>(
    (state) => state.tasksFlowStore);

  useEffect(() => {
    tasksFlowDispatch(loadTasksFlow(initialTasksFlowStore()));
  }, []);

  useEffectWithKey(() => {
    tasksFlowDispatch(saveTasksFlow(tasksFlowStore));
  },
    [String(tasksFlowStore.loadKey)]
  );
}

export { useTasksFlow };
