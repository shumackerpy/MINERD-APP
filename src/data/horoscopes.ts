// src/data/horoscopes.ts
interface Horoscope {
    description: string;
  }
  
  export const horoscopes: Record<string, Horoscope> = {
    aries: {
      description: "Es un buen día para comenzar nuevos proyectos. La energía está a tu favor."
    },
    taurus: {
      description: "Hoy es un buen día para reflexionar sobre tus metas a largo plazo."
    },
    gemini: {
      description: "La comunicación será clave hoy. Asegúrate de escuchar a los demás."
    },
    cancer: {
      description: "Es un buen momento para conectar con tu familia y seres queridos."
    },
    leo: {
      description: "Tu creatividad estará en su punto máximo. Aprovecha para hacer algo artístico."
    },
    virgo: {
      description: "La organización será importante hoy. Haz una lista de tareas y cúmplela."
    },
    libra: {
      description: "Busca el equilibrio en tus relaciones. La armonía será esencial."
    },
    scorpio: {
      description: "Es un buen día para enfrentar desafíos. Tu determinación será tu aliada."
    },
    sagittarius: {
      description: "Hoy es un buen día para viajar o explorar nuevas ideas."
    },
    capricorn: {
      description: "La disciplina y el enfoque serán clave para lograr tus objetivos."
    },
    aquarius: {
      description: "La innovación y la originalidad estarán en su punto más alto hoy."
    },
    pisces: {
      description: "Confía en tu intuición. Te guiará en la dirección correcta."
    }
  };
  