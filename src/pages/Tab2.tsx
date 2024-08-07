import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
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

const Incidents: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const loadIncidents = async () => {
      const { value } = await Storage.get({ key: 'incidents' });
      if (value) {
        setIncidents(JSON.parse(value));
      }
    };

    loadIncidents();
  }, [location.search]);  // Dependencia de query string

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Incidencias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {incidents.map((incident, index) => (
            <IonItem key={index} onClick={() => history.push(`/incidents/${index}`)}>
              <IonLabel>{incident.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Incidents;
