import React, { useState, useEffect } from "react";
import { FormSignUp } from "../../components/form-sign-up";
import Css from "./index.module.css";
import { crearCuenta } from "../../api-hooks/api-hooks";
import { useRouter } from "next/navigation";
import {
  checkPasswordsHook,
  validateEmail,
} from "../../api-hooks/api-hooks-create-account";
import { SpinnerWhite } from "../../components/spinner-white";
import { Layout } from "@/components/layout";

const SignUp = () => {
  //contiene el state de los datos para crear una cuenta
  const [userCreateData, setUserCreateData] = useState({
    mail: "",
    password: "",
    name: "",
    passwordRepetida: "",
  });
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //el callback para enviar al fetch de la api para crear la cuenta
  //cuando se termine de ejecutar el fetch va a correr este callback
  const callbackCrearCuenta = (resultado: any) => {
    if (resultado.error) {
      setIsLoading(false);
      alert(resultado.error);
      alert("Por favor ingrese valores validos para poder crear su cuenta");
      push("/sign-up");
    } else {
      setIsLoading(false);
      alert("Su cuenta se ha creado correctamente");
      push("/sign-in");
    }
  };

  //checkea que las contraseñas sean iguales usando los datos del state userCreateData
  const resultCheckPass = checkPasswordsHook(userCreateData);
  //checkea que el mail en el state userCreateData tenga formato de mail
  const resultValidateMail = validateEmail(userCreateData);

  //cada vez que se modifica el state userCreateData hacer la llamada de la api
  useEffect(() => {
    if (userCreateData.mail) {
      if (resultCheckPass) {
        if (resultValidateMail) {
          //el crear cuenta nos permite envia los datos del state userCreateData
          //y con esos datos intenta crear la cuenta, despendiendo lo que devuelva la api
          //es lo que ejecutara el callback
          crearCuenta(
            userCreateData.mail,
            userCreateData.password,
            userCreateData.name,
            callbackCrearCuenta
          );
        } else {
          alert(
            "El mail ingresado, no tiene formato de mail, por favor ingrese un mail válido"
          );
        }
      } else {
        alert(
          "Las contraseñas ingresadas no coinciden, por favor ingrese los datos nuevamente"
        );
      }
    }
  }, [userCreateData]);

  return (
    <Layout>
      <div className={Css.container}>
        <h3 className={Css.containerTitulo}>Crear cuenta</h3>
        {isLoading && <SpinnerWhite></SpinnerWhite>}
        <FormSignUp
          onSignUp={setUserCreateData}
          onSetLoading={setIsLoading}
          onIsLoading={isLoading}
          idInputUno="mail-input"
          nameInputUno="mail"
          typeInputUno="email"
          labelNameUno="MAIL"
          idInputDos="name-input"
          nameInputDos="name"
          typeInputDos="text"
          labelNameDos="NAME"
          idInputTres="password-input"
          nameInputTres="password"
          typeInputTres="password"
          labelNameTres="CONTRASEÑA"
          idInputCuatro="password-repetida-input"
          nameInputCuatro="passwordRepetida"
          typeInputCuatro="password"
          labelNameCuatro="REPETIR CONTRASEÑA"
          buttonChildren="Enviar"
        ></FormSignUp>
      </div>
    </Layout>
  );
};

export default SignUp;
