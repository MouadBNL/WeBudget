export type Transaction = {
  id: number | null;
  invoice: string;
  date: string;
  transaction: string;
  category: string;
  amount: number;
};

export type Budget = {
  id: number | null;
  category: string;
  budget: number;
  actual: number;
  remaining: number;
};

export type BudgetGroup = {
  id: number | null;
  name: string;
  items: Budget[];
};
