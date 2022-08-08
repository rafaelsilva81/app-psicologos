import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonRow,
  IonSlides,
} from "@ionic/react";
import { arrowBack, arrowForward } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import CustomCircle from "../components/CustomCircle";
import HumorOnboardingSlide from "../components/HumorOnboardingSlide";

const HumorOnboarding = () => {
  const sliderRef = useRef();
  const [lastSlide, setLastSlide] = useState(false);
  const [firstSlide, setFirstSlide] = useState(true);

  const slideContent = [
    {
      image: "/assets/imgs/onboarding/onboarding-1.svg",
      mainSlide: true,
      title: "Sua jornada começou!",
      text: "A partir de agora, acompanhe seu humor, hábitos e atividades",
    },
    {
      image: "/assets/imgs/onboarding/onboarding-2.svg",
      title: "Adicione suas atividades do dia-a-dia",
      text: "Responda quantas vezes quiser para acompanhar seu crescimento",
    },
    {
      image: "/assets/imgs/onboarding/onboarding-3.svg",
      title: "Cultive sua Árvore",
      text: "Sua árvore representa seus resultados, e ela cresce junto com você",
    },
    {
      image: "/assets/imgs/onboarding/onboarding-4.svg",
      title: "Pronto(a) para começar?",
      finalSlide: true,
      text: "",
    },
  ];

  const history = useHistory();
  useEffect(() => {
    let r = window.localStorage.getItem("HAS_USED_HUMOR_FEATURE") || false;
    if (r === true) {
      history.replace("/humor");
    }
  }, [history]);

  const checkSlides = async () => {
    const isLastSlide = await sliderRef.current.isEnd();
    const isFirstSlide = await sliderRef.current.isBeginning();
    setLastSlide(isLastSlide);
    setFirstSlide(isFirstSlide);
  };

  return (
    <IonPage>
      <IonContent scrollY={false}>
        <CustomCircle secondary position="top-left" />
        <CustomCircle secondary position="bottom-right" size="1.5" />
        <IonSlides
          style={{
            backgroundColor: "var(--ion-color-primary)",
          }}
          onIonSlideWillChange={checkSlides}
          pager={false}
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
              <HumorOnboardingSlide
                key={index}
                {...slide}
                lastSlide={lastSlide}
                sliderRef={sliderRef}
                goTo="/humor"
              />
            );
          })}
        </IonSlides>

        <IonRow className="slide-buttons">
          {!firstSlide && (
            <IonButton
              size="large"
              fill="clear"
              color="secondary"
              onClick={() => sliderRef.current.slidePrev()}
            >
              <IonIcon icon={arrowBack} />
            </IonButton>
          )}

          {!lastSlide && (
            <IonButton
              size="large"
              fill="clear"
              color="secondary"
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

export default HumorOnboarding;
