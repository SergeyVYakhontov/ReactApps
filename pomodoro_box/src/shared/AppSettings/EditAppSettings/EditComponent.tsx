import React, { } from "react";
import Form from "react-bootstrap/form"
import Modal from "react-bootstrap/modal"
import { IAppSettings } from "@/types/appSettings";
import { SubmitCancelButtons } from "@/components/SubmitCancelButtons/SubmitCancelButtons";

interface IEditProps {
  editData: IAppSettings;
  dataChanged: boolean;
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNotifChanged: () => void;
  onSubmitButtonClick: (event: React.MouseEvent<HTMLFormElement>) => void;
  onCloseButtonClick: () => void;
  modalIsOpened: boolean;
  submitButtonDisable: boolean;
  validated: boolean;
}

export const EditComponent = (props: IEditProps) => {
  const {
    editData,
    dataChanged,
    onValueChange,
    onNotifChanged,
    onSubmitButtonClick,
    onCloseButtonClick,
    modalIsOpened,
    submitButtonDisable,
    validated
  } = props;

  return (
    <Modal show={modalIsOpened} >
      <Modal.Header>
        <Modal.Title>Настройки приложения</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated} onSubmit={onSubmitButtonClick}>
          <Form.Group className="mb-3" >
            <Form.Label>Продолжительность помидира, сек.</Form.Label>
            <Form.Control
              type="number"
              onChange={onValueChange}
              name={"pomodoroDuration"}
              value={editData.pomodoroDuration}
              placeholder="Продолжительность помидира"
              min={1}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Короткий перерыв, сек.</Form.Label>
            <Form.Control
              type="number"
              onChange={onValueChange}
              name={"smallBreakDuration"}
              value={editData.smallBreakDuration}
              placeholder="короткий перерыв"
              min={1}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Длинный перерыв, сек.</Form.Label>
            <Form.Control
              type="number"
              onChange={onValueChange}
              name="bigBreakDuration"
              value={editData.bigBreakDuration}
              min={1}
              placeholder="длинный перерыв"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <div className="mb-3">
              <Form.Check
                inline
                checked={editData.notifications}
                type="checkbox"
                label="уведомлять об окончании текущего интервала"
                onChange={onNotifChanged}
                name="notifications"
                placeholder="уведомления"
              />
            </div>
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
    </Modal>
  )
}
