"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export type BudgetGroupFomrProps = {
  onSubmit?: (d: { name: string }) => void;
};
export default function BudgetGroupForm({ onSubmit }: BudgetGroupFomrProps) {
  const [name, setName] = useState("");
  const handleSubmit = (e: any) => {
    console.log("[BudgetGroupForm] ", { name });
    e.preventDefault();
    if (onSubmit) onSubmit({ name });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
