import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/navbar';
import Billboard from '@/components/billboard';
import MoviesList from '@/components/moviesList';
import InfoModal from '@/components/infoModal';

import useMoviesList from '@/hooks/useMoviesList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModal from '@/hooks/useInfoModal';

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

export default function Home() {
  const { data: movies = [] } = useMoviesList();
  const { data: favoriteMovies = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MoviesList title='Trending Now' data={movies} />
        <MoviesList title='My List' data={favoriteMovies} />
      </div>
    </>
  );
}
