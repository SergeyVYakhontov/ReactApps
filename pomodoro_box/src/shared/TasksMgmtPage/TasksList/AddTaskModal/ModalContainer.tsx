import React, { useState } from "react";
import { useDispatch } from "react-redux";
import lodash from "lodash";
import voca from "voca";
import { ITaskData, emptyTaskData } from "@/types/TaskData";
import * as taskDataSlice from "@/store/taskDataSlice";
import * as taskInputSlice from "@/store/taskInputSlice";
import { ModalComponent } from "./ModalComponent";

export const ModalContainer = () => {
  const [editData, setEditData] = useState<ITaskData>(emptyTaskData());
  const [dataChanged, setDataChanged] = useState(false);
  const [validated, setValidated] = useState(false);

  const tasksListDispatch = useDispatch<taskDataSlice.DispatchType>();
  const taskInputDispatchVoid = useDispatch<taskInputSlice.DispatchTypeVoid>();

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEditData: ITaskData = { ...editData, [event.target.name]: event.target.value };

    setDataChanged(true);
    setEditData(newEditData);
  };

  const onSubmitButtonClick = (event: React.MouseEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);

      return;
    }

    tasksListDispatch(taskDataSlice.createTask({ taskData: editData }));
    taskInputDispatchVoid(taskInputSlice.closeTaskInputModal());
  };

  const onCloseButtonClick = () => {
    taskInputDispatchVoid(taskInputSlice.closeTaskInputModal());
  };

  const submitButtonDisable =
    voca.isEmpty(editData.name) ||
    lodash.isUndefined(editData.pomodoroCount);

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