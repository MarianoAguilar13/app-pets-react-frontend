import React from "react";
import Css from "./index.module.css";
import { MainFieldSet } from "../../ui/fields-sets";
import { MainButton } from "../../ui/buttons";
import { useRecoilState } from "recoil";
import { valueName } from "../../atoms/atoms";

type PropsFormReportPet = {
  idInputUno: string;
  nameInputUno: string;
  typeInputUno: string;
  labelNameUno: string;
  idInputDos: string;
  nameInputDos: string;
  typeInputDos: string;
  labelNameDos: string;
  idInputTres: string;
  nameInputTres: string;
  typeInputTres: string;
  labelNameTres: string;
  idInputCuatro: string;
  nameInputCuatro: string;
  typeInputCuatro: string;
  labelNameCuatro: string;
  buttonChildren: string;
  onSubmit?: {};
  onEdit?: any;
  nameValue?: boolean;
  onSetLoading?: any;
  onIsLoading?: any;
};

export function FormEditMisDatos(props: PropsFormReportPet) {
  const setMisDatos = props.onEdit;
  const setIsLoading = props.onSetLoading;
  const [dataValue, setDataValue] = useRecoilState(valueName);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    //se settea el nuevo name para que el input lo muestre en mis datos
    setDataValue(e.target.name.value);

    const data = {
      name: e.target.name.value,
      password: e.target.password.value,
      newPassword: e.target.newPassword.value,
      newPasswordRepetido: e.target.newPasswordRepetido.value,
    };
    //settea los datos en el state MisDatos el cual despues se escucharan
    //los datos en la page editMisDatos
    setMisDatos(data);
  };
  /*
  const [hiddenButton, setHiddenButton] = useState(false);

  const mostrarBoton = () => {
    setHiddenButton(false);
  };

  const ocultarBoton = () => {
    setHiddenButton(true);
  };*/

  return (
    <form onSubmit={submitHandler} className={Css.form}>
      <MainFieldSet
        nameValue={true}
        idInput={props.idInputUno}
        nameInput={props.nameInputUno}
        typeInput={props.typeInputUno}
        labelName={props.labelNameUno}
      ></MainFieldSet>
      <MainFieldSet
        idInput={props.idInputDos}
        nameInput={props.nameInputDos}
        typeInput={props.typeInputDos}
        labelName={props.labelNameDos}
      ></MainFieldSet>
      <MainFieldSet
        idInput={props.idInputTres}
        nameInput={props.nameInputTres}
        typeInput={props.typeInputTres}
        labelName={props.labelNameTres}
      ></MainFieldSet>
      <MainFieldSet
        idInput={props.idInputCuatro}
        nameInput={props.nameInputCuatro}
        typeInput={props.typeInputCuatro}
        labelName={props.labelNameCuatro}
      ></MainFieldSet>
      <MainButton
        disabled={props.onIsLoading}
        /*
        onClick={setHiddenButton}
        style={{ display: hiddenButton ? "flex" : "none" }}*/
      >
        {props.buttonChildren}
      </MainButton>
    </form>
  );
}
