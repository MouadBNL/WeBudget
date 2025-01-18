import ExpenseCard from "@/components/partials/expense-card";
import IncomeCard from "@/components/partials/income-card";
import ProfitCard from "@/components/partials/profit-card";
import TransactionForm from "@/components/partials/transaction-form";
import { TransactionTable } from "@/components/partials/transactions-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  return (
    <div>
      <div className="p-4 pt-0">
        <section className="grid grid-cols-3 gap-4">
          <IncomeCard />
          <ExpenseCard />
          <ProfitCard />
        </section>
      </div>
      <hr className="my-4" />
      <div className="p-4">
        <section>
          <header className="flex justify-between items-center mb-4">
            <div>
              <Input type="text" placeholder="Search" />
            </div>
            <div>
              <Dialog>
                <DialogTrigger>
                  <Button>Add Transaction</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-4">New transaction</DialogTitle>
                    {/* <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription> */}
                    <TransactionForm />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </header>
          <TransactionTable />
        </section>
      </div>
    </div>
  );
}
