import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonRow,
  IonSlides,
} from "@ionic/react";
import { arrowBack, arrowForward } from "ionicons/icons";
import { useRef, useState } from "react";
import AppSlide from "../components/AppSlide";
import DecorationCircle from "../components/DecorationCircle";

/* IMAGE IMPORTS */
import onboarding1 from "../assets/imgs/onboarding-1.svg";
import onboarding2 from "../assets/imgs/onboarding-2.svg";
import onboarding3 from "../assets/imgs/onboarding-3.svg";
import onboarding4 from "../assets/imgs/onboarding-4.svg";

const AppOnboarding = () => {
  const sliderRef = useRef();
  const [lastSlide, setLastSlide] = useState(false);
  const [firstSlide, setFirstSlide] = useState(true);

  const slideContent = [
    {
      image: onboarding1,
      mainSlide: true,
      title: "<NOME DO APP>",
      text: "Aplicativo para acompanhamento com o seu Psicólogo",
    },
    {
      image: onboarding2,
      title: "Organize",
      text: "Marque suas consultas no conforto de sua casa",
    },
    {
      image: onboarding3,
      title: "Expresse",
      text: "Faça um acompanhamento do seu dia-a-dia através do app",
    },
    {
      image: onboarding4,
      title: "Pronto(a) para começar?",
      finalSlide: true,
      text: "",
    },
  ];

  const checkSlides = async () => {
    const isLastSlide = await sliderRef.current.isEnd();
    const isFirstSlide = await sliderRef.current.isBeginning();
    setLastSlide(isLastSlide);
    setFirstSlide(isFirstSlide);
  };

  return (
    <IonPage>
      <IonContent scrollY={false}>
        <DecorationCircle position="top-left" />
        <DecorationCircle position="bottom-right" size="1.5" />
        <IonSlides
          style={{
            backgroundColor: "var(--ion-color-secondary)",
          }}
          onIonSlideWillChange={checkSlides}
          pager={true}
          ref={sliderRef}
          id="slider"
          options={{
            slidesPerView: "auto",
            zoom: true,
            grabCursor: true,
          }}
        >
          {slideContent.map((slide, index) => {
            return (
              <AppSlide
                key={index}
                {...slide}
                lastSlide={lastSlide}
                sliderRef={sliderRef}
                goTo="/login"
              />
            );
          })}
        </IonSlides>

        <IonRow className="slide-buttons">
          {!firstSlide && (
            <IonButton
              size="large"
              fill="clear"
              onClick={() => sliderRef.current.slidePrev()}
            >
              <IonIcon icon={arrowBack} />
            </IonButton>
          )}

          {!lastSlide && (
            <IonButton
              size="large"
              fill="clear"
              onClick={() => sliderRef.current.slideNext()}
            >
              <IonIcon icon={arrowForward} />
            </IonButton>
          )}
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default AppOnboarding;
