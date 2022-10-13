import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonModal,
} from "@ionic/react";

import { logOut as logOutIcon } from "ionicons/icons";

import { useHistory } from "react-router-dom";

import ProfileData from "./components/ProfileData";
import ContractData from "./components/ContractData";
import { doc, updateDoc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";

import "../../styles/profile.css";
import EditPass from "./components/EditPass";
import EditData from "./components/EditData";
import { signOut } from "firebase/auth";
import { auth } from "../../../services";

// TODO: CSS PROPRIO PARA ESSA PAGINA
// TODO: COMPONENTIZAÇÃO E OBTER DADOS DO BANCO

const Profile = () => {
  const [presentAlert] = useIonAlert();

  const history = useHistory();

  const { status, data: user } = useUser({
    suspense: true
  });

  const userRef = doc(useFirestore(), "users", user.email);

  const { data: userData } = useFirestoreDocData(userRef, {
    idField: "email",
    suspense: true, //Necessário pra que a aplicação fique suspendida enquanto tudo carrega
  });

  const { data: medicData } = useFirestoreDocData(userData.medic, {
    idField: "email",
    suspense: true,
  });

  const { email, name: userName, gender } = userData;
  const { name: medicName, email: medicMail } = medicData;

  const [presentPassPage, dismissPassPage] = useIonModal(EditPass, {
    onDismiss: (data, role) => dismissPassPage(data, role),
  });

  function openPassChangePage() {

  }

  const [presentEditData, dismissEditData] = useIonModal(EditData, {
    onDismiss: (data, role) => dismissEditData(data, role),
    userData: { email, userName, gender },
  });

  function openDataEditPage() {
    presentEditData({
      onWillDismiss: async (ev) => {
        if (ev.detail.role === "confirm") {
          const { newMail, newName, newGender } = ev.detail.data;
          await updateDoc(
            userRef,
            {
              email: newMail,
              name: newName,
              gender: newGender,
            },
            { merge: true }
          );
          presentAlert({
            header: "ALTERAÇÃO DE DADOS",
            message: "Dados alterados com sucesso.",
            buttons: ["OK"],
          });
        }
      },
    });
  }

  const handleLogout = async () => {
    signOut(auth).then(() => {
      history.push("/")
    }).catch((error) => {
      alert(error)
    });
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false} className="ion-padding">
        {/* HEADER */}
        <IonHeader collapse="condense" className="page-header">
          <IonToolbar>
            <IonTitle size="large">PERFIL</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* GRID */}
        <IonGrid fixed>
          {/* PROFILE CARD */}
          <IonRow className="ion-align-items-center">
            <ProfileData name={userName} email={email}></ProfileData>
          </IonRow>

          {/* LOGOUT Button */}
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleLogout}>
                SAIR
                <IonIcon slot="end" icon={logOutIcon} />
              </IonButton>
            </IonCol>
          </IonRow>

          {/* EDIT Button*/}
          <IonRow>
            <IonCol size="6">
              <IonButton
                expand="block"
                color="secondary"
                fill="solid"
                size="small"
                onClick={() => openDataEditPage()}
              >
                Alterar dados
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton
                expand="block"
                color="secondary"
                fill="solid"
                size="small"
                onClick={() => openPassChangePage()}
              >
                Alterar senha
              </IonButton>
            </IonCol>
          </IonRow>

          {/* CONTRACT Card*/}
          <IonRow className="ion-align-items-center ion-margin-top">
            <ContractData name={medicName} medicMail={medicMail}></ContractData>
          </IonRow>
        </IonGrid>
      </IonContent>

      {/* TEMPORARY FOOTER */}
      <IonFooter className="ion-margin">
        <IonLabel color="medium" className="app-version">
          v1.0.0 alpha
        </IonLabel>
      </IonFooter>
    </IonPage>
  );
};

export default Profile;
