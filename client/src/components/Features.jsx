import React from 'react'
import { BotMessageSquare,Fingerprint,ShieldHalf } from 'lucide-react';

const features = [
    {
      icon: <BotMessageSquare />,
      text: "Emergency Contact Management",
      description:
        "Easily add, update, and manage emergency contacts to ensure swift alerts during critical situations. Relatives and caregivers can be prioritized for notifications. This feature provides peace of mind by keeping the right people informed when it matters most.",
    },
    {
      icon: <Fingerprint />,
      text: "User Profile Management",
      description:
      "Manage user profiles effortlessly by updating personal details, preferences, and medical information. Relatives can ensure all relevant data is accurate and accessible. This feature simplifies customization for a tailored and seamless experience.",
    },
    {
      icon: <ShieldHalf />,
      text: "Product Usage Simulation",
      description:
        "Simulate real-world emergency scenarios to understand and test the device's functionality. This feature helps users and their families build confidence in handling critical situations. Practice runs ensure preparedness and effective use of the product.",
    }
  ];

function Features() {
  return (
    <div className="relative mt-20 border-b border-neutral-800 min-h-[400px]">
    <div className="text-center">
     
      <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          Innovative Tools for{" "}
        <span className="bg-gradient-to-r from-blue-500 to-gray-800 text-transparent bg-clip-text">
          Better Support
        </span>
      </h2>
    </div>
    <div className="flex flex-wrap mt-10 lg:mt-20">
      {features.map((feature, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
          <div className="flex">
            <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-blue-700 justify-center items-center rounded-full">
              {feature.icon}
            </div>
            <div>
              <h5 className="mt-1 mb-6 text-xl">{feature.text}</h5>
              <p className="text-md p-2 mb-20 text-neutral-500">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Features