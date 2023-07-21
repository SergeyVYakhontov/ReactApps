import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootStoreData } from "@/store/rootStore";
import { FlowStepKind } from "@/types/TasksFlowData";
import * as appSettingsSlice from "@/store/appSettingsSlice";
import * as tasksFlowSlice from "@/store/tasksFlowSlice";
import styles from "./tasksflow.css";

interface IFlowKindPill {
  readonly flowStepKind: FlowStepKind;
  readonly name: string;
}

const flowKindPills: IFlowKindPill[] =
  [
    { flowStepKind: FlowStepKind.pomodoro, name: "Помидор" },
    { flowStepKind: FlowStepKind.smallBreak, name: "Короткий перерыв" },
    { flowStepKind: FlowStepKind.bigBreak, name: "Длинный перерыв" }
  ];

const ulItem = (
  currFlowStepKind: FlowStepKind,
  flowKindPill: IFlowKindPill,
  index: number,
  disabled: boolean
) => {
  const tasksFlowDispatch = useDispatch<tasksFlowSlice.DispatchType>();

  const appSettingsStore = useSelector<IRootStoreData, appSettingsSlice.IAppSettingsStore>(
    (state) => state.appSettingsStore);

  const onElemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    tasksFlowDispatch(tasksFlowSlice.setFlowKind({
      ...tasksFlowSlice.emptyPayloadData(),
      appSettings: appSettingsStore.appSettings,
      flowStepKind: flowKindPill.flowStepKind
    }));
  }

  const activeClass = (flowKindPill.flowStepKind === currFlowStepKind ? "active" : "");

  return (
    <li key={`key_${index}`} className="nav-item">
      <a
        className={`nav-link ${activeClass}`}
        href="#"
        onClick={onElemClick}
      >
        {flowKindPill.name}
      </a>
    </li>
  );
};

function FlowKindPills() {
  const tasksFlowStore = useSelector<IRootStoreData, tasksFlowSlice.ITasksFlowStore>(
    (state) => state.tasksFlowStore);

  const tasksFlowItem = tasksFlowStore.tasksFlowItem;

  return (
    <div className={styles.tasksflow_pillsdiv}>
      <ul className="nav nav-pills">
        {flowKindPills.map((t, i) => ulItem(
          tasksFlowItem.flowStepKind,
          t,
          i,
          (t.flowStepKind !== tasksFlowItem.flowStepKind)))}
      </ul>
    </div>
  );
}

export { FlowKindPills };
