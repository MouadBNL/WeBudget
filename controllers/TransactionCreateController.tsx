"use client";
import { createTransaction } from "@/app/actions/transactions";
import TransactionForm from "@/components/partials/transaction-form";
import { useToast } from "@/hooks/use-toast";
import { Transaction } from "@/types";

export default function TransactionCreateController({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { toast } = useToast();
  const handleSubmit = async (transaction: Partial<Transaction>) => {
    try {
      const result = await createTransaction(transaction);

      if (result.success) {
        // Handle success (e.g., show message, reset form, redirect)
        console.log("Transaction created:", result.data);
        onSuccess();
        toast({ title: "Transaction created" });
      } else {
        // Handle error
        console.error("Failed to create transaction:", result.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div>
      <TransactionForm transaction={{}} onSubmit={(t) => handleSubmit(t)} />
    </div>
  );
}
