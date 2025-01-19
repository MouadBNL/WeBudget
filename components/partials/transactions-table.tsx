import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/types";

export function TransactionTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Transaction</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>{invoice.transaction}</TableCell>
            <TableCell>{invoice.category}</TableCell>
            <TableCell className="text-right">
              {invoice.amount < 0 ? (
                <span className="text-red-700 font-bold">
                  {invoice.amount} DH
                </span>
              ) : (
                <span className="text-green-600 font-bold">
                  {invoice.amount} DH
                </span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
