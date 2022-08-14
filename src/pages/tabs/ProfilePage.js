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

import { useAuth } from "../../services/auth";
import { useHistory } from "react-router-dom";

import ProfileDetails from "../../components/ProfileDetails";
import ContractDetails from "../../components/ContractDetails";
import { doc, updateDoc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";

import "../styles/profile.css";
import CustomCircle from "../../components/CustomCircle";
import EditPassModal from "../EditPassModal";
import EditDataModal from "../EditDataModal";

// TODO: CSS PROPRIO PARA ESSA PAGINA
// TODO: COMPONENTIZAÇÃO E OBTER DADOS DO BANCO

const ProfilePage = () => {
  const [presentAlert] = useIonAlert();

  const { authInfo, logOut, changePassword, reauthenticateUser } = useAuth();

  const history = useHistory();

  const { user } = authInfo;
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
  const { name: medicName, contract } = medicData;

  const [presentPassPage, dismissPassPage] = useIonModal(EditPassModal, {
    onDismiss: (data, role) => dismissPassPage(data, role),
  });

  function openPassChangePage() {
    presentPassPage({
      onWillDismiss: (ev) => {
        if (ev.detail.role === "confirm") {
          const { oldPass, newPass } = ev.detail.data;
          const { email } = user;
          reauthenticateUser(email, oldPass)
            .then(() => {
              changePassword(newPass).then(() => {
                presentAlert({
                  header: "ALTERAÇÃO DE SENHA",
                  message: "Senha alterada com sucesso.",
                  buttons: ["OK"],
                });
              });
            })
            .catch((error) => {
              presentAlert({
                header: "ALTERAÇÃO DE SENHA",
                message:
                  "Não foi possível alterar a Senha, verífique se você informou os dados corretamente.",
                buttons: ["OK"],
              });
            });
        }
      },
    });
  }

  const [presentEditData, dismissEditData] = useIonModal(EditDataModal, {
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
    await logOut();
    history.push(".");
    window.location.reload();
  };

  return (
    <IonPage>
      {/* HEADER */}
      <IonHeader>
        <IonToolbar>
          <IonTitle> PERFIL </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false} className="ion-padding">
        <CustomCircle position="bottom-right" size="0.8" />

        {/* HEADER */}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">PERFIL</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* GRID */}
        <IonGrid fixed>
          {/* PROFILE CARD */}
          <IonRow className="ion-align-items-center">
            <ProfileDetails name={userName} email={email}></ProfileDetails>
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
              <IonButton
                expand="full"
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
                expand="full"
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
            <ContractDetails
              name={medicName}
              contract={contract}
            ></ContractDetails>
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

export default ProfilePage;
