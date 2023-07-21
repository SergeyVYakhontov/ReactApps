import { useSelector } from "react-redux";
import { IRootStoreData } from "@/store/rootStore";
import * as tasksFlowSlice from "@/store/tasksFlowSlice";

const useTimerIsPlaying = () => {
  const tasksFlowStore = useSelector<IRootStoreData, tasksFlowSlice.ITasksFlowStore>(
    (state) => state.tasksFlowStore);

  const tasksFlowItem = tasksFlowStore.tasksFlowItem;
  const countdownData = tasksFlowItem.countdownData;

  const disabled = (countdownData.isPlaying || countdownData.isPaused);

  return [disabled]
}

export { useTimerIsPlaying };
