import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IconKind, Icon } from "@/components/Icon";
import { TFlowStatisticsKeeper } from "@/components/TFlowStatisticsKeeper/TFlowStatisticsKeeper";
import { IRootStoreData } from "@/store/rootStore";
import { ITasksFlowStore } from "@/store/tasksFlowSlice";
import { pomodoroRepr } from "@/utils/js/itemsRepr";
import styles from "./todaystatistics.css";

function PomodoroCount() {
  const tasksFlowStore = useSelector<IRootStoreData, ITasksFlowStore>(
    (state) => state.tasksFlowStore);

  const flowStatisticsKeeper: TFlowStatisticsKeeper = new TFlowStatisticsKeeper(
    tasksFlowStore.tasksFlowMap,
    tasksFlowStore.weekToFilter);

  const dayStatData = flowStatisticsKeeper.dayStatData;

  return (
    <div className={styles.pomcount_div}>
      <Container fluid className={styles.container_div}>
        <Row className={styles.pomicon_row}>
          <Col>
            <Icon iconKind={IconKind.PomodoroIcon} size={64} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 className={styles.pomcountcaption}>
              <p>В процессе работы использовано:</p>
              <p className={styles.pomcount_p}>
                {`${dayStatData.pomodoroCount} ${pomodoroRepr(dayStatData.pomodoroCount)}`}
              </p>
            </h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { PomodoroCount };
