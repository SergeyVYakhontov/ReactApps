import {
  createSlice,
  PayloadAction,
  ActionReducerMapBuilder
} from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import { ActionNames } from "./actionNames";
import { IdType } from "@/types/commonTypes";
import { AsyncStoreStatus } from "./asyncStoreStatus";
import { IAppSettings } from "@/types/appSettings";
import { loadAppSettings, saveAppSettings } from "./localStorageFuncs";
import { defaultAppSettings } from "@/store/defaultAppSettings";

interface IAppSettingsStore {
  appSettings: IAppSettings;
  storeStatus: AsyncStoreStatus;
  errorMessage?: string;
  modalIsOpened: boolean;
}

interface ActionPayloadData {
  id: IdType;
  appSettings: IAppSettings;
}

type ActionType = PayloadAction<Readonly<ActionPayloadData>, string>;
type DispatchType = ThunkDispatch<IAppSettingsStore, void, ActionType>;
type DispatchTypeVoid = ThunkDispatch<IAppSettingsStore, void, PayloadAction<void, string>>;

const initialState: IAppSettingsStore = {
  appSettings: defaultAppSettings(),
  storeStatus: AsyncStoreStatus.idle,
  modalIsOpened: false
};

const emptyPayloadData = (): ActionPayloadData => ({
  id: "",
  appSettings: defaultAppSettings(),
});

function loadAppSettingsReducer(builder: ActionReducerMapBuilder<IAppSettingsStore>): void {
  builder.addCase(
    loadAppSettings.pending,
    (state) => {
      state.storeStatus = AsyncStoreStatus.loading;
    });

  builder.addCase(
    loadAppSettings.fulfilled,
    (state, { payload }) => {

      return {
        ...state,
        appSettings: payload.item,
        storeStatus: AsyncStoreStatus.success
      };
    });

  builder.addCase(
    loadAppSettings.rejected,
    (state, { payload }) => {
      if (payload) {
        state.errorMessage = payload.toString();
      }

      state.storeStatus = AsyncStoreStatus.error;
    });
}

function saveAppSettingsReducer(builder: ActionReducerMapBuilder<IAppSettingsStore>): void {
  builder.addCase(
    saveAppSettings.pending,
    (state) => {
      state.storeStatus = AsyncStoreStatus.loading;
    });

  builder.addCase(
    saveAppSettings.fulfilled,
    (state) => {

      return {
        ...state,
        storeStatus: AsyncStoreStatus.success
      }
    });

  builder.addCase(
    saveAppSettings.rejected,
    (state, { payload }) => {
      if (payload) {
        state.errorMessage = payload.toString();
      }

      state.storeStatus = AsyncStoreStatus.error;
    });
}

const appSettingsSlice = createSlice({
  name: ActionNames.APP_SETTINGS,
  initialState,
  reducers: {
    setCurrentSettings: (state: IAppSettingsStore, action: ActionType) => {
      return {
        ...state,
        appSettings: action.payload.appSettings,
      };
    },
    openAppSettingsModal: (state: IAppSettingsStore) => {
      return {
        ...state,
        modalIsOpened: true,
      }
    },
    closeAppSettingsModal: (state: IAppSettingsStore) => {
      return {
        ...state,
        modalIsOpened: false
      }
    }
  },
  extraReducers: (builder) => {
    loadAppSettingsReducer(builder);
    saveAppSettingsReducer(builder);
  },
});

export const {
  setCurrentSettings,
  openAppSettingsModal,
  closeAppSettingsModal
}
  = appSettingsSlice.actions;

export {
  IAppSettingsStore,
  DispatchType,
  DispatchTypeVoid,
  emptyPayloadData,
  appSettingsSlice
};
