import { IonButton, IonCheckbox, IonContent, IonInput, IonItem, IonLabel, IonPage, IonText } from '@ionic/react'
import React from 'react'

/* TODO: Ler isso aqui, adicionar validação e melhorar design */
/* https://www.smashingmagazine.com/2020/08/forms-validation-ionic-react */

const Login = () => {
    return (
        <div id="login-form">
            <IonPage>
                <IonContent className="ion-padding">
                    <IonText>
                        <h2> Entre na sua conta </h2>
                    </IonText>
                    <form>
                        <IonItem>
                            <IonLabel position="floating">Endereço de e-mail</IonLabel>
                            <IonInput type="email"/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Senha</IonLabel>
                            <IonInput type="password" />
                        </IonItem>
                        <IonItem lines="none">
                            <IonLabel>Remember me</IonLabel>
                            <IonCheckbox defaultChecked={true} slot="start" />
                        </IonItem>
                        <IonButton className="ion-margin-top" type="submit" expand="block">
                            Login
                        </IonButton>
                    </form>
                </IonContent>
            </IonPage>
        </div>
    )
}

export default Login