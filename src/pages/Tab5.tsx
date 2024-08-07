import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonDatetime } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Storage } from '@capacitor/storage';

const NewIncident: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const history = useHistory();

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl
    });
    setPhoto(image.dataUrl ?? null);
  };

  const saveIncident = async () => {
    const { value } = await Storage.get({ key: 'incidents' });
    const incidents = value ? JSON.parse(value) : [];
    incidents.push({ title, school, region, district, date, description, photo, audio });
    await Storage.set({ key: 'incidents', value: JSON.stringify(incidents) });
    history.push('/tab2');  // Redirigir con parámetro de query
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nueva Incidencia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Título</IonLabel>
          <IonInput value={title} onIonChange={e => setTitle(e.detail.value as string ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Centro Educativo</IonLabel>
          <IonInput value={school} onIonChange={e => setSchool(e.detail.value as string ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Regional</IonLabel>
          <IonInput value={region} onIonChange={e => setRegion(e.detail.value as string ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Distrito</IonLabel>
          <IonInput value={district} onIonChange={e => setDistrict(e.detail.value as string ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Fecha</IonLabel>
          <IonDatetime
            value={date}
            onIonChange={e => setDate(e.detail.value as string ?? '')}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value as string ?? '')} />
        </IonItem>
        <IonButton expand="block" onClick={takePhoto}>Tomar Foto</IonButton>
        {photo && <img src={photo} alt="Foto de Incidencia" />}
        {/* Añadir funcionalidad de audio aquí */}
        <IonButton expand="block" onClick={saveIncident}>Guardar Incidencia</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NewIncident;
