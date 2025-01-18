import { TransactionTable } from "@/components/partials/transactions-table";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="p-4 pt-0">
      <div>
        <Card className="p-4">
          <TransactionTable />
        </Card>
      </div>
    </div>
  );
}
