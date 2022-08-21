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

const ContractData = (props) => {
  const { name, contract: url } = props;

  const grabContract = async () => {
    const fileTransfer = FileTransfer.create();
    fileTransfer.download(url, File.dataDirectory + "contract.pdf", true).then(
      (entry) => {
        console.log("Arquivo foi baixado: " + entry.toURL());
      },
      (error) => {
        console.log("Erro no donwload do contrato : " + error);
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
          disabled
          expand="block"
          fill="solid"
          className="ion-margin"
          onClick={grabContract}
        >
          Baixar Contrato <IonIcon slot="end" icon={arrowDownCircle} />
        </IonButton>
      </IonCol>
    </>
  );
};

export default ContractData;
