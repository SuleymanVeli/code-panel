import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import SessionWrapper from '@/providers/sessionWrapper';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname == "/login")
    return <SessionWrapper>
        <Component {...pageProps} />   
    </SessionWrapper>

  return <SessionWrapper>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SessionWrapper>
}
