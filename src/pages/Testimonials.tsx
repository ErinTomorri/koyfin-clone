import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Senior Trader",
      company: "Trading Corp",
      image: "/testimonial1.jpg",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."
    },
    {
      name: "Jane Smith",
      role: "Investment Manager",
      company: "Invest Co",
      image: "/testimonial2.jpg",
      quote: "Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet."
    },
    {
      name: "Mike Johnson",
      role: "Financial Analyst",
      company: "Finance Plus",
      image: "/testimonial3.jpg",
      quote: "Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta."
    }
  ];

  return (
    <div className="bg-custom-cream py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-custom-darkblue mb-12">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-custom-darkblue">{testimonial.name}</h3>
                  <p className="text-sm text-custom-blue">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
              <p className="text-custom-blue italic">&quot;{testimonial.quote}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
