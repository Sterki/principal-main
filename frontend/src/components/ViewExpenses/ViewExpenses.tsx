import { useContext, useEffect, useState } from "react";
import {
  BudgetsContext,
  Expense,
  UNCATEGORIZED_BUDGET_ID,
} from "../../context/BudgetContext";
import {
  Box,
  Button,
  Card,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { currencyFormatter } from "../../utils/utils";

interface Props {
  budgetId?: number;
  handleClose: () => void;
}

export default function ViewExpenses({ budgetId, handleClose }: Props) {
  const { getBudgetExpenses, budgets, deleteExpense } =
    useContext(BudgetsContext);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    getBudgetExpenses(budgetId!)
      .then((expense) => {
        if (expense) {
          setExpenses(expense);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [expenses, budgetId, getBudgetExpenses]);

  const budget =
    +UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);
  return (
    <>
      <DialogTitle sx={{ fontWeight: "bold" }}>Expenses List</DialogTitle>
      <DialogContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Typography display='flex'>
            <Typography sx={{ marginRight: "5px" }}>Budget name:</Typography>
            <Typography sx={{ fontWeight: "bold" }}>{budget?.name}</Typography>
          </Typography>
        </div>
        <div>
          {expenses.map((expense) => {
            return (
              <Card sx={{ marginBottom: "10px", padding: "5px" }}>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  flexWrap='wrap'
                >
                  <Box display='flex' flex='1' justifyContent='space-between'>
                    <Typography>{expense.description}</Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {currencyFormatter.format(expense.amount)}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      aria-label='delete'
                      title='remove expense'
                      onClick={() => deleteExpense(expense.id)}
                    >
                      <DeleteForeverIcon color='error' />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            );
          })}
        </div>
        <Box alignSelf='start'>
          <Button variant='outlined' color='warning' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </>
  );
}
