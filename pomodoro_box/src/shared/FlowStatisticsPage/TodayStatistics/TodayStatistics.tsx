import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classnames from "classnames";
import { CssClassNames } from "@/constants/cssClassNames";
import { getDateTimeInfo } from "@/utils/js/dateTimeFuncs";
import { PomodoroCount } from "./PomodoroCount";
import { WorkTime } from "./WorkTime";
import styles from "./todaystatistics.css";

function TodayStatistics() {
  const divClassName = classnames(styles.today_div, CssClassNames.divPanel);
  const dateTimeInfo = getDateTimeInfo();

  return (
    <div className={divClassName} >
      <Container fluid>
        <Row className={styles.caption_div}>
          <Col>
            <h5>Статистика за сегодня</h5>
            <h6 className={styles.todaycaption}>
              {`${dateTimeInfo.todayCaption}, ${dateTimeInfo.weekDayName}`}
            </h6>
          </Col>
        </Row>
        <Row className={styles.worktime_row}>
          <Col>
            <WorkTime />
          </Col>
        </Row>
        <Row className={styles.pomcount_row}>
          <Col>
            <PomodoroCount />
          </Col>
        </Row>
      </Container>
    </div >
  );
}

export { TodayStatistics };
