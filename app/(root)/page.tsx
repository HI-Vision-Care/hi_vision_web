import Image from "next/image";
import SectionVideo from "@/components/sections/SectionsVideo";
import SectionsHealth from "@/components/sections/SectionsHealth";
import HomeSearchBox from "@/components/home/HomeSearchBox";

const Home = () => {
  return (
    <main className="overflow-x-hidden">
      <div className=" mt-10 mb-10 container w-[80%] !m-auto">
        {/* SECTION 1: HERO */}
        <section className="flex flex-col md:flex-row w-full">
          {/* LEFT */}
          <div className="w-full md:w-1/2 flex flex-col gap-5 mt-10 mb-10">
            <div>
              <h3 className="flex items-center justify-center gap-2 border border-black/30 rounded-full px-4 py-2 text-sm md:text-base w-fit">
                <span>Comprehensive HIV Care</span>
                <span className="text-red-500">❤️</span>
              </h3>
            </div>

            <h2 className="font-bold text-3xl sm:text-5xl md:text-6xl leading-tight w-full">
              <span className="text-blue-400">Hi-Vision</span> – Integrated HIV
              Treatment & Medical Services
            </h2>

            <h4 className="text-md sm:text-lg text-gray-600 w-full">
              From confidential testing to long-term ARV monitoring, Hi-Vision
              provides a unified platform for patients and providers.
            </h4>

            {/* Search Box */}
            <HomeSearchBox />
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
              SERVICES WE PROVIDE
            </h2>
            <h3 className="text-4xl font-bold leading-snug">
              End-to-End HIV & Preventive Care
            </h3>
            <p className="text-gray-700">
              Hi-Vision connects you with essential services: screening,
              treatment, and prevention support.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-2/3 flex flex-col sm:flex-row flex-wrap justify-center gap-6">
            {[
              {
                img: "/landingpage_diet.png",
                title: "HIV & STD Screening",
                desc: "Confidential, reliable testing including HIV Ag/Ab and common STDs.",
              },
              {
                img: "/landingpage_chatbox.png",
                title: "PrEP Services",
                desc: "Assess eligibility, monitor safety, and support adherence.",
              },
              {
                img: "/landingpage_static.png",
                title: "ARV Monitoring",
                desc: "Track viral load, CD4 counts, and treatment outcomes.",
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

        <SectionVideo />

        <SectionsHealth />
      </div>
    </main>
  );
};

export default Home;
