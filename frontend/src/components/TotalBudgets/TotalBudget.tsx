import { useContext } from "react";
import BudgetCard from "../BudgetCard/BudgetCard";
import { BudgetsContext } from "../../context/BudgetContext";

export default function TotalBudget() {
  const { budgets } = useContext(BudgetsContext);

  const max = budgets.reduce((total, budget) => total + budget.max, 0);

  if (max === 0) return null;
  return <BudgetCard gray name='Total' max={max} hideButtons />;
}
