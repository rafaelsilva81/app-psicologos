import {
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonDatetimeButton,
  IonButton,
  IonIcon,
  IonText,
  IonSelect,
  IonSelectOption,
  useIonModal,
  IonItem,
  IonLabel,
  IonButtons,
  IonInput,
} from "@ionic/react";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import HumorOnboarding from "../HumorOnboarding";
import "../styles/humor.css";
import { addCircle } from "ionicons/icons";
import CustomRating from "../../components/CustomRating";

const HumorPage = () => {
  const history = useHistory();

  const [present, dismiss] = useIonModal(ModalExample, {
    onDismiss: (data, role) => dismiss(data, role),
  });

  function openModal() {
    present({
      onWillDismiss: (ev) => {
        if (ev.detail.role === "confirm") {
          alert(`Hello, ${ev.detail.data}!`);
        }
      },
    });
  }

  useEffect(() => {
    let r = window.localStorage.getItem("HAS_USED_HUMOR_FEATURE") || false;
    if (r === false) {
      history.replace("/humorOnboarding");
    }
  }, [history]);

  let response = window.localStorage.getItem("HAS_USED_HUMOR_FEATURE") || false;
  if (response === false) {
    return <HumorOnboarding />;
  } else {
    return (
      <IonPage>
        {/* HEADER */}
        <IonHeader>
          <IonToolbar>
            <IonTitle> Seu diário </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent scrollY={false} className="ion-padding">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Seu diário </IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonGrid fixed className="center-grid">
            <IonRow className="ion-align-items-center ion-justify-content-center tree-view">
              <img src="/assets/imgs/acompanhamento_humor/arvore-temp.png" />
            </IonRow>
            <IonRow className="ion-align-items-center ion-justify-content-center tree-view">
              <IonText className="main-phrase">
                " Frase que vai indicar o seu progresso "
              </IonText>
            </IonRow>
            <IonRow className="ion-align-items-center ion-justify-content-center">
              <h5> Como você está se sentindo? </h5>
            </IonRow>
            <IonButton
              expand="block"
              color="secondary"
              onClick={() => openModal()}
            >
              Adicionar registro de atividade/humor
              <IonIcon slot="end" icon={addCircle} />
            </IonButton>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
};

const ModalExample = ({ onDismiss }) => {
  const inputRef = useRef(null);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss(null, "cancel")}>
              Fechar
            </IonButton>
          </IonButtons>
          <IonTitle>Novo registro</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => onDismiss(inputRef.current?.value, "confirm")}
            >
              Confirmar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLabel>Como você está se sentindo agora?</IonLabel>
        <CustomRating />
      </IonContent>
    </IonPage>
  );
};

export default HumorPage;
