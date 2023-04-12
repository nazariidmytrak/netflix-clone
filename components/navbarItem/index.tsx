import { FC } from 'react';
import { NavbarItemProps } from '@/interfaces/navbarItem';

const NavbarItem: FC<NavbarItemProps> = ({ label }) => {
  return (
    <div className='text-white cursor-pointer hover:text-gray-300 transition'>
      {label}
    </div>
  );
};

export default NavbarItem;
