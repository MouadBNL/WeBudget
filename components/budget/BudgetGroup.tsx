import { BudgetGroup } from "@/types";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import BudgetCategoryForm from "../partials/budget-category-form";
import { BudgetCategoryCreateController } from "@/controllers/BudgetCategoryCreateController";
import { useState } from "react";

export type BudgetGroupProps = {
  group: BudgetGroup;
  onRefresh?: () => void;
};
export default function BudgetGroupUI({ group, onRefresh }: BudgetGroupProps) {
  const [open, setOpen] = useState(false);

  function formatCurrency(amount: number = 0) {
    return `${amount} DH`;
  }

  return (
    <Card>
      <div className="flex justify-between gap-4 items-center py-2 px-4">
        <div>
          <p className="text-lg font-medium">{group.name}</p>
        </div>

        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Add Category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>New Category</DialogTitle>
              <BudgetCategoryCreateController
                groupId={group.id as number}
                onRefresh={() => {
                  setOpen(false);
                  if (onRefresh) onRefresh();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <hr />

      <div>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[200px]">Category</TableHead>
              <TableHead className="text-right">Budget</TableHead>
              <TableHead className="text-right">Actual</TableHead>
              <TableHead className="text-right">Remaining</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {group.budget_category.map((item) => (
              <TableRow key={item.category}>
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(item.budget)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(item.actual)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(item.remaining)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
