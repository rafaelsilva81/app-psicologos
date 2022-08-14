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

import "./styles/humor_modal.css";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

/* MODAL */
const ResetPasswordModal = ({ onDismiss }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("O e-mail não tem um formato válido")
      .max(255)
      .required("O campo e-mail é obrigatório"),
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
          <h3 className="ion-margin-start"> REDEFINIR SENHA </h3>

          <IonItem
            lines="full"
            className="ion-margin-horizontal ion-margin-top"
          >
            <IonLabel position="floating">E-mail</IonLabel>
            <IonInput {...register("email")}></IonInput>
          </IonItem>
          <div className="ion-margin">
            <IonText color="danger"> {errors.email?.message} </IonText>
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

export default ResetPasswordModal;
