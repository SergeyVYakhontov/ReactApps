import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/form";
import { WSelectOptionList } from "@/types/TasksDateTime";
import { IRootStoreData } from "@/store/rootStore";
import * as tasksFlowSlice from "@/store/tasksFlowSlice";
import styles from "./tasksflowchart.css";

function WeekSelect() {
  const tasksFlowDispatch = useDispatch<tasksFlowSlice.DispatchType>();

  const tasksFlowStore = useSelector<IRootStoreData, tasksFlowSlice.ITasksFlowStore>(
    (state) => state.tasksFlowStore);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    tasksFlowDispatch(tasksFlowSlice.setWeekToFilter({
      ...tasksFlowSlice.emptyPayloadData(),
      weekToFilter: Number(e.target.value) }));
  };

  return (
    <div className={styles.weekselect_div}>
      <Form.Control
        value={tasksFlowStore.weekToFilter}
        onChange={onChangeHandler}
        as="select"
      >
        <option value="">Выберите неделю...</option>
        {WSelectOptionList.map(t =>
        (
          <option key={t.id.toString()} value={t.id}>{t.name}</option>
        ))}
      </Form.Control>
    </div >
  );
}

export { WeekSelect };