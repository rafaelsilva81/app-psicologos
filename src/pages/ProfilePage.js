import React from 'react';
import {
	IonButton,
	IonCol,
	IonContent,
	IonFooter,
	IonGrid,
	IonHeader,
	IonIcon,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
} from '@ionic/react';

import { personCircle, arrowDownCircle } from 'ionicons/icons';

import { useAuth } from '../services/auth';
import { useHistory } from 'react-router-dom';

// TODO: CSS PROPRIO PARA ESSA PAGINA

const ProfilePage = () => {
	let { logOut } = useAuth();
	const history = useHistory();

	const handleLogout = async () => {
		await logOut();
		history.replace('/login');
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle> PERFIL </IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className='ion-padding'>
				<IonGrid>
					<IonRow id='profile-info' className='ion-align-items-center ion-margin-bottom'>
						<IonCol size='3' id='profile-img'>
							<IonIcon style={{ fontSize: '4rem' }} icon={personCircle} />
						</IonCol>
						<IonCol>
							<IonRow>
								<IonText className='profile-name'>Nome Sobrenome</IonText>
							</IonRow>
							<IonRow>
								<IonText className='profile-email'>email@email.com</IonText>
							</IonRow>
						</IonCol>
					</IonRow>
					<IonButton expand='block' onClick={handleLogout}>
						LOGOUT
					</IonButton>
					<IonRow id='contract-info' className='ion-align-items-center ion-margin-top'>
						<IonCol>
							<IonRow>
								<IonItemDivider>
									<IonLabel id='section-title'> Dados do Psicólogo </IonLabel>
								</IonItemDivider>
							</IonRow>
							<IonRow class='ion-margin'>
								<IonText className='medic-name'> Nome do Psicólogo </IonText>
								<IonText className='medic-name'> CRP: XX/XXXXXX </IonText>
							</IonRow>
							<IonButton
								expand='block'
								fill='outline'
								className='ion-margin'
								onClick={() => {
									console.log('Pagina de contato em construção');
								}}>
								Baixar Contrato <IonIcon icon={arrowDownCircle} />
							</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
			<IonFooter className='ion-margin'>
				<IonLabel color='medium' className='app-version'>
					v0.0.1 alpha
				</IonLabel>
			</IonFooter>
		</IonPage>
	);
};

export default ProfilePage;
