import useCurrentUser from '@/hooks/useCurrentUser';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  return (
    <div className='flex items-center justify-center h-full'>
      <div className='flex flex-col'>
        <h1 className='text-3xl text-white text-center md:text-6xl'>
          Who is watching?
        </h1>
        <div className='flex items-center justify-center gap-8 mt-10'>
          <div
            className='group flex-row w-44 mx-auto'
            onClick={() => router.push('/')}
          >
            <div
              className='
              flex items-center justify-center w-44 h-44 overflow-hidden
              rounded-md border-2 border-transparent transition-all
              group-hover:cursor-pointer group-hover:border-white'
            >
              <img src='/images/default-slate.webp' alt='profile-picture' />
            </div>
            <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white group-hover:cursor-pointer'>
              {user?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
