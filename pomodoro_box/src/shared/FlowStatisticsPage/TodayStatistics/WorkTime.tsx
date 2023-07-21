import React from "react";
import { useSelector } from "react-redux";
import { formatSeconds } from "@/utils/js/dateTimeFuncs";
import { TFlowStatisticsKeeper } from "@/components/TFlowStatisticsKeeper/TFlowStatisticsKeeper";
import { IRootStoreData } from "@/store/rootStore";
import { ITasksFlowStore } from "@/store/tasksFlowSlice";
import styles from "./todaystatistics.css";

function WorkTime() {
  const tasksFlowStore = useSelector<IRootStoreData, ITasksFlowStore>(
    (state) => state.tasksFlowStore);

  const flowStatisticsKeeper: TFlowStatisticsKeeper = new TFlowStatisticsKeeper(
    tasksFlowStore.tasksFlowMap,
    tasksFlowStore.weekToFilter);

  const dayStatData = flowStatisticsKeeper.dayStatData;

  return (
    <div className={styles.worktime_div}>
      <h6 className={styles.worktimecaption}>
        <p>Вы работали над задачами в течение:</p>
        <p className={styles.worktime_p}>{formatSeconds(dayStatData.workTime)}</p>
      </h6>
    </div>
  );
}

export { WorkTime };
