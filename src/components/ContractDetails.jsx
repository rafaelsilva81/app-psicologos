import React from 'react';
import {
	IonButton,
	IonCol,
	IonIcon,
	IonItemDivider,
	IonLabel,
	IonRow,
	IonText,
} from '@ionic/react';
import { arrowDownCircle } from 'ionicons/icons';

const ContractDetails = () => {
	return (
		<>
			<IonCol>
				<IonRow>
					{/* TODO: Melhorar isso aqui */}
					<IonItemDivider>
						<IonLabel> Dados do Psicólogo </IonLabel>
					</IonItemDivider>
				</IonRow>
				<IonRow class='ion-margin'>
					<IonText className='medic-name'> Nome do Psicólogo </IonText>
				</IonRow>
				<IonButton
					expand='block'
					fill='outline'
					className='ion-margin'
					onClick={() => {
						console.log('Pagina de contato em construção');
					}}>
					Baixar Contrato <IonIcon slot='end' icon={arrowDownCircle} />
				</IonButton>
			</IonCol>
		</>
	);
};

export default ContractDetails;
