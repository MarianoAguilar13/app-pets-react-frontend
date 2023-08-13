import React, { useState } from "react";
import { useRouter } from "next/router";
import Css from "./index.module.css";
import { useRecoilState } from "recoil";
import { userLogin, userCreate, misDatos, checkToken } from "../../atoms/atoms";

function Header() {
  const [userCreateData, setUserCreateData] = useRecoilState(userCreate);
  const [misDatosData, setMisDatosData] = useRecoilState(misDatos);
  const [userLoginState, setUserLoginState] = useRecoilState(userLogin);
  const [checkTokenValid, setCheckTokenValid] = useRecoilState(checkToken);
  const { push } = useRouter();

  const cerrarSesion = () => {
    setMisDatosData({
      name: "",
      password: "",
      newPassword: "",
      newPasswordRepetido: "",
    });
    setUserCreateData({
      mail: "",
      password: "",
      name: "",
      passwordRepetida: "",
    });
    setUserLoginState({ mail: "", password: "" });
    setCheckTokenValid({
      valido: false,
      terminoElChequeo: false,
    });
  };

  //este state lo utilizo para saber si aprete el boton para cerrar
  //o abrir la ventana, dependiendo si es true o false
  const [openWindow, setOpenWindow] = useState(false);

  const desplegarVentana = () => {
    setOpenWindow(true);
  };

  const cerrarVentana = () => {
    setOpenWindow(false);
  };

  return (
    <div className={Css.header}>
      <div className={Css.headerVisible}>
        <div className={Css.headerVisibleLogoContainer}>
          <img
            onClick={() => {
              push("/");
            }}
            className={Css.headerVisibleLogoContainerLogo}
            src="https://res.cloudinary.com/druokk1hc/image/upload/v1666023904/huella_iyr42s.png"
            alt="Icono mascotas"
          />
        </div>
        <div className={Css.headerLinks}>
          <a
            //con esta funcion chequeo si existe un token en el localstorage
            // si existe entonces puedo entrar a mis datos y sino voy a signin
            onClick={() => {
              if (localStorage.getItem("Token")) {
                push("/mis-datos");
              } else {
                alert("No has iniciado sesión, te redirigimos al login");
                push("/sign-in");
              }
            }}
            className={Css.headerLinksLink}
          >
            Mis Datos
          </a>
          <a
            onClick={() => {
              if (localStorage.getItem("Token")) {
                push("/mis-pets-perdidas");
              } else {
                alert("No has iniciado sesión, te redirigimos al login");
                push("/sign-in");
              }
            }}
            className={Css.headerLinksLink}
          >
            Mis mascotas perdidas
          </a>
          <a
            onClick={() => {
              if (localStorage.getItem("Token")) {
                push("/cargar-pet-perdida");
              } else {
                alert("No has iniciado sesión, te redirigimos al login");
                push("/sign-in");
              }
            }}
            className={Css.headerLinksLink}
          >
            Reportar mascota
          </a>
          <a
            onClick={() => {
              localStorage.setItem("Token", "");
              alert("Se ha cerrado sesión");
              console.log("este es el token:", localStorage.getItem("Token"));
              cerrarSesion();
              push("/");
            }}
            className={Css.headerLinksLink}
          >
            Cerrar sesión
          </a>
        </div>
        <div className={Css.headerVisibleBotonDesplegarContainer}>
          <button
            onClick={desplegarVentana}
            className={Css.headerVisibleBotonDesplegar}
          >
            <div className={Css.headerVisibleBotonDesplegarBarras}></div>
            <div className={Css.headerVisibleBotonDesplegarBarras}></div>
            <div className={Css.headerVisibleBotonDesplegarBarras}></div>
          </button>
        </div>
      </div>
      <div
        className={Css.ventanaLinks}
        style={{ display: openWindow ? "flex" : "none" }}
      >
        <button onClick={cerrarVentana} className={Css.ventanaLinksBotonCerrar}>
          x
        </button>
        <a
          onClick={() => {
            if (localStorage.getItem("Token")) {
              cerrarVentana();
              push("/mis-datos");
            } else {
              cerrarVentana();
              alert("No has iniciado sesión, te redirigimos al login");
              push("/sign-in");
            }
          }}
          className={Css.ventanaLinksLink + " " + Css.linkUno}
        >
          Mis Datos
        </a>
        <a
          onClick={() => {
            if (localStorage.getItem("Token")) {
              cerrarVentana();
              push("/mis-pets-perdidas");
            } else {
              cerrarVentana();
              alert("No has iniciado sesión, te redirigimos al login");
              push("/sign-in");
            }
          }}
          className={Css.ventanaLinksLink + " " + Css.linkDos}
        >
          Mis mascotas perdidas
        </a>
        <a
          onClick={() => {
            if (localStorage.getItem("Token")) {
              cerrarVentana();
              push("/cargar-pet-perdida");
            } else {
              cerrarVentana();
              alert("No has iniciado sesión, te redirigimos al login");
              push("/sign-in");
            }
          }}
          className={Css.ventanaLinksLink + " " + Css.linkTres}
        >
          Reportar mascota
        </a>
        <a
          onClick={() => {
            localStorage.setItem("Token", "");
            alert("Se ha cerrado sesión");
            console.log(localStorage.getItem("Token"));
            cerrarVentana();
            cerrarSesion();
            push("/");
          }}
          className={Css.ventanaLinksLink + " " + Css.linkCuatro}
        >
          Cerrar sesion
        </a>
      </div>
    </div>
  );
}

export { Header };
