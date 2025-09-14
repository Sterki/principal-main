import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface Props {
  handleClose: () => void;
  handleRemoveBudget: (id: number) => Promise<void>;
  budgetId?: number;
  name: string;
  deleteUncategorizeExpenses?: (id: number) => void;
}

export default function DeleteBudget(props: Props) {
  function removeBudget() {
    if (props.deleteUncategorizeExpenses) {
      props.deleteUncategorizeExpenses(props.budgetId!);
    }
    props.handleRemoveBudget(props.budgetId!).then(() => {
      props.handleClose();
    });
  }

  return (
    <>
      <DialogTitle>Removing Budget</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Are u sure u want to remove the budget '{props.name}'?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.handleClose}
          variant='outlined'
          color='secondary'
        >
          Cancel
        </Button>
        <Button onClick={removeBudget} variant='outlined' color='error'>
          Remove
        </Button>
      </DialogActions>
    </>
  );
}
