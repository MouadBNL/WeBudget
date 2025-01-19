"use server";
import { createClient } from "@/utils/supabase/server";

export async function createBudgetGroup(req: { name: string }) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("budget_group")
      .insert([{ name: req.name }])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Budget Group error:", error);
    return { success: false, data: null };
  }
}

export type BudgetCategoryRequest = {
  category: string;
  budget: number;
  budget_grp_id: number;
};
export async function createBudgetCategory(req: BudgetCategoryRequest) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("budget_category")
      .insert([req])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Budget Cateogry error:", error);
    return { success: false, data: null };
  }
}

export async function getBudgetGroups() {
  const supabase = await createClient();

  try {
    const {
      data: transactions,
    }: { data: { name: string; id: number }[] | null } = await supabase
      .from("budget_category")
      .select();
    return { success: true, data: transactions };
  } catch (err) {
    return { success: false, data: null };
  }
}

export async function getCategories() {
  const supabase = await createClient();

  try {
    const { data: categories } = await supabase.from("budget_category").select(`
        id,
        category
        `);
    return {
      success: true,
      data: categories?.map((e) => ({
        label: e.category,
        value: e.id,
      })),
    };
  } catch (err) {
    return { success: false, data: null };
  }
}

export async function getBudgetData() {
  const supabase = await createClient();

  try {
    const { data: budgets } = await supabase.from("budget_group").select(`
        id,
        name,
        budget_category (
            id,
            category,
            budget
        )
  `);
    return { success: true, data: budgets };
  } catch (err) {
    return { success: false, data: null };
  }
}
