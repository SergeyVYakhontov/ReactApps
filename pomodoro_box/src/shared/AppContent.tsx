import React from "react";
import { TasksMgmtPage } from "./TasksMgmtPage/TasksMgmtPage";
import { FlowStatisticsPage } from "./FlowStatisticsPage";
import { AppCaption } from "./AppCaption";
import { MainPageKind } from "@/types/MainPageKind";
import * as EditAppSettings from "./AppSettings/EditAppSettings";
import { useTasksFlow } from "@/hooks/useTasksFlow";
import { useTasksDataAndFlow } from "@/hooks/useTasksDataAndFlow";
import styles from "./appcontent.css";

function AppContent({ mainPageKind }: { mainPageKind: MainPageKind }) {
  useTasksFlow();
  useTasksDataAndFlow();

  return (
    <div className={styles.app_div}>
      <div className={styles.appcaption_div}>
        <AppCaption />
      </div>
      <div className={styles.appcontent_div}>
        {mainPageKind === MainPageKind.taskMgmt && <TasksMgmtPage />}
        {mainPageKind === MainPageKind.flowStat && <FlowStatisticsPage />}
        <EditAppSettings.EditContainer />
      </div>
    </div>
  );
}

export { AppContent };
