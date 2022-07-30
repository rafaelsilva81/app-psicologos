import React from "react";
import {
  IonApp,
  IonLoading,
  IonPage,
  setupIonicReact,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* OTHER IMPORTS */
import { ellipse, triangle, square } from "ionicons/icons";
import { Redirect, Route, Switch } from "react-router";

import { useEffect } from "react";

import { useAuth } from "./services/auth";

import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";

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
            <IonTabs id="main-view">
              <IonRouterOutlet>
                <Route path="/:tab(tab1)" component={Tab1} exact={true} />
                <Route path="/:tab(tab2)" component={Tab2} exact={true} />
                <Route path="/:tab(tab3)" component={Tab3} />
                <Route exact path="/" render={() => <Redirect to="/tab1" />} />
              </IonRouterOutlet>

              {/* TAB BAR LAYOUT - IONIC DEFAULT */}
              <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/tab1">
                  <IonIcon icon={triangle} />
                  <IonLabel>Tab 1</IonLabel>
                </IonTabButton>

                <IonTabButton tab="tab2" href="/tab2">
                  <IonIcon icon={ellipse} />
                  <IonLabel>Tab 2</IonLabel>
                </IonTabButton>

                <IonTabButton tab="tab3" href="/tab3">
                  <IonIcon icon={square} />
                  <IonLabel>Tab 3</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          ) : (
            <>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/onboarding" component={OnboardingPage} />
              <Redirect exact from="/" to="/login" />
            </>
          )}
        </IonReactRouter>
      </IonApp>
    );
  }
};
export default App;

// TODO: REMOVE UNUSED IMPORTS
