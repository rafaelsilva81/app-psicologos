import React from 'react';
import {
  IonApp,
  IonLoading,
  setupIonicReact,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* OTHER IMPORTS */
import { home, happy, addCircle, person } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';

import { useEffect } from 'react';

import { useAuth } from './services/auth';

import HomePage from './pages/tabs/HomePage';
import Tab2 from './pages/tabs/Tab2';
import Tab3 from './pages/tabs/Tab3';
import ProfilePage from './pages/tabs/ProfilePage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';

setupIonicReact();

const App = () => {
  const { authInfo, initializeAuth } = useAuth();

  useEffect(() => {
    !authInfo?.initialized && (async () => await initializeAuth())();
  }, [authInfo, initializeAuth]);

  if (!authInfo || !authInfo.initialized) {
    return (
      <IonApp>
        <IonLoading isOpen={true} />
      </IonApp>
    );
  } else {
    return (
      <IonApp>
        <IonReactRouter>
          {authInfo?.loggedIn === true ? (
            <IonTabs id='main-view'>
              <IonRouterOutlet>
                <Route path='/:tab(home)' component={HomePage} exact />
                <Route path='/:tab(humor)' component={Tab2} exact />
                <Route path='/:tab(extras)' component={Tab3} exact />
                <Route path='/:tab(profile)' component={ProfilePage} exact />
                <Route exact path='/' render={() => <Redirect to='/home' />} />
              </IonRouterOutlet>

              {/* TAB BAR LAYOUT - IONIC DEFAULT */}
              <IonTabBar slot='bottom'>
                <IonTabButton tab='home' href='/home'>
                  <IonIcon icon={home} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>

                <IonTabButton tab='humor' href='/humor'>
                  <IonIcon icon={happy} />
                  <IonLabel>Humor</IonLabel>
                </IonTabButton>

                <IonTabButton tab='extras' href='/extras'>
                  <IonIcon icon={addCircle} />
                  <IonLabel>Extras</IonLabel>
                </IonTabButton>

                <IonTabButton tab='profile' href='/profile'>
                  <IonIcon icon={person} />
                  <IonLabel>Perfil</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          ) : (
            <>
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/onboarding' component={OnboardingPage} />
              <Redirect exact from='/' to='/login' />
            </>
          )}
        </IonReactRouter>
      </IonApp>
    );
  }
};
export default App;

// TODO: REMOVE UNUSED IMPORTS
