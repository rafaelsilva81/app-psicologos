// Ionic and React
import React from 'react'
import { useEffect } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  useIonAlert,
  useIonModal,
} from "@ionic/react";

// Form and Validation
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


// Components and custom CSS
import "../styles/login.css";

// Images
import loginImg from "../assets/imgs/login.svg";
import ResetPassword from "./components/ResetPassword";
import InputItem from '../../common/InputItem';

const LoginPaciente = ({ history }) => {

  const [presentAlert] = useIonAlert();

  const [present, dismiss] = useIonModal(ResetPassword, {
    onDismiss: (data, role) => dismiss(data, role),
  });

  function openResetPage() {

  }


  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("O e-mail não tem um formato válido")
      .max(255)
      .required("O campo e-mail é obrigatório"),
    password: Yup.string().max(255).required("O campnho senha é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const loginUser = (data) => {

  };

  return (
    <IonPage id="login-form">
      <IonContent>
        <IonGrid>
          <IonRow
            className="
                    main-container
                    ion-justify-content-center 
                    ion-align-items-center"
          >
            <IonCol>
              <IonRow className="ion-justify-content-center">
                <img src={loginImg} alt="login-img" className="login-logo" />
              </IonRow>

              <IonText color="muted" className="ion-text-center">
                <h2 className="login-title"> Bem-vindo(a)! </h2>
              </IonText>
              <form onSubmit={handleSubmit(loginUser)}>
                {/* EMAIL */}
                <InputItem lines="none">
                  <IonLabel position="floating">E-mail</IonLabel>
                  <IonInput type="email" {...register("email")} />
                </InputItem>
                <div className="invalid-feedback">{errors.email?.message}</div>

                {/* PASSWORD */}
                <InputItem lines="none">
                  <IonLabel position="floating">Senha</IonLabel>
                  <IonInput
                    clearOnEdit={false}
                    type="password"
                    {...register("password")}
                  />
                </InputItem>
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>

                <IonButton
                  disabled={isSubmitting}
                  className="ion-margin-top"
                  type="submit"
                  expand="block"
                >
                  {isSubmitting && <IonSpinner name="bubbles" />}
                  Login
                </IonButton>

                <IonRow className="ion-justify-content-center">
                  {errors.apiError && (
                    <div className="invalid-feedback ion-text-center">
                      {errors.apiError?.message}
                    </div>
                  )}
                </IonRow>

                <IonButton
                  fill="clear"
                  color="secondary"
                  expand="block"
                  style={{ textDecoration: "underline" }}
                  onClick={() => openResetPage()}
                >
                  ESQUECEU SUA SENHA?
                </IonButton>

                <IonButton
                  fill="clear"
                  color="secondary"
                  expand="block"
                  style={{ textDecoration: "underline" }}
                  onClick={() => history.push("/loginFunc")}
                >
                  É um psicólogo? Clique aqui
                </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export { LoginPaciente };
