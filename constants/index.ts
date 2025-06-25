import { Heart, Lightbulb, Users, Award, Target, Globe } from "lucide-react";

//Routes
export const desktopNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const mobileNav = [
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

// Dummy data
export const FEATURED_PRODUCTS = [
  {
    image:
      "https://i.pinimg.com/736x/72/2f/94/722f94b1108fc875cdc547508eaaa5bf.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/cc/33/f7/cc33f7f52f2733db21fb23dece34cbf0.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/ae/50/1a/ae501a6acbcfe14e4a47e5e50cb6184d.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/98/24/dd/9824dd68bb6324b51b3c9910afb40448.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/b5/6a/59/b56a5921028b20643807f22b4f677e02.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
];

export const MORE_PRODUCTS = [
  {
    image:
      "https://i.pinimg.com/736x/b8/c8/ec/b8c8ec1ec9eb3790ff03b6234c938f35.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/52/b1/85/52b185e8cb0b921a054ee21e81eac8b7.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/08/b7/03/08b7035e8a4a3b4dbde14f4707a0a19b.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/7f/03/37/7f03370b0d3fa4b90f8bfaea0e64247f.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/f4/cf/c5/f4cfc563bea916b9771103c34160842e.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
];

export const HERO_DATA = {
  badge: "About Hi-Vision",
  title: "We’re building the future of business",
  description:
    "Founded in 2020, Hi-Vision has been at the forefront of digital transformation, helping businesses worldwide unlock their potential through innovative technology solutions.",
};

export const MISSION_VISION = {
  mission: {
    icon: Target,
    title: "Our Mission",
    text: "To empower businesses of all sizes with cutting-edge technology solutions that drive growth, efficiency, and innovation. We believe that every organization deserves access to enterprise-level tools that can transform their operations and unlock their full potential.",
  },
  vision: {
    icon: Lightbulb,
    title: "Our Vision",
    text: "To create a world where technology seamlessly integrates with human creativity and ambition, enabling businesses to achieve extraordinary results while maintaining their core values and human-centered approach.",
  },
};

export const CORE_VALUES = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Every decision we make starts with our customers' success in mind.",
    color: "from-red-400 to-pink-500",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly push boundaries to deliver cutting-edge solutions.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe the best results come from working together as a team.",
    color: "from-blue-400 to-purple-500",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, no matter how small.",
    color: "from-green-400 to-blue-500",
  },
];

export const TEAM_MEMBERS = [
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
];

export const COMPANY_STATS = [
  { icon: Users, number: "10M+", label: "Happy Customers" },
  { icon: Globe, number: "150+", label: "Countries Served" },
  { icon: Award, number: "99.9%", label: "Uptime Guarantee" },
  { icon: Target, number: "5 Years", label: "Industry Experience" },
];

export const CTA_BUTTONS = {
  primary: { text: "Start Your Journey", href: "/" },
  secondary: { text: "View Careers", variant: "outline" },
};
