import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { formatSeconds } from "@/utils/js/dateTimeFuncs";
import { TFlowStatisticsKeeper } from "@/components/TFlowStatisticsKeeper/TFlowStatisticsKeeper";
import { IRootStoreData } from "@/store/rootStore";
import { ITasksFlowStore } from "@/store/tasksFlowSlice";
import { IconKind, Icon } from "@/components/Icon";
import styles from "./totalstatistics.css";

function PauseTime() {
  const tasksFlowStore = useSelector<IRootStoreData, ITasksFlowStore>(
    (state) => state.tasksFlowStore);

  const flowStatisticsKeeper: TFlowStatisticsKeeper = new TFlowStatisticsKeeper(
    tasksFlowStore.tasksFlowMap,
    tasksFlowStore.weekToFilter);

  const totalStatData = flowStatisticsKeeper.totalStatData;

  return (
    <div className={styles.pausetime_div}>
      <Container fluid >
        <Row>
          <Col xs={3}>
            <Icon iconKind={IconKind.PauseIcon} size={64} />
          </Col>
          <Col className={styles.pausetime_caption}>
            <Container fluid >
              <Row>
                <Col>
                  <h6>
                    Время на паузе:
                  </h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6>
                    {formatSeconds(totalStatData.pauseTime)}
                  </h6>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { PauseTime };
