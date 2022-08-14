import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSpinner,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import CustomCheckbox from "../components/CustomCheckbox";

import "./styles/humor_modal.css";

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

/* MODAL */
const HumorFormModal = ({ onDismiss }) => {
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
                      <CustomCheckbox
                        icon={item.icon}
                        isChecked={(c) => {
                          setValue(item.name, c);
                        }}
                      >
                        {item.text}
                      </CustomCheckbox>
                    );
                  }}
                />
              );
            })}
          </div>

          <h3 className="ion-margin-start">Anotação Livre</h3>
          <IonItem
            lines="full"
            counter
            className="ion-margin-horizontal ion-margin-top"
          >
            <IonLabel position="floating">
              Descreva brevemente seu dia...
            </IonLabel>
            <IonTextarea
              rows={1}
              autoGrow
              inputMode="text"
              maxlength={300}
              autofocus
              {...register("notes")}
            ></IonTextarea>
          </IonItem>

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

export default HumorFormModal;
