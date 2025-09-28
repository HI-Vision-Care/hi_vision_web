export interface Category {
  id: number;
  categoryName: string;
  description: string;
}

export interface Supplier {
  id: number;
  supplierName: string;
  contactInfo: string;
}

export interface Product {
  id: number;
  sku: string;
  productName: string;
  description: string;
  price: number;
  unit: string;
  imageUrl: string;
  isActive: boolean;
  category: Category;
  supplier: Supplier;
}

export interface CreateProductBody {
  sku: string;
  productName: string;
  desc: string;
  price: number;
  unit: string;
  img: string;
  categoryID: number;
  supplierID: number;
}

// Swagger hiển thị response giống body (không có id, không nested)
export interface CreateProductResponse extends CreateProductBody {}
