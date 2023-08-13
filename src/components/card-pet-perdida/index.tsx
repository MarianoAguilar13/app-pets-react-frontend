import { useRouter } from "next/router";
import Css from "./index.module.css";
import { useRecoilState } from "recoil";
import { ButtonCard } from "../../ui/buttons";
import { idPet } from "../../atoms/atoms";

type PropsFormReportPet = {
  urlImagen: string;
  name: string;
  description: string;
  id?: any;
};

export function CardPetPerdida(props: PropsFormReportPet) {
  //state de la pet
  const [petAReportar, setPetAReportar] = useRecoilState(idPet);
  const petElegida = { id: props.id, name: props.name };
  const { push } = useRouter();

  return (
    <div className={Css.cardPet}>
      <img
        className={Css.cardPetImagen}
        src={props.urlImagen}
        alt="Imagen mascota"
      />
      <div className={Css.cardPetInfo}>
        <div className={Css.cardPetInfoSubContainer}>
          <div className={Css.cardPetInfoSubContainerNameContainer}>
            <h4 className={Css.cardPetInfoSubContainerNameContainerName}>
              {props.name}
            </h4>
          </div>
          <ButtonCard
            onClick={() => {
              //cuando hacen click en el boton de reportar a una determinada
              //mascota, se settea el id de esa mascota para utilizarlo en la
              //page reportarPet

              setPetAReportar(petElegida);
              push("/reportar-pet");
            }}
          >
            REPORTAR INFORMACION
          </ButtonCard>
        </div>
        <div className={Css.cardPetInfoDescriptionContainer}>
          <h4 className={Css.cardPetInfoDescriptionContainerDescription}>
            {props.description}
          </h4>
        </div>
      </div>
    </div>
  );
}
