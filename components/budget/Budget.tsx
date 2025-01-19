"use client";
import { BudgetGroup } from "@/types";
import BudgetGroupCard from "./BudgetGroup";
import { useEffect, useState } from "react";
import { getBudgetData } from "@/app/actions/budget";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import BudgetGroupCreateController from "@/controllers/BudgetGroupCreateController";

export type BudgetProps = {
  onRefresh?: () => void;
};
export default function Budget({ onRefresh }: BudgetProps) {
  const [budget, setBudgets] = useState<BudgetGroup[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    try {
      const res = await getBudgetData();
      if (res.success == false || res.data == null) throw new Error();
      setBudgets(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-end items-end mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Budget Group</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-4">New Group</DialogTitle>
              <BudgetGroupCreateController
                onCreated={() => {
                  refresh();
                  setOpen(false);
                }}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {budget.map((grp) => {
          return (
            <BudgetGroupCard key={grp.id} group={grp} onRefresh={refresh} />
          );
        })}
      </div>
    </div>
  );
}
