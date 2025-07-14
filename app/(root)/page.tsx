import React from "react";
import Image from "next/image";
import { HomeSwiper } from "@/components/partials";

// --------------------- COMPONENT ---------------------

const Home = () => {
  return (
    <div className=" mt-10 mb-10 container w-[80%] !m-auto">
      {/* SECTION 1: HERO */}
      <section className="flex flex-col md:flex-row w-full">
        {/* LEFT */}
        <div className="w-full md:w-1/2 flex flex-col gap-5 mt-10 mb-10">
          <div>
            <h3 className="flex items-center justify-center gap-2 border border-black/30 rounded-full px-4 py-2 text-sm md:text-base w-fit">
              <span>Health Matters</span>
              <span className="text-red-500">❤️</span>
            </h3>
          </div>

          <h2 className="font-bold text-3xl sm:text-5xl md:text-6xl leading-tight w-full">
            <span className="text-blue-400">One Step Solution</span> for all
            your dietary needs.
          </h2>

          <h4 className="text-md sm:text-lg text-gray-600 w-full">
            Using your BMI index we calculate whether the dish is suitable for
            you.
          </h4>

          {/* Search Box */}
          <div className="flex flex-wrap sm:flex-nowrap h-auto bg-white sm:h-16 border border-gray-200 rounded-full shadow-md w-full max-w-screen-sm overflow-hidden focus-within:ring-2 focus-within:ring-sky-300 focus-within:ring-offset-2 transition-all duration-150 ease-in-out">
            <input
              placeholder="Search..."
              type="text"
              name="search"
              className="flex-1 px-4 py-2 text-base sm:text-lg bg-transparent focus:outline-none min-w-0"
            />
            <div className="flex gap-2 items-center px-4 py-2 sm:py-0">
              <IconWrapper>
                <SearchIcon />
              </IconWrapper>
              <IconWrapper>
                <ImageIcon />
              </IconWrapper>
              <IconWrapper>
                <MicIcon />
              </IconWrapper>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 flex">
          <Image
            src="/ladingpage_doctor.png"
            alt="Landing page doctor"
            width={600}
            height={600}
            className="w-full h-auto object-contain -scale-x-100"
            priority
          />
        </div>
      </section>

      {/* SECTION 2: FEATURES */}
      <section className="flex flex-col lg:flex-row w-full mt-10 mb-10 gap-10">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/3 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
          <h2 className="text-blue-500 font-bold text-xl">
            FEATURES WE PROVIDE
          </h2>
          <h3 className="text-4xl font-bold leading-snug">
            Calculating BMI is easier
          </h3>
          <p className="text-gray-700">
            We calculate your BMI index from data like age, height, weight.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-2/3 flex flex-col sm:flex-row flex-wrap justify-center gap-6">
          {[
            {
              img: "/landingpage_diet.png",
              title: "Food Recommendation",
              desc: "We provide food recommendation according to your calorie requirements.",
            },
            {
              img: "/landingpage_chatbox.png",
              title: "Interactive Chatbot",
              desc: "Solve your queries by interacting with our bot.",
            },
            {
              img: "/landingpage_static.png",
              title: "Nutritional Value",
              desc: "Get all the nutritional values of your preferred dish.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center w-full sm:w-[45%] lg:w-[30%] gap-2"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={80}
                height={80}
                className="h-auto mb-2"
                priority
              />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: HELP TOPICS (SWIPER) */}
      <HomeSwiper />
    </div>
  );
};

export default Home;

// --------------------- ICON COMPONENTS ---------------------

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="custom-btn bg-blue-500 text-white p-1.5 rounded-md w-8 h-8 flex items-center justify-center">
    {children}
  </div>
);

const SearchIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ImageIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const MicIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path d="M12 1a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);
