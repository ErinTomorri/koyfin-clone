import Link from 'next/link';
import Image from 'next/image';
import {useState} from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="bg-custom-red shadow-md">
            <nav className="container mx-auto flex justify-between items-center p-4">
                <div className="flex items-center">
                    <Link href="/">
                        <Image className='' src="/bird-logo (1).webp" alt="logo" width={50} height={50} />
                    </Link>     
                </div>
                <div className="flex space-x-6">
                    <Link href="/" className="text-custom-cream hover:text-custom-lightblue">Home</Link>
                    <Link href="/dashboard" className="text-custom-cream hover:text-custom-lightblue">Dashboard</Link>
                    <Link href="/about" className="text-custom-cream hover:text-custom-lightblue">About</Link>
                    <Link href="/contact" className="text-custom-cream hover:text-custom-lightblue">Contact</Link>
                </div>
            </nav>
        </div>
    )
};

export default Navbar;
