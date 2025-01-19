"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export type BudgetGroupFomrProps = {
  onSubmit?: (d: { name: string; amount: number }) => void;
};
export default function BudgetCategoryForm({ onSubmit }: BudgetGroupFomrProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ name, amount });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="name">Category name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Budget</Label>
          <Input
            id="name"
            value={amount}
            onChange={(e) => setAmount(parseFloat(`${e.target.value}`))}
            placeholder="Enter your name"
            className="w-full"
          />
        </div>
      </div>
      <Button type="submit" className="w-full" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
}
