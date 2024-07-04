import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './languageSwitcher.module.css';

const LanguageSwitcher = ({ onLanguageChange }) => {
  const router = useRouter();
  const { locale, locales } = router;
  const [currentLocale, setCurrentLocale] = useState(locale);

  const handleChangeLanguage = (newLocale) => {
    if (currentLocale !== newLocale) {
      setCurrentLocale(newLocale);
      onLanguageChange(newLocale);
    }
  };

  return (
    <div className={styles.languageSwitcher}>
      {locales?.map((loc) => (
        <button
          key={loc}
          onClick={() => handleChangeLanguage(loc)}
          className={`${styles.languageButton} ${loc === currentLocale ? styles.active : ''}`}
        >
          {loc === 'en' ? 'English' : 'عربي'}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
