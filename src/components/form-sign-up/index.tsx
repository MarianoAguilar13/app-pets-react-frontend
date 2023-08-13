import Css from "./index.module.css";
import { MainFieldSet } from "../../ui/fields-sets";
import { MainButton } from "../../ui/buttons";

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
  onSignUp?: any;
  onSetLoading?: any;
  onIsLoading?: any;
};

export function FormSignUp(props: PropsFormReportPet) {
  const setUserCreateData = props.onSignUp;
  const setIsLoading = props.onSetLoading;

  const submitHandler = (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      mail: e.target.mail.value,
      password: e.target.password.value,
      name: e.target.name.value,
      passwordRepetida: e.target.passwordRepetida.value,
    };
    //cada vez que hago el submit settea la nueva data al state
    //UserCreateData el cual despues se utiliza para hacer
    //la llamada de la api para crear la cuenta
    setUserCreateData(data);
  };

  return (
    <form onSubmit={submitHandler} className={Css.form}>
      <MainFieldSet
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
      <MainButton disabled={props.onIsLoading}>
        {props.buttonChildren}
      </MainButton>
    </form>
  );
}
