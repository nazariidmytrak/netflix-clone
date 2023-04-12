import { FC, useState, useEffect, useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import PlayButton from '../playButton';
import FavoriteButton from '../favoriteButton';
import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';
import { InfoModalProps } from '@/interfaces/infoModal';

const InfoModal: FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);

  const { movieId } = useInfoModal();
  const { data: movie = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [setIsVisible, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className='flex justify-center items-center fixed z-50 transition duration-300 bg-black/80 overflow-x-hidden overflow-y-auto inset-0'>
      <div className='relative w-auto mx-auto max-w-3xl rounter-md overflow-hidden'>
        <div
          className={`${
            isVisible ? 'scale-100' : 'scale-0'
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className='relative h-96'>
            <video
              className='w-full h-full brightness-[60%] object-cover'
              poster={movie?.thumbnailUrl}
              src={movie?.videoUrl}
              loop
              muted
              autoPlay
            ></video>
            <div
              className='flex items-center justify-center h-10 w-10 rounded-full absolute top-14 right-3 cursor-pointer bg-black/70 
              transition transform duration-500 hover:rotate-180 sm:top-3'
              onClick={handleClose}
            >
              <AiOutlineClose className='text-white' />
            </div>
            <div className='absolute bottom-[10%] left-10'>
              <p className='h-full mb-8 text-white text-3xl font-bold md:text-4xl lg:text-5xl'>
                {movie?.title}
              </p>
              <div className='flex flex-row gap-4 items-center'>
                <PlayButton movieId={movie?.id} />
                <FavoriteButton movieId={movie?.id} />
              </div>
            </div>
          </div>
          <div className='px-12 py-8'>
            <p className='text-green-400 font-semibold text-lg'>New</p>
            <p className='text-white text-lg'>{movie?.duration}</p>
            <p className='text-white text-lg'>{movie?.genre}</p>
            <p className='text-white text-lg'>{movie?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
