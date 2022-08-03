import React from 'react';
import { IonCol, IonIcon, IonRow, IonText } from '@ionic/react';
import { personCircle } from 'ionicons/icons';

const ProfileDetails = () => {
	return (
		<>
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
		</>
	);
};

export default ProfileDetails;
