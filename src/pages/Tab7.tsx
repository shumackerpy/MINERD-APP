import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();

  const handleLogin = () => {
    // Lógica de autenticación aquí
    history.push('/tab6');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Cedula</IonLabel>
          <IonInput value={username} onIonChange={e => setUsername(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Clave</IonLabel>
          <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value as string)} />
        </IonItem>
        <IonButton expand="block" onClick={handleLogin}>Iniciar Sesión</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
