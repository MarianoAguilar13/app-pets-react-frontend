import React, { useState, useEffect } from "react";
import Css from "./index.module.css";
import { myData } from "../../api-hooks/api-hooks";
import { useRecoilState, useRecoilValue } from "recoil";
import { valueName } from "../../atoms/atoms";

type PropsInput = {
  idInput: string;
  nameInput: string;
  typeInput: string;
  nameValue?: boolean;
};

type PropsInputEditPet = {
  idInput: string;
  nameInput: string;
  typeInput: string;
  nameValue?: any;
  typeValue?: any;
  urlValue?: any;
};

export function MainInput(props: PropsInput) {
  const [inicializar, setInicializar] = useState(true);

  //utilizo aca un state recoil, para el valor el name, ya que este
  //va a cambiar cuando se ingrese un nuevo name en mis datos
  //por lo tanto el name a mostrar va a estar actualizado
  const [dataValue, setDataValue] = useRecoilState(valueName);
  const callbackSetName = (datosUser: any) => {
    setDataValue(datosUser.name);
  };

  //busca el name a la base de datos segun el token que se genero
  //con anterioridad cuando se ingreso sesion
  useEffect(() => {
    myData(callbackSetName);
  }, [inicializar]);
  //name value es una props que nos indica que va a ser un imput
  //cuyo nombre se va a mostrar
  /*
  typeValue?;
  descriptionValue?;
  urlValue?;
*/
  return props.nameValue ? (
    <input
      defaultValue={dataValue || ""}
      className={Css.mainInputText}
      id={props.idInput}
      name={props.nameInput}
      type={props.typeInput}
    />
  ) : (
    <input
      className={Css.mainInputText}
      id={props.idInput}
      name={props.nameInput}
      type={props.typeInput}
    />
  );
}

export function InputEditPet(props: PropsInputEditPet) {
  return props.nameValue || props.typeValue || props.urlValue ? (
    <input
      defaultValue={props.nameValue || props.typeValue || props.urlValue || ""}
      className={Css.mainInputText}
      id={props.idInput}
      name={props.nameInput}
      type={props.typeInput}
    />
  ) : (
    <input
      className={Css.mainInputText}
      id={props.idInput}
      name={props.nameInput}
      type={props.typeInput}
    />
  );
}
