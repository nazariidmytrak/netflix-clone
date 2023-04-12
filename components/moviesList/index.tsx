import { FC } from 'react';
import { isEmpty } from 'lodash';

import { MoviesListProps } from '@/interfaces/moviesList';
import MovieCard from '../movieCard';

const MoviesList: FC<MoviesListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className='px-4 mt-4 space-y-8 md:px-12'>
      <div>
        <p className='mb-4 font-semibold text-white text-md md:text-xl lg:text-2xl'>
          {title}
        </p>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
