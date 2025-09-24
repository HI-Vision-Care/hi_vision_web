"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, MoreHorizontalIcon } from "lucide-react";
import { useProducts } from "@/services/product/hooks";
import { Product } from "@/services/product/types";

function getActiveBadge(isActive: boolean) {
  if (!isActive) {
    return (
      <Badge
        variant="secondary"
        className="bg-gray-100 text-gray-800 hover:bg-gray-100"
      >
        Inactive
      </Badge>
    );
  }
  return (
    <Badge
      variant="secondary"
      className="bg-green-100 text-green-800 hover:bg-green-100"
    >
      Active
    </Badge>
  );
}

export function ProductsTable() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const { data: products, isLoading, error } = useProducts(true);

  const handleSelectAll = (checked: boolean) => {
    if (!products) return;
    setSelectedProducts(checked ? products.map((p) => p.id) : []);
  };

  const handleSelectProduct = (productId: number, checked: boolean) => {
    setSelectedProducts((prev) =>
      checked ? [...prev, productId] : prev.filter((id) => id !== productId)
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
        Loading products…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-card p-6 text-sm text-destructive">
        Failed to load products: {error.message}
      </div>
    );
  }

  const rows: Product[] = products ?? [];
  const itemsPerPage = 10; // UI hiện tại là giả lập

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    rows.length > 0 && selectedProducts.length === rows.length
                  }
                  onCheckedChange={(c) => handleSelectAll(Boolean(c))}
                />
              </TableHead>
              <TableHead className="font-semibold">Product Name</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Stock</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">
                Status
                <ChevronDownIcon className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((product) => (
              <TableRow key={product.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={(c) =>
                      handleSelectProduct(product.id, Boolean(c))
                    }
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-card-foreground">
                        {product.productName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {product.description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        SKU: {product.sku}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium">
                      {product.category?.categoryName ?? "-"}
                    </div>
                    <div className="text-muted-foreground">
                      {product.category?.description ?? ""}
                    </div>
                  </div>
                </TableCell>

                {/* backend chưa có stock ⇒ hiển thị "-" để không sai schema */}
                <TableCell>
                  <div className="text-sm text-card-foreground">-</div>
                </TableCell>

                <TableCell>
                  <div className="font-medium">${product.price}</div>
                  <div className="text-sm text-muted-foreground">
                    per {product.unit}
                  </div>
                </TableCell>

                <TableCell>
                  {getActiveBadge(Boolean(product.isActive))}
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Product</DropdownMenuItem>
                      <DropdownMenuItem>Update Stock</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination (hiện tại tĩnh) */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Result 1-{Math.min(itemsPerPage, rows.length)} of {rows.length}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <span className="text-muted-foreground">...</span>
          <Button variant="outline" size="sm">
            12
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
