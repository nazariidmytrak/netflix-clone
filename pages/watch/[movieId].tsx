import { FC } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import useMovie from '@/hooks/useMovie';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data: movie } = useMovie(movieId as string);

  return (
    <div className='h-screen w-screen bg-black'>
      <nav className='flex flex-row items-center gap-8 bg-black/70 w-full fixed z-10 p-6'>
        <AiOutlineArrowLeft
          className='text-white cursor-pointer relative transition duration-300 hover:-translate-x-2'
          size={35}
          onClick={() => router.push('/')}
        />
        <p className='text-white font-bold text-1xl md: text-3xl'>
          <span className='font-light mr-3'>Watching:</span>
          {movie?.title}
        </p>
      </nav>
      <video
        className='h-full w-full'
        src={movie?.videoUrl}
        autoPlay
        controls
      ></video>
    </div>
  );
};

export default Watch;
