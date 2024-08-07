import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonImg } from '@ionic/react';
import './Tab4.css';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Acerca de</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Shumacker Del Villar, Felix Manuel Sanchez, Jose Luis Acevedo</h2>
          <p>2022-0477, 2022-0447, 2022-0049</p>
          <p>Impulsando el éxito con innovación y calidad</p>
        </IonText>
        <div className="image-container">
          <IonImg src="\src\assets\foto.png" alt="Foto 1" />
          <IonImg src="\src\assets\jose.jpeg" alt="Foto 2" />
          <IonImg src="\src\assets\pinguin.jpeg" alt="Foto 3" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;
