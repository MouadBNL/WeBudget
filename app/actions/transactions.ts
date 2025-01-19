"use server";

import { Transaction } from "@/types";
import { createClient } from "@/utils/supabase/server";

export async function createTransaction(transaction: Partial<Transaction>) {
  const supabase = await createClient();

  try {
    delete transaction.id;
    const { data, error } = await supabase
      .from("transactions")
      .insert([transaction])
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Transaction error:", error);
    return { success: false, error };
  }
}

export async function getTransactions(): Promise<{
  success: boolean;
  data: Transaction[] | null;
}> {
  const supabase = await createClient();

  try {
    const { data: transactions }: any = await supabase
      .from("transactions")
      .select(
        `
        id,
        invoice,
        date,
        transaction,
        category,
        amount,
        budget_category:category_id (
            id,
            category,
            budget
        )`
      );

    console.log({ data: transactions });
    return {
      success: true,
      data:
        transactions?.map(
          (e: any) =>
            ({
              amount: e.amount,
              category: e.budget_category?.category,
              date: e.date,
              id: e.id,
              invoice: e.invoice,
              transaction: e.transaction,
              category_id: e.budget_category?.id,
            } as any)
        ) ?? null,
    };
  } catch (err) {
    console.error(err);
    return { success: false, data: null };
  }
}
