import { type } from "os";
import React from "react";
import Css from "./index.module.css";

type PropsLabel = {
  id: string;
  children: any;
};

export function MainLabel(props: PropsLabel) {
  return (
    <label className={Css.mainLabel} htmlFor={props.id}>
      {props.children}
    </label>
  );
}
