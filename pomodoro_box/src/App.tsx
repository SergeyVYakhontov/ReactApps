import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { RoutePaths } from "@/constants/routePaths";
import { MainPageKind } from "@/types/MainPageKind";
import {AppContent} from "./shared/AppContent";
import "./main.global.css";
import "./css/bootstrap.min.css";
import "node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*"
            element={<AppContent mainPageKind={MainPageKind.taskMgmt} />}
          />
          <Route
            path={RoutePaths.root}
            element={<AppContent mainPageKind={MainPageKind.taskMgmt} />}
          />
          <Route
            path={RoutePaths.statisticsPage}
            element={<AppContent mainPageKind={MainPageKind.flowStat} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
