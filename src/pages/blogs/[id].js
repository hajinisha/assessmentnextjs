import { useRouter } from 'next/router';
import en from '../../locales/en.json';
import ar from '../../locales/ar.json';
import styles from '../home.module.css';

const BlogPostPage = ({ post }) => {
  const { locale } = useRouter();

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  // Define paths for both English and Arabic blog posts
  const paths = [
    { params: { id: 'post1' } },
    { params: { id: 'post2' } }
  ];

  return {
    paths,
    fallback: true // Enable fallback for missing translations
  };
};

export const getStaticProps = async ({ params, locale }) => {
  // Define fallback content for missing translations
  const fallbackContent = {
    en: {
      title: 'Content Not Available',
      content: 'Content is not available for the selected language.'
    },
    ar: {
      title: 'المحتوى غير متاح',
      content: 'المحتوى غير متاح باللغة المختارة.'
    }
  };

  // Ensure locale is defined
  const currentLocale = locale || 'en';

  // Fetch blog post data based on the id and locale
  let post;

  if (params?.id === 'post1') {
    post = {
      id: 'post1',
      title: currentLocale === 'ar' ? 'المنشور الأول' : 'First Post',
      content: currentLocale === 'ar' ? 'هذا هو محتوى المنشور الأول.' : 'This is the content of the first post.'
    };
  } else if (params?.id === 'post2') {
    post = {
      id: 'post2',
      title: currentLocale === 'ar' ? 'المنشور الثاني' : 'Second Post',
      content: currentLocale === 'ar' ? 'هذا هو محتوى المنشور الثاني.' : 'This is the content of the second post.'
    };
  }

  // If post is undefined, fallback to default content based on currentLocale
  if (!post) {
    post = {
      id: 'fallback',
      title: fallbackContent[currentLocale].title || 'Content Not Available',
      content: fallbackContent[currentLocale].content || 'Content is not available for the selected language.'
    };
  }

  return {
    props: {
      post
    }
  };
};

export default BlogPostPage;