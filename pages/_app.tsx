import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'

import Layout from '../components/Layout'
import * as gtag from '../lib/gtag'
import '../styles/globals.css'

/**
 * Layoutの適用とグローバルCSSの適用
 * @param Component
 * @param pageProps
 * @returns
 */
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouterChange = (url: any) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouterChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouterChange)
    }
  }, [router.events])

  return (
    <Layout>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());

           gtag('config', '${gtag.GA_MEASUREMENT_ID}');
           `,
        }}
      />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
