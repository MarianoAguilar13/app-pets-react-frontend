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
  buttonChildren: string;
  onLogin?: any;
  onSetLoading?: any;
  onIsLoading?: any;
};

export function FormSignIn(props: PropsFormReportPet) {
  const setUserLogin = props.onLogin;
  const setIsLoading = props.onSetLoading;

  const submitHandler = (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const userData = {
      mail: e.target.mail.value,
      password: e.target.password.value,
    };

    setUserLogin(userData);
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
      <MainButton disabled={props.onIsLoading}>
        {props.buttonChildren}
      </MainButton>
    </form>
  );
}
