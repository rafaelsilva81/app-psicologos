import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRange,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import {
  play as playIcon,
  pause as pauseIcon
} from "ionicons/icons";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, orderBy, query } from "firebase/firestore";
import { Howl } from "howler";
import "../styles/meditation.css";
import { App } from "@capacitor/app";
import { useHistory } from "react-router";

/* TODO : Ordenar query */
const Meditation = ({ onDismiss }) => {
  const history = useHistory();
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState();
  const [trackName, setTrackName] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (track && isPlaying) {
      const timer = setTimeout(() => {
        let p = (track.seek() / track.duration()) * 100;
        setProgress(p);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  App.addListener("backButton", () => {
    if (track && isPlaying) {
      track.stop();
    }
    history.go(-1);
  });

  const q = query(
    collection(useFirestore(), "meditation_audios"),
    orderBy("name")
  );

  const { data: audioData } = useFirestoreCollectionData(q, {
    idField: "id",
    suspense: true,
  });

  const selectTrack = (idx) => {
    if (isPlaying) {
      track.mute(true);
    }
    setTrackName(audioData[idx].name);
    setProgress(0);
    var sound = new Howl({
      src: [audioData[idx].path],
      html5: true,
      volume: 0.8,
    });
    setIsPlaying(true);
    setTrack(sound);
    sound.play();
  };

  const togglePlay = () => {
    isPlaying ? track.pause() : track.play();

    setIsPlaying(!isPlaying);
  };

  return (
    <IonPage>
      {/* HEADER */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              color="medium"
              onClick={() => {
                onDismiss(track);
              }}
            >
              Fechar
            </IonButton>
          </IonButtons>
          <IonTitle> Meditação guiada </IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* BODY */}
      <IonContent fullscreen>
        <IonList lines="full">
          {audioData.map(({ name }, i) => {
            return (
              <IonItem
                button
                detail={false}
                key={i}
                onClick={() => {
                  selectTrack(i);
                }}
              >
                <IonLabel color={trackName === name ? "primary" : "dark"}>
                  {name}
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>

      {/* FOOTER - (PLAY/PAUSE/VOLUME) */}
      <IonFooter>
        <IonToolbar>
          <IonRow>
            <IonCol className="ion-text-center" size="12">
              {trackName !== ""
                ? trackName
                : "Selecione um audio para ouvir... "}
            </IonCol>
            <IonCol size="2">
              <IonRow>
                <IonButton
                  fill="clear"
                  disabled={track ? false : true}
                  onclick={() => togglePlay(track)}
                >
                  <IonIcon
                    slot="icon-only"
                    icon={isPlaying ? pauseIcon : playIcon}
                  />
                </IonButton>
              </IonRow>
            </IonCol>
            <IonCol size="10">
              <IonRange
                onIonKnobMoveStart={({ detail }) => {
                  if (isPlaying) {
                    track.pause();
                  }
                }}
                onIonKnobMoveEnd={({ detail }) => {
                  setProgress(detail.value);
                  track.seek((detail.value * track.duration()) / 100);
                  if (isPlaying) {
                    track.play();
                  }
                }}
                disabled={track ? false : true}
                max={100}
                value={progress}
              ></IonRange>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Meditation;
