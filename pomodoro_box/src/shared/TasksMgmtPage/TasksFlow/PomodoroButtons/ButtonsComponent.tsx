import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/button"
import * as tasksFlowtSlice from "@/store/tasksFlowSlice";
import styles from "./buttons.css";

interface IModalProps {
  countdownData: Readonly<tasksFlowtSlice.ICountdownData>;
  onStartCountdownClick: () => void;
  onStopCountdownClick: () => void;
  onPauseCountdownClick: () => void;
  onContinueFlowStepClick: () => void;
  onSkipFlowStepClick: () => void;
}

export function ButtonsComponent(props: IModalProps) {
  const {
    countdownData,
    onStartCountdownClick,
    onStopCountdownClick,
    onPauseCountdownClick,
    onContinueFlowStepClick,
    onSkipFlowStepClick
  } = props;

  return (
    <div className={styles.pomodorobuttons_div}>
      <Container fluid>
        <Row>
          <Col>
            <Button
              variant="success"
              className={styles.button}
              disabled={countdownData.isStarted || countdownData.isPlaying}
              onClick={onStartCountdownClick}
            >
              Старт
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="warning"
              className={styles.button}
              disabled={!countdownData.isPlaying}
              onClick={onPauseCountdownClick}
            >
              Пауза
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="secondary"
              className={styles.button}
              disabled={countdownData.isPlaying || !countdownData.isStarted}
              onClick={onContinueFlowStepClick}
            >
              Продолжить
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="secondary"
              className={styles.button}
              disabled={countdownData.isPlaying}
              onClick={onSkipFlowStepClick}
            >
              Пропустить
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="danger"
              className={styles.button}
              disabled={!countdownData.isPlaying}
              onClick={onStopCountdownClick}
            >
              Стоп
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
