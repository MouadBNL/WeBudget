"use client";
import { createTransaction } from "@/app/actions/transactions";
import TransactionForm from "@/components/partials/transaction-form";
import { Transaction } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { useState } from "react";

export default function TransactionCreateController() {
  const handleSubmit = async (transaction: Partial<Transaction>) => {
    try {
      const result = await createTransaction(transaction);

      if (result.success) {
        // Handle success (e.g., show message, reset form, redirect)
        console.log("Transaction created:", result.data);
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
