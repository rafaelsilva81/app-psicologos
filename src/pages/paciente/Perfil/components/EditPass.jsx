import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useForm } from "react-hook-form";

import "../../styles/humor_modal.css";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputItem from "../../../../common/InputItem";

// @TODO Refazer isso aqui
/* MODAL */
const EditPass = ({ onDismiss }) => {
  const validationSchema = Yup.object().shape({
    oldPass: Yup.string().max(255).required("Esse campo é obrigatório"),
    newPass: Yup.string()
      .min(6, "A senha precisa ter no mínimo 6 caracteres")
      .max(255)
      .required("Esse campo é obrigatório"),
    newPassConfirmation: Yup.string()
      .oneOf([Yup.ref("newPass"), null], "As senhas não são iguais!")
      .required("Esse campo é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
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
          <IonTitle>Redefinir Senha</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSubmit(finishForm)}>Confirmar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(finishForm)}>
          <h3 className="ion-margin-start"> ALTERAR SUA SENHA </h3>

          <InputItem
            lines="full"
            className="ion-margin-horizontal ion-margin-top"
          >
            <IonLabel position="floating">Senha atual</IonLabel>
            <IonInput
              required
              clearOnEdit={false}
              placeholder="Entre com sua senha atual"
              type="password"
              {...register("oldPass")}
            ></IonInput>
          </InputItem>
          <div className="ion-margin">
            <IonText color="danger"> {errors.oldPass?.message} </IonText>
          </div>

          <InputItem
            lines="full"
            className="ion-margin-horizontal ion-margin-top"
          >
            <IonLabel position="floating">Nova senha</IonLabel>
            <IonInput
              required
              clearOnEdit={false}
              type="password"
              placeholder="Entre com sua nova senha"
              {...register("newPass")}
            ></IonInput>
          </InputItem>
          <div className="ion-margin">
            <IonText color="danger"> {errors.newPass?.message} </IonText>
          </div>

          <InputItem
            lines="full"
            className="ion-margin-horizontal ion-margin-top"
          >
            <IonLabel position="floating">Confirmação da senha</IonLabel>
            <IonInput
              required
              clearOnEdit={false}
              type="password"
              placeholder="Digite a nova senha novamente"
              {...register("newPassConfirmation")}
            ></IonInput>
          </InputItem>
          <div className="ion-margin">
            <IonText color="danger">
              {errors.newPassConfirmation?.message}
            </IonText>
          </div>

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

export default EditPass;
