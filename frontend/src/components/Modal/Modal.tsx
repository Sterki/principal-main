import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";

interface ModalProps {
  isOpen: boolean;
  children?: React.ReactNode;
  handleClose: () => void;
}

export default function Modal(props: ModalProps) {
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      PaperProps={{
        style: {
          minWidth: matches ? "90vw" : "500px",
        },
      }}
    >
      {props.children}
    </Dialog>
  );
}

Modal.defaultProps = {
  isOpen: false,
};
