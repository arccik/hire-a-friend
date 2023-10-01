import Image from "next/image";
import React from "react";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Michael Kuru",
      feedback:
        "Amazing Experience! I recently used the 'Hire a Friend' service, and I couldn't be happier. I was a bit skeptical at first, but the friend I hired turned out to be fantastic. We had a great time together, and it felt like I was hanging out with a long-lost buddy. Thanks to this service, I've made a new friend, and I'll definitely be using it again!",
      image: "https://placekitten.com/200/200", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Tamara Bulka",
      position: "Manchester",
      feedback:
        "A Lifesaver! 'Hire a Friend' came to my rescue when I needed someone to accompany me to an event. I was blown away by the professionalism and warmth of the friend I hired. We had so much fun, and it made the event much more enjoyable. I highly recommend this service to anyone who needs a friend for a special occasion or just a fun outing.",
      image: "https://placekitten.com/200/201", // Replace with actual image URL
    },
    {
      id: 3,
      name: "David Williams",
      position: "42 years",
      feedback:
        "Incredible Service!      'Hire a Friend' exceeded all my expectations. I hired a friend for a day out exploring a new city, and it was an absolute blast. My hired friend was not only friendly but also knowledgeable about the city's hidden gems. It felt like I was hanging out with someone I've known forever. If you're looking for a memorable experience with a friendly companion, don't hesitate to use this service!",
      image: "https://placekitten.com/200/202", // Replace with actual image URL
    },
  ];

  return (
    <div className="bg-gray-100 py-12" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-semibold text-gray-800">
          Customers feedback
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <div className="mb-4">
                <Image
                  width={80}
                  height={80}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="mx-auto h-20 w-20 rounded-full object-cover"
                />
              </div>
              <p className="text-center text-sm text-gray-600">
                {testimonial.feedback}
              </p>
              <div className="mt-4">
                <p className="font-semibold text-gray-800">
                  {testimonial.name}
                </p>
                {testimonial.position && (
                  <p className="text-gray-600">{testimonial.position}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
