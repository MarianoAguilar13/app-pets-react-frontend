import React, { useState, useEffect } from "react";
import Css from "./index.module.css";
import { useRouter } from "next/router";
import { MainButton } from "@/ui/buttons";
import { coordenadasBusquedaCercanas } from "@/atoms/atoms";
import { useRecoilState } from "recoil";
import { Layout } from "@/components/layout";

function Home() {
  const [coordenadas, setCoordenadas] = useRecoilState(
    coordenadasBusquedaCercanas
  );
  const { push } = useRouter();
  //cuando se crea el componente se pide la geolocalizacion en el
  //navegador y la settea en el state del recoil del atom coordenadas
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geoLocationPosition) => {
      const lat = geoLocationPosition.coords.latitude;
      const lng = geoLocationPosition.coords.longitude;

      setCoordenadas({ lat: lat, lng: lng });
    });
  }, []);

  return (
    <Layout>
      <div className={Css.container}>
        <h1 className={Css.containerTitle}>Mascotas perdidas cerca tuyo</h1>
        <div className={Css.containerLocationContainer}>
          <p className={Css.containerLocationContainerDesciption}>
            Apretar en el boton buscar y le apareceran las mascotas perdidas en
            las cercanías.
          </p>
          <div className={Css.containerLocationContainerButtonContainer}>
            <MainButton
              onClick={() => {
                push("/pets-cercanas");
              }}
            >
              Buscar
            </MainButton>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
