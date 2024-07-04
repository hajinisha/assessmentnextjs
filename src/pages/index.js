import Head from 'next/head'
import { useRouter } from 'next/router'
import en from '../locales/en.json'
import ar from '../locales/ar.json'
import styles from './home.module.css'

const Home = ({ welcomeMessage }) => {
  const { locale } = useRouter()

  return (
    <div>
      <Head>
        <title>{locale === 'ar' ? ar.meta.title1 : en.meta.title1}</title>
        <meta name="description" content={locale === 'ar' ? ar.meta.description1 : en.meta.description1} />
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>{welcomeMessage}</h1>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async ({ locale }) => {
  const translations = locale === 'ar' ? ar : en

  return {
    props: {
      welcomeMessage: translations.welcomeMessage
    }
  }
}

export default Home
