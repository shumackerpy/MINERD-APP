import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonItem, IonLabel, IonButton, IonText } from '@ionic/react';
import { horoscopes } from '../data/horoscopes'; // Asegúrate de que la ruta sea correcta

type ZodiacSign = keyof typeof horoscopes;

const Horoscope: React.FC = () => {
  const [sign, setSign] = useState<ZodiacSign>('aries');
  const [horoscope, setHoroscope] = useState<string>('');

  const fetchHoroscope = () => {
    const selectedHoroscope = horoscopes[sign];
    setHoroscope(selectedHoroscope.description);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Horóscopo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>Selecciona tu signo zodiacal</IonLabel>
          <IonSelect value={sign} placeholder="Seleccionar signo" onIonChange={e => setSign(e.detail.value as ZodiacSign)}>
            <IonSelectOption value="aries">Aries</IonSelectOption>
            <IonSelectOption value="taurus">Tauro</IonSelectOption>
            <IonSelectOption value="gemini">Géminis</IonSelectOption>
            <IonSelectOption value="cancer">Cáncer</IonSelectOption>
            <IonSelectOption value="leo">Leo</IonSelectOption>
            <IonSelectOption value="virgo">Virgo</IonSelectOption>
            <IonSelectOption value="libra">Libra</IonSelectOption>
            <IonSelectOption value="scorpio">Escorpio</IonSelectOption>
            <IonSelectOption value="sagittarius">Sagitario</IonSelectOption>
            <IonSelectOption value="capricorn">Capricornio</IonSelectOption>
            <IonSelectOption value="aquarius">Acuario</IonSelectOption>
            <IonSelectOption value="pisces">Piscis</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonButton expand="full" onClick={fetchHoroscope}>
          Obtener Horóscopo
        </IonButton>
        {horoscope && (
          <IonText>
            <h2>Horóscopo del Día</h2>
            <p>{horoscope}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Horoscope;
