import React from "react";
import {
  IonButton,
  IonCol,
  IonIcon,
  IonItemDivider,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { arrowDownCircle } from "ionicons/icons";

import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";

const ContractDetails = (props) => {
  const { name, contract: url } = props;

  const grabContract = async () => {
    const fileTransfer = FileTransfer.create();
    fileTransfer.download(url, File.tempDirectory + "contract.pdf", true).then(
      (entry) => {
        console.log("download complete: " + entry.toURL());
      },
      (error) => {
        console.log("ERROR: ", error);
      }
    );
  };

  return (
    <>
      <IonCol>
        <IonRow>
          {/* TODO: Melhorar isso aqui */}
          <IonItemDivider>
            <IonLabel> Dados do Psicólogo </IonLabel>
          </IonItemDivider>
        </IonRow>
        <IonRow class="ion-margin">
          <IonText className="medic-name"> {name} </IonText>
        </IonRow>
        <IonButton
          expand="block"
          fill="outline"
          className="ion-margin"
          onClick={grabContract}
        >
          Baixar Contrato <IonIcon slot="end" icon={arrowDownCircle} />
        </IonButton>
      </IonCol>
    </>
  );
};

export default ContractDetails;
