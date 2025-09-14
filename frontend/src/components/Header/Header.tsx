import Title from "../Title/Title";
import { Button } from "@mui/material";
import styles from "./Header.module.scss";
import { FormEvent, useContext, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import AddBudget from "../AddBudget/AddBudget";
import { BudgetsContext } from "../../context/BudgetContext";
import AddExpenseModal from "../AddExpenses/AddExpenses";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenExpenses, setIsOpenExpenses] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const budgetIdRef = useRef<HTMLSelectElement>(null);
  const { addBudget, addExpense, budgets } = useContext(BudgetsContext);
  function handleClickOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleOpenAddExpensesModal() {
    setIsOpenExpenses(true);
  }

  function handleCloseModalExpenses() {
    setIsOpenExpenses(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (nameRef.current && maxRef.current) {
      addBudget({
        name: nameRef.current.value,
        max: parseFloat(maxRef.current.value),
      });
    }
    handleCloseModal();
  }

  function handleSubmitExpenses(e: FormEvent) {
    e.preventDefault();
    if (descriptionRef.current && amountRef.current && budgetIdRef.current) {
      addExpense({
        description: descriptionRef.current.value,
        amount: parseFloat(amountRef.current.value),
        budgetId: +budgetIdRef.current.value,
      });
      handleCloseModalExpenses();
    }
  }

  return (
    <>
      <div className={styles.container}>
        <Title title='Expenses App' />
        <div className={styles.buttons}>
          <Button
            variant='contained'
            sx={{ marginRight: "10px" }}
            onClick={handleClickOpenModal}
          >
            Add Budget
          </Button>
          <Button variant='outlined' onClick={handleOpenAddExpensesModal}>
            Add Expenses
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} handleClose={handleCloseModal}>
        <AddBudget
          handleSubmit={handleSubmit}
          nameRef={nameRef}
          maxRef={maxRef}
          handleClose={handleCloseModal}
        />
      </Modal>
      <Modal isOpen={isOpenExpenses} handleClose={handleCloseModalExpenses}>
        <AddExpenseModal
          handleSubmit={handleSubmitExpenses}
          descriptionRef={descriptionRef}
          amountRef={amountRef}
          budgetIdRef={budgetIdRef}
          budgets={budgets}
          handleClose={handleCloseModalExpenses}
        />
      </Modal>
    </>
  );
}
