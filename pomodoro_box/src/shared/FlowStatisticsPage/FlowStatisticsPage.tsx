import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TasksFlowChart } from "./TasksFlowChart/TasksFlowChart";
import { TodayStatistics } from "./TodayStatistics";
import { TotalStatistics } from "./TotalStatistics";
import styles from "./flowstatistics.css";

function FlowStatisticsPage() {
  return (
    <div className={styles.flowstat_div}>
      <Container fluid>
        <Row>
          <Col className={styles.col0_div}>
            <TodayStatistics />
          </Col>
          <Col className={styles.col1_div}>
            <TasksFlowChart />
          </Col>
        </Row>
        <Row>
          <Col>
            <TotalStatistics />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { FlowStatisticsPage };
