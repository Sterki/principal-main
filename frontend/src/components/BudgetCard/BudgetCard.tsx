import {
  Button,
  Card,
  LinearProgress,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { currencyFormatter } from "../../utils/utils";
import Modal from "../Modal/Modal";
import AddExpenseModal from "../AddExpenses/AddExpenses";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { BudgetsContext } from "../../context/BudgetContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import DeleteBudget from "../DeleteBudget/DeleteBudget";
import ViewExpenses from "../ViewExpenses/ViewExpenses";

export default function BudgetCard({
  name,
  max,
  gray,
  hideButtons,
  budgetId,
  deleteCompleteUncategorizeExpenses,
}: {
  name: string;
  max?: number;
  gray?: boolean;
  hideButtons?: boolean;
  budgetId?: number;
  deleteUncategorizeExpenses?: (id: number) => void;
  deleteCompleteUncategorizeExpenses?: (budgetId: number) => void;
}) {
  const { addExpense, budgets, deleteBudget, getBudgetExpenses } =
    useContext(BudgetsContext);
  const [isOpenExpenses, setIsOpenExpenses] = useState(false);
  const [isDeleteBudgetOpen, setIsDeleteBudgetOpen] = useState(false);
  const [totalAmount, setAmount] = useState(0);
  const [isOpenEspensesViewModal, setIsOpenExpensesViewModal] = useState(false);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const budgetIdRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    getBudgetExpenses(budgetId!).then((result) => {
      if (result) {
        const amount = result.reduce(
          (total, expenses) => total + expenses.amount,
          0
        );
        setAmount(amount);
      }
    });
  }, [budgetId, getBudgetExpenses]);

  const cardStyle: React.CSSProperties = {
    backgroundColor:
      totalAmount > max! ? "#f8d7da" : gray ? "#f0f0f0" : "white",
    padding: 16,
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  };

  function handleOpenAddExpensesModal() {
    setIsOpenExpenses(true);
  }

  function handleCloseModalExpenses() {
    setIsOpenExpenses(false);
  }

  function handleCloseExpensesView() {
    setIsOpenExpensesViewModal(false);
  }

  function handleOpenExpensesView() {
    setIsOpenExpensesViewModal(true);
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

  function handleOpenDeleteBudgetModal() {
    setIsDeleteBudgetOpen(true);
  }

  function handleCloseDelete() {
    setIsDeleteBudgetOpen(false);
  }

  return (
    <>
      <Card
        style={cardStyle}
        sx={{
          backgroundColor: "red",
        }}
      >
        <Box display='flex' flexDirection='column'>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='baseline'
            mb={3}
          >
            <Typography variant='h6'>{name}</Typography>
            {/* {max && (
              <Typography>Total: {currencyFormatter.format(max)}</Typography>
            )} */}
            <Box display='flex' alignItems='baseline'>
              <Typography variant='body2'>
                {currencyFormatter.format(totalAmount)}
              </Typography>
              {max && (
                <Typography
                  variant='body1'
                  color='textSecondary'
                  ml={1}
                  sx={{ fontWeight: "bold" }}
                >
                  / {currencyFormatter.format(max - totalAmount)} left
                </Typography>
              )}
            </Box>
          </Box>

          {max && (
            <LinearProgress
              variant='determinate'
              value={(totalAmount / max) * 100}
              color={getProgressBarColor(totalAmount, max)}
              sx={{ borderRadius: "10px", mb: 2, height: "6px" }}
            />
          )}

          {!hideButtons && (
            <Stack direction='row' spacing={2} justifyContent='flex-end' mt={2}>
              <Box flex='1' display='flex' justifyContent='center'>
                <IconButton
                  aria-label='delete'
                  title='remove budget'
                  onClick={handleOpenDeleteBudgetModal}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Box>

              <Button
                variant='outlined'
                color='primary'
                onClick={handleOpenAddExpensesModal}
                sx={{
                  padding: "0 5px",
                }}
              >
                Add Expense
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={handleOpenExpensesView}
                sx={{
                  padding: "0 5px",
                }}
              >
                View Expenses
              </Button>
            </Stack>
          )}
        </Box>
      </Card>
      <Modal isOpen={isOpenExpenses} handleClose={handleCloseModalExpenses}>
        <AddExpenseModal
          handleSubmit={handleSubmitExpenses}
          descriptionRef={descriptionRef}
          amountRef={amountRef}
          budgetIdRef={budgetIdRef}
          budgets={budgets}
          handleClose={handleCloseModalExpenses}
          defaultBudgetId={budgetId}
        />
      </Modal>
      <Modal isOpen={isDeleteBudgetOpen} handleClose={handleCloseDelete}>
        <DeleteBudget
          handleClose={handleCloseDelete}
          handleRemoveBudget={deleteBudget}
          deleteUncategorizeExpenses={deleteCompleteUncategorizeExpenses}
          budgetId={budgetId}
          name={name}
        />
      </Modal>
      <Modal
        isOpen={isOpenEspensesViewModal}
        handleClose={handleCloseExpensesView}
      >
        <ViewExpenses
          budgetId={budgetId}
          handleClose={handleCloseExpensesView}
        />
      </Modal>
    </>
  );
}

function getProgressBarColor(amount: number, max: number) {
  const ratio = amount / max;
  if (ratio < 0.5) return "success";
  if (ratio < 0.75) return "warning";
  return "error";
}
