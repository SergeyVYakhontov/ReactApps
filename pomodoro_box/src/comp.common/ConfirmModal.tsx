import React from "react";
import Modal from "react-bootstrap/modal";
import Button from "react-bootstrap/button";
import { EmptyFunctionType } from "@/utils/js/emptyFunction"

interface IConfirmModalProps {
  title: string;
  text: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: EmptyFunctionType;
  onCancel: EmptyFunctionType;
  onHide: EmptyFunctionType;
}

function ConfirmModal(props: IConfirmModalProps) {
  const {
    title,
    text,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
    onHide
  } = props;

  return (
    <Modal
      animation={true}
      show={true}
      onHide={onHide}
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
        <Button
          variant="secondary"
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { IConfirmModalProps, ConfirmModal };