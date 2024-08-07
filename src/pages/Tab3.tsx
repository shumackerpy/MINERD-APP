import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonButton } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { Storage } from '@capacitor/storage';

const IncidentDetail: React.FC = () => {
  const [incident, setIncident] = useState<any>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const loadIncident = async () => {
      const { value } = await Storage.get({ key: 'incidents' });
      if (value) {
        const incidents = JSON.parse(value);
        setIncident(incidents[parseInt(id)]);
      }
    };
    loadIncident();
  }, [id]);

  if (!incident) {
    return <IonText>Cargando...</IonText>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle de Incidencia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText><h2>{incident.title}</h2></IonText>
        <IonText><p>{incident.description}</p></IonText>
        {/* Agregar foto y audio aquí */}
      </IonContent>
    </IonPage>
  );
};

export default IncidentDetail;
