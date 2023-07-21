import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatSeconds } from "@/utils/js/dateTimeFuncs";
import { IRootStoreData } from "@/store/rootStore";
import { ITasksFlowStore } from "@/store/tasksFlowSlice";
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import * as appSettingsSlice from "@/store/appSettingsSlice";
import * as tasksFlowSlice from "@/store/tasksFlowSlice";
import styles from "./tasksflow.css";

const timeReprArea = ({ remainingTime }: { remainingTime: number }) => {
  return <h6>{formatSeconds(remainingTime)}</h6>;
}

export function CountdownTimer() {
  const tasksFlowDispatch = useDispatch<tasksFlowSlice.DispatchType>();
  const tasksFlowDispatchVoid = useDispatch<tasksFlowSlice.DispatchTypeVoid>();

  const appSettingsStore = useSelector<IRootStoreData, appSettingsSlice.IAppSettingsStore>(
    (state) => state.appSettingsStore);

  const tasksFlowStore = useSelector<IRootStoreData, ITasksFlowStore>(
    (state) => state.tasksFlowStore);

  const tasksFlowItem = tasksFlowStore.tasksFlowItem;
  const countdownData = tasksFlowItem.countdownData;

  const onFlowStepDone = () => {
    tasksFlowDispatch(tasksFlowSlice.flowStepDone({
      ...tasksFlowSlice.emptyPayloadData(),
      appSettings: appSettingsStore.appSettings
    }));

    tasksFlowDispatchVoid(tasksFlowSlice.openNotification());
  }

  const colorsTime: { 0: number } & { 1: number } & number[] = [
    countdownData.duration,
    Math.round(countdownData.duration / 4),
    Math.round(countdownData.duration / 10),
    0
  ];

  return (
    <div className={styles.countdowntimer_div}>
      <CountdownCircleTimer
        key={`key_${tasksFlowItem.timerKey}`}
        isPlaying={countdownData.isPlaying}
        duration={countdownData.duration}
        initialRemainingTime={countdownData.remainingTime / 1000}
        onComplete={onFlowStepDone}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        size={240}
        colorsTime={colorsTime}
      >
        {timeReprArea}
      </CountdownCircleTimer>
    </div>
  );
}