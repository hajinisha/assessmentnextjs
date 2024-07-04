import { useState } from 'react'; 
import { useRouter } from 'next/router'; 
import styles from './languageSwitcher.module.css'; 

// LanguageSwitcher component takes onLanguageChange function as props
const LanguageSwitcher = ({ onLanguageChange }) => {
  const router = useRouter(); //  useRouter hook
  const { locale, locales } = router; // Destructure locale and locales 
  const [currentLocale, setCurrentLocale] = useState(locale); // State to manage currentLocale

  // Function to handle language change
  const handleChangeLanguage = (newLocale) => {
    if (currentLocale !== newLocale) { 
      setCurrentLocale(newLocale); // Update current locale in state
      onLanguageChange(newLocale); // Call onLanguageChange function passed as props
    }
  };

  return (
    <div className={styles.languageSwitcher}> {/* Render language switcher container */}
      {locales?.map((loc) => ( // Map through locales array
        <button
          key={loc} // Set unique key for each button
          onClick={() => handleChangeLanguage(loc)} // Handle click event to change language
          className={`${styles.languageButton} ${loc === currentLocale ? styles.active : ''}`} // Apply styles conditionally
        >
          {loc === 'en' ? 'English' : 'عربي'} {/* Display language name based on locale */}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher; 
