import { FC } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

import { PlayButtonProps } from '@/interfaces/playButton';

const PlayButton: FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();
  return (
    <button
      className='flex flex-row items-center py-1 px-2 w-auto
     bg-white rounded-md text-xs font-semibold md:py-2 md:px-4 lg:text-lg
     hover:bg-neutral-300 transition'
     onClick={()=> router.push(`/watch/${movieId}`)}
    >
      <BsFillPlayFill className='mr-1' />
      Play
    </button>
  );
};

export default PlayButton;
