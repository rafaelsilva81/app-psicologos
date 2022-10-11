import { IonSlide, IonButton, IonGrid, IonRow, IonCol } from "@ionic/react";
import "../styles/onboarding.css";

import { useHistory } from "react-router-dom";

const AppSlide = ({
  image,
  mainSlide = false,
  finalSlide = false,
  title,
  text,
  lastSlide,
  sliderRef,
}) => {
  const history = useHistory();

  return (
    <IonSlide>
      <IonGrid className="ion-justify-content-center ion-align-items-center ion-align-self-center">
        <IonRow className="slide-content-container">
          <IonCol size="12" className="slide-content">
            <img src={image} className="slide-main-image" alt="img" />
            <h1>{title}</h1>
            <p>{text}</p>

            {mainSlide && (
              <IonButton
                expand="block"
                onClick={() => sliderRef.current.slideNext()}
              >
                COMEÇAR &rarr;
              </IonButton>
            )}

            {finalSlide && (
              <IonButton
                expand="block"
                onClick={async () => {
                  history.replace("/login");
                }}
              >
                Login
              </IonButton>
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonSlide>
  );
};

export default AppSlide;
