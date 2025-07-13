// app/services/ServiceCard.tsx

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import {
  Heart,
  Stethoscope,
  TestTube,
  Pill,
  Users,
  Video,
  MapPin,
  CheckCircle,
  XCircle,
  Monitor,
  User,
} from "lucide-react";
import { formatVND } from "@/utils/formatVND";
import { MedicalService } from "@/services/medical-services/types";

// Helpers to map type
const getServiceTypeIcon = (type: string) => {
  switch (type) {
    case "Testing":
      return TestTube;
    case "Consultation":
      return Stethoscope;
    case "Treatment":
      return Pill;
    case "Prevention":
      return Heart;
    case "Support":
      return Users;
    case "Counseling":
      return User;
    default:
      return Heart;
  }
};

const getServiceTypeColor = (type: string) => {
  switch (type) {
    case "Test":
      return "bg-blue-100 text-blue-800";
    case "Consultation":
      return "bg-green-100 text-green-800";
    case "Treatment":
      return "bg-purple-100 text-purple-800";
    case "Prevention":
      return "bg-orange-100 text-orange-800";
    case "Support":
      return "bg-pink-100 text-pink-800";
    case "Counseling":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export interface ServiceCardProps {
  service: MedicalService;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const ServiceIcon = getServiceTypeIcon(service.type);

  return (
    <Card
      className={`h-full flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${
        !service.isActive ? "opacity-60" : ""
      }`}
    >
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={service.img || "/placeholder.svg"}
            alt={service.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className={getServiceTypeColor(service.type)}>
              <ServiceIcon className="w-3 h-3 mr-1" />
              {service.type}
            </Badge>
            {!service.isActive && (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                Inactive
              </Badge>
            )}
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            {service.isOnline && (
              <Badge className="bg-green-100 text-green-800">
                <Monitor className="w-3 h-3 mr-1" />
                Online
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="space-y-4 flex-1 flex flex-col">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              {service.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {service.description}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Stethoscope className="w-4 h-4" />
              <span>{service.specialty}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              {service.isRequireDoctor ? (
                <div className="flex items-center gap-1 text-orange-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Doctor Required</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-green-600">
                  <XCircle className="w-4 h-4" />
                  <span>No Doctor Required</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              {service.isOnline ? (
                <div className="flex items-center gap-1 text-blue-600">
                  <Video className="w-4 h-4" />
                  <span>Available Online</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>In-Person Only</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-gray-900">
              {formatVND(service.price)}
            </span>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!service.isActive}
          >
            {service.isActive ? "Book Now" : "Unavailable"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
