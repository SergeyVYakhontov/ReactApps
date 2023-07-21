import React from "react";
import lodash from "lodash";
import * as dateTimeFuncs from "@/utils/js/dateTimeFuncs";
import classnames from "classnames";
import styles from "./flowbarchart.css";

const CustomTooltip = (
  { active, payload, label }:
    { active?: any, payload?: any[], label?: any }
) => {
  if (
    lodash.isUndefined(active) ||
    lodash.isUndefined(active) ||
    lodash.isUndefined(active)
  ) {
    return <></>;
  }

  const divClassName = classnames(styles.recharts_tooltip, "recharts-default-tooltip");
  const ulClassName = classnames(styles.recharts_ul, "rechart-tooltip-item-list");
  const liClassName = classnames(styles.recharts_li, "rechart-tooltip-item");

  const stopCountIndex = 2;

  const itemValueRepr = (item: any, index: number) =>
    (index === stopCountIndex ? item.value : dateTimeFuncs.formatSeconds(Number(item.value)));

  return (
    <div className={divClassName}>
      <p className={styles.recharts_label}>{label}</p>
      <ul className={ulClassName}>
        {payload?.map((item, index) => {
          return (
            <li
              key={item.dataKey}
              className={liClassName}
              style={{ color: item.fill }}
            >
              {`${item.name}: ${itemValueRepr(item, index)}`}
            </li>
          )
        })
        }
      </ul>
    </div>
  );
};

export { CustomTooltip };
