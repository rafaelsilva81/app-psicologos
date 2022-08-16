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
  const [presentMeditationPage] = useIonModal(Meditation);

  function meditationModal() {
    presentMeditationPage();
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
