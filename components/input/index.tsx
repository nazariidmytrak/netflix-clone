import { FC } from 'react';
import { InputProps } from '@/interfaces/input';

const Input: FC<InputProps> = ({ id, onChange, value, label, type }) => {
  return (
    <div className='relative'>
      <input
        className='
        block rounded-md px-6 pt-6 pb-1 w-full 
        text-md text-white bg-neutral-700 
        appearance-none focus:outline-none focus:ring-0 peer'
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=' '
      />
      <label
        className='
        absolute top-4 left-6 z-10 
        text-md text-zinc-400
        duration-200 transform -translate-y-4 scale-75 origin-[0]
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-4'
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
