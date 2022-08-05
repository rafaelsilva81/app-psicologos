import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useEffect } from "react";
import "./appointment.css";
import moment from "moment";
import { clipboard, location as locationIcon, time } from "ionicons/icons";

function AppointmentTile(props) {
  const { date, location, hasReviewed } = props;

  const formatedDate = moment(date.toDate()).format("L");
  const formatedHour = moment(date.toDate()).format("LT");

  return (
    <IonItem lines="full">
      <IonGrid fixed>
        <IonRow className="ion-align-items-center">
          <IonCol size="6">
            <IonText className="appointment-date"> {formatedDate} </IonText>
          </IonCol>
          <IonCol className="ion-text-end">
            <IonButton
              fill="outline"
              className="review-button"
              disabled={hasReviewed}
            >
              Avaliar
              <IonIcon slot="end" icon={clipboard} />
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="ion-align-items-center">
          <IonCol size="3">
            <IonLabel className="appointment-hour">
              <IonIcon icon={time} />
              <span> {formatedHour} </span>
            </IonLabel>
          </IonCol>
          <IonCol size="9" className="ion-text-end">
            <IonLabel className="appointment-location">
              <IonIcon icon={locationIcon} />
              <span> {location} </span>
            </IonLabel>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
}

export default AppointmentTile;
