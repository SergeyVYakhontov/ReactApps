import { TasksCollection } from "@/types/TaskData";
import { actionButtons } from "./actionButtons";
import styles from "./taskslist.css";

const tableColumns = (tasksCollection: TasksCollection) => [
  {
    dataField: "id",
    text: "id",
    hidden: true
  },
  {
    dataField: "rowNumber",
    text: "№",
    headerStyle: { width: "5%", verticalAlign: "middle" },
    classes: styles.tablecell,
    sort: true
  },
  {
    dataField: "category",
    text: "Категория",
    headerStyle: { width: "15%", verticalAlign: "middle" },
    classes: styles.tablecell,
    sort: true
  },
  {
    dataField: "name",
    text: "Наименование задачи",
    headerStyle: { verticalAlign: "middle" },
    classes: styles.tablecell,
    sort: true
  },
  {
    dataField: "pomodoroCount",
    text: "Помидоры",
    headerStyle: { width: "10%", verticalAlign: "middle" },
    classes: styles.tablecell,
    sort: true
  },
  {
    dataField: "lastUpdateTimeRepr",
    text: "Последнее время работы",
    headerStyle: { width: "15%", verticalAlign: "middle" },
    classes: styles.tablecell,
    sort: true
  },
  {
    dataField: "actions",
    text: "Действия",
    formatter: actionButtons(tasksCollection),
    headerStyle: { width: "25%", verticalAlign: "middle" }
  }
];

export { tableColumns };