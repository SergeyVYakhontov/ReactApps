import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootStoreData } from "@/store/rootStore";
import { emptyTaskData } from "@/types/TaskData";
import * as taskDataSlice from "@/store/taskDataSlice";
import * as taskInputSlice from "@/store/taskInputSlice";
import { useTimerIsPlaying } from "@/hooks/useTimerIsPlaying";
import { preprareTasksList } from "./preprareTasksList";
import { TasksListComponent } from "./TasksListComponent";

function TasksListContainer() {
  const tasksListDispatch = useDispatch<taskDataSlice.DispatchType>();
  const taskInputDispatch = useDispatch<taskInputSlice.DispatchType>();

  const tasksCollectionStore = useSelector<IRootStoreData, taskDataSlice.ITasksDataStore>(
    (state) => state.tasksCollectionStore);

  let tasksCollection = tasksCollectionStore.tasksCollection;
  const currTaskId = tasksCollectionStore.currTaskId;

  tasksCollection = preprareTasksList(tasksCollection);

  const taskInputStore = useSelector<IRootStoreData, taskInputSlice.ITaskInputStore>(
    (state) => state.taskInputStore);

  const showAdddModal =
    taskInputStore.modalMode === taskInputSlice.ModalMode.add &&
    taskInputStore.modalIsOpened;

  const showEditModal =
    taskInputStore.modalMode === taskInputSlice.ModalMode.edit &&
    taskInputStore.modalIsOpened;

  const showConfirmModal =
    taskInputStore.modalMode === taskInputSlice.ModalMode.confirm &&
    taskInputStore.modalIsOpened;

  const onRowSelect = (row: any, isSelected: boolean, rowIndex: number) => {
    const taskData = tasksCollection[rowIndex];

    tasksListDispatch(taskDataSlice.setCurrentTask({ taskData: taskData }));
  };

  const onAddTaskButtonClick = () => {
    taskInputDispatch(taskInputSlice.openTaskInputModal(
      {
        modalMode: taskInputSlice.ModalMode.add,
        taskData: emptyTaskData()
      }));
  };

  const [disabled] = useTimerIsPlaying();

  const props = {
    tasksCollection,
    currTaskId,
    showAdddModal,
    showEditModal,
    showConfirmModal,
    onRowSelect,
    onAddTaskButtonClick,
    disabled
  };

  return (
    <TasksListComponent {...props} />
  );
}

export { TasksListContainer };
