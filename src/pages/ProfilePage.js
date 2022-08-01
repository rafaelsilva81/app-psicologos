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

import { personCircle, arrowDownCircle, logOut as logOutIcon } from 'ionicons/icons';

import { useAuth } from '../services/auth';
import { useHistory } from 'react-router-dom';

// TODO: CSS PROPRIO PARA ESSA PAGINA
// TODO: COMPONENTIZAÇÃO E OBTER DADOS DO BANCO
const ProfilePage = () => {
	let { logOut } = useAuth();
	const history = useHistory();

	const handleLogout = async () => {
		await logOut();
		history.replace('/login');
	};

	return (
		<IonPage>
			{/* HEADER */}
			<IonHeader>
				<IonToolbar>
					<IonTitle> PERFIL </IonTitle>
				</IonToolbar>
			</IonHeader>

			{/* BODY */}
			<IonContent fullscreen className='ion-padding'>
				{/* GRID */}
				<IonGrid fixed>
					{/* PROFILE Card */}
					<IonRow className='ion-align-items-center'>
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

					{/* LOGOUT Button */}
					<IonRow>
						<IonCol>
							<IonButton expand='full' onClick={handleLogout}>
								LOGOUT
								<IonIcon slot='end' icon={logOutIcon} />
							</IonButton>
						</IonCol>
					</IonRow>

					{/* EDIT Button*/}
					<IonRow>
						<IonCol size='6'>
							<IonButton expand='full' fill='outline' size='small' href='#'>
								Alterar dados
							</IonButton>
						</IonCol>
						<IonCol size='6'>
							<IonButton expand='full' fill='outline' size='small' href='#'>
								Alterar senha
							</IonButton>
						</IonCol>
					</IonRow>

					{/* CONTRACT Card*/}
					<IonRow className='ion-align-items-center'>
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
