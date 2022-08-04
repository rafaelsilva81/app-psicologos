import React from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { logOut as logOutIcon } from "ionicons/icons";

import { useAuth } from "../../services/auth";
import { useHistory } from "react-router-dom";

import ProfileDetails from "../../components/ProfileDetails";
import ContractDetails from "../../components/ContractDetails";
import {
  doc,
} from "firebase/firestore";
import {
  useFirestore,
  useFirestoreDocDataOnce,
} from "reactfire";

import '../styles/profile.css'
// TODO: CSS PROPRIO PARA ESSA PAGINA
// TODO: COMPONENTIZAÇÃO E OBTER DADOS DO BANCO
const ProfilePage = () => {
  const { authInfo, logOut } = useAuth();

  const history = useHistory();

  const handleLogout = async () => {
    await logOut();
    history.replace("/login");
  };

  const { user } = authInfo;
  const userRef = doc(useFirestore(), "users", user.email,);
  const { data: userData } = useFirestoreDocDataOnce(userRef, {
    idField: "email",
    suspense: true
  });

  const { data: medicData } = useFirestoreDocDataOnce(userData.medico, {
    idField: "email",
    suspense: true
  })

  const { email, nome: nomeUsuario } = userData
  const { nome: nomeMedico, contrato } = medicData

  return (
    <IonPage>
      {/* HEADER */}
      <IonHeader>
        <IonToolbar>
          <IonTitle> PERFIL </IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* BODY */}
      <IonContent fullscreen className="ion-padding">
        {/* GRID */}
        <IonGrid fixed>
          {/* PROFILE CARD */}
          <IonRow className="ion-align-items-center">
            <ProfileDetails name={nomeUsuario} email={email}></ProfileDetails>
          </IonRow>

          {/* LOGOUT Button */}
          <IonRow>
            <IonCol>
              <IonButton expand="full" onClick={handleLogout}>
                LOGOUT
                <IonIcon slot="end" icon={logOutIcon} />
              </IonButton>
            </IonCol>
          </IonRow>

          {/* EDIT Button*/}
          <IonRow>
            <IonCol size="6">
              <IonButton expand="full" fill="outline" size="small" href="#">
                Alterar dados
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton expand="full" fill="outline" size="small" href="#">
                Alterar senha
              </IonButton>
            </IonCol>
          </IonRow>

          {/* CONTRACT Card*/}
          <IonRow className="ion-align-items-center">
            <ContractDetails name={nomeMedico} contract={contrato}> </ContractDetails>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter className="ion-margin">
        <IonLabel color="medium" className="app-version">
          v0.0.5 alpha
        </IonLabel>
      </IonFooter>
    </IonPage>
  );
};

export default ProfilePage;