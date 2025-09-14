import { useContext, useEffect, useState } from "react";
import BudgetCard from "../BudgetCard/BudgetCard";
import { UNCATEGORIZED_BUDGET_ID } from "../../context/BudgetContext";
import { BudgetsContext } from "../../context/BudgetContext";

export default function UncategorizedBudgetCard() {
  const { deleteCompleteUncategorizeExpenses, getBudgetExpenses } =
    useContext(BudgetsContext);
  const [amountTotal, setAmount] = useState<number>();

  useEffect(() => {
    getBudgetExpenses(+UNCATEGORIZED_BUDGET_ID).then((result) => {
      const amount = result.reduce(
        (total, expenses) => total + expenses.amount,
        0
      );
      setAmount(amount);
    });
  }, [getBudgetExpenses]);

  if (amountTotal === 0) return null;
  return (
    <BudgetCard
      name='Uncategorized'
      budgetId={+UNCATEGORIZED_BUDGET_ID}
      deleteCompleteUncategorizeExpenses={deleteCompleteUncategorizeExpenses}
      gray
    />
  );
}
