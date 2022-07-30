import {
    IonButton,
    IonCol,
    IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonText,
} from '@ionic/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../services/auth';
import CustomCircle from '../components/CustomCircle';
import './login.css';

// import loginSvg from "/assets/imgs/login.svg";

/* TODO: Ler isso aqui, adicionar validação e melhorar design */
// TODO: Remover unused imports
// TODO: Melhorar o login incorreto
/* https://stackblitz.com/edit/ionic-react-hook-form-me1pv4?file=src%2FApp.tsx*/

const EMAILREGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const initialValues = {
    email: '',
    password: '',
};

const LoginPage = ({ history }) => {
    let { logIn, checkFirstAccess } = useAuth();

    useEffect(() => {
        let hasAcessed = checkFirstAccess();
        if (hasAcessed === false) {
            history.replace('/onboarding');
        }
    }, [checkFirstAccess, history]);

    // const { handleSubmit, control, setValue, register, getValues } = useForm({
    //     defaultValues: { ...initialValues },
    // });

    const { handleSubmit, register } = useForm({
        defaultValues: { ...initialValues },
    });

    const loginUser = async (data) => {
        await logIn(data);
        history.replace('/tab1');
    };

    return (
        <IonPage id='login-form'>
            <CustomCircle position='top-right' />
            <IonGrid>
                <IonRow
                    className='
                    main-container
                    ion-justify-content-center 
                    ion-align-items-center'>
                    <IonCol>
                        <IonRow className='ion-justify-content-center'>
                            <img
                                src='/assets/imgs/login.svg'
                                alt='login-img'
                                className='login-logo'
                            />
                        </IonRow>

                        <IonText color='muted' className='ion-text-center'>
                            <h2 className='login-title'> Bem-vindo(a)! </h2>
                        </IonText>
                        <form onSubmit={handleSubmit(loginUser)}>
                            {/* EMAIL */}
                            <IonItem className='ion-margin-vertical'>
                                <IonLabel position='floating'>E-mail</IonLabel>
                                <IonInput
                                    type='email'
                                    {...register('email', {
                                        required: 'Email is a required field',
                                        pattern: {
                                            value: EMAILREGEXP,
                                            message: 'invalid email address',
                                        },
                                    })}
                                />
                            </IonItem>

                            {/* PASSWORD */}
                            <IonItem className='ion-margin-vertical'>
                                <IonLabel position='floating'>Senha</IonLabel>
                                <IonInput
                                    type='password'
                                    {...register('password', {
                                        required: 'Password is a required field',
                                    })}
                                />
                            </IonItem>

                            <IonButton className='ion-margin-top' type='submit' expand='block'>
                                Login
                            </IonButton>
                        </form>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonPage>
    );
};

export default LoginPage;
