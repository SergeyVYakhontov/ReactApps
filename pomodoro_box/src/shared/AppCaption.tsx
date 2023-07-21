import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/button";
import { RoutePaths } from "@/constants/routePaths";
import { MainPageKind } from "@/types/MainPageKind";
import { IconKind, Icon } from "@/components/Icon";
import { useTimerIsPlaying } from "@/hooks/useTimerIsPlaying";
import * as appSettingsSlice from "@/store/appSettingsSlice";
import classnames from "classnames";
import { CssClassNames } from "@/constants/cssClassNames";
import styles from "./appcontent.css";

const mainPageKindByPath = (pathname: string): MainPageKind => {
  switch (pathname) {
    case RoutePaths.tasksMgmtPage:
      {
        return MainPageKind.taskMgmt;
      }
    case RoutePaths.statisticsPage:
      {
        return MainPageKind.flowStat;
      }
  }

  return MainPageKind.taskMgmt;
};

function AppCaption() {
  const location = useLocation()
  const navigate = useNavigate();

  const appSettingsDispatchVoid = useDispatch<appSettingsSlice.DispatchTypeVoid>();

  const onSettingsButtonclick = () => {
    appSettingsDispatchVoid(appSettingsSlice.openAppSettingsModal());
  }

  const [disabled] = useTimerIsPlaying();
  const mainPageKind = mainPageKindByPath(location.pathname);

  const onMainPageButtonclick = () => {
    switch (mainPageKind) {
      case MainPageKind.taskMgmt:
        {
          navigate(RoutePaths.statisticsPage);
          break;
        }
      case MainPageKind.flowStat:
        {
          navigate(RoutePaths.tasksMgmtPage);
          break;
        }
    }
  };

  let divClassName = "";

  if (disabled) {
    divClassName = classnames(CssClassNames.divDisabled);
  }

  return (
    <Container fluid className={divClassName}>
      <Row>
        <Col xs={1}>
          <Icon iconKind={IconKind.PomodoroIcon} size={32} />
        </Col>
        <Col xs={2} className={styles.pombox_div}>
          <h5 className={styles.pombox_h5}>pomodoro_box</h5>
        </Col>
        <Col xs={7}>
          <Button
            variant="link"
            onClick={onSettingsButtonclick}
          >
            Настройки
          </Button>
        </Col>
        <Col xs={2}>
          <Button
            variant="link"
            onClick={onMainPageButtonclick}
          >
            {mainPageKind === MainPageKind.taskMgmt && "Статистика"}
            {mainPageKind === MainPageKind.flowStat && "Главная страница"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export { AppCaption };
