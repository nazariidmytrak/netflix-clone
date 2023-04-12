import { FC } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { BsChevronDown } from 'react-icons/bs';
import { useRouter } from 'next/router';

import { MovieCardProps } from '@/interfaces/movieCard';
import FavoriteButton from '../favoriteButton';
import useInfoModal from '@/hooks/useInfoModal';

const MovieCard: FC<MovieCardProps> = ({ data: movie }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();
  return (
    <div className='group h-[12vw] col-span relative bg-zinc-900'>
      <img
        className='w-full h-[12vw] cursor-pointer object-cover transition shadow-xl rounded-md
        group-hover:opacity-90 sm:group-hover:opacity-0 delay-100'
        src={movie.thumbnailUrl}
        alt='thumbnail'
      />

      <div
        className='w-full scale-0 absolute top-0 z-10 opacity-0 
      transition duration-200 invisible delay-100 sm:visible
      group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100'
      >
        <img
          className='w-full h-[12vw] cursor-pointer object-cover transition shadow-xl rounded-t-md'
          src={movie.thumbnailUrl}
          alt='thumbnail'
        />

        <div className='w-full grid gap-3 absolute z-10 p-2 bg-zinc-800 transition shadow-md rounded-b-md lg:p-4'>
          <div className='flex flex-row items-center gap-3'>
            <div
              className='flex justify-center items-center cursor-pointer w-6 h-6 bg-white rounded-full 
             transition hover:bg-neutral-300 lg:w-10 lg:h-10'
              onClick={() => {
                router.push(`/watch/${movie?.id}`);
              }}
            >
              <BsFillPlayFill size={20} />
            </div>
            <FavoriteButton movieId={movie?.id} />
            <div
              className='flex justify-center items-center w-6 h-6 cursor-pointer ml-auto 
              group/item border-2 border-white rounded-full transition lg:w-10 lg:h-10 hover:border-neutral-300'
              onClick={() => openModal(movie?.id)}
            >
              <BsChevronDown className='text-white group-hover/item:text-neutral-300' />
            </div>
          </div>
          <p className='text-green-400 font-semibold'>
            New <span className='text-white'>2023</span>
          </p>
          <div className='flex flex-row items-center gap-2'>
            <p className='text-white text-[10px] lg:text-sm'>
              {movie.duration}
            </p>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <p className='text-white text-[10px] lg:text-sm'>{movie.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
