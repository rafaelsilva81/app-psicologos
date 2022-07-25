import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
/* import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css'; */

/* Theme variables */
import './theme/variables.css';

/* OTHER IMPORTS */
import { useEffect } from 'react';
import authService from "./services/auth"
import { onAuthStateChanged } from 'firebase/auth';

setupIonicReact();

function App() {

  let isLogged
  useEffect(() => {    
    onAuthStateChanged(authService, (user) => {
      if(user) {
        console.log(user.uid)
        isLogged=true
      } else {
        console.log("NÃO ESTÁ LOGADO")
        isLogged=false /* TODO: Tem um jeito mais recomendado de fazer isso aqui */
      }
    })
  }, []);

  return (
    <div>
      <IonApp>
        <IonReactRouter>
          { isLogged ?  
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tab1">
                <Tab1 />
              </Route>
              <Route exact path="/tab2">
                <Tab2 />
              </Route>
              <Route path="/tab3">
                <Tab3 />
              </Route>
              <Redirect exact from="/" to="/tab1" />
            </IonRouterOutlet>
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
          </IonTabs> : <h1> Não ta logado irmao </h1> }
        </IonReactRouter>
      </IonApp>
    </div>
  )
}


export default App;
