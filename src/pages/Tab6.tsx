import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonMenu, IonList, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MINERD App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* <IonButton expand="block" onClick={() => history.push('/visit-types')}>Tipos de Visitas</IonButton> */}
        <IonButton expand="block" onClick={() => history.push('/school-query')}>Consulta de Escuela por Código</IonButton>
        <IonButton expand="block" onClick={() => history.push('/director-query')}>Consulta de Director por Cédula</IonButton>
        <IonButton expand="block" onClick={() => history.push('/register-visit')}>Registrar Visita</IonButton>
        <IonButton expand="block" onClick={() => history.push('/registered-visits')}>Visitas Registradas</IonButton>
        <IonButton expand="block" onClick={() => history.push('/map-visits')}>Mapa de Visitas</IonButton>
        <IonButton expand="block" onClick={() => history.push('/news')}>Noticias</IonButton>
        <IonButton expand="block" onClick={() => history.push('/weather')}>Estado del Clima</IonButton>
        <IonButton expand="block" onClick={() => history.push('/horoscope')}>Horóscopo</IonButton>
        <IonButton expand="block" onClick={() => history.push('/video')}>Video Demostrativo</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
