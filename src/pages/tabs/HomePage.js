import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
import CustomCircle from "../../components/CustomCircle";
import { useAuth } from "../../services/auth";

const HomePage = () => {
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

      <IonContent fullscreen className="ion-padding">
        <CustomCircle position="top-right" size="1.2" />

        {/* HEADER */}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CONSULTAS</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* BODY */}
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
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
