"use client";

import { getTransactions } from "@/app/actions/transactions";
import ExpenseCard from "@/components/partials/expense-card";
import IncomeCard from "@/components/partials/income-card";
import ProfitCard from "@/components/partials/profit-card";
import { TransactionTable } from "@/components/partials/transactions-table";
import TransactionController from "@/components/transaction/TransactionController";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import TransactionCreateController from "@/controllers/TransactionCreateController";
import { Transaction } from "@/types";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const res = await getTransactions();
      if (res.data == null) throw new Error("Data is null");
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="p-4 pt-0">
        <section className="grid grid-cols-3 gap-4">
          <IncomeCard />
          <ExpenseCard />
          <ProfitCard />
        </section>
        {/* <pre>{JSON.stringify(transactions, null, 2)}</pre> */}
      </div>
      <hr className="my-4" />
      <div className="p-4">
        <TransactionController />
      </div>
    </div>
  );
}
