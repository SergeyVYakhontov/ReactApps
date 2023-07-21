import React from "react";
import { useDispatch } from "react-redux";
import lodash from "lodash";
import voca from "voca";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ITaskData } from "@/types/TaskData";
import { Button } from "react-bootstrap";
import { TasksCollection } from "@/types/TaskData";
import * as taskInputSlice from "@/store/taskInputSlice";

function actionButtons(tasksCollection: TasksCollection) {
  const taskInputDispatch = useDispatch<taskInputSlice.DispatchType>();

  const onRemoveButtonClick = (rowIndex: number) => () => {
    const taskId = tasksCollection[rowIndex].id;

    if (lodash.isUndefined(taskId) ||
      voca.isEmpty(taskId)
    ) {
      throw new Error();
    }

    const taskData: ITaskData = { id: taskId, name: "" };

    taskInputDispatch(taskInputSlice.openTaskInputModal(
      {
        modalMode: taskInputSlice.ModalMode.confirm,
        taskData: taskData
      }));
  };

  const onEditButtonClick = (rowIndex: number) => () => {
    const taskId = tasksCollection[rowIndex].id;

    if (lodash.isUndefined(taskId) ||
      voca.isEmpty(taskId)
    ) {
      throw new Error();
    }

    const taskData: ITaskData = { id: taskId, name: "" };

    taskInputDispatch(taskInputSlice.openTaskInputModal(
      {
        modalMode: taskInputSlice.ModalMode.edit,
        taskData: taskData
      }));
  };

  function actionButtonsIntrl(cell: any, row: any, rowIndex: number) {
    return (
      <Container>
        <Row>
          <Col>
            <Button
              variant="link"
              onClick={onRemoveButtonClick(rowIndex)}
            >
              Удалить
            </Button>
          </Col>
          <Col>
            <Button
              variant="link"
              onClick={onEditButtonClick(rowIndex)}
            >
              Редактировать
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return actionButtonsIntrl;
}

export { actionButtons };