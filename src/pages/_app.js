
import "@/styles/globals.css";
import Header from "@/components/header";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Function to fetch translations based on locale
const fetchTranslations = async (locale) => {
  const response = await fetch(`/api/locales/${locale}`); // Fetch translations API endpoint
  if (!response.ok) {
    throw new Error('Failed to fetch translations'); 
  }
  return response.json(); 
};

// Main application component that wraps all pages
export default function App({ Component, pageProps }) {
  const { locale } = useRouter(); // Get the current locale using useRouter hook
  const [translations, setTranslations] = useState({}); // State to hold translations

  // Effect hook to fetch translations when locale changes
  useEffect(() => {
    fetchTranslations(locale || 'en') // Fetch translations with current locale, default to 'en' if locale is undefined
      .then((data) => setTranslations(data)) // Set fetched translations in state
      .catch((error) => console.error(error));
  }, [locale]); // Trigger effect whenever locale changes

  // Render Header component and pass translations to child component
  return (
    <>
      <Header /> 
      <Component {...pageProps} translations={translations} /> {/* Render current page component and pass translations as props */}
    </>
  );
}
