import React from "react";
import { ISvgProps } from "@/types/commonTypes";
import styles from "./icons.css";

function FocusIcon(props: ISvgProps) {
  return (
    <svg className={props.className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle className={styles.st0} cx="32" cy="32" r="32" />
      <g className={styles.st1}>
        <path className={styles.st2} d="M16.5,28c-0.8,0-1.5-0.7-1.5-1.5v-8c0-0.8,0.7-1.5,1.5-1.5h8c0.8,0,1.5,0.7,1.5,1.5S25.3,20,24.5,20H18v6.5   C18,27.3,17.3,28,16.5,28z" />
      </g>
      <g className={styles.st1}>
        <path className={styles.st2} d="M47.5,28c-0.8,0-1.5-0.7-1.5-1.5V20h-6.5c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5h8c0.8,0,1.5,0.7,1.5,1.5v8   C49,27.3,48.3,28,47.5,28z" />
      </g>
      <g className={styles.st1}>
        <path className={styles.st2} d="M47.5,51h-8c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5H46v-6.5c0-0.8,0.7-1.5,1.5-1.5c0.8,0,1.5,0.7,1.5,1.5v8   C49,50.3,48.3,51,47.5,51z" />
      </g>
      <g className={styles.st1}>
        <path className={styles.st2} d="M24.5,51h-8c-0.8,0-1.5-0.7-1.5-1.5v-8c0-0.8,0.7-1.5,1.5-1.5c0.8,0,1.5,0.7,1.5,1.5V48h6.5   c0.8,0,1.5,0.7,1.5,1.5S25.3,51,24.5,51z" />
      </g>
      <g className={styles.st1}>
        <path className={styles.st2} d="M35,38.5h-6c-0.8,0-1.5-0.7-1.5-1.5v-6c0-0.8,0.7-1.5,1.5-1.5h6c0.8,0,1.5,0.7,1.5,1.5v6   C36.5,37.8,35.8,38.5,35,38.5z M30.5,35.5h3v-3h-3V35.5z" />
      </g>
      <polyline className={styles.st3} points="16.5,24.5 16.5,16.5 24.5,16.5 " />
      <polyline className={styles.st3} points="39.5,16.5 47.5,16.5 47.5,24.5 " />
      <polyline className={styles.st3} points="47.5,39.5 47.5,47.5 39.5,47.5 " />
      <polyline className={styles.st3} points="24.5,47.5 16.5,47.5 16.5,39.5 " />
      <rect x="29" y="29" className={styles.st4} width="6" height="6" />
    </svg>
  );
}

export { FocusIcon };
