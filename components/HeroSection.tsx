import { Badge, Heart, MessageSquare, Mic, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const HeroSection = () => {
  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Badge
            fontVariant="secondary"
            className="bg-white/80 text-gray-700 px-4 py-2"
          >
            <Heart className="w-4 h-4 mr-2 text-red-500" />
            Health Matters
          </Badge>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight">
              <span className="text-blue-500">One Step Solution</span>
              <br />
              <span className="text-gray-900">for all your dietary needs.</span>
            </h1>

            <p className="text-gray-600 text-lg max-w-md">
              Using your BMI index we calculate whether the dish is suitable for
              you.
            </p>
          </div>

          <div className="relative max-w-md">
            <Input
              placeholder="Search your product"
              className="pl-4 pr-24 py-3 rounded-full bg-white shadow-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full p-2 h-8 w-8"
              >
                <MessageSquare className="w-4 h-4 text-blue-500" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full p-2 h-8 w-8"
              >
                <Mic className="w-4 h-4 text-blue-500" />
              </Button>
              <Button
                size="sm"
                className="rounded-full p-2 h-8 w-8 bg-blue-500 hover:bg-blue-600"
              >
                <Search className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="w-80 h-80 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full mx-auto relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <span className="text-4xl">👨‍⚕️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
