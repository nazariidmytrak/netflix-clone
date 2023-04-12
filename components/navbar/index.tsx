import { useCallback, useState, useEffect } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { AiOutlineSearch, AiOutlineBell } from 'react-icons/ai';

import NavbarItem from '../navbarItem';
import MobileMenu from '../mobileMenu';
import AccountMenu from '../accountMenu';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, [setShowMobileMenu]);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, [setShowAccountMenu]);

  return (
    <nav className='w-full fixed z-40'>
      <div
        className={`flex flex-row items-center px-4 md:px-16 py-6 transition duration-500
        ${showBackground ? 'bg-zinc-900/90' : ''}`}
      >
        <img className='h-4 lg:h-7' src='/images/logo.webp' alt='logo' />
        {/* Large Screen Menu */}
        <div className='flex-row ml-8 gap-7 hidden lg:flex'>
          <NavbarItem label='Home' />
          <NavbarItem label='Series' />
          <NavbarItem label='Films' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browse by Languages' />
        </div>
        {/*  Mobile Menu */}
        <div
          className='flex flex-row items-center relative gap-2 ml-2 cursor-pointer lg:hidden'
          onClick={toggleMobileMenu}
        >
          <p className='text-white text-sm'>Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        {/* Search&Bell icons and AccountMenu */}
        <div className='flex flex-row items-center gap-3 ml-auto md:gap-7'>
          <div className='text-gray-200 hover:text-gray-400 cursor-pointer transition'>
            <AiOutlineSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-400 cursor-pointer transition'>
            <AiOutlineBell />
          </div>
          <div
            className='flex flex-row items-center gap-2 relative cursor-pointer'
            onClick={toggleAccountMenu}
          >
            <div className='w-6 h-6 lg:w-10 lg:h-10 overflow-hidden rounded-md'>
              <img src='/images/default-slate.webp' alt='profile-picture' />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
