"use client";

import { ServiceCard, ServiceCardSkeleton } from "@/components/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllMedicalServices } from "@/services/medical-services/hooks";
import { Clock, Search, Filter, Phone } from "lucide-react";
import { useMemo, useState } from "react";

// Mock data for HIV medical services

export default function ServicesPage() {
  const { data: services, isLoading, error } = useGetAllMedicalServices();
  console.log("Services data:", services);
  // State cho search & filter
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [availability, setAvailability] = useState("all");

  // Lọc dữ liệu
  const filteredServices = useMemo(() => {
    if (!services) return [];

    return services.filter((service) => {
      // --- Filter theo loại dịch vụ ---
      const matchType =
        type === "all" ||
        service.type?.toLowerCase() === type ||
        service.type?.toLowerCase().includes(type);

      // --- Filter theo trạng thái (online/in-person/active) ---
      let matchAvailability = true;
      if (availability === "online") matchAvailability = service.isOnline;
      else if (availability === "in-person")
        matchAvailability = !service.isOnline;
      else if (availability === "active") matchAvailability = service.isActive;

      // --- Filter theo search ---
      const matchSearch =
        service.name?.toLowerCase().includes(search.toLowerCase()) ||
        service.description?.toLowerCase().includes(search.toLowerCase());

      return matchType && matchAvailability && matchSearch;
    });
  }, [services, type, availability, search]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our HIV Medical Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive HIV care services delivered by experienced medical
              professionals. From testing to treatment, we provide confidential
              and compassionate care.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search services..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="treatment">Treatment</SelectItem>
                  <SelectItem value="prevention">Prevention</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>

              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="online">Online Available</SelectItem>
                  <SelectItem value="in-person">In-Person Only</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            // Hiện 6 skeleton card cho đẹp, số lượng tùy ý
            Array.from({ length: 6 }).map((_, idx) => (
              <ServiceCardSkeleton key={idx} />
            ))
          ) : error ? (
            <div className="text-red-600">
              Failed to load services: {error.message}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices && filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <ServiceCard key={service.serviceID} service={service} />
                ))
              ) : (
                <div className="col-span-full text-gray-500 text-center">
                  No services found.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Need Help Choosing the Right Service?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our medical professionals are here to help you find the most
            appropriate care for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Phone className="w-5 h-5 mr-2" />
              Call (555) 123-4567
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Clock className="w-5 h-5 mr-2" />
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
