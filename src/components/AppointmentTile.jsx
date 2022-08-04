import { IonCol, IonGrid, IonItem, IonRow } from "@ionic/react";
import React from "react";
import "./appointment.css";

function AppointmentTile(props) {
  const { date, location, hasReviewed } = props;
  return (
    <IonItem>
      <IonGrid fixed>
        <IonRow className="ion-align-items-center">
          <IonCol size="10">
            <h3> 14 de ago de 2022 </h3>
          </IonCol>
          <IonCol>Avaliar</IonCol>
        </IonRow>
        <IonRow className="ion-align-items-around">
          <IonCol>08:00 AM</IonCol>
          <IonCol>Localização</IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
}

export default AppointmentTile;
