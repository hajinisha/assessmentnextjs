import { useState, useEffect } from 'react';
import LanguageSwitcher from './languageSwitcher';
import Link from 'next/link';
import styles from './header.module.css';
import { useRouter } from 'next/router';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

// Object holding translations for both English and Arabic
const translations = {
  en,
  ar
};

// Function to get the translation for a given key and locale
const getText = (locale, key) => {
  const translation = translations[locale][key];
  if (typeof translation === 'string') {
    return translation;
  }
  return 'Translation not available';
};

const Header = () => {
  // State to manage Right-To-Left (RTL) layout
  const [isRTL, setIsRTL] = useState(false);
  const router = useRouter();
  const { locale } = router;

  // Effect to set the RTL layout based on the current locale
  useEffect(() => {
    setIsRTL(locale === 'ar');
  }, [locale]);

  // Function to handle language change and update the route with the new locale
  const handleLanguageChange = (newLocale) => {
    setIsRTL(newLocale === 'ar');
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <header className={`${styles.header} ${isRTL ? styles.rtl : ''}`}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            {/* Link to Home Page with translation */}
            <Link href="/" className={styles.navLink}>
              {getText(locale || 'en', 'home')}
            </Link>
          </li>
          <li className={styles.navItem}>
            {/* Link to About Page with translation */}
            <Link href="/about" className={styles.navLink}>
              {getText(locale || 'en', 'about')}
            </Link>
          </li>
          <li className={styles.navItem}>
            {/* Link to Blogs Page with translation */}
            <Link href="/blogs" className={styles.navLink}>
              {getText(locale || 'en', 'Blogs')}
            </Link>
          </li>
        </ul>
      </nav>
      {/* Language switcher component to change language */}
      <LanguageSwitcher onLanguageChange={handleLanguageChange} />
    </header>
  );
};

export default Header;
