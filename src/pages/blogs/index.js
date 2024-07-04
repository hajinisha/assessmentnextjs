import Link from 'next/link';
import { useRouter } from 'next/router';
import en from '../../locales/en.json';
import ar from '../../locales/ar.json';
import styles from '../../pages/blogs/blogs.module.css';

const BlogsPage = () => {
  const { locale } = useRouter();
  const translations = locale === 'ar' ? ar : en;

  return (
    <div className={styles.card}>
      <h1>{translations.Blogs}</h1>
      <ul>
        <li>
          <Link href="/blogs/post1" className={styles.underline}>{translations.post1}</Link>
        </li>
        <li>
          <Link href="/blogs/post2" className={styles.underline}>{translations.post2}</Link>
        </li>
      </ul>
    </div>
  );
};

export default BlogsPage;
