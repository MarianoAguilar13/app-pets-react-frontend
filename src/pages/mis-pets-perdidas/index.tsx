import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkTokenValidoHook } from "@/api-hooks/api-hooks-mis-datos";
import { misPets } from "../../api-hooks/api-hooks";
import { CardMisPets } from "../../components/card-mis-pets";
import Css from "./index.module.css";
import { Layout } from "@/components/layout";

const MisPets = () => {
  const [comenzar, setComenzar] = useState(true);
  const [myPets, setMyPets] = useState([]);
  const { push } = useRouter();

  const [checkToken, setCheckToken] = useState({
    valido: false,
    terminoElChequeo: false,
  });
  const [inicializar, setInicializar] = useState(true);

  const callbackCheckToken = (respuesta: any) => {
    if (respuesta.error) {
      //el checktokenvalid tiene dos atributos, si es valido o no el token
      //y si se termino el cheaque
      setCheckToken({ valido: false, terminoElChequeo: true });
    } else {
      setCheckToken({ valido: true, terminoElChequeo: true });
    }
  };

  //este estado de inicializar lo cree para que solo se ejecute una vez el
  //chequeo del tengo de la api
  useEffect(() => {
    checkTokenValidoHook(callbackCheckToken);
  }, [inicializar]);

  //cada vez que cambia el stado del chequeo se ejecuta
  useEffect(() => {
    //si el chequeo termino entonces entro en el if
    if (checkToken.terminoElChequeo) {
      //si fue valido no hay problema, pero sino fue valido, entonces
      //te notificara que no estas conectado y que vayas al sign-in
      if (checkToken.valido) {
      } else {
        alert(
          "No esta conectado a alguna cuenta, por favor inicie sesión para acceder a esta opción"
        );
        push("/sign-in");
      }
    }
  }, [checkToken]);

  //callback que se ejecuta al final de la llamada de la api
  const callbackMyPets = (respuesta: any) => {
    if (respuesta[0]) {
      //setteos todas las pets en el state
      setMyPets(respuesta);
    } else {
      alert("No has publicado mascotas por el momento");
      push("/");
    }
  };

  useEffect(() => {
    //cuando incia el componente por primera vez se ejecuta una unica vez
    //el fetch que nos permite cargar todas las pets que tenga cargado ese usuario
    misPets(callbackMyPets);
  }, [comenzar]);

  return myPets ? (
    <Layout>
      <div className={Css.container}>
        <h1 className={Css.containerTitle}>Mis mascotas perdidas</h1>
        <div className={Css.containerCard}>
          {myPets.map((r: any) => (
            //por cada pet voy a crear un componente (card) con los datos
            //de esa pet
            <CardMisPets
              key={r.id}
              id={r.id}
              name={r.name}
              urlImagen={r.picURL}
            />
          ))}
        </div>
      </div>
    </Layout>
  ) : (
    <Layout>
      <div className={Css.container}>
        <h1 className={Css.containerTitle}>Mis mascotas perdidas</h1>
      </div>
    </Layout>
  );
};

export default MisPets;
