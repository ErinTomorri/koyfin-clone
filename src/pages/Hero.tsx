import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="bg-custom-cream">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-5xl lg:text-6xl font-bold text-custom-darkblue mb-6">
              Advanced Stock Analysis Platform
            </h1>
            <p className="text-xl text-custom-blue mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Analyze stocks with professional-grade tools and real-time data.
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard" 
                className="bg-custom-red hover:bg-custom-darkblue text-white px-8 py-3 rounded-lg transition duration-300">
                Try Dashboard
              </Link>
              <Link href="/about" 
                className="border-2 border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white px-8 py-3 rounded-lg transition duration-300">
                Learn More
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/stock-analysis.webp"
              alt="Stock Analysis Platform"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
