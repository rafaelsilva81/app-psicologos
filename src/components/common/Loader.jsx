import React from "react";
import {IonPage, IonLoading} from "@ionic/react";

const Loader = () => {
  return (
    <IonPage>
      <IonLoading isOpen={true} />
    </IonPage>
  );
};

export default Loader