import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Users,
  Target,
  Heart,
  Award,
  Globe,
  Lightbulb,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-2 mb-6">
            About Hi-Vision
          </Badge>
          <h1 className="text-5xl font-bold mb-6">
            We're building the
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              future of business
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Founded in 2020, Hi-Vision has been at the forefront of digital
            transformation, helping businesses worldwide unlock their potential
            through innovative technology solutions.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To empower businesses of all sizes with cutting-edge
                  technology solutions that drive growth, efficiency, and
                  innovation. We believe that every organization deserves access
                  to enterprise-level tools that can transform their operations
                  and unlock their full potential.
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To create a world where technology seamlessly integrates with
                  human creativity and ambition, enabling businesses to achieve
                  extraordinary results while maintaining their core values and
                  human-centered approach.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Our Mission"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape how we interact
              with our customers, partners, and each other.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Customer First",
                description:
                  "Every decision we make starts with our customers' success in mind.",
                color: "from-red-400 to-pink-500",
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Innovation",
                description:
                  "We constantly push boundaries to deliver cutting-edge solutions.",
                color: "from-yellow-400 to-orange-500",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Collaboration",
                description:
                  "We believe the best results come from working together as a team.",
                color: "from-blue-400 to-purple-500",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Excellence",
                description:
                  "We strive for excellence in everything we do, no matter how small.",
                color: "from-green-400 to-blue-500",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center text-white mb-6 mx-auto`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
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
            {[
              {
                name: "Sarah Chen",
                role: "CEO & Founder",
                bio: "Former VP of Engineering at Google with 15+ years in tech leadership.",
                image: "/placeholder.svg?height=300&width=300",
                linkedin: "#",
              },
              {
                name: "Michael Rodriguez",
                role: "CTO",
                bio: "Ex-Amazon architect specializing in scalable cloud infrastructure.",
                image: "/placeholder.svg?height=300&width=300",
                linkedin: "#",
              },
              {
                name: "Emily Johnson",
                role: "Head of Product",
                bio: "Product strategy expert with a track record of launching successful SaaS products.",
                image: "/placeholder.svg?height=300&width=300",
                linkedin: "#",
              },
              {
                name: "David Kim",
                role: "Head of Design",
                bio: "Award-winning designer focused on creating intuitive user experiences.",
                image: "/placeholder.svg?height=300&width=300",
                linkedin: "#",
              },
              {
                name: "Lisa Thompson",
                role: "VP of Sales",
                bio: "Sales leader with expertise in helping businesses scale and grow.",
                image: "/placeholder.svg?height=300&width=300",
                linkedin: "#",
              },
              {
                name: "James Wilson",
                role: "Head of Customer Success",
                bio: "Customer advocate ensuring our clients achieve their goals with our platform.",
                image: "/placeholder.svg?height=300&width=300",
                linkedin: "#",
              },
            ].map((member, index) => (
              <Card
                key={index}
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
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-blue-100">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {[
              {
                number: "10M+",
                label: "Happy Customers",
                icon: <Users className="w-8 h-8 mx-auto mb-2" />,
              },
              {
                number: "150+",
                label: "Countries Served",
                icon: <Globe className="w-8 h-8 mx-auto mb-2" />,
              },
              {
                number: "99.9%",
                label: "Uptime Guarantee",
                icon: <Award className="w-8 h-8 mx-auto mb-2" />,
              },
              {
                number: "5 Years",
                label: "Industry Experience",
                icon: <Target className="w-8 h-8 mx-auto mb-2" />,
              },
            ].map((stat, index) => (
              <div key={index} className="space-y-4">
                {stat.icon}
                <div className="text-4xl font-bold">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to join our journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether you're looking to transform your business or join our team,
            we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
              asChild
            >
              <Link href="/">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 hover:bg-gray-50 px-8 py-4 text-lg"
            >
              View Careers
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
