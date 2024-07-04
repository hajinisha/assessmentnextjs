import { useState, useEffect } from 'react';
import LanguageSwitcher from './languageSwitcher';
import Link from 'next/link';
import styles from './header.module.css';
import { useRouter } from 'next/router';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

const translations = {
  en,
  ar
};

const getText = (locale, key) => {
  const translation = translations[locale][key];
  if (typeof translation === 'string') {
    return translation;
  }
  return 'Translation not available';
};

const Header = () => {
  const [isRTL, setIsRTL] = useState(false);
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    setIsRTL(locale === 'ar');
  }, [locale]);

  const handleLanguageChange = (newLocale) => {
    setIsRTL(newLocale === 'ar');
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <header className={`${styles.header} ${isRTL ? styles.rtl : ''}`}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              {getText(locale || 'en', 'home')}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" className={styles.navLink}>
              {getText(locale || 'en', 'about')}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/blogs" className={styles.navLink}>
              {getText(locale || 'en', 'Blogs')}
            </Link>
          </li>
        </ul>
      </nav>
      <LanguageSwitcher onLanguageChange={handleLanguageChange} />
    </header>
  );
};

export default Header;
