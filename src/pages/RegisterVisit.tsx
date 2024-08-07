import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonDatetime, IonImg, IonToast, IonLoading } from '@ionic/react';
import { Camera, CameraResultType } from '@capacitor/camera';
import axios from 'axios';
import RecordRTC, { StereoAudioRecorder } from 'recordrtc';
import { Storage } from '@capacitor/storage';
import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos para las visitas

interface VisitType {
  id: number;
  name: string;
}

const RegisterVisit: React.FC = () => {
  const [cedula, setCedula] = useState<string>('');
  const [schoolCode, setSchoolCode] = useState<string>('');
  const [visitReason, setVisitReason] = useState<string>('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const [audio, setAudio] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [visitTypes, setVisitTypes] = useState<VisitType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [recorder, setRecorder] = useState<RecordRTC | null>(null);
  const [recording, setRecording] = useState<boolean>(false);

  useEffect(() => {
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

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        quality: 100
      });
      setPhoto(image.dataUrl ?? null);
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const startRecordingAudio = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Media devices not supported.');
      return;
    }
  
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const newRecorder = new RecordRTC(stream, {
        type: 'audio',
        recorderType: StereoAudioRecorder
      });
      newRecorder.startRecording();
      setRecorder(newRecorder);
      setRecording(true);
    }).catch(error => {
      console.error('Error accessing media devices:', error);
    });
  };

  const stopRecordingAudio = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const audioUrl = URL.createObjectURL(recorder.getBlob());
        setAudio(audioUrl);
        setRecording(false);
      });
    }
  };

  const submitVisit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://adamix.net/minerd/minerd/registrar_visita.php', {
        cedula,
        schoolCode,
        visitReason,
        photo,
        comment,
        audio,
        latitude,
        longitude,
        date
      });

      // Guardar visita en almacenamiento local
      const newVisit = {
        id: uuidv4(),
        cedula,
        schoolCode,
        visitReason,
        photo,
        comment,
        audio,
        latitude,
        longitude,
        date
      };
      
      const { value } = await Storage.get({ key: 'visits' });
      const visits = value ? JSON.parse(value) : [];
      visits.push(newVisit);
      await Storage.set({ key: 'visits', value: JSON.stringify(visits) });

      setToastMessage('Visita registrada con éxito!');
    } catch (error) {
      console.error('Error registering visit:', error);
      setToastMessage('Error al registrar la visita.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrar Visita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Cédula del Director</IonLabel>
          <IonInput value={cedula} onIonChange={e => setCedula(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Código del Centro</IonLabel>
          <IonInput value={schoolCode} onIonChange={e => setSchoolCode(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Motivo de la Visita</IonLabel>
          <IonInput value={visitReason} onIonChange={e => setVisitReason(e.detail.value as string)} />
        </IonItem>
        <IonButton expand="block" onClick={takePhoto}>Tomar Foto</IonButton>
        {photo && <IonImg src={photo} alt="Evidencia de la Visita" />}
        <IonButton expand="block" onClick={startRecordingAudio} disabled={recording}>Grabar Nota de Voz</IonButton>
        <IonButton expand="block" onClick={stopRecordingAudio} disabled={!recording}>Detener Grabación</IonButton>
        {audio && <audio controls src={audio} />}
        <IonItem>
          <IonLabel position="stacked">Comentario</IonLabel>
          <IonTextarea value={comment} onIonChange={e => setComment(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Latitud</IonLabel>
          <IonInput type="number" value={latitude} onIonChange={e => setLatitude(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Longitud</IonLabel>
          <IonInput type="number" value={longitude} onIonChange={e => setLongitude(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Fecha y Hora</IonLabel>
          <IonDatetime
            value={date}
            onIonChange={e => setDate(e.detail.value as string)}
          />
        </IonItem>
        <IonButton expand="block" onClick={submitVisit}>Registrar Visita</IonButton>
        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage || ''}
          duration={2000}
          onDidDismiss={() => setToastMessage(null)}
        />
        <IonLoading isOpen={loading} message="Registrando visita..." />
      </IonContent>
    </IonPage>
  );
};

export default RegisterVisit;
