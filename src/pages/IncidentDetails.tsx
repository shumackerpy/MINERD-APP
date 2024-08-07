import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonText, IonButton, IonImg } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { Storage } from '@capacitor/storage';

interface Incident {
  title: string;
  school: string;
  region: string;
  district: string;
  date: string;
  description: string;
  photo: string | null;
  audio: string | null;
}

const IncidentDetails: React.FC = () => {
  const { index } = useParams<{ index: string }>(); // Parámetro de ruta
  const [incident, setIncident] = useState<Incident | null>(null);

  useEffect(() => {
    const loadIncident = async () => {
      const { value } = await Storage.get({ key: 'incidents' });
      if (value) {
        const incidents = JSON.parse(value) as Incident[];
        setIncident(incidents[parseInt(index)]);
      }
    };

    loadIncident();
  }, [index]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalles de Incidencia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {incident ? (
          <>
            <IonItem>
              <IonLabel>Título</IonLabel>
              <IonText>{incident.title}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Centro Educativo</IonLabel>
              <IonText>{incident.school}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Regional</IonLabel>
              <IonText>{incident.region}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Distrito</IonLabel>
              <IonText>{incident.district}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Fecha</IonLabel>
              <IonText>{incident.date}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Descripción</IonLabel>
              <IonText>{incident.description}</IonText>
            </IonItem>
            {incident.photo && (
              <IonItem>
                <IonLabel>Foto</IonLabel>
                <IonImg src={incident.photo} />
              </IonItem>
            )}
            {/* Aquí podrías añadir un reproductor de audio si lo necesitas */}
          </>
        ) : (
          <IonText>Cargando...</IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default IncidentDetails;
