import Layout from '../components/Layout'
import '../styles/globals.css'

/**
 * ページ全体のレイアウトを設定
 */
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
