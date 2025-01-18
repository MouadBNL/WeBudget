"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Transaction = {
  id: number;
  invoice: string;
  date: string;
  transaction: string;
  category: string;
  amount: number;
};

const TransactionForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Transaction>({
    defaultValues: {
      id: 0,
      invoice: "",
      date: "",
      transaction: "",
      category: "",
      amount: 0,
    },
  });

  const onSubmit = (data: Transaction) => {
    console.log("Transaction Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* ID */}
      <div>
        <Label htmlFor="id">ID</Label>
        <Input
          id="id"
          type="number"
          {...register("id", { required: "ID is required" })}
          className="mt-1"
        />
        {errors.id && (
          <p className="text-red-500 text-sm">{errors.id.message}</p>
        )}
      </div>

      {/* Invoice */}
      <div>
        <Label htmlFor="invoice">Invoice</Label>
        <Input
          id="invoice"
          type="text"
          {...register("invoice", { required: "Invoice is required" })}
          className="mt-1"
        />
        {errors.invoice && (
          <p className="text-red-500 text-sm">{errors.invoice.message}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          {...register("date", { required: "Date is required" })}
          className="mt-1"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      {/* Transaction Type */}
      <div>
        <Label htmlFor="transaction">Transaction Type</Label>
        <Select
          onValueChange={(value) => setValue("transaction", value)}
          defaultValue=""
        >
          <SelectTrigger id="transaction">
            <SelectValue placeholder="Select transaction type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Purchase">Purchase</SelectItem>
            <SelectItem value="Refund">Refund</SelectItem>
          </SelectContent>
        </Select>
        {errors.transaction && (
          <p className="text-red-500 text-sm">{errors.transaction.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          onValueChange={(value) => setValue("category", value)}
          defaultValue=""
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Groceries">Groceries</SelectItem>
            <SelectItem value="Books">Books</SelectItem>
            <SelectItem value="Furniture">Furniture</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          {...register("amount", { required: "Amount is required" })}
          className="mt-1"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
