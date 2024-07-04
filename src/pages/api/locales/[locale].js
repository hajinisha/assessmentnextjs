import { NextApiRequest, NextApiResponse } from 'next';
import en from '../../../locales/en.json'; 
import ar from '../../../locales/ar.json'; 

const translations = {
  en,
  ar
};

export default function handler(req, res) {
  const { locale } = req.query;

  if (!locale || typeof locale !== 'string' || !translations[locale]) {
    res.status(404).json({ message: 'Locale not found' });
    return;
  }

  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=300');
  res.status(200).json(translations[locale]);
}
