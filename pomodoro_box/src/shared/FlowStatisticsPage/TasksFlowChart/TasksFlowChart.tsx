import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { WeekSelect } from "./WeekSelect";
import { FlowBarChart } from "./FlowBarChart/FlowBarChart";
import classnames from "classnames";
import { CssClassNames } from "@/constants/cssClassNames";
import styles from "./tasksflowchart.css";

function TasksFlowChart() {
  const divClassName = classnames(styles.flowchart_div, CssClassNames.divPanel);

  return (
    <div className={divClassName}>
      <Container fluid>
        <Row>
          <Col xs={8} className={styles.caption_div}>
            <h5>Статистика по неделям</h5>
          </Col>
          <Col>
            <WeekSelect />
          </Col>
        </Row>
        <Row>
          <Col>
            <FlowBarChart />
          </Col>
        </Row>
      </Container >
    </div>
  );
}

export { TasksFlowChart };
