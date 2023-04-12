import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useState, ChangeEvent, useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import Input from '@/components/input';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [variant, setVariant] = useState('login');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, [setVariant]);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles',
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        name,
        email,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [name, email, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.webp')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className='w-full h-full bg-black lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img className='h-12' src='/images/logo.webp' alt='logo' />
        </nav>
        <div className='flex justify-center'>
          <div className='grid gap-10 px-16 py-16 w-full mt-2 bg-black/70 lg:w-2/5 lg:max-w-md rounded-md'>
            <h2 className='font-semibold text-white text-4xl'>
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className='flex flex-col gap-5'>
              {variant === 'register' && (
                <Input
                  id='name'
                  label='Name'
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              )}
              <Input
                id='email'
                type='email'
                label='Email'
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <Input
                id='password'
                type='password'
                label='Password'
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>
            <button
              className='py-3 w-full bg-red-600 text-white rounded-md transition-colors hover:bg-red-800'
              onClick={variant === 'login' ? login : register}
            >
              {variant === 'login' ? 'Login' : 'Sign Up'}
            </button>
            <div className='flex flex-row items-center gap-4 justify-center'>
              <div
                className='flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer transition hover:opacity-80'
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
              >
                <FcGoogle size={30} />
              </div>
              <div
                className='flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer transition hover:opacity-80'
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className='text-neutral-500'>
              {variant === 'login'
                ? 'First time using Netlix?'
                : 'Already have an account?'}
              <span
                className=' ml-3 text-white cursor-pointer hover:underline'
                onClick={toggleVariant}
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
