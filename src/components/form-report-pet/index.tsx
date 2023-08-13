import { useRouter } from "next/router";
import Css from "./index.module.css";
import { MainFieldSet } from "../../ui/fields-sets";
import { MainButton } from "../../ui/buttons";
import { FieldSetTextArea } from "../../ui/fields-sets";
import { useRecoilState } from "recoil";
import { mailUser } from "../../atoms/atoms";
import { crearTextoHook } from "../../api-hooks/api-hooks-reportar-pet";
import { enviarMailHook } from "../../api-hooks/api-hooks-reportar-pet";

type PropsFormReportPet = {
  idInputUno: string;
  nameInputUno: string;
  typeInputUno: string;
  labelNameUno: string;
  idInputDos: string;
  nameInputDos: string;
  typeInputDos: string;
  labelNameDos: string;
  idTextArea: string;
  nameTextArea: string;
  labelNameTres: string;
  buttonChildren: string;
  onSubmit?: {};
  onSetLoading?: any;
  onIsLoading?: any;
};

export function FormReportPet(props: PropsFormReportPet) {
  const [mailUserOwner, setMailUserOwner] = useRecoilState(mailUser);
  const { push } = useRouter();
  const setIsLoading = props.onSetLoading;

  //si el fetch sale bien entonces mostramos con una alerta el msj
  const callbackEnviarMail = (respuesta: any) => {
    setIsLoading(false);
    alert(respuesta.message);
    push("/");
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const name = e.target.nombre.value;
    const tel = e.target.telefono.value;
    const telCheck = parseInt(e.target.telefono.value, 10);
    const msj = e.target.msj.value;

    //primero se checkea que exista todos los datos
    if (
      Number.isInteger(telCheck) &&
      tel.length >= 10 &&
      name.length > 0 &&
      msj.length > 0
    ) {
      //luego se crea el texto en base a los datos del form
      const text = crearTextoHook(name, tel, msj);
      console.log(
        "este es el texto a envia: ",
        text,
        " este es el mail: ",
        mailUserOwner.mail
      );
      //se envia el mail con el fetch
      enviarMailHook(mailUserOwner.mail, text, callbackEnviarMail);
    } else {
      setIsLoading(false);
      alert(
        "Recuerde que deben completarse todos los datos para enviar el reporte y el número de teléfono debe contener carecterística y número"
      );
    }
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
      <FieldSetTextArea
        idTextArea={props.idTextArea}
        nameTextArea={props.nameTextArea}
        labelName={props.labelNameTres}
      ></FieldSetTextArea>
      <MainButton disabled={props.onIsLoading}>
        {props.buttonChildren}
      </MainButton>
    </form>
  );
}
