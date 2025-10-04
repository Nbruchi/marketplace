import { Metadata } from "next";
import { Plus } from "lucide-react";

import { DashboardLayout } from "@/components/admin/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "@/components/admin/products/products-table";
import { ProductDialog } from "@/components/admin/products/product-dialog";

export const metadata: Metadata = {
  title: "Products - Amazon Admin",
  description: "Manage products in your store",
};

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <ProductDialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </ProductDialog>
        </div>
        
        <div className="space-y-4">
          <ProductsTable />
        </div>
      </div>
    </DashboardLayout>
  );
}