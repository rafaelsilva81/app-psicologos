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
import { getDownloadURL, listAll, ref as storageRef } from "firebase/storage";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { useStorage } from "reactfire";

const ContractData = (props) => {
  const { name, medicMail } = props;

  const storage = useStorage();

  const listRef = storageRef(storage, medicMail + "/contract.pdf" || "err");

  const download = async () => {
    await getDownloadURL(listRef)
      .then((url) => {
        // `url` is the download URL
        const fileTransfer = FileTransfer.create();
        fileTransfer
          .download(url, File.dataDirectory + "contract.pdf", true)
          .then(
            (entry) => {
              alert("download complete: " + entry.toURL());
            },
            (error) => {
              alert("ERROR: ", error);
            }
          );
      })
      .catch((error) => {
        alert(error);
      });
  };

  /* listAll(listRef)
    .then((res) => {
      if (res.items.length === 0 && res.prefixes.length === 0) {
        console.log("The folder is empty or doesnt exist");
      }
      res.items.forEach((itemRef) => {
        console.log("Item : ", itemRef);
      });
    })
    .catch((error) => {
      console.error(error);
    }); */

  /*   const grabContract = async () => {
    const fileTransfer = FileTransfer.create();
    fileTransfer.download(url, File.dataDirectory + "contract.pdf", true).then(
      (entry) => {
        console.log("Arquivo foi baixado: " + entry.toURL());
      },
      (error) => {
        console.log("Erro no donwload do contrato : " + error);
      }
    );
  }; */

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
          fill="solid"
          className="ion-margin"
          onClick={download}
        >
          Baixar Contrato <IonIcon slot="end" icon={arrowDownCircle} />
        </IonButton>
      </IonCol>
    </>
  );
};

export default ContractData;
