"use client";
import { createBudgetCategory } from "@/app/actions/budget";
import BudgetCategoryForm from "@/components/partials/budget-category-form";
import { useToast } from "@/hooks/use-toast";

export function BudgetCategoryCreateController({
  groupId,
  onRefresh,
}: {
  groupId: number;
  onRefresh?: () => void;
}) {
  const toast = useToast();
  const onCategoryCreate = async (req: { name: string; amount: number }) => {
    try {
      const res = await createBudgetCategory({
        category: req.name,
        budget: req.amount,
        budget_grp_id: groupId,
      });
      if (res.success == false) throw new Error();
      toast.toast({
        title: "Category created",
      });
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error(error);
    }
  };
  return <BudgetCategoryForm onSubmit={onCategoryCreate} />;
}
