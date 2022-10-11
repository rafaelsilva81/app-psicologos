import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import "../styles/home.css";
import { happy, person, calendar, radio } from "ionicons/icons";
import Meditation from "../MeditationPage";
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();

  const [presentMeditationPage, dismissMeditationPage] = useIonModal(
    Meditation,
    {
      onDismiss: (track) => {
        dismissMeditationPage(track);
      },
    }
  );

  function meditationModal() {
    presentMeditationPage({
      onWillDismiss: (ev) => {
        const { data: track } = ev.detail;
        if (track) {
          track.stop();
        }
      },
    });
  }

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        {/* HEADER */}
        <IonHeader collapse="condense" className="page-header">
          <IonToolbar>
            <IonTitle size="large">HOME</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* BODY */}

        <IonCard className="menu-button">
          <IonItem
            color="primary"
            lines="full"
            button
            className="menu-item"
            onClick={() => {
              history.push("/appointments");
            }}
            detail
          >
            <IonIcon icon={calendar} slot="start" />
            <IonLabel>Suas Consultas</IonLabel>
          </IonItem>
        </IonCard>

        <IonCard>
          <IonItem
            color="primary"
            lines="full"
            button
            onClick={() => {
              history.push("/humor");
            }}
            detail
          >
            <IonIcon icon={happy} slot="start" />
            <IonLabel>Acomp. de Humor</IonLabel>
          </IonItem>
        </IonCard>

        <IonCard>
          <IonItem
            color="primary"
            lines="full"
            button
            onClick={() => meditationModal()}
            detail
          >
            <IonIcon icon={radio} slot="start" />
            <IonLabel>Meditação Guiada</IonLabel>
          </IonItem>
        </IonCard>

        <IonCard>
          <IonItem
            color="primary"
            lines="full"
            button
            onClick={() => {
              history.push("/profile");
            }}
            detail
          >
            <IonIcon icon={person} slot="start" />
            <IonLabel>Seu perfil</IonLabel>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
