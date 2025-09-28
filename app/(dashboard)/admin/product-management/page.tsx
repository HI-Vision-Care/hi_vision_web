"use client";

import ProductsHeader from "@/components/product/product-header";
import { ProductsTable } from "@/components/product/products-table";
import { useUserRole } from "@/hooks/useAccountId";

const ProductManagement = () => {
  const userRole = useUserRole();
  const isAdmin = userRole === "ADMIN";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <ProductsHeader isAdmin={isAdmin} />
        <ProductsTable isAdmin={isAdmin} />
      </div>
    </div>
  );
};

export default ProductManagement;
