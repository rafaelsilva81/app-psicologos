import {
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonText,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../services/auth";

/* TODO: Ler isso aqui, adicionar validação e melhorar design */
// TODO: Remover unused imports
// TODO: Melhorar o login incorreto
/* https://stackblitz.com/edit/ionic-react-hook-form-me1pv4?file=src%2FApp.tsx*/

const EMAILREGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const initialValues = {
    email: "",
    password: "",
};

const LoginPage = ({ history }) => {
    let { logIn, checkFirstAccess } = useAuth();

    useEffect(() => {
        let hasAcessed = checkFirstAccess();
        if (hasAcessed === false) {
            history.replace("/onboarding");
        }
    }, [checkFirstAccess]);

    const { handleSubmit, control, setValue, register, getValues } = useForm({
        defaultValues: { ...initialValues },
    });

    const loginUser = async (data) => {
        await logIn(data);
        history.replace("/tab1");
    };

    return (
        <IonPage id="login-form">
            <IonContent className="ion-padding">
                <IonText color="muted">
                    <h2> Bem-Vindo(a) : </h2>
                </IonText>
                <form onSubmit={handleSubmit(loginUser)}>
                    {/* EMAIL */}
                    <IonItem>
                        <IonLabel position="floating">E-mail</IonLabel>
                        <IonInput
                            type="email"
                            {...register("email", {
                                required: "Email is a required field",
                                pattern: {
                                    value: EMAILREGEXP,
                                    message: "invalid email address",
                                },
                            })}
                        />
                    </IonItem>

                    {/* PASSWORD */}
                    <IonItem>
                        <IonLabel position="floating">Senha</IonLabel>
                        <IonInput
                            type="password"
                            {...register("password", {
                                required: "Password is a required field",
                            })}
                        />
                    </IonItem>

                    {/* <IonItem>
                        <IonLabel>Remember me</IonLabel>
                        <IonCheckbox defaultChecked={true} slot="start" />
                    </IonItem> */}

                    <IonButton
                        className="ion-margin-top"
                        type="submit"
                        expand="block"
                    >
                        Login
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;
