import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { Controller, useForm } from "react-hook-form";

import "../../styles/humor_modal.css";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputItem from "../../components/InputItem";

// @TODO Refazer isso aqui
/* MODAL */
const EditData = ({ onDismiss, userData }) => {
  const validationSchema = Yup.object().shape({
    newMail: Yup.string()
      .email("O e-mail não tem um formato válido")
      .required("Esse campo é obrigatório")
      .max(255),
    newName: Yup.string().required("Esse campo é obrigatório"),
  });

  const { userName, email, gender } = userData;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      newName: userName,
      newMail: email,
      newGender: gender,
    },
    resolver: yupResolver(validationSchema),
  });

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
          <IonTitle> Alteração de dados </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSubmit(finishForm)}>Confirmar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(finishForm)}>
          <h3 className="ion-margin-start"> ALTERAR SEUS DADOS PESSOAIS </h3>

          <InputItem
            lines="full"
            className="ion-margin-horizontal ion-margin-top"
          >
            <IonLabel position="stacked">Nome</IonLabel>
            <IonInput
              clearOnEdit={false}
              type="text"
              {...register("newName")}
            ></IonInput>
          </InputItem>
          <div className="ion-margin">
            <IonText color="danger"> {errors.newName?.message} </IonText>
          </div>

          <InputItem
            lines="full"
            className="ion-margin-horizontal ion-margin-top"
          >
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              clearOnEdit={false}
              type="email"
              {...register("newMail")}
            ></IonInput>
          </InputItem>
          <div className="ion-margin">
            <IonText color="danger"> {errors.newMail?.message} </IonText>
          </div>

          <InputItem
            lines="full"
            className="ion-margin-horizontal ion-margin-top"
          >
            <IonLabel position="stacked">Gênero</IonLabel>
            <Controller
              render={({ field }) => (
                <IonSelect
                  value={field.value}
                  onIonChange={(e) => setValue("newGender", e.detail.value)}
                >
                  <IonSelectOption value="f">Feminino</IonSelectOption>
                  <IonSelectOption value="m">Masculino</IonSelectOption>
                  <IonSelectOption value="x">Outro</IonSelectOption>
                </IonSelect>
              )}
              control={control}
              name="newGender"
            />
          </InputItem>

          <IonButton
            disabled={isSubmitting}
            className="ion-margin-top"
            type="submit"
            expand="block"
          >
            {isSubmitting && <IonSpinner name="bubbles" />}
            Confirmar
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditData;
