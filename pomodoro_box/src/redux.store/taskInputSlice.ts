
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionNames } from "./actionNames";
import { ITaskData, emptyTaskData } from "@/types/TaskData";

enum ModalMode {
  add = 0,
  edit = 1,
  confirm = 2
}

interface ITaskInputStore {
  modalIsOpened: boolean;
  modalMode?: ModalMode;
  taskData: ITaskData;
}

interface ActionPayloadData {
  modalMode: ModalMode;
  taskData: ITaskData;
}

type ActionType = PayloadAction<ActionPayloadData, string>;

type ThunkActionType = ThunkAction<
  void,
  ITaskInputStore,
  void,
  ActionType
>;

type DispatchType = ThunkDispatch<ITaskInputStore, void, ActionType>;

type DispatchTypeVoid = ThunkDispatch<ITaskInputStore, void, PayloadAction<void, string>>;

const initialState: ITaskInputStore = {
  modalIsOpened: false,
  taskData: emptyTaskData()
};

const emptyPayloadData = (): ActionPayloadData => ({
  modalMode: ModalMode.add,
  taskData: emptyTaskData()
});

const taskInputSlice = createSlice({
  name: ActionNames.TASKS_INPUT,
  initialState: initialState,

  reducers: {
    openTaskInputModal: (state: ITaskInputStore, action: ActionType) => {
      return {
        ...state,
        modalIsOpened: true,
        modalMode: action.payload.modalMode,
        taskData: action.payload.taskData
      }
    },
    closeTaskInputModal: (state: ITaskInputStore) => {
      return {
        ...state, modalIsOpened: false
      }
    }
  }
});

export const {
  openTaskInputModal,
  closeTaskInputModal
}
  = taskInputSlice.actions;

export {
  ModalMode,
  ITaskInputStore,
  ThunkActionType,
  DispatchType,
  DispatchTypeVoid,
  emptyPayloadData,
  taskInputSlice
};
