import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonList, IonItemDivider, IonText, IonModal, IonLoading } from '@ionic/react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Storage } from '@capacitor/storage';

const API_KEY = 'AIzaSyBeMO1lkpy2irGy7XarV7FU6U7SEqqDIFA'; // Clave API de Google Maps
const mapContainerStyle = {
  height: '50vh',
  width: '100%',
};

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

const MapVisits: React.FC = () => {
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>('');
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

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

  useEffect(() => {
    if (selected) {
      const fetchAddress = async () => {
        try {
          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${selected.lat},${selected.lng}&key=${API_KEY}`);
          const data = await response.json();
          if (data.results.length > 0) {
            setAddress(data.results[0].formatted_address);
          } else {
            setAddress('Dirección no disponible');
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          setAddress('Error al obtener la dirección');
        }
      };
      fetchAddress();
    }
  }, [selected]);

  const handleShowMap = () => {
    const lat = latitude && !isNaN(parseFloat(latitude)) ? parseFloat(latitude) : 46.818188;
    const lng = longitude && !isNaN(parseFloat(longitude)) ? parseFloat(longitude) : 8.227512;

    setCenter({ lat, lng });
    setSelected({ lat, lng });
  };

  const handleClear = () => {
    setLatitude('');
    setLongitude('');
    setCenter(null);
    setSelected(null);
    setAddress('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mapa de Visitas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Latitud</IonLabel>
          <IonInput value={latitude} onIonChange={e => setLatitude(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Longitud</IonLabel>
          <IonInput value={longitude} onIonChange={e => setLongitude(e.detail.value!)} />
        </IonItem>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px', marginTop: '10px' }}>
          <IonButton 
            size="small" 
            onClick={handleShowMap}
            style={{ flex: 1, marginRight: '5px' }}>Mostrar Mapa</IonButton>
          <IonButton 
            size="small" 
            onClick={handleClear}
            style={{ flex: 1, marginLeft: '5px' }}>Limpiar</IonButton>
        </div>
        
        {center && (
          <LoadScript googleMapsApiKey={API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
            >
              {visits.map(visit => (
                visit.latitude && visit.longitude && (
                  <Marker
                    key={visit.id}
                    position={{ lat: parseFloat(visit.latitude), lng: parseFloat(visit.longitude) }}
                    onClick={() => setSelected({ lat: parseFloat(visit.latitude), lng: parseFloat(visit.longitude) })}
                  />
                )
              ))}
              {selected && (
                <InfoWindow
                  position={selected}
                  onCloseClick={() => setSelected(null)}
                >
                  <div>
                    <p>Lat: {selected.lat}</p>
                    <p>Lon: {selected.lng}</p>
                    <p>Ubicación: {address}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        )}

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

export default MapVisits;
