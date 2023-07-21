import React from "react";
import { useSelector, useDispatch } from "react-redux";
import lodash from "lodash";
import { ITaskData } from "@/types/TaskData";
import { IRootStoreData } from "@/store/rootStore";
import * as taskDataSlice from "@/store/taskDataSlice";
import * as taskInputSlice from "@/store/taskInputSlice";
import { IConfirmModalProps, ConfirmModal } from "@/components/ConfirmModal";

const confirmModal = (showModal: boolean) => {
  const tasksListDispatch = useDispatch<taskDataSlice.DispatchType>();
  const taskInputDispatchVoid = useDispatch<taskInputSlice.DispatchTypeVoid>();

  const taskInputStore = useSelector<IRootStoreData, taskInputSlice.ITaskInputStore>(
    (state) => state.taskInputStore);

  const taskId = (lodash.isUndefined(taskInputStore.taskData.id) ? "" : taskInputStore.taskData.id);
  const taskData: ITaskData = { id: taskId, name: "" };

  const confirmDelete = () => {
    tasksListDispatch(taskDataSlice.deleteTask({ taskData: taskData }));

    taskInputDispatchVoid(taskInputSlice.closeTaskInputModal());
  };

  const closeModal = () => {
    taskInputDispatchVoid(taskInputSlice.closeTaskInputModal());
  }

  const confirmProps: IConfirmModalProps = {
    title: "Подтверждение",
    text: "Удалить задачу ?",
    confirmLabel: "Да",
    cancelLabel: "Не удалять",
    onConfirm: confirmDelete,
    onCancel: closeModal,
    onHide: closeModal
  };

  return <>{showModal && <ConfirmModal {...confirmProps} />}</>;
};

export { confirmModal };