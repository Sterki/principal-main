import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Budget, UNCATEGORIZED_BUDGET_ID } from "../../context/BudgetContext";
import { FormEvent } from "react";

interface Props {
  handleClose: () => void;
  defaultBudgetId?: number;
  handleSubmit: (e: FormEvent) => void;
  descriptionRef: React.RefObject<HTMLInputElement>;
  amountRef: React.RefObject<HTMLInputElement>;
  budgetIdRef: React.RefObject<HTMLSelectElement>;
  budgets: Budget[];
}

export default function AddExpenseModal({
  handleClose,
  defaultBudgetId,
  handleSubmit,
  descriptionRef,
  amountRef,
  budgetIdRef,
  budgets,
}: Props) {
  return (
    <>
      <DialogTitle>New Expense</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            inputRef={descriptionRef}
            label='Description'
            variant='outlined'
            fullWidth
            required
            margin='normal'
          />
          <TextField
            inputRef={amountRef}
            label='Amount'
            variant='outlined'
            fullWidth
            required
            type='number'
            margin='normal'
            inputProps={{ min: 0, step: 0.01 }}
          />
          <FormControl fullWidth margin='normal' required>
            <InputLabel id='budget-label'>Budget</InputLabel>
            <Select
              defaultValue={defaultBudgetId}
              inputRef={budgetIdRef}
              labelId='budget-label'
              label='Budget'
            >
              <MenuItem value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</MenuItem>
              {budgets.map((budget) => (
                <MenuItem key={budget.id} value={budget.id}>
                  {budget.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color='primary'>
          Add
        </Button>
      </DialogActions>
    </>
  );
}
