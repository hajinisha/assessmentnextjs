import "@/styles/globals.css";
import Header from "@/components/header";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const fetchTranslations = async (locale) => {
  const response = await fetch(`/api/locales/${locale}`);
  if (!response.ok) {
    throw new Error('Failed to fetch translations');
  }
  return response.json();
};

export default function App({ Component, pageProps }) {
  const { locale } = useRouter();
  const [translations, setTranslations] = useState({});
  useEffect(() => {
    fetchTranslations(locale || 'en')
      .then((data) => setTranslations(data))
      .catch((error) => console.error(error));
  }, [locale]);
  return (
    <>
      <Header />
      <Component {...pageProps} translations={translations} />
    </>
  );
}
