import {
  IonApp,
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
import { home, happy, addCircle, person } from "ionicons/icons";
import { Redirect, Route } from "react-router";

import { useEffect } from "react";

import { useAuth } from "./services/auth";

import Loader from "./components/Loader";
import Home from "./pages/tabs/Home";
import Humor from "./pages/tabs/Humor";
import ExtrasPage from "./pages/tabs/Extras";
import Profile from "./pages/tabs/Profile";
import Login from "./pages/Login";
import AppOnboarding from "./pages/AppOnboarding";
import HumorOnboarding from "./pages/HumorOnboarding";

import moment from "moment";
import "moment/locale/pt-br";

setupIonicReact({
  mode: "ios",
  animated: true,
  hardwareBackButton: true,
});

const App = () => {
  moment().locale("pt-br");

  const { authInfo, initializeAuth } = useAuth();

  useEffect(() => {
    !authInfo?.initialized && (async () => await initializeAuth())();
  }, [authInfo, initializeAuth]);

  if (!authInfo || !authInfo.initialized) {
    return <Loader />;
  } else {
    return (
      <IonApp>
        <IonReactRouter>
          {authInfo?.loggedIn === true ? (
            <IonTabs id="main-view">
              <IonRouterOutlet>
                <Route path="/home" component={Home} exact />
                <Route path="/humor" component={Humor} exact />
                <Route path="/extras" component={ExtrasPage} exact />
                <Route path="/profile" component={Profile} exact />
                <Route
                  path="/humorOnboarding"
                  component={HumorOnboarding}
                  exact
                />
                <Route exact path="/" render={() => <Redirect to="/home" />} />
              </IonRouterOutlet>

              {/* TAB BAR LAYOUT - IONIC DEFAULT */}
              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                  <IonIcon icon={home} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>

                <IonTabButton tab="humor" href="/humor">
                  <IonIcon icon={happy} />
                  <IonLabel>Humor</IonLabel>
                </IonTabButton>

                <IonTabButton tab="extras" href="/extras">
                  <IonIcon icon={addCircle} />
                  <IonLabel>Extras</IonLabel>
                </IonTabButton>

                <IonTabButton tab="profile" href="/profile">
                  <IonIcon icon={person} />
                  <IonLabel>Perfil</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          ) : (
            <>
              <Route exact path="/loginFunc" />
              <Route exact path="/login" component={Login} />
              <Route exact path="/onboarding" component={AppOnboarding} />
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
