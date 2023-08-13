import { useRouter } from "next/router";
import Css from "./index.module.css";
import { idPetEditar } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

type PropsFormReportPet = {
  urlImagen: string;
  name: string;
  id: any;
};

export function CardMisPets(props: PropsFormReportPet) {
  const [petEditar, setPetEditar] = useRecoilState(idPetEditar);
  const pet = { id: props.id };
  const { push } = useRouter();

  return (
    <div className={Css.cardPet}>
      <img
        className={Css.cardPetImagen}
        src={props.urlImagen}
        alt="Imagen mascota"
      />
      <div className={Css.cardPetInfo}>
        <div className={Css.cardPetInfoContainer}>
          <h4 className={Css.cardPetInfoSubContainerName}>{props.name}</h4>
        </div>
        <button
          className={Css.buttonMisPets}
          onClick={() => {
            //cuando hacen click en el boton de reportar a una determinada
            //mascota, se settea el id de esa mascota para utilizarlo en la
            //page reportarPet

            setPetEditar(pet);
            push("/editar-pet");
          }}
        >
          {" "}
          EDITAR INFO
        </button>
      </div>
    </div>
  );
}
