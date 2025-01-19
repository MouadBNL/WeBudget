"use client";
import TransactionCreateController from "@/controllers/TransactionCreateController";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { TransactionTable } from "../partials/transactions-table";
import { useEffect, useState } from "react";
import { Transaction } from "@/types";
import { getTransactions } from "@/app/actions/transactions";

export default function TransactionController() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    try {
      const res = await getTransactions();
      if (res.success == false || res.data == null) throw new Error();
      setTransactions(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section>
      <header className="flex justify-between items-center mb-4">
        <div>
          <Input type="text" placeholder="Search" />
        </div>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Add Transaction</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-4">New transaction</DialogTitle>
                {/* <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription> */}
                <TransactionCreateController
                  onSuccess={() => {
                    refresh();
                    setOpen(false);
                  }}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <TransactionTable transactions={transactions} />
    </section>
  );
}
