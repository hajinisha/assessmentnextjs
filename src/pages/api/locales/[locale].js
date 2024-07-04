import en from '../../../locales/en.json'; 
import ar from '../../../locales/ar.json'; 

// Store the translations for each locale
const translations = {
  en,
  ar
};

export default function handler(req, res) {
  const { locale } = req.query; // Extract locale from query parameters

  // Check if locale is valid
  if (!locale || typeof locale !== 'string' || !translations[locale]) {
    res.status(404).json({ message: 'Locale not found' }); // Respond with 404 if locale is not found
    return;
  }

  // Set cache headers to improve performance
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=300');
  res.status(200).json(translations[locale]); // Respond with the translations for the requested locale
}
