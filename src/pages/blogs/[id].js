import { useRouter } from 'next/router';
import styles from '../home.module.css';

const BlogPostPage = ({ post }) => {
  const { locale } = useRouter();

  // Show loading state if post is not yet loaded
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Display the blog post title and content */}
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

// Define the static paths for blog posts
export const getStaticPaths = async () => {
  // Paths for both 'post1' and 'post2' blog posts
  const paths = [
    { params: { id: 'post1' } },
    { params: { id: 'post2' } }
  ];

  return {
    paths,
    fallback: true // Enable fallback for missing translations
  };
};

// Fetch data for each blog post based on the id and locale
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

  // Initialize post variable
  let post;

  // Fetch blog post data for 'post1'
  if (params?.id === 'post1') {
    post = {
      id: 'post1',
      title: currentLocale === 'ar' ? 'المنشور الأول' : 'First Post',
      content: currentLocale === 'ar' ? 'هذا هو محتوى المنشور الأول.' : 'This is the content of the first post.'
    };
  // Fetch blog post data for 'post2'
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
