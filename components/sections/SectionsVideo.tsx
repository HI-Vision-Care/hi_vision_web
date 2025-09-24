"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Heart, Users, Award } from "lucide-react";
import VideoModal from "../partials/VideoModal";
import Image from "next/image";

interface StatisticProps {
  value: string;
  label: string;
  color?: "primary" | "secondary" | "success";
}

interface SectionInterfaceProps {
  leftSection?: {
    title: string;
    subtitle: string;
    description: string;
    statistics?: StatisticProps[];
    primaryAction?: {
      label: string;
      onClick: () => void;
    };
    secondaryAction?: {
      label: string;
      onClick: () => void;
    };
  };
  rightSection?: {
    title: string;
    subtitle: string;
    description: string;
    contactInfo?: {
      hours: string;
      phone: string;
    };
    badges?: {
      label: string;
      icon?: "heart" | "users" | "award";
      color?: "primary" | "secondary" | "success";
    }[];
  };
}

const defaultProps: SectionInterfaceProps = {
  leftSection: {
    title: "Unified HIV Treatment Platform",
    subtitle: "care, adherence, outcomes",
    description:
      "A modern system for HIV screening, ART initiation, adherence tracking, viral load monitoring, and wrap-around support—all in one secure platform.",
    statistics: [
      { value: "12K+", label: "Active patients", color: "success" },
      { value: "95%", label: "Viral suppression*", color: "primary" },
    ],
    primaryAction: {
      label: "Watch Patient Journey",
      onClick: () => console.log("Watch videos clicked"),
    },
    secondaryAction: {
      label: "Explore Services",
      onClick: () => console.log("Learn more clicked"),
    },
  },
  rightSection: {
    title: "End-to-End HIV Care",
    subtitle: "testing • ART • PrEP • counseling",
    description:
      "Confidential testing, rapid ART start, PrEP access, side-effect management, and adherence support—integrated with labs, pharmacy, and case management.",
    contactInfo: {
      hours: "Mon–Sat, 8:00 AM - 5:00 PM",
      phone: "(+84) 792 191 402",
    },
    badges: [
      { label: "ART", icon: "heart", color: "primary" },
      { label: "PrEP", icon: "users", color: "success" },
      { label: "Counseling", icon: "award", color: "secondary" },
    ],
  },
};

function StatisticCard({ value, label, color = "primary" }: StatisticProps) {
  const colorClasses = {
    primary: "bg-blue-100 text-blue-800 border-blue-200",
    secondary: "bg-purple-100 text-purple-800 border-purple-200",
    success: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <Card
      className={`p-4 ${colorClasses[color]} transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
    >
      <CardContent className="p-0 text-center">
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="text-sm font-medium opacity-80">{label}</div>
      </CardContent>
    </Card>
  );
}

function IconComponent({ icon }: { icon: "heart" | "users" | "award" }) {
  const icons = {
    heart: Heart,
    users: Users,
    award: Award,
  };
  const Icon = icons[icon];
  return <Icon className="h-4 w-4" />;
}

export default function SectionInterface({
  leftSection = defaultProps.leftSection,
  rightSection = defaultProps.rightSection,
}: SectionInterfaceProps) {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
      {/* SECTION BACKGROUND */}
      <div className="w-full min-h-screen bg-gradient-to-br from-rose-50 via-white to-emerald-50">
        {/* INNER CONTAINER (giới hạn nội dung, nhưng nền vẫn full) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Section */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {leftSection?.title}
                  <br />
                  <span className="text-gray-700">{leftSection?.subtitle}</span>
                  <div className="inline-block ml-4">
                    <svg
                      className="h-8 w-16 text-orange-500"
                      viewBox="0 0 64 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Health heartbeat line"
                    >
                      <path
                        d="M2 16L10 16L14 8L18 24L22 12L26 20L30 16L62 16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                  {leftSection?.description}
                </p>
              </div>

              {/* Statistics */}
              {leftSection?.statistics && (
                <div className="flex flex-wrap gap-4">
                  {leftSection.statistics.map((stat, index) => (
                    <StatisticCard key={index} {...stat} />
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <VideoModal />
                {leftSection?.secondaryAction && (
                  <Button
                    variant="outline"
                    onClick={leftSection.secondaryAction.onClick}
                    className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  >
                    {leftSection.secondaryAction.label}
                  </Button>
                )}
              </div>

              <p className="text-sm text-gray-600 font-medium">
                Before we dive into the list of health.
              </p>
            </div>

            {/* Right Section */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {rightSection?.title}
                  </h2>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  {rightSection?.subtitle}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {rightSection?.description}
                </p>
              </div>

              {/* Contact Info Card */}
              {rightSection?.contactInfo && (
                <Card className="bg-gray-800 text-white p-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardContent className="p-0 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm opacity-80 mb-1">
                          Before we dive into the
                        </p>
                        <p className="font-semibold">list of health.</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-80 mb-1">
                          {rightSection.contactInfo.hours}
                        </p>
                        <p className="font-semibold">
                          {rightSection.contactInfo.phone}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Badges */}
              {rightSection?.badges && (
                <div className="flex flex-wrap gap-3">
                  {rightSection.badges.map((badge, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:shadow-sm cursor-pointer flex items-center gap-2"
                    >
                      {badge.icon && <IconComponent icon={badge.icon} />}
                      {badge.label}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Decorative Image Placeholder */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  {/* ẢNH NỀN */}
                  <Image
                    src="/images/hiv-patient.jpg"
                    alt="Wellness Journey"
                    fill
                    className="object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Nội dung bên trong */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">
                          Health Focus
                        </div>
                        <div className="font-semibold text-gray-900">
                          Wellness Journey
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border-0 shadow-sm"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
