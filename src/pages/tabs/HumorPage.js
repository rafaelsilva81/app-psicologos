import {
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonText,
  useIonModal,
  useIonAlert,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import HumorOnboarding from "../HumorOnboarding";
import "../styles/humor.css";
import { addCircle } from "ionicons/icons";
import HumorFormModal from "../HumorFormModal";
import CustomCircle from "../../components/CustomCircle";

// TODO: tree
import tree1 from "../../assets/imgs/tree-1.svg";
import tree2 from "../../assets/imgs/tree-2.svg";
import tree3 from "../../assets/imgs/tree-3.svg";
import tree4 from "../../assets/imgs/tree-4.svg";
import tree5 from "../../assets/imgs/tree-5.svg";

const HumorPage = () => {
  const history = useHistory();

  const [presentAlert] = useIonAlert();

  const [treeImg, setTreeImg] = useState(tree1);
  const [treeLevel, setTreeLevel] = useState(1);
  const [treeExp, setTreeExp] = useState(0);

  useEffect(() => {
    if (treeExp >= 100 && treeExp < 1000) {
      setTreeLevel(2);
    } else if (treeExp >= 1000 && treeExp <= 5000) {
      setTreeLevel(3);
    }
  });

  const [present, dismiss] = useIonModal(HumorFormModal, {
    onDismiss: (data, role) => dismiss(data, role),
  });

  function openModal() {
    present({
      onWillDismiss: (ev) => {
        if (ev.detail.role === "confirm") {
          let points = 0;
          const { notes, ...activities } = ev.detail.data;
          notes === "" ? (points += 0) : (points += 100);
          for (var key of Object.keys(activities)) {
            if (activities[key] != undefined && activities[key] === true) {
              points += 100;
            }
          }

          if (points > 0) {
            setTreeExp(treeExp + points);
          }
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
        <CustomCircle position="bottom-left" size="0.6" />

        {/* HEADER */}
        <IonHeader>
          <IonToolbar>
            <IonTitle> SEU DIÁRIO </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent scrollY={false} className="ion-padding">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large"> SEU DIÁRIO </IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonGrid fixed className="center-grid">
            <IonRow className="ion-align-items-center ion-justify-content-center tree-view">
              <img
                style={{ background: "var(--ion-color-primary)" }}
                src={treeImg}
              />
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

export default HumorPage;
