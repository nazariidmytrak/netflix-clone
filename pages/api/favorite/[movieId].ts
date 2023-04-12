import serverAuth from '@/lib/serverAuth';
import { without } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { movieId } = req.query;

    if (typeof movieId !== 'string') {
      throw new Error('Invalid Id');
    }

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error('Invalid ID');
    }

    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
