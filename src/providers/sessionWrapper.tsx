import { SessionProvider, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function SessionWrapper({ children }: any) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/api/auth/signin'); 
      }
    };

    checkSession();
  }, []);

  return <SessionProvider session={null}>{children}</SessionProvider>;
}

export default SessionWrapper;
