import { BudgetGroup } from "@/types";
import BudgetGroupCard from "./BudgetGroup";

export default function Budget() {
  const budgetGroups: BudgetGroup[] = [
    {
      id: 1,
      name: "General",
      items: [
        {
          id: 1,
          category: "Flat rent",
          budget: 2500,
          actual: 2500,
          remaining: 0,
        },
        {
          id: 2,
          category: "Car repair",
          budget: 1000,
          actual: 0,
          remaining: 1000,
        },
        {
          id: 3,
          category: "Utility bills",
          budget: 2500,
          actual: 1250,
          remaining: 1250,
        },
      ],
    },
    {
      id: 2,
      name: "Health",
      items: [
        {
          id: 4,
          category: "Insurance",
          budget: 500,
          actual: 200,
          remaining: 300,
        },
        {
          id: 5,
          category: "Doctor visits",
          budget: 300,
          actual: 150,
          remaining: 150,
        },
        {
          id: 6,
          category: "Medication",
          budget: 200,
          actual: 100,
          remaining: 100,
        },
        {
          id: 7,
          category: "Gym membership",
          budget: 100,
          actual: 75,
          remaining: 25,
        },
      ],
    },
    {
      id: 3,
      name: "Entertainment",
      items: [
        {
          id: 8,
          category: "Streaming services",
          budget: 50,
          actual: 40,
          remaining: 10,
        },
      ],
    },
    {
      id: 4,
      name: "Food and dining",
      items: [
        {
          id: 9,
          category: "Groceries",
          budget: 400,
          actual: 350,
          remaining: 50,
        },
        {
          id: 10,
          category: "Restaurants",
          budget: 200,
          actual: 180,
          remaining: 20,
        },
        {
          id: 11,
          category: "Coffee shops",
          budget: 100,
          actual: 90,
          remaining: 10,
        },
        { id: 12, category: "Snacks", budget: 50, actual: 30, remaining: 20 },
      ],
    },
    {
      id: 5,
      name: "Salary",
      items: [
        {
          id: 13,
          category: "Primary job",
          budget: 5000,
          actual: 5000,
          remaining: 0,
        },
        {
          id: 14,
          category: "Freelance",
          budget: 1000,
          actual: 800,
          remaining: 200,
        },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {budgetGroups.map((grp) => {
        return <BudgetGroupCard key={grp.id} group={grp} />;
      })}
    </div>
  );
}
