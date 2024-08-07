import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonText, IonSpinner } from '@ionic/react';
import axios from 'axios';

interface NewsItem {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  link: string;
}

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://remolacha.net/wp-json/wp/v2/posts?search=minerd');
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Noticias MINERD</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <IonSpinner name="crescent" />
        ) : (
          <IonList>
            {news.map((item) => (
              <IonItem key={item.id} button onClick={() => window.open(item.link, '_blank')}>
                <IonLabel>
                  <h2>{item.title.rendered}</h2>
                  <IonText color="medium">
                    <p dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
                  </IonText>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default News;
