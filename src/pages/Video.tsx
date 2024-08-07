// src/pages/VideoDemo.tsx
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';

const VideoDemo: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Video Demostrativo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center' }}>
          <h2>Video Demostrativo de la Aplicación</h2>
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/S4I8wCQNzjc"
            title="Video Demostrativo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ maxWidth: '100%' }}
          ></iframe>
          <IonText>
            <h3>Miembros del Grupo:</h3>
            <p>Shumacker Del Villar Lorenzo - 2022-0477</p>
            <p>Jose Luis Acevedo Mendez - 2022-0447</p>
            <p>Felix Manuel Sanchez de la Cruz - 2022-0049</p>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VideoDemo;
