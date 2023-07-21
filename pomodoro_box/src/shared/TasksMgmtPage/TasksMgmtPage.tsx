import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Manual } from "../Manual";
import { TasksFlow } from "./TasksFlow";
import { TasksListContainer } from "./TasksList";

function TasksMgmtPage() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Manual />
        </Col>
        <Col>
          <TasksFlow />
        </Col>
      </Row>
      <Row>
        <Col>
          <TasksListContainer />
        </Col>
      </Row>
    </Container>
  );
}

export { TasksMgmtPage };
