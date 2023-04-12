import { FC, useCallback, useMemo } from 'react';
import axios from 'axios';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import { FavoriteButtonProps } from '@/interfaces/favoriteButton';

const FavoriteButton: FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      /* response = await axios.delete('/api/favorite', { data: { movieId } }); */
      response = await axios.delete(`/api/favorite/${movieId}`);
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });

    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      className='flex items-center justify-center group/item w-6 h-6 
    cursor-pointer border-2 border-white rounded-full transition 
    hover:border-neutral-300 lg:w-10 lg:h-10'
      onClick={toggleFavorites}
    >
      <Icon className='text-white' size={20} />
    </div>
  );
};

export default FavoriteButton;
