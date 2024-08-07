import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonModal, IonText, IonLoading } from '@ionic/react';
import { Storage } from '@capacitor/storage';

interface Visit {
  id: string;
  cedula: string;
  schoolCode: string;
  visitReason: string;
  photo: string | null;
  comment: string;
  audio: string | null;
  latitude: string;
  longitude: string;
  date: string;
  time: string;
}

const RegisteredVisits: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchVisits = async () => {
      setLoading(true);
      try {
        // Fetch visits from storage
        const { value } = await Storage.get({ key: 'visits' });
        if (value) {
          setVisits(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error fetching visits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Visitas Registradas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {visits.map(visit => (
            <IonItem key={visit.id} button onClick={() => setSelectedVisit(visit)}>
              <IonLabel>
                <h2>Código del Centro: {visit.schoolCode}</h2>
                <h3>Cédula del Director: {visit.cedula}</h3>
                <p>Motivo: {visit.visitReason}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* Modal for visit details */}
        <IonModal isOpen={!!selectedVisit} onDidDismiss={() => setSelectedVisit(null)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Detalles de la Visita</IonTitle>
              <IonButton slot="end" onClick={() => setSelectedVisit(null)}>Cerrar</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedVisit && (
              <IonText>
                <h2>Detalles de la Visita</h2>
                <p><strong>Cédula del Director:</strong> {selectedVisit.cedula}</p>
                <p><strong>Código del Centro:</strong> {selectedVisit.schoolCode}</p>
                <p><strong>Motivo:</strong> {selectedVisit.visitReason}</p>
                <p><strong>Comentario:</strong> {selectedVisit.comment}</p>
                <p><strong>Latitud:</strong> {selectedVisit.latitude}</p>
                <p><strong>Longitud:</strong> {selectedVisit.longitude}</p>
                <p><strong>Fecha:</strong> {selectedVisit.date}</p>
                
                {selectedVisit.photo && <img src={selectedVisit.photo} alt="Evidencia de la Visita" />}
                {selectedVisit.audio && <audio controls src={selectedVisit.audio} />}
              </IonText>
            )}
          </IonContent>
        </IonModal>
        <IonLoading isOpen={loading} message="Cargando visitas..." />
      </IonContent>
    </IonPage>
  );
};

export default RegisteredVisits;
