import React from 'react';
import Link from'next/link';

const Logo = () => {
    return (
        <div className=''>
            <Link href="/">
                <img src = "images/file.png" alt="Logo" className='h-12 cursor-pointer'/>
            </Link>
        </div>
    );
};

export default Logo;