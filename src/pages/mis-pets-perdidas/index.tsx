import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkTokenCompletoHook } from "../../api-hooks/api-hooks";
import { misPets } from "../../api-hooks/api-hooks";
import { CardMisPets } from "../../components/card-mis-pets";
import Css from "./index.module.css";
import { Layout } from "@/components/layout";

const MisPets = () => {
  //primero checkea que el token sea valido
  checkTokenCompletoHook();

  const [comenzar, setComenzar] = useState(true);
  const [myPets, setMyPets] = useState([]);
  const { push } = useRouter();

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
