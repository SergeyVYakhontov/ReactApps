import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/modal"
import Button from "react-bootstrap/button"
import * as appSettingsSlice from "@/store/appSettingsSlice";
import { IRootStoreData } from "@/store/rootStore";
import * as tasksFlowData from "@/types/TasksFlowData";
import { ITasksFlowStore } from "@/store/tasksFlowSlice";
import * as tasksFlowSlice from "@/store/tasksFlowSlice";
import styles from "./tasksflow.css";

function Notification() {
  const tasksFlowDispatchVoid = useDispatch<tasksFlowSlice.DispatchTypeVoid>();

  const appSettingsStore = useSelector<IRootStoreData, appSettingsSlice.IAppSettingsStore>(
    (state) => state.appSettingsStore);

  const tasksFlowStore = useSelector<IRootStoreData, ITasksFlowStore>(
    (state) => state.tasksFlowStore);

  const flowStepKind = tasksFlowStore.tasksFlowItem.flowStepKind;
  const prevFlowStepKind = tasksFlowData.prevFlowStepKind(flowStepKind);
  let toastBody = "";

  switch (prevFlowStepKind) {
    case tasksFlowData.FlowStepKind.pomodoro:
      {
        toastBody = "Работа над помидором завершена";
        break;
      }
    case tasksFlowData.FlowStepKind.smallBreak:
    case tasksFlowData.FlowStepKind.bigBreak:
      {
        toastBody = "Перерыв закончился";
        break;
      }
  }

  const onCloseModal = () => {
    tasksFlowDispatchVoid(tasksFlowSlice.closeNotification());
  }

  const showModal =
    appSettingsStore.appSettings.notifications &&
    tasksFlowStore.notifIsOpened;

  return (
    <Modal show={showModal} >
      <Modal.Header className={styles.notif_title}>
        <Modal.Title >
          <div >Уведомление</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{toastBody}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={onCloseModal}
        >
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { Notification };
