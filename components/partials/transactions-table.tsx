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

const invoices: Transaction[] = [
  {
    id: 1,
    invoice: "INV-1001",
    date: "2025-01-01",
    transaction: "Purchase",
    category: "Electronics",
    amount: 299.99,
  },
  {
    id: 2,
    invoice: "INV-1002",
    date: "2025-01-02",
    transaction: "Refund",
    category: "Clothing",
    amount: -49.99,
  },
  {
    id: 3,
    invoice: "INV-1003",
    date: "2025-01-03",
    transaction: "Purchase",
    category: "Groceries",
    amount: 120.45,
  },
  {
    id: 4,
    invoice: "INV-1004",
    date: "2025-01-04",
    transaction: "Purchase",
    category: "Furniture",
    amount: 499.99,
  },
  {
    id: 5,
    invoice: "INV-1005",
    date: "2025-01-05",
    transaction: "Purchase",
    category: "Books",
    amount: 19.99,
  },
  {
    id: 6,
    invoice: "INV-1006",
    date: "2025-01-06",
    transaction: "Refund",
    category: "Electronics",
    amount: -75.0,
  },
  {
    id: 7,
    invoice: "INV-1007",
    date: "2025-01-07",
    transaction: "Purchase",
    category: "Clothing",
    amount: 89.99,
  },
  {
    id: 8,
    invoice: "INV-1008",
    date: "2025-01-08",
    transaction: "Purchase",
    category: "Toys",
    amount: 49.95,
  },
  {
    id: 9,
    invoice: "INV-1009",
    date: "2025-01-09",
    transaction: "Refund",
    category: "Books",
    amount: -10.99,
  },
  {
    id: 10,
    invoice: "INV-1010",
    date: "2025-01-10",
    transaction: "Purchase",
    category: "Office Supplies",
    amount: 35.5,
  },
  {
    id: 11,
    invoice: "INV-1011",
    date: "2025-01-11",
    transaction: "Purchase",
    category: "Groceries",
    amount: 150.25,
  },
  {
    id: 12,
    invoice: "INV-1012",
    date: "2025-01-12",
    transaction: "Purchase",
    category: "Electronics",
    amount: 129.99,
  },
  {
    id: 13,
    invoice: "INV-1013",
    date: "2025-01-13",
    transaction: "Refund",
    category: "Toys",
    amount: -29.95,
  },
  {
    id: 14,
    invoice: "INV-1014",
    date: "2025-01-14",
    transaction: "Purchase",
    category: "Home Appliances",
    amount: 250.0,
  },
  {
    id: 15,
    invoice: "INV-1015",
    date: "2025-01-15",
    transaction: "Purchase",
    category: "Clothing",
    amount: 60.0,
  },
  {
    id: 16,
    invoice: "INV-1016",
    date: "2025-01-16",
    transaction: "Purchase",
    category: "Books",
    amount: 25.0,
  },
  {
    id: 17,
    invoice: "INV-1017",
    date: "2025-01-17",
    transaction: "Purchase",
    category: "Groceries",
    amount: 200.75,
  },
  {
    id: 18,
    invoice: "INV-1018",
    date: "2025-01-18",
    transaction: "Refund",
    category: "Furniture",
    amount: -150.0,
  },
  {
    id: 19,
    invoice: "INV-1019",
    date: "2025-01-19",
    transaction: "Purchase",
    category: "Toys",
    amount: 80.5,
  },
  {
    id: 20,
    invoice: "INV-1020",
    date: "2025-01-20",
    transaction: "Purchase",
    category: "Clothing",
    amount: 99.99,
  },
];

export function TransactionTable() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
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
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>{invoice.transaction}</TableCell>
            <TableCell>{invoice.category}</TableCell>
            <TableCell className="text-right">{invoice.amount} DH</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
