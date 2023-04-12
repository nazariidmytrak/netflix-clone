import { useCallback } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import useBillboard from '@/hooks/useBillboard';
import useInfoModal from '@/hooks/useInfoModal';
import PlayButton from '../playButton';

const Billboard = () => {
  const { data: movie } = useBillboard();
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(movie?.id);
  }, [openModal, movie?.id]);

  return (
    <div className='relative h-[56.25vw]'>
      <video
        className='w-full h-[56.25vw] object-cover brightness-[60%]'
        src={movie?.videoUrl}
        poster={movie?.thumbnailUrl}
        loop
        muted
        autoPlay
      ></video>
      <div className='grid gap-6 absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
        <p className='h-full w-[50%] text-white text-1xl font-bold drop-shadow-xl md:text-5xl lg:text-6xl'>
          {movie?.title}
        </p>
        <p className='w-[90%] text-white text-[8px] drop-shadow-xl md:text-lg md:w-[80%] lg:w-[50%]'>
          {movie?.description}
        </p>
        <div className='flex flex-row items-center gap-3'>
          <PlayButton movieId={movie?.id} />
          <button
            className='
          flex flex-row items-center w-auto py-1 px-2
           bg-white/30 text-white text-xs font-semibold 
           rounded-md hover:bg-white/20 transition
           md:py-2 md:px-4 lg:text-lg'
            onClick={handleOpenModal}
          >
            <AiOutlineInfoCircle className='mr-2' />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
