import React, { useState, useEffect } from "react";
import { MapboxSeach } from "../../components/mapbox-search";
import Css from "./index.module.css";
import { MainFieldSet } from "../../ui/fields-sets";
import { FieldSetTextArea } from "../../ui/fields-sets";
import { MainButton } from "../../ui/buttons";
import Dropzone from "react-dropzone";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/layout";
import { checkTokenValidoHook } from "@/api-hooks/api-hooks-mis-datos";
import { cargarPet } from "../../api-hooks/api-hooks";
import { SpinnerWhite } from "../../components/spinner-white";

const CargarPet = () => {
  const { push } = useRouter();

  const [formData, setFormData] = useState({ mapbox: { coords: [] } });
  //este es la data uri de la imagen a cargar
  const [fileUrl, setFileUrl] = useState();
  const [enviarData, setEnviarData] = useState(false);
  //este state sirve para mostrar la pseudo url creada para mostrar
  //la imagen que se quiere cargar
  const [imagenMostrar, setImagenMostrar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkTokenCompletoHook = () => {
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
  };

  checkTokenCompletoHook();

  //esta funcion me permite transformar imagenes en texto plano
  // base64url
  const encodeFileAsBase64URL = async (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("loadend", () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  };

  //este callback verifica si se cargo correctamente la pet
  const callbackCargarPet = (result: any) => {
    if (result.petId) {
      setIsLoading(false);
      alert("Tu mascota se ha cargado correctamente");
      push("/");
    } else {
      setIsLoading(false);
      alert(result.error);
      push("/cargar-pet");
    }
  };

  //le envio el submitHandler por props al form y checkea todos
  //los campos y si esta todo ok, guarda la nueva pet con un fetch
  //a la api
  function submitHandler(e: any) {
    e.preventDefault();

    if (enviarData) {
      e.preventDefault();
      setIsLoading(true);
      const allData = {
        name: e.target["name"].value,
        type: e.target["tipoPet"].value,
        description: e.target["descripcion"].value,
        pictureDataURL: fileUrl,
        lat: formData.mapbox.coords[1],
        lng: formData.mapbox.coords[0],
        lost: true,
      };

      if (allData.pictureDataURL && allData.lat && allData.lng) {
        cargarPet(
          allData.name,
          allData.type,
          allData.description,
          allData.pictureDataURL,
          allData.lat,
          allData.lng,
          allData.lost,
          callbackCargarPet
        );
      } else {
        alert(
          "Por favor recuerde que es necesario ingresar una foto de su mascota y una ubicación donde se avisto por última vez "
        );
        push("/cargar-pet-perdida");
      }
    } else {
      setIsLoading(false);
    }
  }

  //este handle settea la data de las coordenadas de la ubicacion
  //buscada por mapbox mas la data del resto del form
  function handleMapboxChange(data: any) {
    // voy agregando data al state interno del form
    setFormData({
      ...formData,
      mapbox: data,
    });
  }

  return (
    <Layout>
      <div className={Css.container}>
        <h3 className={Css.containerTitle}>Reportar mascota perdida</h3>
        {isLoading && <SpinnerWhite></SpinnerWhite>}
        <form className={Css.containerForm} onSubmit={submitHandler}>
          <MainFieldSet
            idInput="name-input"
            nameInput="name"
            typeInput="text"
            labelName="NOMBRE"
          ></MainFieldSet>
          <MainFieldSet
            idInput="tipo-pet-input"
            nameInput="tipoPet"
            typeInput="text"
            labelName="TIPO DE MASCOTA"
          ></MainFieldSet>
          <img
            className={Css.mostrarImagen}
            src={imagenMostrar}
            alt="Imagen de la pet a cargar"
          />
          <Dropzone
            onDrop={async (file) => {
              const base64URL = (await encodeFileAsBase64URL(file[0])) as any;

              //aca voy asignar una url al archivo cargado en dropzone
              //asi lo puedo mostrar como una imagen
              const fileMostrar = Object.assign(file[0], {
                preview: URL.createObjectURL(file[0]),
              });
              //setteo la url creada
              setImagenMostrar(fileMostrar.preview);
              //Ahora que transforme la imagen en data base64URL la guardo en
              //los datos
              setFileUrl(base64URL);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className={Css.containerDropzone} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className={Css.containerDropzoneP}>
                    Haz click para subir una foto
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
          <FieldSetTextArea
            idTextArea="descripcion"
            nameTextArea="descripcion"
            labelName="DESCRIPCION"
          ></FieldSetTextArea>
          <MapboxSeach onChange={handleMapboxChange} />
          {isLoading && <SpinnerWhite></SpinnerWhite>}
          <MainButton
            disabled={isLoading}
            onClick={() => {
              //cuando apreto el click de enviar, recien ahi pongo el state
              //de enviarData en true para que se active lo del handleSubmit
              setEnviarData(true);
            }}
          >
            ENVIAR
          </MainButton>
        </form>
      </div>
    </Layout>
  );
};

export default CargarPet;
