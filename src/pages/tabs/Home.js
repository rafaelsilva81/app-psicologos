import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  collection,
  doc,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import AppointmentItem from "../../components/AppointmentItem";
import DecorationCircle from "../../components/DecorationCircle";
import { useAuth } from "../../services/auth";
import noResultImg from "../../assets/imgs/no_result.svg";
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();
  const { authInfo } = useAuth();
  const { user } = authInfo;

  const userRef = doc(useFirestore(), "users", user.email);
  const q = query(
    collection(useFirestore(), "appointments"),
    where("patient", "==", userRef),
    limit(10),
    orderBy("date", "asc")
  );

  const { data: appointmentData } = useFirestoreCollectionData(q, {
    suspense: true, //Necessário pra que a aplicação fique suspendida enquanto tudo carrega
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CONSULTAS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <DecorationCircle position="top-right" size="1.2" />

      <IonContent fullscreen className="ion-padding">
        <IonRefresher
          slot="fixed"
          onIonRefresh={() => {
            history.go(0);
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* HEADER */}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CONSULTAS</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* BODY */}

        {appointmentData.length === 0 ? (
          <NoResult />
        ) : (
          <IonList>
            {appointmentData.map(({ location, date, hasReview }, i) => {
              return (
                <AppointmentItem
                  location={location}
                  date={date}
                  hasReview={hasReview}
                  key={i}
                />
              );
            })}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;

const NoResult = () => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "1.5em",
        padding: "1.5em",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img
        style={{ maxHeight: "15em", opacity: "0.85" }}
        src={noResultImg}
        alt="sem-resultados"
      />
      <h3 className="ion-text-center"> Não há consultas marcadas. </h3>
    </div>
  );
};
