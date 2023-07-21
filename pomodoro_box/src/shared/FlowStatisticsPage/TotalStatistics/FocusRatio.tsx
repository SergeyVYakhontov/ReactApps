import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TFlowStatisticsKeeper } from "@/components/TFlowStatisticsKeeper/TFlowStatisticsKeeper";
import { IRootStoreData } from "@/store/rootStore";
import { ITasksFlowStore } from "@/store/tasksFlowSlice";
import { IconKind, Icon } from "@/components/Icon";
import styles from "./totalstatistics.css";

function FocusRatio() {
  const tasksFlowStore = useSelector<IRootStoreData, ITasksFlowStore>(
    (state) => state.tasksFlowStore);

  const flowStatisticsKeeper: TFlowStatisticsKeeper = new TFlowStatisticsKeeper(
    tasksFlowStore.tasksFlowMap,
    tasksFlowStore.weekToFilter);

  const totalStatData = flowStatisticsKeeper.totalStatData;

  return (
    <div className={styles.focustime_div} >
      <Container fluid >
        <Row>
          <Col xs={3}>
            <Icon iconKind={IconKind.FocusIcon} size={64} />
          </Col>
          <Col className={styles.focustime_caption}>
            <Container fluid >
              <Row>
                <Col>
                  <h6>
                    Фокус: {`${totalStatData.focusRatio}%`}
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

export { FocusRatio };
