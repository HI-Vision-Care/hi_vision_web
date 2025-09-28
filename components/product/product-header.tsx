import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarIcon,
  DownloadIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
  UploadIcon,
  Package,
} from "lucide-react";

const ProductsHeader = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <div className="space-y-4">
      {/* Header with title and action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Medical Products
          </h1>
          <p className="text-sm text-muted-foreground">
            {isAdmin
              ? "Manage your medical supplies and equipment inventory"
              : "Manage warehouse inventory and stock levels"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <UploadIcon className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <DownloadIcon className="h-4 w-4" />
            Export
          </Button>

          {isAdmin ? (
            <Button size="sm" className="gap-2 bg-blue-400 hover:bg-blue-600">
              <PlusIcon className="h-4 w-4" />
              Add Product
            </Button>
          ) : (
            <Button size="sm" className="gap-2 bg-green-500 hover:bg-green-600">
              <Package className="h-4 w-4" />
              Manage Inventory
            </Button>
          )}
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <CalendarIcon className="h-4 w-4" />
                12 Sep - 28 Oct 2024
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem>Last 3 months</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Status</DropdownMenuItem>
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Inactive</DropdownMenuItem>
              <DropdownMenuItem>Low Stock</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Category
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Categories</DropdownMenuItem>
              <DropdownMenuItem>Consumables</DropdownMenuItem>
              <DropdownMenuItem>Equipment</DropdownMenuItem>
              <DropdownMenuItem>Instruments</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <FilterIcon className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
