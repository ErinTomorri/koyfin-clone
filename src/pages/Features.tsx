import { FaChartLine, FaRobot, FaLock, FaCloud } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaChartLine className="w-12 h-12 text-custom-red" />,
      title: "Real-Time Analytics",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt."
    },
    {
      icon: <FaRobot className="w-12 h-12 text-custom-blue" />,
      title: "AI-Powered Insights",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
    },
    {
      icon: <FaLock className="w-12 h-12 text-custom-darkblue" />,
      title: "Secure Trading",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore."
    },
    {
      icon: <FaCloud className="w-12 h-12 text-custom-lightblue" />,
      title: "Cloud Integration",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia."
    }
  ];

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-custom-darkblue mb-12">
          Why Choose Our Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-custom-cream rounded-lg hover:shadow-xl transition duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-custom-darkblue mb-3">{feature.title}</h3>
              <p className="text-custom-blue">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
