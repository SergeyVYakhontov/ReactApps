import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootStoreData } from "@/store/rootStore";
import * as appSettingsSlice from "@/store/appSettingsSlice";
import { emptyPayloadData } from "@/store/tasksFlowSlice";
import * as tasksFlowSlice from "@/store/tasksFlowSlice";
import { ButtonsComponent } from "./ButtonsComponent";

export function ButtonsContainer() {
  const tasksFlowDispatch = useDispatch<tasksFlowSlice.DispatchType>();

  const appSettingsStore = useSelector<IRootStoreData, appSettingsSlice.IAppSettingsStore>(
    (state) => state.appSettingsStore);

  const tasksFlowStore = useSelector<IRootStoreData, tasksFlowSlice.ITasksFlowStore>(
    (state) => state.tasksFlowStore);

  const onStartCountdownClick = () => {
    tasksFlowDispatch(tasksFlowSlice.startCountdown({
      ...emptyPayloadData(),
      appSettings: appSettingsStore.appSettings
    }));
  }

  const onStopCountdownClick = () => {
    tasksFlowDispatch(tasksFlowSlice.stopCountdown({
      ...emptyPayloadData(),
      appSettings: appSettingsStore.appSettings
    }));
  }

  const onPauseCountdownClick = () => {
    tasksFlowDispatch(tasksFlowSlice.pauseCountdown({
      ...emptyPayloadData(),
      appSettings: appSettingsStore.appSettings
    }));
  }

  const onContinueFlowStepClick = () => {
    tasksFlowDispatch(tasksFlowSlice.continueCountdown({
      ...emptyPayloadData(),
      appSettings: appSettingsStore.appSettings
    }));
  }

  const onSkipFlowStepClick = () => {
    tasksFlowDispatch(tasksFlowSlice.nextFlowStep({
      ...emptyPayloadData(),
      appSettings: appSettingsStore.appSettings
    }));
  }

  const countdownData = tasksFlowStore.tasksFlowItem.countdownData;

  const props = {
    countdownData,
    onStartCountdownClick,
    onStopCountdownClick,
    onPauseCountdownClick,
    onContinueFlowStepClick,
    onSkipFlowStepClick
  };

  return <ButtonsComponent {...props} />;
}
