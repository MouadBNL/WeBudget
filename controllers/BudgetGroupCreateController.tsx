"use client";
import { createBudgetGroup } from "@/app/actions/budget";
import BudgetGroupForm from "@/components/partials/budget-group-form";
import { useToast } from "@/hooks/use-toast";

export default function BudgetGroupCreateController({
  onCreated,
}: {
  onCreated?: () => void;
}) {
  const toast = useToast();

  const onCreateGroup = async (req: { name: string }) => {
    try {
      console.log("[BudgetGroupCreateController] ", { req });
      const res = await createBudgetGroup(req);
      if (!res.success) throw new Error(JSON.stringify(res));
      toast.toast({
        title: "Budget group created",
      });
      if (onCreated) onCreated();
    } catch (error) {
      console.error(error);

      toast.toast({
        title: "An error occured",
      });
    }
  };
  return <BudgetGroupForm onSubmit={(grp) => onCreateGroup(grp)} />;
}
