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

import { useAuth } from "../../services/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";

const HumorPage = () => {
  const history = useHistory();

  const { authInfo } = useAuth();
  const { user } = authInfo;

  const [presentAlert] = useIonAlert();

  const userRef = doc(useFirestore(), "users", user.email);
  const [treeImg, setTreeImg] = useState(tree1);
  const [treeExp, setTreeExp] = useState(0);

  const { data: userData } = useFirestoreDocData(userRef, {
    suspense: true, //Necessário pra que a aplicação fique suspendida enquanto tudo carrega
  });

  useEffect(() => {
    let r = window.localStorage.getItem("HAS_USED_HUMOR_FEATURE") || false;
    if (r === false) {
      history.replace("/humorOnboarding");
    }

    if (userData.treeExp) {
      setTreeExp(userData.treeExp);
    }

    if (treeExp > 100 && treeExp <= 1000) {
      setTreeImg(tree2);
    } else if (treeExp > 1000 && treeExp <= 5000) {
      setTreeImg(tree3);
    } else if (treeExp > 5000 && treeExp <= 10000) {
      setTreeImg(tree4);
    } else if (treeExp > 10000) {
      setTreeImg(tree5);
    } else {
      setTreeImg(tree1);
    }
  }, [userData, treeExp, history]);

  /* MODAL */
  const [present, dismiss] = useIonModal(HumorFormModal, {
    onDismiss: (data, role) => dismiss(data, role),
  });

  function openModal() {
    present({
      onWillDismiss: async (ev) => {
        if (ev.detail.role === "confirm") {
          let points = 0;
          const { notes, ...activities } = ev.detail.data;
          notes === "" ? (points += 0) : (points += 100);
          for (var key of Object.keys(activities)) {
            if (activities[key] !== undefined && activities[key] === true) {
              points += 100;
            }
          }

          if (points > 0) {
            console.log(treeExp);
            await updateDoc(userRef, {
              treeExp: treeExp + points,
            });
          }
        }
      },
    });
  }

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
            {/* DEBUG */}
            <span
              className="ion-text-center"
              style={{ fontSize: "85%", color: "#bbb" }}
            >
              (DEBUG) Pontos da Árvore : {treeExp} / 10000 <br />
            </span>

            <IonRow className="ion-align-items-center ion-justify-content-center tree-view">
              <img
                style={{ background: "var(--ion-color-primary)" }}
                src={treeImg}
                alt="sua-arvore"
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
