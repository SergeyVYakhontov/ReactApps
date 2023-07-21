import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { useSelector } from "react-redux";
import * as dateTimeFuncs from "@/utils/js/dateTimeFuncs";
import { IRootStoreData } from "@/store/rootStore";
import { ITasksFlowStore } from "@/store/tasksFlowSlice";
import { TFlowStatisticsKeeper } from "@/components/TFlowStatisticsKeeper";
import { CustomTooltip } from "./CustomTooltip";
import { computeTicks } from "./computeTicks";

function FlowBarChart() {
  const tasksFlowStore = useSelector<IRootStoreData, ITasksFlowStore>(
    (state) => state.tasksFlowStore);

  const flowStatisticsKeeper: TFlowStatisticsKeeper = new TFlowStatisticsKeeper(
    tasksFlowStore.tasksFlowMap,
    tasksFlowStore.weekToFilter);

  return (
    <BarChart
      width={1000}
      height={500}
      data={flowStatisticsKeeper.weekStatList}
      margin={{
        top: 30,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dayLabel" />
      <YAxis
        tickFormatter={tick => {
          return dateTimeFuncs.formatSeconds(tick);
        }}
        ticks={computeTicks(flowStatisticsKeeper.weekStatList)}
      />
      <Legend />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="workTime" fill="#7DCEA0" name="Время работы" />
      <Bar dataKey="pauseTime" fill="#85C1E9" name="Время на паузе" />
    </BarChart>
  );
}

export { FlowBarChart };
