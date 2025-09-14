import React, { createContext, useEffect, useState } from "react";
import { initDB } from "./../../idb";

export const BudgetsContext = createContext<BudgetsContextType>({
  budgets: [],
  expenses: [],
  getBudgetExpenses: async () => [],
  addExpense: () => {},
  addBudget: async () => {},
  deleteBudget: async () => {},
  deleteExpense: async () => {},
  deleteCompleteUncategorizeExpenses: () => {},
});

export const UNCATEGORIZED_BUDGET_ID = "1234";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  budgetId: number;
}

export interface Budget {
  id: number;
  name: string;
  max: number;
}

interface BudgetsContextType {
  budgets: Budget[];
  expenses: Expense[];
  getBudgetExpenses: (budgetId: number) => Promise<Expense[]>;
  addExpense: (expense: Omit<Expense, "id">) => void;
  addBudget: (budget: Omit<Budget, "id">) => Promise<void>;
  deleteBudget: (id: number) => Promise<void>;
  deleteExpense: (id: number) => Promise<void>;
  deleteCompleteUncategorizeExpenses: (budgetId: number) => void;
}

interface BudgetsProviderProps {
  children: React.ReactNode;
}

export const BudgetsProvider: React.FC<BudgetsProviderProps> = ({
  children,
}) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    // Cargar presupuestos al inicio
    const fetchBudgets = async () => {
      const data = await getBudgets();
      setBudgets(data);
    };

    fetchBudgets();
  }, []);

  // Función para agregar un presupuesto
  const addBudget = async ({ name, max }: Omit<Budget, "id">) => {
    const db = await initDB();
    const id = await db.add("budgets", { name, max });

    // Convierte 'id' a 'number' si es necesario
    const numericId = typeof id === "number" ? id : Number(id);
    // Actualiza el estado de 'budgets' directamente
    return setBudgets((prevBudgets) => [
      ...prevBudgets,
      { id: numericId, name, max }, // Agrega el nuevo presupuesto a la lista
    ]);
  };

  // Función para agregar un gasto
  const addExpense = async ({
    description,
    amount,
    budgetId,
  }: Omit<Expense, "id">) => {
    const db = await initDB();
    const id = db.add("expenses", {
      description,
      amount,
      budgetId,
    });

    const numericId = typeof id === "number" ? id : Number(id);

    return setExpenses((prevExpenses) => [
      ...prevExpenses,
      { id: numericId, description, amount, budgetId },
    ]);
  };

  // Función para obtener todos los presupuestos
  const getBudgets = async () => {
    const db = await initDB();
    return db.getAll("budgets");
  };

  async function deleteCompleteUncategorizeExpenses(budgetId: number) {
    const db = await initDB();
    const tx = db.transaction(["budgets", "expenses"], "readwrite");
    // Eliminar presupuesto
    await tx.objectStore("expenses").delete(budgetId);
    // actualizamos nuestro estado de expenses para devolver la lista correcta sin el eliminado.
    setExpenses((prevExpenses: Expense[]) =>
      prevExpenses.filter((expenses) => expenses.budgetId !== budgetId)
    );
  }

  // Función para eliminar un presupuesto y sus gastos relacionados
  const deleteBudget = async (budgetId: number) => {
    const db = await initDB();
    const tx = db.transaction(["budgets", "expenses"], "readwrite");

    // Eliminar presupuesto
    await tx.objectStore("budgets").delete(budgetId);

    // Eliminar gastos asociados
    const expensesStore = tx.objectStore("expenses");
    const index = expensesStore.index("budgetId");
    const expensesToDelete = await index.getAllKeys(budgetId);
    for (const key of expensesToDelete) {
      expensesStore.delete(key);
    }
    setBudgets((prevBudget) =>
      prevBudget.filter((budget) => budget.id !== budgetId)
    );
    await tx.done;
  };

  // Función para eliminar un presupuesto y sus gastos relacionados
  const deleteExpense = async (expenseId: number) => {
    const db = await initDB();
    const tx = db.transaction("expenses", "readwrite");

    // Eliminar el gasto específico
    const expensesStore = tx.objectStore("expenses");
    await expensesStore.delete(expenseId);
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expenses) => expenses.id !== expenseId)
    );
    await tx.done;
  };

  // Función para obtener todos los gastos de un presupuesto específico
  const getBudgetExpenses = async (budgetId: number) => {
    const db = await initDB();
    const tx = db.transaction("expenses", "readonly");
    const store = tx.objectStore("expenses");
    const index = store.index("budgetId");
    return index.getAll(budgetId);
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
        deleteCompleteUncategorizeExpenses,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
