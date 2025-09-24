import { Pill, Heart, Users } from "lucide-react";
import { SectionGroup } from "@/types";
import { SectionsInterface } from "./SectionInterface";
import Image from "next/image";

export default function SectionsHealth() {
  const sectionsData: SectionGroup[] = [
    {
      id: "services",
      title: "",
      subtitle: "",
      layout: "vertical",
      items: [
        {
          id: "elderly-care",
          title: "Old age caring team",
          description:
            "Dedicated professionals providing compassionate care for elderly patients with specialized expertise and attention.",
        },
      ],
    },
    {
      id: "pillars",
      title: "Our pillars of caring",
      subtitle:
        "Before we dive into the list of health slogan ideas, let's go over some essential tips to consider.",
      layout: "grid",
      items: [
        {
          id: "compassion",
          title: "Compassionate Care",
          description:
            "Providing empathetic and understanding healthcare services that prioritize patient comfort and dignity.",
          icon: <Heart className="w-8 h-8 text-red-500" />,
        },
        {
          id: "expertise",
          title: "Medical Expertise",
          description:
            "Leveraging advanced medical knowledge and cutting-edge treatments to deliver exceptional healthcare outcomes.",
          icon: <Pill className="w-8 h-8 text-blue-500" />,
        },
        {
          id: "community",
          title: "Community Focus",
          description:
            "Building strong relationships within our community to promote health awareness and preventive care.",
          icon: <Users className="w-8 h-8 text-green-500" />,
        },
      ],
    },
  ];

  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
      {/* Nền xanh dương nhạt -> đậm */}
      <div className="w-full bg-gradient-to-br from-blue-50 via-white to-blue-100">
        {/* Inner container giữ lưới nội dung, nhưng nền vẫn full */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: danh sách section */}
            <div className="space-y-8">
              <SectionsInterface
                sections={sectionsData}
                showNavigation={false}
                className="space-y-12"
              />
            </div>

            {/* Health Image Placeholder */}
            {/* Health Image */}
            <div className="hidden lg:block">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-blue-100">
                <Image
                  src="/images/health.png"
                  alt="Health"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 560px, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
