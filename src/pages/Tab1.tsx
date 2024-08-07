import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Storage } from '@capacitor/storage';

const Home: React.FC = () => {
  const history = useHistory();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const clearStorage = async () => {
    await Storage.clear();
    setShowAlert(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MINERD App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonButton expand="block" onClick={() => history.push('/tab5')}>
          Nueva Incidencia
        </IonButton>
        <IonButton expand="block" onClick={() => history.push('/tab2')}>
          Registro de Incidencias
        </IonButton>
        <IonButton expand="block" onClick={() => history.push('/tab4')}>
          Acerca de
        </IonButton>
        <IonButton expand="block" color="danger" onClick={() => setShowAlert(true)}>
          Borrar Todos los Registros
        </IonButton>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Confirmar'}
          message={'¿Estás seguro de que deseas borrar todos los registros?'}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Borrar',
              handler: clearStorage
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
