import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { collection, doc, limit, query, where } from 'firebase/firestore';
import moment from 'moment';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import AppointmentTile from '../../components/AppointmentTile';
import { useAuth } from '../../services/auth';

const HomePage = () => {
  const { authInfo } = useAuth();
  const { user } = authInfo;

  const userRef = doc(useFirestore(), "users", user.email);
  const q = query(collection(useFirestore(), "appointments"), where('patient', '==', userRef), limit(10))
  const { data: appointmentData } = useFirestoreCollectionData(q, {
    suspense: true //Necessário pra que a aplicação fique suspendida enquanto tudo carrega
  });


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CONSULTAS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        {/* HEADER */}
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>CONSULTAS</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* BODY */}
        <IonList>
          {
            appointmentData.map(({ location, date, hasReview }, i) => {
              return <AppointmentTile location={location} date={date} hasReview={hasReview} key={i} />
            })
          }
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default HomePage;
