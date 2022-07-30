import {
	IonButton,
	IonContent,
	IonIcon,
	IonPage,
	IonRow,
	IonSlides,
} from "@ionic/react";
import { arrowBack, arrowForward } from "ionicons/icons";
import React, { useRef, useState } from "react";
import OnboardingSlide from "../components/OnboardingSlide";
import CustomCircle from "../components/CustomCircle";

const OnboardingPage = () => {
	const sliderRef = useRef();
	const [lastSlide, setLastSlide] = useState(false);
	const [firstSlide, setFirstSlide] = useState(true);

	const slideContent = [
		{
			image: "/assets/imgs/onboarding-1.svg",
			mainSlide: true,
			title: "<NOME DO APP>",
			text: "Aplicativo para acompanhamento com o seu Psicólogo",
		},
		{
			image: "/assets/imgs/onboarding-2.svg",
			title: "Organize",
			text: "Marque suas consultas no conforto de sua casa",
		},
		{
			image: "/assets/imgs/onboarding-3.svg",
			title: "Expresse",
			text: "Faça um acompanhamento do seu dia-a-dia através do app",
		},
		{
			image: "/assets/imgs/onboarding-4.svg",
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
			<IonContent fullscreen scroll-y={false}>
				<CustomCircle position="top-left" />
				<CustomCircle
					position="bottom-right"
					width="250px"
					height="150px"
				/>
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
							<OnboardingSlide
								key={index}
								{...slide}
								lastSlide={lastSlide}
								sliderRef={sliderRef}
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

export default OnboardingPage;
