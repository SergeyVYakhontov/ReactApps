import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/button";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./submitcancelbuttons.css";

interface IYesNoDropdownProps {
  submitCaption: string;
  closeCaption: string;
  submitButtonDisable?: boolean;
  dataChanged: boolean;
  closeHandler: () => void;
}

function YesNoButtonsGroup(
  props:
    (IYesNoDropdownProps &
    {
      onDDClick: () => void,
      onDDSelect: (event: any) => void
    })
) {
  const {
    closeCaption,
    dataChanged,
    closeHandler,
    onDDClick,
    onDDSelect
  } = props;

  if (dataChanged) {
    return (
      <Dropdown
        onSelect={onDDSelect}
        onToggle={onDDClick}
      >
        <Dropdown.Toggle
          variant="secondary"
        >
          {closeCaption}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-2" eventKey="no">Нет</Dropdown.Item>
          <Dropdown.Item href="#/action-1" eventKey="yes">Да</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  else {
    return (
      <Button
        variant="secondary"
        onClick={closeHandler}
      >
        {closeCaption}
      </Button>
    )
  }
}

function SubmitCancelButtons(props: IYesNoDropdownProps) {
  const {
    submitCaption,
    submitButtonDisable,
    dataChanged,
    closeHandler
  } = props;

  const [closeClicked, setCloseClicked] = useState(false);

  const onDDClick = () => {
    setCloseClicked(true);
  }

  const onDDSelect = (eventKey: any) => {
    if (eventKey === "yes") {
      closeHandler();
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={6}>
          {closeClicked && dataChanged &&
            <p className={styles.nosaveddata_text}>
              Имеются несохраненные данные
            </p>
          }
        </Col>
        <Col xs={6}>
          <Row>
            <Col xs={6}>
              <Button
                type="submit"
                variant="success"
                disabled={submitButtonDisable}
              >
                {submitCaption}
              </Button>
            </Col>
            <Col xs={6}>
              <YesNoButtonsGroup {...props}
                onDDClick={onDDClick}
                onDDSelect={onDDSelect}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container >
  )
}

export { SubmitCancelButtons };
