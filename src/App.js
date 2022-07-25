import { IonApp, setupIonicReact } from '@ionic/react';
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
import { useEffect, useRef } from 'react';
import authService from "./services/auth"
import { onAuthStateChanged } from 'firebase/auth';
import Routes from './Routes';
import Login from './pages/Login';

setupIonicReact();

const App = () => {

  const isLogged = useRef(false);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        isLogged.current = true
        console.log(user.uuid)
      } else {
        console.log("NÃO ESTÁ LOGADO")
      }
    })
  }, []);

  return (
    <div>
      <IonApp>
        <IonReactRouter>
          {isLogged.current ?
            <Routes /> : <Login />}
        </IonReactRouter>
      </IonApp>
    </div>
  )
}


export default App;
