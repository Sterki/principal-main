import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormEvent } from "react";

interface Props {
  handleSubmit: (e: FormEvent<Element>) => void;
  nameRef: React.RefObject<HTMLInputElement>;
  maxRef: React.RefObject<HTMLInputElement>;
  handleClose: () => void;
}

export default function AddBudget(props: Props) {
  return (
    <>
      <DialogTitle>New Budget</DialogTitle>
      <DialogContent>
        <form onSubmit={props.handleSubmit}>
          <TextField
            inputRef={props.nameRef}
            label='Name'
            variant='outlined'
            fullWidth
            required
            margin='normal'
          />
          <TextField
            inputRef={props.maxRef}
            label='Maximum Spending'
            variant='outlined'
            fullWidth
            required
            type='number'
            inputProps={{ min: 0, step: 0.01 }}
            margin='normal'
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={props.handleSubmit} color='primary'>
          Add
        </Button>
      </DialogActions>
    </>
  );
}
