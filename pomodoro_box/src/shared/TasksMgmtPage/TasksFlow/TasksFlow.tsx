import React from "react";
import { useSelector } from "react-redux";
import voca from "voca";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classnames from "classnames";
import { CssClassNames } from "@/constants/cssClassNames";
import { Notification } from "./Notification";
import { FlowKindPills } from "./FlowKindPills";
import { IRootStoreData } from "@/store/rootStore";
import * as tasksFlowSlice from "@/store/tasksFlowSlice";
import { CountdownTimer } from "./CountdownTimer";
import * as PomodoroButtons from "./PomodoroButtons";
import styles from "./tasksflow.css";

function TasksFlow() {
  const tasksFlowStore = useSelector<IRootStoreData, tasksFlowSlice.ITasksFlowStore>(
    (state) => state.tasksFlowStore);

  if (voca.isEmpty(tasksFlowStore.currTaskId)) {
    const divClassName = classnames(styles.tasksflowempty_div, CssClassNames.divPanel);

    return (
      <div className={divClassName}>
        <Container fluid>
          <Row>
            <Col>
              <h6>
                {"Добавьте задачу для начала работы с таймером"}
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  const tasksFlowItem = tasksFlowStore.tasksFlowItem;
  const divClassName = classnames(styles.tasksflow_div, CssClassNames.divPanel);

  return (
    <div className={divClassName}>
      <Container fluid>
        <Row>
          <Container fluid>
            <Row>
              <Col>
                <h6 className={styles.pomcount_div}>
                  {`Помидор № ${tasksFlowItem.pomodoroNumber + 1}`}
                </h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <FlowKindPills />
              </Col>
            </Row>
          </Container>
        </Row>
        <Row>
          <Col>
            <CountdownTimer />
          </Col>
          <Col>
            <PomodoroButtons.ButtonsContainer />
          </Col>
        </Row>
      </Container>
      <Notification />
    </div>
  );
}

export { TasksFlow };
