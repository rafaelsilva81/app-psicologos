import {
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
import "../styles/extras.css";
import { calendar, pulse } from "ionicons/icons";
import Meditation from "../Meditation";

const Extras = () => {
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>EXTRAS</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* HEADER */}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">EXTRAS</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* BODY */}
        <IonCard>
          <IonItem
            color="primary"
            lines="full"
            button
            onClick={() => meditationModal()}
            detail
          >
            <IonIcon icon={pulse} slot="start" />
            <IonLabel>Meditação Guiada</IonLabel>
          </IonItem>
        </IonCard>

        <IonCard>
          <IonItem
            color="primary"
            lines="full"
            button
            disabled
            onClick={() => {}}
            detail
          >
            <IonIcon icon={calendar} slot="start" />
            <IonLabel>Acompanhamento de TPM</IonLabel>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Extras;
