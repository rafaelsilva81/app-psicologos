import { IonSlide, IonButton, IonGrid, IonRow, IonCol } from "@ionic/react";
import "./styles/onboarding.css";

import { useHistory } from "react-router-dom";

const HumorOnboardingSlide = ({
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
            <img src={image} className="slide-main-image" />
            <h1>{title}</h1>
            <p>{text}</p>

            {mainSlide && (
              <IonButton
                expand="block"
                color="secondary"
                onClick={() => sliderRef.current.slideNext()}
              >
                COMEÇAR &rarr;
              </IonButton>
            )}

            {finalSlide && (
              <IonButton
                color="secondary"
                expand="block"
                onClick={async () => {
                  window.localStorage.setItem("HAS_USED_HUMOR_FEATURE", true);
                  history.replace("/humor");
                }}
              >
                Vamos lá!
              </IonButton>
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonSlide>
  );
};

export default HumorOnboardingSlide;
