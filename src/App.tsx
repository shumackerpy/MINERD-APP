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
import Tab4 from './pages/Tab4';
import Tab5 from './pages/Tab5';
import Tab6 from './pages/Tab6';
import Tab7 from './pages/Tab7';
import SchoolQuery from './pages/SchoolQuery';
import VisitTypes from './pages/VisitTypes';
import RegisterVisit from './pages/RegisterVisit';
import RegisteredVisits from './pages/RegisteredVisits';
import MapVisits from './pages/MapVisits';
import News from './pages/News';
import Weather from './pages/Weather'; 
import Horoscope from './pages/Horoscope';
import VideoDemo from './pages/Video';
import DirectorSearch from './pages/DirectorSearch';
import IncidentDetails from './pages/IncidentDetails'

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
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
          <Route path="/tab4">
            <Tab4 />
          </Route>
          <Route path="/tab5">
            <Tab5 />
          </Route>
          <Route path="/tab6">
            <Tab6 />
          </Route>
          <Route path="/tab7">
            <Tab7 />
          </Route>
          <Route exact path="/school-query">
            <SchoolQuery /> {/* Agrega la ruta para la nueva página */}
          </Route>
          <Route exact path="/visit-types">
            <VisitTypes /> {/* Agrega la ruta para la nueva página */}
          </Route>
          <Route exact path="/register-visit">
            <RegisterVisit />
          </Route>
          <Route path="/registered-visits">
            <RegisteredVisits />
          </Route>
          <Route path="/map-visits">
            <MapVisits  />
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/weather">
            <Weather />
          </Route>
          <Route path="/horoscope">
            <Horoscope />
          </Route>
          <Route path="/video">
            <VideoDemo />
          </Route>
          <Route path="/director-query">
            <DirectorSearch />
          </Route>
          <Route path="/incidents">
            <IncidentDetails />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab7" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
        <IonTabButton tab="tab7" href="/tab7">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab6" href="/tab6">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Menu</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Registro Incidencia</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Registros</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tab4">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Acerca de</IonLabel>
          </IonTabButton>
          {/* <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton> */}
          
          {/* <IonTabButton tab="tab5" href="/tab5">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Tab 5</IonLabel>
          </IonTabButton> */}
          
          
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
