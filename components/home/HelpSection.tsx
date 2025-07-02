"use client";
import Image from "next/image";
import { FEATURED_PRODUCTS, MORE_PRODUCTS } from "@/constants";
import { Card, CardContent } from "../ui/card";

const HelpSection = () => {
  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      {/* phần header giữ nguyên */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {/* 2. Dùng FEATURED_PRODUCTS.map */}
        {FEATURED_PRODUCTS.map((product, idx) => (
          <Card
            key={idx}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* 3. Dùng MORE_PRODUCTS.map */}
        {MORE_PRODUCTS.map((product, idx) => (
          <Card
            key={idx}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HelpSection;
