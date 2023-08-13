import React from "react";
import Css from "./index.module.css";

export function MainButton(props: any) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={Css.mainButton}
    >
      {props.children}{" "}
    </button>
  );
}

export function ButtonMapBox(props: any) {
  return (
    <button
      onClick={props.onClick}
      style={props.style}
      disabled={props.disabled}
      className={Css.mainButton}
    >
      {props.children}{" "}
    </button>
  );
}

export function ButtonCard(props: any) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={Css.buttonCard}
    >
      {props.children}{" "}
    </button>
  );
}
