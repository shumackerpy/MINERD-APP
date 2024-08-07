import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonLabel, IonList, IonItemDivider, IonText } from '@ionic/react';
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

const SchoolQuery: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [visit, setVisit] = useState<Visit | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const querySchool = async () => {
    setLoading(true);
    setError(null);

    try {
      const { value } = await Storage.get({ key: 'visits' });
      const visits: Visit[] = value ? JSON.parse(value) : [];
      const foundVisit = visits.find(v => v.schoolCode === code);

      if (foundVisit) {
        setVisit(foundVisit);
      } else {
        setError('No se encontró una visita con el código de escuela proporcionado.');
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
          <IonTitle>Consulta de Escuela</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Código de Escuela</IonLabel>
          <IonInput
            value={code}
            onIonChange={e => setCode(e.detail.value as string)}
            clearInput
          />
        </IonItem>
        <IonButton expand="block" onClick={querySchool} disabled={loading}>
          {loading ? 'Buscando...' : 'Consultar'}
        </IonButton>
        {error && <IonText color="danger">{error}</IonText>}
        {visit && (
          <IonList>
            <IonItemDivider>Detalles de la Visita</IonItemDivider>
            {visit.photo && <img src={visit.photo} alt="Foto de la Visita" style={{ width: '150px', height: '150px', borderRadius: '75px' }} />}
            <IonItem>
              <IonLabel>Cédula:</IonLabel>
              <IonText>{visit.cedula}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Código del Centro:</IonLabel>
              <IonText>{visit.schoolCode}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Motivo de la Visita:</IonLabel>
              <IonText>{visit.visitReason}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Comentario:</IonLabel>
              <IonText>{visit.comment}</IonText>
            </IonItem>
            {visit.audio && <IonItem>
              <IonLabel>Nota de Voz:</IonLabel>
              <audio controls src={visit.audio} />
            </IonItem>}
            <IonItem>
              <IonLabel>Latitud:</IonLabel>
              <IonText>{visit.latitude}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Longitud:</IonLabel>
              <IonText>{visit.longitude}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Fecha:</IonLabel>
              <IonText>{visit.date}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Hora:</IonLabel>
              <IonText>{visit.time}</IonText>
            </IonItem>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SchoolQuery;
