import lodash from "lodash";
import { IdType } from "@/types/commonTypes";
import { ITaskData, emptyTaskData } from "@/types/TaskData";
import { generateComponentId } from "@/utils/js/generateComponentId";
import { TasksCollection } from "@/types/TaskData";

class TasksDataRunner {
  public constructor(
    taskId: IdType,
    tasksDataList: TasksCollection = []
  ) {
    this.#taskId = taskId;
    this.#tasksDataList = lodash.cloneDeep(tasksDataList);
  }

  public get taskData() {
    return this.#taskData;
  }

  public get tasksDataList() {
    return this.#tasksDataList;
  }

  public setCurrentTask(taskData: ITaskData) {
    if (lodash.isEmpty(this.#tasksDataList)) {
      this.#taskData = emptyTaskData();

      return;
    }

    const itemIndex = this.#tasksDataList.findIndex(t => t.id === taskData.id);

    if (itemIndex === TasksDataRunner.#noIndex) {
      this.#taskData = this.#tasksDataList[0];
    }
    else {
      this.#taskData = this.#tasksDataList[itemIndex];
    }
  }

  public createTask(taskData: ITaskData) {
    taskData.id = generateComponentId();

    this.#tasksDataList.push(taskData);
  }

  public updateTask(taskData: ITaskData) {
    const itemIndex = this.#tasksDataList.findIndex(t => t.id === taskData.id);

    this.#tasksDataList[itemIndex] = taskData;
  }

  public deleteTask(taskData: ITaskData) {
    const itemIndex = this.#tasksDataList.findIndex(t => t.id === taskData.id);

    this.#tasksDataList.splice(itemIndex, 1);
  }

  static #noIndex = -1;

  #taskId: IdType;
  #taskData: ITaskData = emptyTaskData();
  #tasksDataList: TasksCollection;
}

export { TasksDataRunner };
