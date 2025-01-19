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

export type BudgetGroupProps = {
  group: BudgetGroup;
};
export default function BudgetGroupUI({ group }: BudgetGroupProps) {
  function formatCurrency(amount: number) {
    return `${amount} DH`;
  }

  return (
    <Card>
      <div className="flex justify-between gap-4 items-center py-2 px-4">
        <div>
          <p className="text-lg font-medium">{group.name}</p>
        </div>

        <div>
          <Button>Add Category</Button>
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
            {group.items.map((item) => (
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
