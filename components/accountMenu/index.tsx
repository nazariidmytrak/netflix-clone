import { FC } from 'react';
import { signOut } from 'next-auth/react';

import { AccountMenuProps } from '@/interfaces/accountMenu';
import useCurrentUser from '@/hooks/useCurrentUser';

const AccountMenu: FC<AccountMenuProps> = ({ visible }) => {
  const { data: user } = useCurrentUser();
  if (!visible) return null;

  return (
    <div className='flex flex-col w-56 absolute top-14 right-0 py-5 bg-black border-2 border-gray-800'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-row items-center gap-3 w-full px-3 group/item'>
          <img
            className='w-8 rounded-md'
            src='/images/default-slate.webp'
            alt='profile-picture'
          />
          <p className='text-white text-sm group-hover/item:underline'>
            {user?.name}
          </p>
        </div>
        <hr className='h-px my-4 bg-gray-600 border-0' />
        <div
          className='px-3 text-white text-center text-sm hover:underline'
          onClick={() => signOut()}
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
