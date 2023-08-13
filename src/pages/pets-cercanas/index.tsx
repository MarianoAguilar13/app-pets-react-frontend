import React, { useState, useEffect } from "react";
import { CardPetPerdida } from "../../components/card-pet-perdida";
import Css from "./index.module.css";
import { useRouter } from "next/navigation";
import { coordenadasBusquedaCercanas } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import { petsConLocationCercana } from "../../api-hooks/api-hooks";
import { SpinnerBlack } from "../../components/spinner-black";
import { Layout } from "@/components/layout";

const PetsCercanas = () => {
  //las coordenadas que se obtuvieron del navegador
  const [coordenadas, setCoordenadas] = useRecoilState(
    coordenadasBusquedaCercanas
  );
  const [isLoading, setIsLoading] = useState(false);

  const [lasPetsCercanas, setLasPetsCercanas] = useState([]);

  const { push } = useRouter();

  //ejecuta el callback luego de que finalice el fetch
  //si encontro mascotas se settearan en el state y sino
  //se dara una alerta y lo redirigira al home
  const callbackPetsCercanas = (respuesta: any) => {
    if (respuesta[0]) {
      setLasPetsCercanas(respuesta);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert("No hay mascotas cerca de tu hubicación");
      push("/");
    }
  };

  //se ejecuta una unica vez cuando se icicia el componente
  useEffect(() => {
    //busca con la api a las pets cercanas a su ubicacion
    console.log("entre al useEffect");

    setIsLoading(true);
    petsConLocationCercana(
      coordenadas.lat,
      coordenadas.lng,
      callbackPetsCercanas
    );
  }, []);

  return lasPetsCercanas ? (
    <Layout>
      <div className={Css.container}>
        <h1 className={Css.containerTitle}>Mascotas perdidas cerca tuyo</h1>
        {isLoading && <SpinnerBlack></SpinnerBlack>}
        <div className={Css.containerCard}>
          {lasPetsCercanas.map((r: any) => (
            <CardPetPerdida
              key={r.id}
              id={r.id}
              name={r.name}
              urlImagen={r.picURL}
              description={r.description}
            />
          ))}
        </div>
      </div>
    </Layout>
  ) : (
    <Layout>
      <div className={Css.container}>
        {isLoading && <SpinnerBlack></SpinnerBlack>}
        <h1 className={Css.containerTitle}>Mascotas perdidas cerca tuyo</h1>
      </div>
    </Layout>
  );
};

export default PetsCercanas;
