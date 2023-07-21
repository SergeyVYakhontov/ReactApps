import React from "react";
import classnames from "classnames";
import { CssClassNames } from "@/constants/cssClassNames";
import styles from "./manual.css";

function Manual() {
  const divClassName = classnames(styles.manual_div, CssClassNames.divPanel);

  return (
    <div className={divClassName}>
      <h4>Ура! Теперь можно начать работать:</h4>
      <hr className={styles.manual_hr} />
      <ul>
        <li>Выберите категорию и напишите название текущей задачи</li>
        <li>Запустите таймер («помидор»)</li>
        <li>Работайте пока «помидор» не прозвонит</li>
        <li>Сделайте короткий перерыв (3-5 минут)</li>
        <li>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
      </ul>
    </div>
  );
}

export { Manual };
