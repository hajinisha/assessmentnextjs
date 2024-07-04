import { useRouter } from 'next/router'
import en from '../locales/en.json'
import ar from '../locales/ar.json'
import Head from 'next/head'
import styles from './home.module.css'

const About = ({ abouttitle, aboutcontent }) => {
  const { locale } = useRouter()

  return (
    <div>
      <Head>
        <title>{locale === 'ar' ? ar.meta.title2 : en.meta.title2}</title>
        <meta name="description" content={locale === 'ar' ? ar.meta.description2 : en.meta.description2} />
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>{abouttitle}</h1>
          <p>{aboutcontent}</p>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async ({ locale }) => {
  const translations = locale === 'ar' ? ar : en

  return {
    props: {
      abouttitle: translations.abouttitle,
      aboutcontent: translations.aboutcontent
    }
  }
}

export default About
