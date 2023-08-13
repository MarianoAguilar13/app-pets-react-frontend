import React from "react";
import { Header } from "../header";

export const Layout = ({ children }: any) => {
  return (
    <div className="container-layout">
      <Header></Header>
      <div className="contenido-layout">{children}</div>
    </div>
  );
};
