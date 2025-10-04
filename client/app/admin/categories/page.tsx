import { Metadata } from "next";
import { Plus } from "lucide-react";

import { DashboardLayout } from "@/components/admin/dashboard-layout";
import { Button } from "@/components/ui/button";
import { CategoriesTable } from "@/components/admin/categories/categories-table";
import { CategoryDialog } from "@/components/admin/categories/category-dialog";

export const metadata: Metadata = {
  title: "Categories - Amazon Admin",
  description: "Manage product categories in your store",
};

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <CategoryDialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </CategoryDialog>
        </div>
        
        <div className="space-y-4">
          <CategoriesTable />
        </div>
      </div>
    </DashboardLayout>
  );
}