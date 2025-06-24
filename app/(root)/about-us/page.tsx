import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  COMPANY_STATS,
  CORE_VALUES,
  CTA_BUTTONS,
  HERO_DATA,
  MISSION_VISION,
  TEAM_MEMBERS,
} from "@/constants";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-2 mb-6">
            {HERO_DATA.badge}
          </Badge>
          <h1 className="text-5xl font-bold mb-6">
            {(() => {
              const parts = HERO_DATA.title.split("future");
              return parts.reduce<React.ReactNode[]>((acc, part, idx) => {
                acc.push(part);
                if (idx < parts.length - 1) {
                  acc.push(
                    <span
                      key={`future-${idx}`}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    >
                      future
                    </span>
                  );
                }
                return acc;
              }, []);
            })()}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {HERO_DATA.description}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Mission */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <MISSION_VISION.mission.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">
                  {MISSION_VISION.mission.title}
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {MISSION_VISION.mission.text}
              </p>
            </div>
            {/* Vision */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <MISSION_VISION.vision.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">
                  {MISSION_VISION.vision.title}
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {MISSION_VISION.vision.text}
              </p>
            </div>
          </div>
          {/* Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
              <Image
                src="https://i.pinimg.com/736x/7c/e1/eb/7ce1eb9032e0b53c7d351c7df6ae2c25.jpg"
                alt="Mission & Vision"
                width={500}
                height={400}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Meet Our
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Leadership Team
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our diverse team of experts brings together decades of experience
              in technology, business, and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <Card
                key={member.name}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CORE_VALUES.map((value, idx) => (
            <Card
              key={idx}
              className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
            >
              <CardContent className="p-8">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center text-white mb-6 mx-auto`}
                >
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Company Stats */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
          {COMPANY_STATS.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <stat.icon className="w-8 h-8 mx-auto text-indigo-600" />
              <h3 className="text-2xl font-bold">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to join our journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether you&apos;re looking to transform your business or join our
            team, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
              asChild
            >
              <Link href={CTA_BUTTONS.primary.href}>
                {CTA_BUTTONS.primary.text}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant={
                CTA_BUTTONS.secondary.variant as
                  | "link"
                  | "outline"
                  | "default"
                  | "secondary"
                  | "destructive"
                  | "ghost"
                  | undefined
              }
              className="border-2 hover:bg-gray-50 px-8 py-4 text-lg"
            >
              {CTA_BUTTONS.secondary.text}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
