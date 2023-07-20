import { Snackbar, Alert } from "@mui/material";
// Reusable alert pop up
const SnackBar = ({ open, handleClose, message }: SnackBarProps) => {
  return (
    <div>
      <Snackbar data-testid={'snackbar'} open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
// Define the snackbar props interface
interface SnackBarProps {
  open: boolean;
  handleClose: () => void;
  message: string;
}
export default SnackBar;