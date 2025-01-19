"use server";

import { Transaction } from "@/types";
import { createClient } from "@/utils/supabase/server";


interface FilterCriteria {
  dateRange?: {
    start?: string
    end?: string
  }
  categories?: string[]
  minAmount?: number
  maxAmount?: number
  type?: 'income' | 'expense'
}

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

export async function filterTransactions(criteria: FilterCriteria) {
  const supabase = await createClient()
  let query = supabase.from("transactions").select()

  // Apply filters based on criteria
  if (criteria.dateRange?.start) {
    query = query.gte('date', criteria.dateRange.start)
  }
  if (criteria.dateRange?.end) {
    query = query.lte('date', criteria.dateRange.end)
  }
  if (criteria.categories?.length) {
    query = query.in('category', criteria.categories)
  }
  if (criteria.minAmount) {
    query = query.gte('amount', criteria.minAmount)
  }
  if (criteria.maxAmount) {
    query = query.lte('amount', criteria.maxAmount)
  }
  if (criteria.type) {
    query = query.eq('type', criteria.type)
  }

  try {
    const { data: transactions } = await query
    return { success: true, data: transactions }
  } catch (err) {
    return { success: false, data: null }
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
