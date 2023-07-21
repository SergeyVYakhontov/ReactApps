import React from "react";
import Form from "react-bootstrap/form";
import Modal from "react-bootstrap/modal";
import { SubmitCancelButtons } from "@/components/SubmitCancelButtons/SubmitCancelButtons";
import { ITaskData } from "@/types/TaskData";

interface IModalProps {
  editData: ITaskData;
  dataChanged: boolean;
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitButtonClick: (event: React.MouseEvent<HTMLFormElement>) => void;
  onCloseButtonClick: () => void;
  submitButtonDisable: boolean;
  validated: boolean;
}

export const ModalComponent = (props: IModalProps) => {
  const {
    editData,
    dataChanged,
    onValueChange,
    onSubmitButtonClick,
    onCloseButtonClick,
    submitButtonDisable,
    validated
  } = props;

  return (
    <Modal show={true} >
      <Modal.Header>
        <Modal.Title>Редактировать задачу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated} onSubmit={onSubmitButtonClick}>
          <Form.Group className="mb-3">
            <Form.Label>Наименование задачи</Form.Label>
            <Form.Control
              type="text"
              onChange={onValueChange}
              name={"name"}
              value={editData.name}
              placeholder="наименование задачи"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Категория</Form.Label>
            <Form.Control
              type="text"
              onChange={onValueChange}
              name={"category"}
              value={editData.category}
              placeholder="категория"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Количество помидоров</Form.Label>
            <Form.Control
              type="number"
              onChange={onValueChange}
              name="pomodoroCount"
              value={editData.pomodoroCount}
              min={1}
              placeholder="количество помидоров"
              required
            />
          </Form.Group>
          <SubmitCancelButtons
            submitCaption="Сохранить"
            closeCaption="Закрыть"
            submitButtonDisable={submitButtonDisable}
            dataChanged={dataChanged}
            closeHandler={onCloseButtonClick}
          />
        </Form>
      </Modal.Body>
    </Modal >
  )
}