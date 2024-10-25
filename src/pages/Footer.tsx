import Link from 'next/link';
import Image from 'next/image';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-custom-darkblue text-custom-cream">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image src="/bird-logo (1).webp" alt="Logo" width={100} height={100} />
            <p className="mt-4">Advanced stock analysis platform for modern traders</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features">Features</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-custom-lightblue">
                <FaTwitter size={24} />
              </Link>
              <Link href="#" className="hover:text-custom-lightblue">
                <FaLinkedin size={24} />
              </Link>
              <Link href="#" className="hover:text-custom-lightblue">
                <FaGithub size={24} />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-custom-blue mt-8 pt-8 text-center">
          <p>&copy; 2024 Stock Analysis Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
