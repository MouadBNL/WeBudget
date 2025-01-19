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

export async function getTransactions() {
  const supabase = await createClient();

  try {
    const { data: transactions }: { data: Transaction[] | null } =
      await supabase.from("transactions").select();
    return { success: true, data: transactions };
  } catch (err) {
    return { success: false, data: null };
  }
}
