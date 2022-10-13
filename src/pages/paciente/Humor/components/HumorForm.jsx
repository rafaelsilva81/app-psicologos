import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonPopover,
  IonRadio,
  IonRadioGroup,
  IonSpinner,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import Checkbox from "../../../../common/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../styles/humor_modal.css";

import {
  faPeopleRoof,
  faPeopleGroup,
  faHeart,
  faChampagneGlasses,
  faDumbbell,
  faTv,
  faBook,
  faGamepad,
  faKitchenSet,
  faBroom,
  faBath,
  faBed,
  faPersonPraying,
  faBasketShopping,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFaceLaughBeam,
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
  faFaceDizzy,
} from "@fortawesome/free-regular-svg-icons";

import ReactTooltip from "react-tooltip";
import InputItem from "../../../../common/InputItem";

/* MODAL */
const HumorForm = ({ onDismiss }) => {
  const activities = [
    {
      name: "family",
      text: "Família",
      icon: faPeopleRoof,
    },
    {
      name: "friends",
      text: "Amigos",
      icon: faPeopleGroup,
    },
    {
      name: "date",
      text: "Encontro",
      icon: faHeart,
    },
    {
      name: "party",
      text: "Festa",
      icon: faChampagneGlasses,
    },
    {
      name: "cook",
      text: "Cozinhar",
      icon: faKitchenSet,
    },
    {
      name: "read",
      text: "Leitura",
      icon: faBook,
    },
    {
      name: "religion",
      text: "Religião",
      icon: faPersonPraying,
    },
    {
      name: "games",
      text: "Jogos",
      icon: faGamepad,
    },
    {
      name: "tvMovies",
      text: "Filmes/TV",
      icon: faTv,
    },
    {
      name: "cleaning",
      text: "Faxina",
      icon: faBroom,
    },
    {
      name: "hygiene",
      text: "Higiene",
      icon: faBath,
    },
    {
      name: "shopping",
      text: "Compras",
      icon: faBasketShopping,
    },
    {
      name: "leisure",
      text: "Lazer",
      icon: faUmbrellaBeach,
    },
    {
      name: "exercise",
      text: "Exercício",
      icon: faDumbbell,
    },
    {
      name: "rest",
      text: "Descanso",
      icon: faBed,
    },
  ];

  const {
    setValue,
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const finishForm = (data) => {
    onDismiss(data, "confirm");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss(null, "cancel")}>
              Fechar
            </IonButton>
          </IonButtons>
          <IonTitle>Novo registro</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSubmit(finishForm)}>Confirmar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(finishForm)}>
          <h3 className="ion-margin-start"> Como você está se sentindo? </h3>
          <div>
            <IonRadioGroup
              {...register("humor")}
              className="humor-container"
              onIonChange={(e) => setValue("humor", e.detail.value)}
            >
              <IonItem
                color="transparent"
                lines="none"
                className="ion-no-padding humor-item"
              >
                <FontAwesomeIcon
                  icon={faFaceLaughBeam}
                  color="#00cc4f"
                  className="humor-icon"
                />
                <IonRadio className="humor-radio" value="5" data-tip="Ótimo" />
                <ReactTooltip />
              </IonItem>

              <IonItem
                color="transparent"
                lines="none"
                className="ion-no-padding humor-item"
              >
                <FontAwesomeIcon
                  icon={faFaceSmile}
                  color="#006dd9"
                  className="humor-icon"
                />
                <IonRadio className="humor-radio" value="4" data-tip="Bem" />
                <ReactTooltip />
              </IonItem>

              <IonItem
                color="transparent"
                lines="none"
                className="ion-no-padding humor-item"
              >
                <FontAwesomeIcon
                  icon={faFaceMeh}
                  color="#e8d600"
                  className="humor-icon"
                />
                <IonRadio className="humor-radio" value="3" data-tip="Meh" />
                <ReactTooltip />
              </IonItem>

              <IonItem
                color="transparent"
                lines="none"
                className="ion-no-padding humor-item"
              >
                <FontAwesomeIcon
                  icon={faFaceFrown}
                  color="#e58400"
                  className="humor-icon"
                />
                <IonRadio className="humor-radio" value="2" data-tip="Mal" />
                <ReactTooltip />
              </IonItem>

              <IonItem
                color="transparent"
                lines="none"
                className="ion-no-padding humor-item"
              >
                <FontAwesomeIcon
                  icon={faFaceDizzy}
                  color="#ef2a10"
                  className="humor-icon"
                />
                <IonRadio
                  className="humor-radio"
                  value="1"
                  data-tip="Péssimo"
                />
                <ReactTooltip />
              </IonItem>
            </IonRadioGroup>
          </div>

          <h3 className="ion-margin-start"> O que você tem feito? </h3>
          <div className="activity-container">
            {activities.map((item, idx) => {
              return (
                <Controller
                  name={item.name}
                  control={control}
                  key={idx}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        icon={item.icon}
                        isChecked={(c) => {
                          setValue(item.name, c);
                        }}
                      >
                        {item.text}
                      </Checkbox>
                    );
                  }}
                />
              );
            })}
          </div>

          <h3 className="ion-margin-start">Anotação Livre</h3>
          <InputItem counter className="ion-margin-horizontal ion-margin-top">
            <IonTextarea
              rows={1}
              autoGrow
              inputMode="text"
              maxlength={300}
              autofocus
              placeholder="Descreva brevemente seu dia..."
              {...register("notes")}
            ></IonTextarea>
          </InputItem>

          <IonButton
            disabled={isSubmitting}
            className="ion-margin-top"
            type="submit"
            expand="block"
          >
            {isSubmitting && <IonSpinner name="bubbles" />}
            SALVAR
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default HumorForm;
