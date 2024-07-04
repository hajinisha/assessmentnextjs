import Head from 'next/head';
import { useRouter } from 'next/router';
import en from '../locales/en.json';
import ar from '../locales/ar.json';
import styles from './home.module.css';

const Home = ({ welcomeMessage }) => {
  const { locale } = useRouter(); // Use Next.js router to get the current locale

  return (
    <div>
      <Head>
        {/* Set the page title and meta description based on the current locale */}
        <title>{locale === 'ar' ? ar.meta.title1 : en.meta.title1}</title>
        <meta name="description" content={locale === 'ar' ? ar.meta.description1 : en.meta.description1} />
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Display the welcome message passed as a prop */}
          <h1>{welcomeMessage}</h1>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  // Choose the translations based on the current locale
  const translations = locale === 'ar' ? ar : en;

  return {
    props: {
      welcomeMessage: translations.welcomeMessage // Pass the welcome message as a prop
    }
  };
};

export default Home;
