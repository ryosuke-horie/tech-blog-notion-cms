import Layout from '../components/Layout'
import '../styles/globals.css'

/**
 * Layoutの適用とグローバルCSSの適用
 * @param Component
 * @param pageProps
 * @returns
 */
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
