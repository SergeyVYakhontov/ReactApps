import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import lodash from "lodash";
import { ITaskData, emptyTaskData } from "@/types/TaskData";
import { IRootStoreData } from "@/store/rootStore";
import { TasksCollection } from "@/types/TaskData";
import * as taskDataSlice from "@/store/taskDataSlice";
import * as taskInputSlice from "@/store/taskInputSlice";
import { ModalComponent } from "./ModalComponent";

export const ModalContainer = () => {
  const tasksListDispatch = useDispatch<taskDataSlice.DispatchType>();
  const tasksInputDispatchVoid = useDispatch<taskInputSlice.DispatchTypeVoid>();

  const tasksCollection = useSelector<IRootStoreData, TasksCollection>(
    (state) => state.tasksCollectionStore.tasksCollection);

  const taskInputStore = useSelector<IRootStoreData, taskInputSlice.ITaskInputStore>(
    (state) => state.taskInputStore);

  let taskData = emptyTaskData();

  if (!lodash.isUndefined(taskInputStore.taskData.id)) {
    const item = tasksCollection.find(t => t.id === taskInputStore.taskData.id);

    if (lodash.isUndefined(item)) {
      throw new Error();
    }

    taskData = item;
  }

  taskData = {
    ...taskData,
    category: lodash.isUndefined(taskData.category) ? "" : taskData.category,
    pomodoroCount: lodash.isUndefined(taskData.pomodoroCount) ? 1 : taskData.pomodoroCount
  };

  const [editData, setEditData] = useState<ITaskData>(taskData);
  const [dataChanged, setDataChanged] = useState(false);
  const [validated, setValidated] = useState(false);

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEditData: ITaskData = { ...editData, [event.target.name]: event.target.value };

    setEditData(newEditData);
    setDataChanged(true);
  };

  const onSubmitButtonClick = (event: React.MouseEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);

      return;
    }

    tasksListDispatch(taskDataSlice.updateTask({ taskData: editData }));
    tasksInputDispatchVoid(taskInputSlice.closeTaskInputModal());
  };

  const onCloseButtonClick = () => {
    tasksInputDispatchVoid(taskInputSlice.closeTaskInputModal());
  };

  const submitButtonDisable = !dataChanged;

  const props = {
    editData,
    dataChanged,
    onValueChange,
    onSubmitButtonClick,
    onCloseButtonClick,
    submitButtonDisable,
    validated
  };

  return <ModalComponent {...props} />;
}