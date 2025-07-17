"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Heart,
  Users,
  Calendar,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Stethoscope,
  Send,
  Star,
  Award,
  Lock,
} from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    contactMethod: "",
    anonymous: false,
    urgent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-gradient-to-tr from-blue-100 via-slate-50 to-indigo-100 min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-indigo-700/90 to-purple-800/90"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)",
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Award className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                Trusted HIV Care Since 2025
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
              Contact Our Expert Care Team
            </h1>

            <p className="text-xl lg:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Compassionate, confidential HIV care with cutting-edge treatment
              options. Your health and privacy are our highest priorities.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-white/15 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm hover:bg-white/20 transition-all">
                <Shield className="w-4 h-4 mr-2" />
                HIPAA Compliant
              </Badge>
              <Badge className="bg-white/15 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm hover:bg-white/20 transition-all">
                <Heart className="w-4 h-4 mr-2" />
                Stigma-Free Care
              </Badge>
              <Badge className="bg-white/15 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm hover:bg-white/20 transition-all">
                <Users className="w-4 h-4 mr-2" />
                Anonymous Options
              </Badge>
              <Badge className="bg-white/15 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm hover:bg-white/20 transition-all">
                <Star className="w-4 h-4 mr-2" />
                5-Star Rated
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Modern Contact Form */}
          <div className="lg:col-span-2">
            <Card className="sticky top-6 backdrop-blur-sm bg-white/70 border-0 shadow-2xl shadow-blue-500/10">
              <CardHeader className="pb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-800">
                      Get in Touch
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600 mt-1">
                      Start your journey to better health with our expert team
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                      Thank you for reaching out. Our care team will respond
                      within 24 hours with complete confidentiality.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Privacy First Banner */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-100">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="relative flex items-start space-x-4">
                        <div className="p-2 rounded-lg bg-blue-500 text-white">
                          <Lock className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Checkbox
                              id="anonymous"
                              checked={formData.anonymous}
                              onCheckedChange={(checked) =>
                                handleInputChange(
                                  "anonymous",
                                  checked as boolean
                                )
                              }
                              className="border-blue-300"
                            />
                            <Label
                              htmlFor="anonymous"
                              className="text-base font-semibold text-blue-900"
                            >
                              Contact us anonymously
                            </Label>
                          </div>
                          <p className="text-sm text-blue-700">
                            We understand privacy concerns. You can reach out
                            without providing personal information.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                      {/* Name Field */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="name"
                          className="text-base font-semibold text-gray-700"
                        >
                          {formData.anonymous
                            ? "Name (Optional)"
                            : "Full Name *"}
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder={
                            formData.anonymous
                              ? "You can leave this blank"
                              : "Enter your full name"
                          }
                          required={!formData.anonymous}
                          className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                        />
                      </div>

                      {/* Contact Information Grid */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label
                            htmlFor="email"
                            className="text-base font-semibold text-gray-700"
                          >
                            {formData.anonymous
                              ? "Email (Optional)"
                              : "Email Address *"}
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="your.email@example.com"
                            required={!formData.anonymous}
                            className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label
                            htmlFor="phone"
                            className="text-base font-semibold text-gray-700"
                          >
                            Phone Number (Optional)
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            placeholder=" 0123-456-7890"
                            className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                          />
                        </div>
                      </div>

                      {/* Subject Selection */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="subject"
                          className="text-base font-semibold text-gray-700"
                        >
                          How can we help you? *
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleInputChange("subject", value)
                          }
                        >
                          <SelectTrigger className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl">
                            <SelectValue placeholder="Select the type of support you need" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="appointment">
                              🗓️ Schedule New Appointment
                            </SelectItem>
                            <SelectItem value="test-results">
                              📋 Test Results & Lab Work
                            </SelectItem>
                            <SelectItem value="treatment">
                              💊 Treatment & Medication Info
                            </SelectItem>
                            <SelectItem value="medication">
                              🏥 Medication Support & ARV
                            </SelectItem>
                            <SelectItem value="anonymous-consultation">
                              🔒 Anonymous Consultation
                            </SelectItem>
                            <SelectItem value="insurance">
                              💳 Insurance & Billing Questions
                            </SelectItem>
                            <SelectItem value="support">
                              ❤️ Emotional Support & Counseling
                            </SelectItem>
                            <SelectItem value="emergency">
                              🚨 Urgent Medical Concern
                            </SelectItem>
                            <SelectItem value="other">
                              💬 Other Questions
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Contact Preference */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="contact-method"
                          className="text-base font-semibold text-gray-700"
                        >
                          Preferred Contact Method
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleInputChange("contactMethod", value)
                          }
                        >
                          <SelectTrigger className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl">
                            <SelectValue placeholder="How would you like us to reach you?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">
                              📧 Secure Email
                            </SelectItem>
                            <SelectItem value="phone">📞 Phone Call</SelectItem>
                            <SelectItem value="text">
                              💬 Text Message
                            </SelectItem>
                            <SelectItem value="secure-portal">
                              🔐 Patient Portal Message
                            </SelectItem>
                            <SelectItem value="no-contact">
                              ℹ️ Information Only (No Response Needed)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Urgent Flag */}
                      <div className="flex items-center space-x-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                        <Checkbox
                          id="urgent"
                          checked={formData.urgent}
                          onCheckedChange={(checked) =>
                            handleInputChange("urgent", checked as boolean)
                          }
                          className="border-amber-400"
                        />
                        <Label
                          htmlFor="urgent"
                          className="text-base font-medium text-amber-800"
                        >
                          🚨 This is urgent (2-hour response during business
                          hours)
                        </Label>
                      </div>

                      {/* Message Field */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="message"
                          className="text-base font-semibold text-gray-700"
                        >
                          Your Message *
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          placeholder="Please share details about how we can help you. Remember, all communications are completely confidential and HIPAA-compliant."
                          rows={6}
                          required
                          className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl resize-none"
                        />
                      </div>

                      {/* Privacy Guarantee */}
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 border border-green-200">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full -translate-y-12 translate-x-12"></div>
                        <div className="relative flex items-start space-x-4">
                          <div className="p-2 rounded-lg bg-green-500 text-white">
                            <Shield className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-green-900 mb-2">
                              Your Privacy is Guaranteed
                            </h4>
                            <p className="text-sm text-green-800 leading-relaxed">
                              All communications are encrypted, HIPAA-compliant,
                              and handled with the utmost confidentiality. Your
                              information will never be shared without your
                              explicit written consent.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
                      >
                        <Send className="w-5 h-5 mr-3" />
                        Send Secure Message
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Modern Sidebar */}
          <div className="space-y-8">
            {/* Emergency Contact Card */}
            <Card className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-pink-50/80 border-red-200/50 shadow-xl shadow-red-500/10">
              <CardHeader className="pb-4">
                <CardTitle className="text-red-800 flex items-center text-xl">
                  <div className="p-2 rounded-lg bg-red-500 text-white mr-3">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  Emergency Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="p-3 rounded-full bg-red-500 text-white">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-red-900 text-lg">
                      24/7 Crisis Hotline
                    </p>
                    <p className="text-red-700 font-semibold">1900 633 123</p>
                  </div>
                </div>
                <div className="text-sm text-red-700 bg-white/40 p-3 rounded-lg">
                  <strong>Medical Emergency:</strong> Call 911 or visit your
                  nearest emergency room immediately.
                </div>
              </CardContent>
            </Card>

            {/* Contact Information Card */}
            <Card className="backdrop-blur-sm bg-white/70 border-0 shadow-xl shadow-blue-500/10">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center text-xl">
                  <div className="p-2 rounded-lg bg-blue-500 text-white mr-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-blue-50/50">
                    <div className="p-2 rounded-lg bg-blue-500 text-white">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Main Office</p>
                      <p className="text-blue-600 font-semibold text-lg">
                        1900 633 123
                      </p>
                      <p className="text-sm text-gray-600">
                        Mon - Sat: 8:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-indigo-50/50">
                    <div className="p-2 rounded-lg bg-indigo-500 text-white">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Secure Email
                      </p>
                      <p className="text-indigo-600 font-semibold">
                        contact@hivisionclinic.vn
                      </p>
                      <p className="text-sm text-gray-600">
                        Response within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-purple-50/50">
                    <div className="p-2 rounded-lg bg-purple-500 text-white">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Our Location
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        E2a-7, D1 Street,
                        <br />
                        Saigon Hi-Tech Park,
                        <br />
                        Thu Duc City, HCMC
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-200" />

                <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 rounded-lg bg-green-500 text-white">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <p className="font-semibold text-green-900">
                      Online Appointments
                    </p>
                  </div>
                  <p className="text-sm text-green-800 mb-4">
                    Book confidential consultations through our secure,
                    encrypted portal
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg">
                    Schedule Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Office Hours Card */}
            <Card className="backdrop-blur-sm bg-white/70 border-0 shadow-xl shadow-indigo-500/10">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center text-xl">
                  <div className="p-2 rounded-lg bg-indigo-500 text-white mr-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-indigo-50/50">
                    <span className="text-gray-700 font-medium">
                      Monday - Friday
                    </span>
                    <span className="font-bold text-indigo-700">
                      8:00 AM - 5:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50/50">
                    <span className="text-gray-700 font-medium">Sunday</span>
                    <span className="font-bold text-gray-600">Closed</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                  <p className="font-semibold text-blue-900 mb-2">
                    After-Hours Support
                  </p>
                  <p className="text-sm text-blue-800">
                    Secure messaging available 24/7 through our patient portal
                    for non-urgent matters
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Services Card */}
            <Card className="backdrop-blur-sm bg-white/70 border-0 shadow-xl shadow-purple-500/10">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center text-xl">
                  <div className="p-2 rounded-lg bg-purple-500 text-white mr-3">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  Our Specialized Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      icon: "🧪",
                      text: "HIV Testing & Counseling",
                      color: "bg-blue-100 text-blue-800",
                    },
                    {
                      icon: "💊",
                      text: "ARV Treatment Management",
                      color: "bg-green-100 text-green-800",
                    },
                    {
                      icon: "📊",
                      text: "CD4 & Viral Load Monitoring",
                      color: "bg-purple-100 text-purple-800",
                    },
                    {
                      icon: "🔒",
                      text: "Anonymous Consultations",
                      color: "bg-indigo-100 text-indigo-800",
                    },
                    {
                      icon: "👥",
                      text: "Support Groups & Counseling",
                      color: "bg-pink-100 text-pink-800",
                    },
                    {
                      icon: "📚",
                      text: "Educational Resources",
                      color: "bg-amber-100 text-amber-800",
                    },
                  ].map((service, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${service.color} transition-all hover:scale-105`}
                    >
                      <span className="text-lg">{service.icon}</span>
                      <span className="font-medium text-sm">
                        {service.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modern FAQ Section */}
        <section className="mt-20">
          <Card className="backdrop-blur-sm bg-white/70 border-0 shadow-2xl shadow-blue-500/10">
            <CardHeader className="text-center pb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white mx-auto mb-4">
                <MessageSquare className="w-8 h-8" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800">
                Frequently Asked Questions
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
                Common questions about our HIV care services and how we protect
                your privacy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    question: "Is my information kept completely confidential?",
                    answer:
                      "Absolutely. All communications are HIPAA-compliant, encrypted, and stored securely. We never share your information without your explicit written consent.",
                    icon: Shield,
                    color: "from-blue-500 to-blue-600",
                  },
                  {
                    question: "Can I contact you anonymously?",
                    answer:
                      "Yes, we offer anonymous consultation options. You can reach out without providing personal information if you prefer complete privacy.",
                    icon: Lock,
                    color: "from-green-500 to-green-600",
                  },
                  {
                    question: "How quickly will you respond to my message?",
                    answer:
                      "We respond to all messages within 24 hours during business days. Urgent matters are addressed within 2 hours during office hours.",
                    icon: Clock,
                    color: "from-purple-500 to-purple-600",
                  },
                  {
                    question: "Do you offer telehealth appointments?",
                    answer:
                      "Yes, we provide secure video consultations for follow-ups, counseling, medication management, and non-examination appointments.",
                    icon: Calendar,
                    color: "from-indigo-500 to-indigo-600",
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-gradient-to-br from-gray-50/50 to-white/50 border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${faq.color} text-white flex-shrink-0`}
                      >
                        <faq.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3 text-lg">
                          {faq.question}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
