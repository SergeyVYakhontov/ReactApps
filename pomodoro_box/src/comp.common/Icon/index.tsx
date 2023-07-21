import React from "react";
import classnames from "classnames/bind";
import { ISvgProps, IconSize } from "@/types/commonTypes";
import styles from "./icon.css";

const icons = require("@/icons/index") as
  Record<string, (props: ISvgProps) => React.ReactElement>;

enum IconKind {
  PomodoroIcon,
  FocusIcon,
  PauseIcon,
  StopIcon
}

interface IIconProps {
  iconKind: IconKind;
  size?: IconSize;
}

const Icon = (props: Readonly<IIconProps>) => {
  const { iconKind, size = 12 } = props;

  const cx = classnames.bind(styles);
  const className = cx([`s${size}`]);

  return icons[IconKind[iconKind]]({ className: className });
};

export { IconKind, Icon };