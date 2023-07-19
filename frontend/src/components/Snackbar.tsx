import { Snackbar, Alert } from "@mui/material";
// reusable alert pop up
function SnackBar(props: { open: any, handleClose: any, message:string }) {
  const { open, handleClose,message } = props;
  return (
    <div>
      <Snackbar data-testid={'snackbar'}open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackBar;