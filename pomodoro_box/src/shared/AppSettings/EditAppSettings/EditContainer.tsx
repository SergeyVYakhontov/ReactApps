import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootStoreData } from "@/store/rootStore";
import { IAppSettings } from "@/types/appSettings";
import { loadAppSettings, saveAppSettings } from "@/store/localStorageFuncs";
import { defaultAppSettings } from "@/store/defaultAppSettings";
import * as appSettingsSlice from "@/store/appSettingsSlice";
import { EditComponent } from "./EditComponent";

export const EditContainer = () => {
  const appSettingsDispatch = useDispatch<appSettingsSlice.DispatchType>();
  const appSettingsDispatchVoid = useDispatch<appSettingsSlice.DispatchTypeVoid>();

  const appSettingsStore = useSelector<IRootStoreData, appSettingsSlice.IAppSettingsStore>(
    (state) => state.appSettingsStore);

  const appSettings = appSettingsStore.appSettings;

  const [editData, setEditData] = useState<IAppSettings>(appSettings);
  const [dataChanged, setDataChanged] = useState(false);
  const [validated, setValidated] = useState(false);

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEditData: IAppSettings = {
      ...editData,
      [event.target.name]: Number(event.target.value)
    };

    setEditData(newEditData);
    setDataChanged(true);
  };

  const onNotifChanged = () => {
    const newEditData: IAppSettings = {
      ...editData,
      notifications: !editData.notifications
    };

    setEditData(newEditData);
    setDataChanged(true);
  };

  const onSubmitButtonClick = (event: React.MouseEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);

      return;
    }

    setDataChanged(false);

    appSettingsDispatch(appSettingsSlice.setCurrentSettings({
      ...appSettingsSlice.emptyPayloadData(),
      appSettings: editData
    }));

    appSettingsDispatch(saveAppSettings(editData));
    appSettingsDispatchVoid(appSettingsSlice.closeAppSettingsModal());
  };

  const onCloseButtonClick = () => {
    appSettingsDispatchVoid(appSettingsSlice.closeAppSettingsModal());
  };

  useEffect(() => {
    appSettingsDispatch(loadAppSettings(defaultAppSettings()));
  }, []);

  useEffect(() => {
    setEditData(appSettings);
  }, [appSettings]);

  const modalIsOpened = appSettingsStore.modalIsOpened;
  const submitButtonDisable = !dataChanged;

  const props = {
    editData,
    dataChanged,
    onValueChange,
    onNotifChanged,
    onSubmitButtonClick,
    onCloseButtonClick,
    modalIsOpened,
    submitButtonDisable,
    validated
  };

  return <EditComponent {...props} />;
}
