import {
  IonCard,
  IonCardContent,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import "./styles/appointment.css";
import moment from "moment";
import { location as locationIcon, time, calendar } from "ionicons/icons";

function AppointmentItem(props) {
  const { date, location, hasReviewed } = props;

  const formatedDate = moment(date.toDate()).format("L");
  const formatedHour = moment(date.toDate()).format("LT");

  return (
    <IonCard color="primary">
      <IonItem color="primary" lines="full">
        <IonIcon icon={calendar} slot="start" />
        <IonLabel>
          <span className="appointment-date"> {formatedDate} </span>
        </IonLabel>
      </IonItem>

      <IonCardContent className="appointment-information">
        <IonRow className="ion-align-items-center">
          <IonCol size="3">
            <div className="ion-text-wrap">
              <IonIcon icon={time} />
              <span> {formatedHour} </span>
            </div>
          </IonCol>
          <IonCol size="9" className="ion-text-end">
            <div className="ion-text-wrap">
              <IonIcon icon={locationIcon} />
              <IonLabel className="ion-text-wrap"> {location} </IonLabel>
            </div>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
}

export default AppointmentItem;
