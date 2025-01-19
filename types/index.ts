export type Transaction = {
  id: number | null;
  invoice: string;
  date: string;
  transaction: string;
  category: string;
  amount: number;
};

export type Budget = {
  id: any;
  category: any;
  budget: any;
  actual?: number;
  remaining?: number;
};

export type BudgetGroup = {
  id: number | null;
  name: string;
  budget_category: Budget[];
};
