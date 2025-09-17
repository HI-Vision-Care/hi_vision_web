import ProductsHeader from "@/components/product/product-header";
import { ProductsTable } from "@/components/product/products-table";

const PostManagemtn = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <ProductsHeader />
        <ProductsTable />
      </div>
    </div>
  );
};

export default PostManagemtn;
