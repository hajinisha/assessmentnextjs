import Link from 'next/link';
import { useRouter } from 'next/router';
import en from '../../locales/en.json';
import ar from '../../locales/ar.json';
import styles from '../../pages/blogs/blogs.module.css';

const BlogsPage = () => {
  // useRouter hook to get the current locale
  const { locale } = useRouter();

  // Determine translations based on the current locale
  const translations = locale === 'ar' ? ar : en;

  return (
    <div className={styles.card}>
      {/* Display the translated title for Blogs */}
      <h1>{translations.Blogs}</h1>
      <ul>
        <li>
          {/* Link to the first blog post with translated title and underline style */}
          <Link href="/blogs/post1" className={styles.underline}>
            {translations.post1}
          </Link>
        </li>
        <li>
          {/* Link to the second blog post with translated title and underline style */}
          <Link href="/blogs/post2" className={styles.underline}>
            {translations.post2}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BlogsPage;
