import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonText } from '@ionic/react';
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

const DirectorSearch: React.FC = () => {
  const [cedula, setCedula] = useState<string>('');
  const [visit, setVisit] = useState<Visit | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchVisit = async () => {
    setLoading(true);
    setError(null);

    try {
      const { value } = await Storage.get({ key: 'visits' });
      const visits: Visit[] = value ? JSON.parse(value) : [];
      const foundVisit = visits.find(v => v.cedula === cedula);

      if (foundVisit) {
        setVisit(foundVisit);
      } else {
        setError('No se encontró una visita con la cédula proporcionada.');
      }
    } catch (error) {
      setError('Error al buscar la visita.');
      console.error('Error fetching visit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Consulta de Director por Cédula</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Cédula del Director</IonLabel>
          <IonInput value={cedula} onIonChange={e => setCedula(e.detail.value!)} />
        </IonItem>
        <IonButton expand="full" onClick={searchVisit} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar Director'}
        </IonButton>
        {error && <IonText color="danger">{error}</IonText>}
        {visit && (
          <div style={{ textAlign: 'center' }}>
            <h2>Detalles de la Visita</h2>
            {visit.photo && <img src={visit.photo} alt="Foto de la Visita" style={{ width: '150px', height: '150px', borderRadius: '75px' }} />}
            <p><strong>Cédula:</strong> {visit.cedula}</p>
            <p><strong>Código del Centro:</strong> {visit.schoolCode}</p>
            <p><strong>Motivo de la Visita:</strong> {visit.visitReason}</p>
            <p><strong>Comentario:</strong> {visit.comment}</p>
            {visit.audio && <audio controls src={visit.audio} />}
            <p><strong>Latitud:</strong> {visit.latitude}</p>
            <p><strong>Longitud:</strong> {visit.longitude}</p>
            <p><strong>Fecha:</strong> {visit.date}</p>
            <p><strong>Hora:</strong> {visit.time}</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DirectorSearch;
