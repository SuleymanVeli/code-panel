import { Spinner } from '@material-tailwind/react';
import { SessionProvider, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from './userProvider';

function SessionWrapper({ children }: any) {
  const router = useRouter();
  const { setUser } = useUser()

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/api/auth/signin');
      }else{
        setUser(session.user)
        setLoading(false)
      }
    };

    checkSession();
  }, []);

  return <SessionProvider session={null}>{loading ?
    <div className='bg-[#161b22] w-screen h-screen '></div> : children}</SessionProvider>;
}

export default SessionWrapper;
