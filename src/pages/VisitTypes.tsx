import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonModal, IonText } from '@ionic/react';
import axios from 'axios';

interface VisitType {
  id: number;
  name: string;
}

const VisitTypes: React.FC = () => {
  const [visitTypes, setVisitTypes] = useState<VisitType[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<VisitType | null>(null);

  useEffect(() => {
    // Fetch visit types from API
    const fetchVisitTypes = async () => {
      try {
        const response = await axios.get('https://adamix.net/minerd/def/situaciones.php');
        setVisitTypes(response.data);
      } catch (error) {
        console.error('Error fetching visit types:', error);
      }
    };

    fetchVisitTypes();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tipos de Visitas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {visitTypes.map(visitType => (
            <IonItem key={visitType.id} button onClick={() => setSelectedVisit(visitType)}>
              <IonLabel>{visitType.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* Modal for visit details */}
        <IonModal isOpen={!!selectedVisit} onDidDismiss={() => setSelectedVisit(null)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{selectedVisit?.name}</IonTitle>
              <IonButton slot="end" onClick={() => setSelectedVisit(null)}>Cerrar</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonText>
              <h2>Detalles</h2>
              <p>{selectedVisit ? `ID: ${selectedVisit.id}` : 'No hay detalles disponibles.'}</p>
            </IonText>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default VisitTypes;
