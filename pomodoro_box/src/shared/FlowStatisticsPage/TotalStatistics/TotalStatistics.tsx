import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classnames from "classnames";
import { CssClassNames } from "@/constants/cssClassNames";
import { FocusRatio } from "./FocusRatio";
import { PauseTime } from "./PauseTime";
import { StopTime } from "./StopCount";
import styles from "./totalstatistics.css";

function TotalStatistics() {
  const divClassName = classnames(styles.total_div, CssClassNames.divPanel);

  return (
    <div className={divClassName}>
      <Container fluid>
      <Row className={styles.totalcapt_div}>
          <Col>
            <h5>Статистика за все время</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <FocusRatio />
          </Col>
          <Col>
            <PauseTime />
          </Col>
          <Col>
            <StopTime />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { TotalStatistics };
