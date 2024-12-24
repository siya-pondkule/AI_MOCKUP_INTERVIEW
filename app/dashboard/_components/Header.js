"use client"
import React, { useEffect } from 'react'
import Image from 'next/image' // Import the Image component
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

const Header = () => {
    const path=usePathname();
    useEffect(()=>{
         console.log(path);
    },[]);

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <Image src={'/logo.svg'} width={160} height={100} alt="logo"/>
 
      <ul className='hidden md:flex gap-6'>
        <li className={`hover: text-blue-800 hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard'&& 'text-primary font-bold'}
        `}
        >Dashboard</li>
        <li className={`hover: text-blue-800 hover:font-bold transition-all cursor-pointer
            
        `}>Feedback</li>
        <li className={`hover: text-blue-800 hover:font-bold transition-all cursor-pointer
            
        `}>Contact us</li>
        <li className={`hover: text-blue-800 hover:font-bold transition-all cursor-pointer
            
        `}>About us</li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header
