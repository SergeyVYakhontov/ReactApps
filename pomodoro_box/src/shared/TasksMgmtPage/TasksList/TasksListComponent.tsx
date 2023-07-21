import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import BootstrapTable, { RowSelectionType } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { IdType } from "@/types/commonTypes";
import * as AddTaskModal from "./AddTaskModal";
import * as EditTaskModal from "./EditTaskModal";
import { confirmModal } from "./confirmModal";
import { tableColumns } from "./tableColumns";
import { TasksCollection } from "@/types/TaskData";
import classnames from "classnames";
import { CssClassNames } from "@/constants/cssClassNames";
import styles from "./taskslist.css";

interface ITasksListProps {
  tasksCollection: TasksCollection;
  currTaskId: IdType;
  showAdddModal: boolean;
  showEditModal: boolean;
  showConfirmModal: boolean;
  onRowSelect: (row: any, isSelected: boolean, rowIndex: number) => void;
  onAddTaskButtonClick: () => void;
  disabled: boolean;
}

function TasksListComponent(props: ITasksListProps) {
  const {
    tasksCollection,
    currTaskId,
    showAdddModal,
    showEditModal,
    showConfirmModal,
    onRowSelect,
    onAddTaskButtonClick,
    disabled
  } = props;

  const selectRowProps = {
    mode: "radio" as RowSelectionType,
    clickToSelect: true,
    classes: styles.selected_row,
    onSelect: onRowSelect,
    hideSelectColumn: true,
    selected: [currTaskId]
  };

  let divClassName;

  if (disabled) {
    divClassName = classnames(styles.taskslist_container, CssClassNames.divPanel, CssClassNames.divDisabled);
  }
  else {
    divClassName = classnames(styles.taskslist_container, CssClassNames.divPanel);
  }

  return (
    <>
      <Container fluid className={divClassName}>
        <Row>
          <Col>
            <Button
              variant="primary"
              onClick={onAddTaskButtonClick}
              className={styles.addbutton}
            >
              Добавить задачу
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <BootstrapTable
              keyField="id"
              data={tasksCollection}
              columns={tableColumns(tasksCollection)}
              pagination={paginationFactory({})}
              headerClasses={styles.taskslist_header}
              selectRow={selectRowProps}
              bootstrap4={true}
            />
          </Col>
        </Row>
      </Container>
      {showAdddModal && <AddTaskModal.ModalContainer />}
      {showEditModal && <EditTaskModal.ModalContainer />}
      {confirmModal(showConfirmModal)}
    </>
  );
}

export { TasksListComponent };
