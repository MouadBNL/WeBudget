import ExpenseCard from "@/components/partials/expense-card";
import IncomeCard from "@/components/partials/income-card";
import ProfitCard from "@/components/partials/profit-card";
import { TransactionTable } from "@/components/partials/transactions-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
              <Button>Add Transaction</Button>
            </div>
          </header>
          <TransactionTable />
        </section>
      </div>
    </div>
  );
}
