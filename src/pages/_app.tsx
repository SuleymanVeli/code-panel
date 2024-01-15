import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import SessionWrapper from '@/providers/sessionWrapper';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import { UserProvider } from '@/providers/userProvider';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();


  return <UserProvider>
    <SessionWrapper>
      {router.pathname != "/login" ? <Layout>
        <Component {...pageProps} />
      </Layout> :
        <Component {...pageProps} />}
    </SessionWrapper>
  </UserProvider>

}
