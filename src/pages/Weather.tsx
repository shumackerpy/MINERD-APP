import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonInput, IonButton, IonItem, IonList, IonModal, IonLabel, IonLoading } from '@ionic/react';
import axios from 'axios';
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

const Weather: React.FC = () => {
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [weather, setWeather] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const apiKey = 'bb24676df5515d8e7ed2eb840659b999';

  const fetchWeather = async () => {
    if (!latitude || !longitude) {
      setError('Por favor, ingrese latitud y longitud.');
      return;
    }
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
      const data = response.data;
      setWeather(`Temperatura: ${data.main.temp}°C, Descripción: ${data.weather[0].description}`);
      setError(null);
    } catch (error) {
      setError('Error al obtener el clima.');
      setWeather(null);
    }
  };

  useEffect(() => {
    const fetchVisits = async () => {
      setLoading(true);
      try {
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
          <IonTitle>Estado del Clima</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput 
            placeholder="Latitud" 
            value={latitude} 
            onIonChange={e => setLatitude(e.detail.value!)} 
            type="number" 
          />
        </IonItem>
        <IonItem>
          <IonInput 
            placeholder="Longitud" 
            value={longitude} 
            onIonChange={e => setLongitude(e.detail.value!)} 
            type="number" 
          />
        </IonItem>
        <IonButton expand="full" onClick={fetchWeather}>
          Obtener Clima
        </IonButton>
        {weather && <IonText><p>{weather}</p></IonText>}
        {error && <IonText color="danger"><p>{error}</p></IonText>}

        {/* Lista de visitas registradas */}
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

        {/* Modal para detalles de la visita */}
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

export default Weather;
