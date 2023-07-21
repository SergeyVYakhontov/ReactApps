import React, { useState } from "react";
import Modal from "react-bootstrap/modal"
import Button from "react-bootstrap/button"
import styles from "./errormodal.css";

function ErrorModal() {
  const [opened, setOpened] = useState(false);

  const onCloseModal = () => {
    setOpened(false);
  }

  return (
    <Modal show={opened} >
      <Modal.Header className={styles.error_title}>
        <Modal.Title >
          <div>Ошибка в приложении</div>
        </Modal.Title>
      </Modal.Header>
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

export { ErrorModal };
