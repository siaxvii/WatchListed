import React from 'react';
import Link from'next/link';
//remember, NO a tags

const Logo: React.FC = () => {
    return (
        <div className='flex items-center'>
            <Link href="/">
                <img src = "images/logo.png" alt="Logo" className='h-14 w-auto cursor-pointer'/>
            </Link>
        </div>
    );
};

export default Logo;